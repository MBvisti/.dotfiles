---
id: projects--golang-blog-course--module-seven-index
aliases:
  - gbc
tags: []
---

[Back](/projects/golang-blog-course/index.md)

<!--toc:start-->
- [Module Seven](#module-seven)
  - [Episode 1](#episode-1)
    - [Episode 1 Script](#episode-1-script)
<!--toc:end-->

# Module Six

**Title**: Adding Subscribers

Currently planned videos:
- [ ] 1. What are the minimum requirements
- [x] 2. Expanding the database: Tokens & Subscribers
- [x] 3. Creating the token and subscriber models
- [x] 4. Creating the subscription form
- [x] 5. Saving new subscribers in the database
- [ ] 6. Emails and Clients
- [ ] 7. Verifying subscribers' email
- [ ] 8. ~Validation view~ TODO: is this needed?
- [ ] 9. Updating dashboard with subscriber info

## Episode 2

**Title**:  Expanding the database: Tokens & Subscribers 

## Episode 2 Script

```sh
goose -dir psql/migrations postgres postgresql://mbv:password@localhost:5432/blog_dev create create_subscribers_table sql
```

```sql
-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
create table if not exists subscribers (
    id uuid not null,
    primary key (id),
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    email varchar unique not null,
    is_verified bool default false
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
drop table if exists subscribers;
-- +goose StatementEnd
```
---

```sh
goose -dir psql/migrations postgres postgresql://mbv:password@localhost:5432/blog_dev create create_tokens_table sql
```

```sql
-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
create table if not exists tokens (
    id uuid not null,
    primary key (id),
    created_at timestamp with time zone not null,
    hash text not null,
    expires_at timestamp with time zone not null,
	meta_information jsonb not null
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
drop table if exists tokens;
-- +goose StatementEnd
```
---

```sql
// psql/subscribers.sql
-- name: QuerySubscriberByID :one
select 
    id, created_at, updated_at, email, is_verified
from 
	subscribers
where id = $1;

-- name: QuerySubscriberByEmail :one
select 
    id, created_at, updated_at, email, is_verified
from 
	subscribers
where email = $1;

-- name: InsertSubscriber :one
insert into subscribers (
    id, created_at, updated_at, email, is_verified
) values (
    $1, $2, $3, $4, $5
)
returning *;

-- name: UpdateSubscriber :one
update subscribers
set 
    updated_at = $2,
    email = $3,
    is_verified = $4
where id = $1
returning *;

```
---

```sql
-- name: InsertToken :one
insert into tokens (
    id,
    created_at,
    hash,
    expires_at,
    meta_information
) values (
    $1,
    $2,
    $3,
    $4,
    $5
) returning *;


-- name: QueryTokenByHash :one
select * from tokens where hash = $1;

-- name: DeleteToken :exec
delete from tokens where id = $1;
```
---

## Episode 3

**Title**:  Creating the token and subscriber models 

## Episode 3 Script

```go
// models/subscribers.go
type Subscriber struct {
	ID           uuid.UUID
	CreatedAt    time.Time
	UpdatedAt    time.Time
	Email        string
	SubscribedAt time.Time
	IsVerified   bool
}

func convertDBSubscriber(dbSub db.Subscriber) Subscriber {
	return Subscriber{
		ID:         dbSub.ID,
		CreatedAt:  dbSub.CreatedAt.Time,
		UpdatedAt:  dbSub.UpdatedAt.Time,
		Email:      dbSub.Email.String,
		IsVerified: dbSub.IsVerified.Bool,
	}
}

func GetSubscriber(
	ctx context.Context,
	dbtx db.DBTX,
	id uuid.UUID,
) (Subscriber, error) {
	dbSub, err := db.Stmts.QuerySubscriberByID(
		ctx,
		dbtx,
		id,
	)
	if err != nil {
		return Subscriber{}, err
	}

	return convertDBSubscriber(dbSub), nil
}

func GetSubscriberByEmail(
	ctx context.Context,
	dbtx db.DBTX,
	email string,
) (Subscriber, error) {
	dbSub, err := db.Stmts.QuerySubscriberByEmail(
		ctx,
		dbtx,
		email,
	)
	if err != nil {
		return Subscriber{}, err
	}

	return convertDBSubscriber(dbSub), nil
}
```
---

```templ
type NewSubscriberPayload struct {
	Email        string    `validate:"required,email"`
	SubscribedAt time.Time `validate:"required"`
}

func NewSubscriber(
	ctx context.Context,
	dbtx db.DBTX,
	payload NewSubscriberPayload,
) (Subscriber, error) {
	if err := validate.Struct(payload); err != nil {
		return Subscriber{}, errors.Join(ErrDomainValidation, err)
	}

	now := time.Now()
	params := db.InsertSubscriberParams{
		ID:        uuid.New(),
		CreatedAt: pgtype.Timestamptz{Time: now, Valid: true},
		UpdatedAt: pgtype.Timestamptz{Time: now, Valid: true},
		Email: pgtype.Text{
			String: payload.Email,
			Valid:  true,
		},
		IsVerified: pgtype.Bool{Bool: false, Valid: true},
	}

	newSubscriber, err := db.Stmts.InsertSubscriber(ctx, dbtx, params)
	if err != nil {
		return Subscriber{}, err
	}

	return convertDBSubscriber(newSubscriber), nil
}

type UpdateSubscriberPayload struct {
	ID         uuid.UUID `validate:"required,uuid"`
	Email      string    `validate:"required,email"`
	IsVerified bool      `validate:"required"`
}

func UpdateSubscriber(
	ctx context.Context,
	dbtx db.DBTX,
	payload UpdateSubscriberPayload,
) (Subscriber, error) {
	if err := validate.Struct(payload); err != nil {
		return Subscriber{}, errors.Join(ErrDomainValidation, err)
	}

	params := db.UpdateSubscriberParams{
		ID:         payload.ID,
		UpdatedAt:  pgtype.Timestamptz{Time: time.Now(), Valid: true},
		Email:      pgtype.Text{String: payload.Email, Valid: true},
		IsVerified: pgtype.Bool{Bool: payload.IsVerified, Valid: true},
	}

	updatedSubscriber, err := db.Stmts.UpdateSubscriber(ctx, dbtx, params)
	if err != nil {
		return Subscriber{}, err
	}

	return convertDBSubscriber(updatedSubscriber), nil
}
```
---

```go
var h = hmac.New(sha256.New, []byte(os.Getenv("TOKEN_SIGNING_KEY")))

type (
	Scope    string
	Resource string
)

var (
	ScopeEmailVerification     Scope = "email.verification"
	ScopeNewsletterUnsubscribe Scope = "newsletter.unsubscribe"
)

var ResourceSubscriber Resource = "subscribers"

type MetaInformation struct {
	Resource   Resource  `validate:"required"`
	ResourceID uuid.UUID `validate:"required,uuid"`
	Scope      Scope     `validate:"required"`
}

type Token struct {
	ID         uuid.UUID
	CreatedAt  time.Time
	Expiration time.Time
	Hash       string
	Meta       MetaInformation
}

func (te Token) IsValid() bool {
	return time.Now().Before(te.Expiration)
}
```
---

```templ
type NewTokenPayload struct {
	Expiration time.Time       `validate:"required"`
	Meta       MetaInformation `validate:"required"`
}

func NewToken(
	ctx context.Context,
	dbtx db.DBTX,
	data NewTokenPayload,
) (Token, error) {
	if err := validate.Struct(data); err != nil {
		return Token{}, errors.Join(ErrDomainValidation, err)
	}

	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return Token{}, err
	}

	hash := hex.EncodeToString(b)

	tkn := Token{
		ID:         uuid.New(),
		CreatedAt:  time.Now(),
		Expiration: data.Expiration,
		Hash:       hash,
		Meta:       data.Meta,
	}

	metaData, err := json.Marshal(data.Meta)
	if err != nil {
		return Token{}, err
	}

	_, err = db.Stmts.InsertToken(ctx, dbtx, db.InsertTokenParams{
		ID: tkn.ID,
		CreatedAt: pgtype.Timestamptz{
			Time:  tkn.CreatedAt,
			Valid: true,
		},
		Hash: hash,
		ExpiresAt: pgtype.Timestamptz{
			Time:  tkn.Expiration,
			Valid: true,
		},
		MetaInformation: metaData,
	})
	if err != nil {
		return Token{}, err
	}

	return tkn, nil
}
```
---

```templ
func GetTokenByHash(
	ctx context.Context,
	dbtx db.DBTX,
	hash string,
) (Token, error) {
	tkn, err := db.Stmts.QueryTokenByHash(ctx, dbtx, hash)
	if err != nil {
		return Token{}, err
	}

	var meta MetaInformation
	if err := json.Unmarshal(tkn.MetaInformation, &meta); err != nil {
		return Token{}, err
	}

	return Token{
		ID:         tkn.ID,
		CreatedAt:  tkn.CreatedAt.Time,
		Expiration: tkn.ExpiresAt.Time,
		Hash:       tkn.Hash,
		Meta:       meta,
	}, nil
}

func DeleteToken(
	ctx context.Context,
	dbtx db.DBTX,
	tokenID uuid.UUID,
) error {
	return db.Stmts.DeleteToken(ctx, dbtx, tokenID)
}
```
---

## Episode 4

**Title**: Creating the subscription form

## Episode 4 Script

```templ
templ SubscriptionForm(csrfToken string) {
	<form
		hx-swap="outerHTML"
		hx-target="this"
		hx-post="/subscribers"
		id="subscriptionForm"
		class="rounded px-4 py-2 bg-base-200 shadow"
	>
		<input
			type="hidden"
			name="gorilla.csrf.Token"
			value={ csrfToken }
		/>
		<span class="flex flex-col">
			<label class="text-center text-white mb-1 font-semibold">Join my newsletter</label>
			<p class="text-base-content">No spam, no AI generated content. I promise! Unsubscribe at anytime.</p>
			<input
				placeholder="morten@golangblogcourse.com"
				name="email"
				type="email"
				class="bg-base-200 text-base-content px-2 py-1 border border-gray-500 rounded mb-4"
				required
			/>
		</span>
		<button
			type="submit"
			class="w-full px-2 py-1 border border-base-300 rounded text-white bg-base-300 hover:bg-base-300/30"
		>
			Join now
		</button>
	</form>
}
```

```templ
templ SubscriptionSuccessResponse() {
	<div
		class="rounded px-4 py-2 bg-base-200 shadow"
	>
		<span class="flex flex-col">
			<h5 class="text-center text-2xl text-white font-semibold mt-1 mb-2">You're in!</h5>
			<p class="text-base-content">You'll receive an email soon with a link to validate your subscription.</p>
		</span>
	</div>
}
```

```templ
templ SubscriptionFailureResponse() {
	<div
		hx-swap="outerHTML"
		hx-get="/fragments/subscription-form"
		hx-trigger="load delay:5s"
		hx-target="this"
		class="rounded px-4 py-2 bg-base-200 shadow"
	>
		<span class="flex flex-col">
			<h5 class="text-center text-2xl text-white font-semibold mt-1 mb-2">Oh no!</h5>
			<p class="text-base-content">We couldn't subscribe you-maybe you already have a subscription. Feel free to try again!</p>
		</span>
	</div>
}
```
---

```templ
templ SubscriberEmailValidationSuccess() {
	@base() {
		<div class="h-full flex-1 bg-base-100 container mx-auto flex flex-col items-center justify-center text-base-content">
			<p>Your email has been validated and you'll start receiving newsletters. Thanks again for joining!</p>
		</div>
	}
}
```

```templ
templ SubscriberEmailValidationFailure(csrfToken string) {
	@base() {
		<div id="subEmailValidationFail" class="h-full flex-1 bg-base-100 container mx-auto flex flex-col items-center justify-center text-base-content">
			<p>We could not validate your email. <br/> This could be because an expired token or some internal error!</p>
			<form
				hx-swap="innerHTML"
				hx-target="#subEmailValidationFail"
				hx-post="/subscriptions/validation-token"
				id="subscriptionForm"
				class="flex flex-col rounded px-4 py-2"
			>
				<input
					type="hidden"
					name="gorilla.csrf.Token"
					value={ csrfToken }
				/>
				<input
					placeholder="morten@golangblogcourse.com"
					name="email"
					type="email"
					class="bg-base-200 text-base-content px-2 py-1 border border-gray-500 rounded mb-4"
					required
				/>
				<button
					type="submit"
					class="w-full px-2 py-1 border border-base-300 rounded text-white bg-base-300 hover:bg-base-300/30"
				>
					Request new token
				</button>
			</form>
		</div>
	}
}
```

```templ
templ NewValidationtokenResponse() {
	<div
		class="rounded px-4 py-2 bg-base-200 shadow"
	>
		<span class="flex flex-col">
			<p class="text-base-content">A new email confirmation link has been sent to your email.</p>
		</span>
	</div>
}
```
---

## Episode 5

**Title**: Saving and verifying subscribers

## Episode 5 Script

```go
func (c Controller) SubscriberCreate(ctx echo.Context) error {
	type subscriberCreatePayload struct {
		Email string `form:"email"`
	}

	var payload subscriberCreatePayload
	if err := ctx.Bind(&payload); err != nil {
		return views.SubscriptionFailureResponse().Render(renderArgs(ctx))
	}

	tx, err := c.db.Pool.Begin(ctx.Request().Context())
	if err != nil {
		return views.SubscriptionFailureResponse().Render(renderArgs(ctx))
	}
	defer tx.Rollback(ctx.Request().Context())

	newSubscriber, err := models.NewSubscriber(
		ctx.Request().Context(),
		tx,
		models.NewSubscriberPayload{
			Email:        payload.Email,
			SubscribedAt: time.Now(),
		},
	)
	if err != nil {
		return views.SubscriptionFailureResponse().Render(renderArgs(ctx))
	}

	token, err := models.NewToken(
		ctx.Request().Context(),
		tx,
		models.NewTokenPayload{
			Expiration: time.Now().Add(48 * time.Hour),
			Meta: models.MetaInformation{
				Resource:   models.ResourceSubscriber,
				ResourceID: newSubscriber.ID,
				Scope:      models.ScopeEmailVerification,
			},
		},
	)
	if err != nil {
		return views.SubscriptionFailureResponse().Render(renderArgs(ctx))
	}

    // TODO: implement email and client

	if err := tx.Commit(ctx.Request().Context()); err != nil {
		return views.SubscriptionFailureResponse().Render(renderArgs(ctx))
	}

	return views.SubscriptionSuccessResponse().Render(renderArgs(ctx))
}
```
---

```go
func (c Controller) SubscriberEmailVerify(ctx echo.Context) error {
	hash := ctx.QueryParam("hash")

	tx, err := c.db.Pool.Begin(ctx.Request().Context())
	if err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}
	defer tx.Rollback(ctx.Request().Context())

	token, err := models.GetTokenByHash(
		ctx.Request().Context(),
		tx,
		hash,
	)
	if err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	if !token.IsValid() && token.Meta.Scope != models.ScopeEmailVerification &&
		token.Meta.Resource != models.ResourceSubscriber {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	subscriber, err := models.GetSubscriber(
		ctx.Request().Context(),
		tx,
		token.Meta.ResourceID,
	)
	if err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	_, err = models.UpdateSubscriber(
		ctx.Request().Context(),
		tx,
		models.UpdateSubscriberPayload{
			ID:         subscriber.ID,
			Email:      subscriber.Email,
			IsVerified: true,
		},
	)
	if err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	if err := models.DeleteToken(ctx.Request().Context(), tx, token.ID); err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	if err := tx.Commit(ctx.Request().Context()); err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	return views.SubscriberEmailValidationSuccess().Render(renderArgs(ctx))
}
```
---

```go
func (c Controller) SubscriberVerificationToken(ctx echo.Context) error {
	type subscriberCreatePayload struct {
		Email string `form:"email"`
	}

	var payload subscriberCreatePayload
	if err := ctx.Bind(&payload); err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	tx, err := c.db.Pool.Begin(ctx.Request().Context())
	if err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}
	defer tx.Rollback(ctx.Request().Context())

	subscriber, err := models.GetSubscriberByEmail(
		ctx.Request().Context(),
		tx,
		payload.Email,
	)
	if err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	_, err = models.NewToken(
		ctx.Request().Context(),
		tx,
		models.NewTokenPayload{
			Expiration: time.Now().Add(48 * time.Hour),
			Meta: models.MetaInformation{
				Resource:   models.ResourceSubscriber,
				ResourceID: subscriber.ID,
				Scope:      models.ScopeEmailVerification,
			},
		},
	)
	if err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	// TODO send validation email

	if err := tx.Commit(ctx.Request().Context()); err != nil {
		return views.SubscriberEmailValidationFailure(csrf.Token(ctx.Request())).
			Render(renderArgs(ctx))
	}

	return views.SubscriptionSuccessResponse().Render(renderArgs(ctx))
}
```
---

```go
func (r Routes) loadApp() *echo.Echo {
    // omitted
	r.e.POST("/subscribers", func(c echo.Context) error {
		return r.ctrl.SubscriberCreate(c)
	})
    r.e.GET("/subscribers/email/verify", func(c echo.Context) error {
        return r.ctrl.SubscriberEmailVerify(c)
    })
	r.e.POST("/subscriptions/validation-token", func(c echo.Context) error {
		return r.ctrl.SubscriberVerificationToken(c)
	})
```

```go
func (r Routes) loadFragments(e *echo.Echo) *echo.Echo {
	fragmentsGroup := e.Group("/fragments")

	fragmentsGroup.GET("/dashboard/articles-table", func(c echo.Context) error {
		return r.ctrl.ArticlesTableFragment(c)
	}, controllers.AuthOnly)

	--> fragmentsGroup.GET("/subscription-form", func(c echo.Context) error {
	--> 	return r.ctrl.SubscriptionsFormFragment(c)
	--> })

	return e
}
```
---

## Episode 6

**Title**: Emails and Clients

## Episode 6 Script

```sh
go get github.com/jaytaylor/html2text

go get github.com/vanng822/go-premailer/premailer
```

```go
// emails/email.templ
package emails

import (
	"bytes"
	"context"
	"embed"

	"github.com/a-h/templ"
	"github.com/jaytaylor/html2text"
	"github.com/vanng822/go-premailer/premailer"
)

type (
	Html string
	Text string
)

func (h Html) String() string {
	return string(h)
}

func (t Text) String() string {
	return string(t)
}

//go:embed *_templ.go
var HtmlTemplates embed.FS

type TemplateHandler interface {
	Generate(ctx context.Context) (Html, Text, error)
}

func processEmail(
	ctx context.Context,
	tmpl templ.Component,
) (string, string, error) {
	var html bytes.Buffer
	if err := tmpl.Render(ctx, &html); err != nil {
		return "", "", err
	}

	premailer, err := premailer.NewPremailerFromString(
		html.String(),
		premailer.NewOptions(),
	)
	if err != nil {
		return "", "", err
	}

	inlineHtml, err := premailer.Transform()
	if err != nil {
		return "", "", err
	}

	plainText, err := html2text.FromString(
		inlineHtml,
		html2text.Options{PrettyTables: false},
	)
	if err != nil {
		return "", "", err
	}

	return inlineHtml, plainText, nil
}
```
---

```templ
// emails/base.templ
package emails

templ base() {
	<style type="text/css">
		body {
		  background-color: white;
		}

    body,
    td,
    th {
      font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
    }

    h1 {
      margin-top: 0;
      color: #2a2a2a;
      font-size: 22px;
      font-weight: bold;
      text-align: left;
    }
    
    h2 {
      margin-top: 0;
      color: #2a2a2a;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
    }
    
    h3 {
      margin-top: 0;
      color: #333333;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }

    td,
    th {
      font-size: 16px;
    }

		p {
		  color: black;
		}

    p,
		a,
    ul,
    ol,
    blockquote {
      margin: .4em 0 1.1875em;
      font-size: 16px;
      line-height: 1.625;
    }
</style>
	<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<meta name="x-apple-disable-message-reformatting"/>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
			<meta name="color-scheme" content="light dark"/>
			<meta name="supported-color-schemes" content="light dark"/>
			<title>MyBlog</title>
			<!--[if mso]>
				<style type="text/css">
				.f-fallback  {
				  font-family: Arial, sans-serif;
				}
                </style>
		    <![endif]-->
		</head>
		<body style="margin:0; padding:0;">
			<table style="width: 100%; margin: 0; padding: 0;" role="presentation" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td>
						<table role="presentation" style="width:602px; border-collapse:collapse; text-align:left;">
							{ children... }
						</table>
					</td>
				</tr>
			</table>
		</body>
	</html>
}
```
---

```templ
// emails/components.templ
package emails

import (
	"strconv"
	"time"
)

templ header(text string) {
	<tr>
		<td>
			<h1>{ text }</h1>
		</td>
	</tr>
}

templ subHeader(text string) {
	<tr>
		<td>
			<h2>{ text }</h2>
		</td>
	</tr>
}

templ footer() {
	<tr>
		<td style="text-align: center;">
			<p>© { strconv.Itoa(time.Now().Year()) } MyBlog </p>
		</td>
	</tr>
}

templ footerWithUnsub(unsubURl string) {
	<tr>
		<td>
			<table align="center" width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td style="color: #999999; text-align: center;">
						<p>
							If you didn't signup, or want to stop receiving these emails, click here:
						</p>
						<p>
							<a href={ templ.SafeURL(unsubURl) } target="_blank">Unsubscribe me!</a>
						</p>
					</td>
				</tr>
			</table>
		</td>
		<table align="center" width="100%" cellpadding="0" cellspacing="0">
			@footer()
		</table>
	</tr>
}

type linkProps struct {
	text  string
	url   string
	style string
}

templ link(props linkProps) {
	<style>
	.link {
      background-color: #3869D4;
      border-top: 10px solid #3869D4;
      border-right: 18px solid #3869D4;
      border-bottom: 10px solid #3869D4;
      border-left: 18px solid #3869D4;
      display: inline-block;
      color: #FFF;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
      -webkit-text-size-adjust: none;
      box-sizing: border-box;
	}
	.link--success {
      background-color: #22BC66;
      border-top: 10px solid #22BC66;
      border-right: 18px solid #22BC66;
      border-bottom: 10px solid #22BC66;
      border-left: 18px solid #22BC66;
  }

    .link--danger {
      background-color: #FF6136;
      border-top: 10px solid #FF6136;
      border-right: 18px solid #FF6136;
      border-bottom: 10px solid #FF6136;
      border-left: 18px solid #FF6136;
    }
  </style>
	<a class={ "link", templ.KV("link--success", props.style=="success"), templ.KV("link--danger", props.style=="danger") } href={ templ.SafeURL(props.url) } target="_blank">{ props.text }</a>
}

templ section() {
	<tr>
		<td>
			{ children... }
		</td>
	</tr>
}
```
---

```templ
package emails

import (
	"context"
)

type SubscriberWelcome struct {
	ConfirmationLink string
}

var _ TemplateHandler = (*SubscriberWelcome)(nil)

func (s SubscriberWelcome) Generate(ctx context.Context) (Html, Text, error) {
	html, plainText, err := processEmail(ctx, s.template())
	if err != nil {
		return Html(""), Text(""), err
	}

	return Html(html), Text(plainText), nil
}

templ (s SubscriberWelcome) template() {
	@base() {
		@header("Thanks for signing up to MyBlog's newsletter!")
		@section() {
			<p>Thanks for signing up to MyBlog's newsletter!. We’re thrilled to have you on board.</p>
		}
		@section() {
			<p>To continue, we need you to confirm your mail.</p>
		}
		@section() {
			@link(linkProps{text: "Confirm mail", url: s.ConfirmationLink, style: "success"})
		}
	}
}
```
---

```sh
	go get github.com/aws/aws-sdk-go/aws

	go get github.com/aws/aws-sdk-go/aws/credentials

	go get github.com/aws/aws-sdk-go/aws/session

	go get github.com/aws/aws-sdk-go/service/ses
```

```go
// clients/aws_ses.go
package clients

import (
	"context"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

const (
	charSet   = "UTF-8"
	awsRegion = "eu-central-1"
)

const defaultSender = "noreply@myblog.com"

type SimpleEmailService struct {
	client *ses.SES
}

func NewSimpleEmailService() SimpleEmailService {
	creds := credentials.NewEnvCredentials()
	conf := &aws.Config{
		Region:      aws.String(awsRegion),
		Credentials: creds,
	}
	sess, err := session.NewSession(conf)
	if err != nil {
		panic(err)
	}

	return SimpleEmailService{
		ses.New(sess),
	}
}

func (s SimpleEmailService) Send(
	ctx context.Context,
	recipient string,
	sender string,
	html string,
	text string,
	subject string,
) error {
	from := defaultSender
	if sender != "" {
		from = sender
	}

	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			CcAddresses: []*string{},
			ToAddresses: []*string{
				aws.String(recipient),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Html: &ses.Content{
					Charset: aws.String(charSet),
					Data:    aws.String(html),
				},
				Text: &ses.Content{
					Charset: aws.String(charSet),
					Data:    aws.String(text),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String(charSet),
				Data:    aws.String(subject),
			},
		},
		Source: aws.String(from),
	}

	_, err := s.client.SendEmail(input)
	if err != nil {
		return err
	}

	return nil
}
```
---

```go
// controllers/controller.go
type Controller struct {
	db          psql.Postgres
	--> emailClient clients.SimpleEmailService
}

func New(db psql.Postgres, --> emailClient clients.SimpleEmailService) Controller {
	return Controller{db, --> emailClient}
}
```

```go
// main.go
func main() {
    // omitted
	--> sesClient := clients.NewSimpleEmailService()
	controller := controllers.New(psql, sesClient)

	routes := routes.NewRoutes(controller)
	srv := server.NewServer("0.0.0.0", 8080, routes.Load())

	srv.Start()
}
```
---

## Episode 7

**Title**: Verifying subscribers' email

## Episode 7 Script
