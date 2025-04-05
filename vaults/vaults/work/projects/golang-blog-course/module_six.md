---
id: projects--golang-blog-course--module-six-index
aliases:
  - gbc
tags: []
---

[Back](/projects/golang-blog-course/index.md)

<!--toc:start-->
- [Module Six](#module-six)
  - [Episode 1](#episode-1)
    - [Episode 1 Script](#episode-1-script)
<!--toc:end-->

# Module Six

**Title**: Managing The Blog

Current Planned Vids:
1. What are the minimum requirements
2. A new layout approaches
3. Introduction to authentication
4. Our second migration: users table
5. Storing passwords securely
6. Authenticating users
7. Remember me/Forget me
8. Managing posts using a hypermedia API
9. Our third migration: altering posts table
10. Only show posts marked ready

## Episode 1

**Title**:  What are the minimum requirements

Introduce the module and explain what the learning topics/goals are. 

Will show how to hash and store passwords in the database.

Will show how to authenticate users and making authenticated session stick.

Will show how to release articles and removing them again if needed.

Bullet points:
- hash and store passwords
- authenticate users + cookies (login)
- release articless
- removing articles

### Episode 1 Script

INTRO
---
Welcome to Module Six! This is where our blog transforms from a simple content display system into a fully-featured content management system. We'll be adding all the essential features that make a blog manageable and secure.

MAIN CONTENT
---
Let's talk about what we're going to build in this module. There are four main areas we'll focus on:

1. Secure Password Management
   - Right now, we don't have any security
   - We'll learn how to properly hash passwords
   - We'll understand why plain-text passwords are dangerous
   - We'll implement industry-standard password security
   - We'll use best practices like bcrypt for password hashing

2. User Authentication System
   - We'll create a proper login system
   - Implement session management using cookies
   - Handle "remember me" functionality
   - Protect routes that require authentication
   - Learn about secure session handling

3. Content Management
   - Add ability to mark articles as "ready for release"
   - Implement draft vs published states
   - Create an interface for managing article status
   - Control what visitors can see

4. Article Administration
   - Add capability to remove articles
   - Implement soft deletion vs hard deletion
   - Handle article updates
   - Manage article visibility

Why These Features Matter
---
Think of your blog like a house:
- Password security is like having good locks on your doors
- Authentication is like having a key system that works reliably
- Content management is like having control over which rooms guests can see
- Article administration is like being able to rearrange or remove furniture

Technical Challenges We'll Address
---
Throughout this module, we'll tackle several important technical challenges:

1. Security Considerations
   - Protecting against common password attacks
   - Securing user sessions
   - Preventing unauthorized access

2. User Experience
   - Making the login process smooth
   - Handling session expiration gracefully
   - Providing clear feedback on actions

3. Data Management
   - Maintaining data integrity
   - Handling state changes safely
   - Implementing proper database relations

OUTRO
---
By the end of this module, you'll have a fully functional blog management system that's both secure and user-friendly. In our next episode, we'll start by implementing secure password storage - the foundation of any user management system.

See you in the next episode where we'll dive into password hashing!

## Episode 2

**Title**:  A new layout approaches

Bullet points:
- outline/show design
- explain why we want to use another layout
- create layout component

### Episode 2 Script


---

## Episode 3

**Title**: Introduction to authentication

Bullet points:
- basics of authentication
- difference from authorization
- hashing and salting passwords
- introducing state on the frontend (cookies)

### Episode 3 Script

INTRO
---
Welcome back! Today we're diving into authentication - a topic that might sound intimidating but is actually quite straightforward once you understand the core concepts. We'll break it down into digestible pieces and by the end of this video, you'll see that it's not as complex as many people think.

MAIN CONTENT
---

- Regarding expertise: While security expertise is specialized, the core principles of secure authentication can be learned. Building your own system can provide a deep understanding of security fundamentals that using third-party solutions might not.
- On battle-testing: Even established frameworks have vulnerabilities discovered regularly. Their widespread use makes them attractive targets, while custom solutions may benefit from "security through obscurity."
- About complexity: By building your own system, you gain control over scope and can design specifically for your application's needs rather than adapting to a general-purpose solution.
- For hidden vulnerabilities: Open source tools and security reviews can help identify issues in custom authentication systems. Modern development practices include security scanning tools that catch many common mistakes.
- On evolving standards: Custom solutions can sometimes be more agile in adopting new standards than large frameworks that need to maintain backward compatibility.

1. What is Authentication?
   - Think of authentication as the "proving who you are" part of security
   - Real-world example: showing your ID at the airport
   - In web applications: proving you are who you claim to be (usually with username/password)
   - Simple formula: Authentication = Identity + Proof

2. Authentication vs Authorization
   - Authentication: "Are you who you say you are?"
   - Authorization: "Are you allowed to do this?"
   - Example: 
     - Authentication: Proving you're an employee (badge)
     - Authorization: Whether that badge lets you enter specific rooms
   - We'll focus on authentication today, authorization comes later

3. Password Security: Hashing and Salting
   - Never store plain passwords! (Show example of data breach consequences)
   - Hashing: One-way mathematical function
     - Demo: "password123" → "hash8939..." (can't go backwards)
     - Like making a smoothie - easy to blend, impossible to separate
   - Salting: Adding random data before hashing
     - Why? Prevents rainbow table attacks
     - Makes identical passwords hash differently
     - Visual demonstration with code

4. Managing State with Cookies
   - Problem: HTTP is stateless
   - Solution: Cookies store session information
   - How it works:
     - User logs in successfully
     - Server creates session
     - Browser stores cookie
     - Cookie sent with future requests
   - Live demo: Using Chrome DevTools to see cookies

---

## Episode 4

**Title**: Our second migration: users table

Bullet points:
- create users table migration
- create relevant queries for creating and authenticating users

### Episode 4 Script

```sh
goose -dir psql/migrations postgres postgresql://blog_admin:password@localhost:5432/blog_dev create create_users_table sql
```

```sql
create table if not exists users (
    id uuid not null,
    primary key (id),
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    email varchar(255) unique not null,
    email_verified_at timestamp with time zone,
    password text not null
);

drop table if exists users;
```

mentioned that we could technically add update user as well but not really relevant for our use case and we'll show validation flow in next module.

```sql
-- name: QueryUserByEmail :one
select * from users where email=$1;

-- name: InsertUser :one
insert into
    users (id, created_at, updated_at, email, password)
values
    ($1, $2, $3, $4, $5, $6)
returning *;
```

```sh
goose -dir psql/migrations postgres postgresql://blog_admin:password@localhost:5432/blog_dev up
```

```sh
sqlc compile && sqlc generate
```

## Episode 5

**Title**: Storing passwords securely

Bullet points:
- create models for creating user
- create hashing function
- create validation function
- create models for finding user

### Episode 5 Script

```go
type User struct {
	ID              uuid.UUID
	CreatedAt       time.Time
	UpdatedAt       time.Time
	Email           string
	EmailVerifiedAt time.Time
	HashedPassword  string
}
```
---

```go
func (u User) ValidatePassword(providedPassword string) error {
	return bcrypt.CompareHashAndPassword(
		[]byte(u.HashedPassword),
		[]byte(providedPassword+os.Getenv("PASSWORD_PEPPER")),
	)
}
```

```go   
func HashAndPepperPassword(password string) (string, error) {
	passwordBytes := []byte(password + os.Getenv("PASSWORD_PEPPER"))
	hashedBytes, err := bcrypt.GenerateFromPassword(
		passwordBytes,
		bcrypt.DefaultCost,
	)
	if err != nil {
		return "", err
	}

	return string(hashedBytes), nil
}
```
---

```go
func GetUserByEmail(
	ctx context.Context,
	email string,
	dbtx db.DBTX,
) (UserEntity, error) {
	user, err := db.Stmts.QueryUserByEmail(ctx, dbtx, email)
	if err != nil {
		return UserEntity{}, err
	}

	return UserEntity{
		ID:              user.ID,
		CreatedAt:       user.CreatedAt.Time,
		UpdatedAt:       user.UpdatedAt.Time,
		Email:           user.Email,
		HashedPassword:  user.Password,
		EmailVerifiedAt: user.EmailVerifiedAt.Time,
	}, nil
}
```
---

```go
type PasswordConfirmation struct {
	Password        string `validate:"required,gte=6"`
	ConfirmPassword string `validate:"required,gte=6"`
}
```

```go
type NewUserPayload struct {
	Email    string `validate:"required,email"`
	Password PasswordConfirmation
}

func NewUser(
	ctx context.Context,
	data NewUserPayload,
	dbtx db.DBTX,
) (User, error) {
	if err := validate.Struct(data); err != nil {
		return User{}, errors.Join(ErrDomainValidation, err)
	}
    
    now := time.Now()

	usr := User{
		ID:        uuid.New(),
		CreatedAt: now,
		UpdatedAt: now,
		Email:     data.Email,
        VerifiedAt: now,
	}

	hashedPassword, err := HashAndPepperPassword(data.Password.Password)
	if err != nil {
		return User{}, err
	}

	usr.HashedPassword = hashedPassword

	_, err = db.Stmts.InsertUser(ctx, dbtx, db.InsertUserParams{
		ID:        usr.ID,
		CreatedAt: pgtype.Timestamptz{Time: usr.CreatedAt, Valid: true},
		UpdatedAt: pgtype.Timestamptz{Time: usr.UpdatedAt, Valid: true},
		Email:     usr.Email,
		Password:  usr.HashedPassword,
	})
	if err != nil {
		return User{}, err
	}

	return usr, nil
}
```
---

```sh
go get github.com/go-playground/validator/v10
```

```go
//models/validator.go
var validate = setupValidator()

func setupValidator() *validator.Validate {
	v := validator.New(validator.WithRequiredStructEnabled())

	v.RegisterStructValidation(validatePasswordsMatch, PasswordConfirmation{})

	return v
}

func validatePasswordsMatch(sl validator.StructLevel) {
	pwPair := sl.Current().Interface().(PasswordConfirmation)

	if pwPair.Password != pwPair.ConfirmPassword {
		sl.ReportError(
			pwPair.Password,
			"Password",
			"Password",
			"must match confirm password",
			"",
		)
		sl.ReportError(
			pwPair.Password,
			"ConfirmPassword",
			"ConfirmPassword",
			"must match password",
			"",
		)
	}
}
```

## Episode 6

**Title**: Authenticating users

Bullet points:
- login form
- secure cookies
- two endpoints (serve login page and create authenticated session)

### Episode 6 Script

Intro
---

WHAT:
- explain csrf (Cross-Site Request Forgery) token
- explain htmx

```templ
templ Login() {
	@base() {
		<div
			class="h-full flex-1 bg-base-100 container mx-auto flex flex-col justify-center items-center"
		>
			<form
				class="border rounded px-2 md:px-10 bg-base-200 flex flex-col"
			>
				<h1
					class="text-2xl text-white font-bold mt-4 md:mt-10 mb-6"
				>Login</h1>
				<span
					class="text-white mb-1 font-semibold"
				>Email</span>
				<input
					name="email"
					required
					placeholder="Your email here"
					type="email"
					class="px-2 py-1 border rounded mb-4 w-80"
				/>
				<span
					class="text-white mb-1 font-semibold"
				>Password</span>
				<input
					name="password"
					required
					placeholder="Your password here"
					type="password"
					class="px-2 py-1 border rounded mb-4 w-80"
				/>
				<button
					type="submit"
					class="px-4 py-2 border border-black rounded bg-primary hover:bg-primary/80 mb-4 md:mb-10"
				>Login</button>
			</form>
		</div>
	}
}
```

```templ
--> input arg=csrfToken string

<input
	type="hidden"
	name="gorilla.csrf.Token"
	value={ csrfToken }
/>
```

```templ
<div class="mb-4" id="loginResponse"></div>
```

```templ
hx-target="#loginResponse"
hx-swap="innerHTML"
hx-post="/login"
```

```templ
templ LoginFailureFragment() {
	<p class="text-warning">Could not validate your credentials.</p>
}
```

```templ
templ LoginSuccessFragment() {
	<div class="flex flex-col items-center">
		<p
			class="text-success mb-2"
		>
			You've been authenticated.
		</p>
		<a href="/dashboard" class="text-white hover:text-white/50 hover:underline">Go to dashboard</a>
	</div>
}
```
---

WHAT:
- we only update the ui with the fragment

```go
func (c Controller) SessionNew(ctx echo.Context) error {
	return views.Login("PLACEHOLDER").
		Render(ctx.Request().Context(), ctx.Response())
}
```

```go
// routes/routes.go
	e.GET("/login", func(c echo.Context) error {
		return r.ctrl.SessionNew(c)
	})
```

add script -> go to htmx and grap min ver -> add to static assets
```templ
<script src="/static/js/htmx.min.js"></script>
```
---

WHAT:
- setup handler
- show success/failure
- setup logic to create user

```go
func (c Controller) SessionCreate(ctx echo.Context) error {
	type sessionCreatePayload struct {
		Email    string `form:"email"`
		Password string `form:"password"`
	}

	var payload sessionCreatePayload
	if err := ctx.Bind(&payload); err != nil {
		return views.LoginFailureFragment().
			Render(ctx.Request().Context(), ctx.Response())
	}

	user, err := models.GetUserByEmail(
		ctx.Request().Context(),
		c.db.Pool,
		payload.Email,
	)
	if err != nil {
		return views.LoginFailureFragment().
			Render(ctx.Request().Context(), ctx.Response())
	}

	if err := user.ValidatePassword(payload.Password); err != nil {
		return views.LoginFailureFragment().
			Render(ctx.Request().Context(), ctx.Response())
	}

	return views.LoginSuccessFragment().
		Render(ctx.Request().Context(), ctx.Response())
}
```

```go
// routes/routes.go
	e.POST("/login", func(c echo.Context) error {
		return r.ctrl.SessionCreate(c)
	})
```

```sh
export PASSWORD_PEPPER=random-string
```

```go
func main() {
	ctx := context.Background()
	pool, err := psql.CreatePooledConnection(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	admin, err := models.NewUser(ctx, pool, models.NewUserPayload{
		Email: "admin@golangblogcourse.com",
		Password: models.PasswordConfirmation{
			Password:        "password",
			ConfirmPassword: "password",
		},
	})
	if err != nil {
		panic(err)
	}

	slog.Info("Created admin user", "email", admin.Email)
}
```
---

WHAT:
- setup secure cookies
- login and show cookie

```sh
go get github.com/gorilla/sessions
go get github.com/labstack/echo-contrib/session
```

```go
const (
	authSessionCookie = "ua"
	SessIsAuthName    = "is_authenticated"
	SessUserID        = "user_id"
	SessUserEmail     = "user_email"
	oneWeekInSeconds  = 604800
)
```

```go
func createAuthSession(
	c echo.Context,
	extend bool,
	user models.User,
) error {
	sess, err := session.Get(authSessionCookie, c)
	if err != nil {
		return err
	}

	maxAge := oneWeekInSeconds
	if extend {
		maxAge = oneWeekInSeconds * 2
	}

	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   maxAge,
		HttpOnly: true,
	}

	sess.Values[SessIsAuthName] = true
	sess.Values[SessUserID] = user.ID
	sess.Values[SessUserEmail] = user.Email

	if err := sess.Save(c.Request(), c.Response()); err != nil {
		return err
	}

	return nil
}
```

```go
// add to SessionCreate
	if err := createAuthSession(ctx, false, user); err != nil {
		return views.LoginFailureFragment().
			Render(ctx.Request().Context(), ctx.Response())
	}
```

```go
// routes/routes.go
	e.Use(
		session.Middleware(
			sessions.NewCookieStore(
				[]byte(os.Getenv("SESSION_AUTH_KEY")),
				[]byte(os.Getenv("SESSION_ENC_KEY")),
			),
		),
	)
```

```sh
export SESSION_AUTH_KEY=7RtmbQNbWJ
export SESSION_ENC_KEY=suzwJjP40yVKd1xj
```

---

WHAT:
- setup csrf token
- update form with csrf token

```sh
export CSRF_TOKEN_KEY=enc_key

go get github.com/gorilla/csrf
```

```go
// server/server.go
func (s Server) Start(ctx context.Context) {
	srv := &http.Server{
		Addr: fmt.Sprintf("%v:%v", s.host, s.port),
		Handler: func(handler http.Handler) http.Handler {
			return http.HandlerFunc(
				func(w http.ResponseWriter, r *http.Request) {
					if strings.HasPrefix(r.URL.Path, "/dashboard") {

						handler.ServeHTTP(w, r)
						return
					}
					csrf.Protect(
						[]byte(
							os.Getenv("CSRF_TOKEN_KEY"),
						),
						csrf.Secure(false), // changed when we go to prod
						csrf.Path("/"),
					)(handler).ServeHTTP(w, r)
				},
			)
		}(s.routes),
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 5 * time.Second,
		BaseContext:  func(_ net.Listener) context.Context { return ctx },
	}

	slog.Info("starting the server", "host", s.host, "port", s.port)
	if err := srv.ListenAndServe(); err != nil {
		panic(err)
	}
}
```

```go
//main.go
func main() {
	ctx := context.Background()

	needed for secure cookies --> gob.Register(uuid.UUID{})

	pool, err := psql.CreatePooledConnection(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	if err := migrateDB(ctx, pool); err != nil {
		panic(err)
	}

	psql := psql.NewPostgres(pool)
	controller := controllers.New(psql)

	routes := routes.NewRoutes(controller)
	srv := server.NewServer("0.0.0.0", 8080, routes.Load())

	--> srv.Start(ctx)
}
```


```go
func (c Controller) SessionNew(ctx echo.Context) error {
	return views.Login(csrf.Token(ctx.Request())).
		Render(ctx.Request().Context(), ctx.Response())
}
```
---

WHAT:
- setup dashboard home
- add middleware
- split routes (app & dashboard)
- show dashboard

```templ
// views/dashboard_base.templ
<script src="/static/js/htmx.min.js"></script>
```

```templ
templ DashboardHome() {
	@dashboardBase() {
		<div class="h-full flex-1 bg-base-100 container mx-auto flex flex-col items-center">
			<h1 class="mt-10 text-2xl text-white font-bold">Dashboard</h1>
		</div>
	}
}
```

```go
func (r Routes) loadApp(e *echo.Echo) *echo.Echo {
	// setup routes for different pages
	e.GET("", func(c echo.Context) error {
		return r.ctrl.Home(c)
	})

	e.GET("/articles/:slug", func(c echo.Context) error {
		return r.ctrl.Article(c)
	})

	e.GET("/about", func(c echo.Context) error {
		return r.ctrl.About(c)
	})

	e.GET("/login", func(c echo.Context) error {
		return r.ctrl.SessionNew(c)
	})
	e.POST("/login", func(c echo.Context) error {
		return r.ctrl.SessionCreate(c)
	})

	e.GET("*", func(c echo.Context) error {
		return views.ErrorPage(views.WithErrPageTitle("Oops!"), views.WithErrPageMsg("We could not find the page you're looking for.")).
			Render(c.Request().Context(), c.Response())
	})

	return e
}
```

```go
func AuthOnly(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, err := session.Get(authSessionCookie, c)
		if err != nil {
			return next(c)
		}

		isAuth, _ := sess.Values[SessIsAuthName].(bool)
		if isAuth {
			return next(c)
		}

		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}
}
```

```go
func (r Routes) loadDashboard(e *echo.Echo) *echo.Echo {
	dashboardGroup := e.Group("/dashboard", controllers.AuthOnly)

	dashboardGroup.GET("", func(c echo.Context) error {
		return r.ctrl.DashboardHome(c)
	})

	return e
}
```

```go
func (r Routes) Load() *echo.Echo {
	e := r.loadApp(r.e)
	return r.loadDashboard(e)
}
```
---

## Episode 7

**Title**: Remember me/Forget me

Bullet points:
- implement remember me
- implement forget me

### Episode 7 Script

```html
<span class="flex justify-between mt-4 mb-2">
	<p class="text-white">Remember me</p>
	<input
		name="remember_me"
		type="checkbox"
	/>
</span>
```

```go
func (c Controller) SessionCreate(ctx echo.Context) error {
	type sessionCreatePayload struct {
		Email      string `form:"email"`
		Password   string `form:"password"`
	--> RememberMe string `form:"remember_me"`
	}

	var payload sessionCreatePayload
	if err := ctx.Bind(&payload); err != nil {
		return views.LoginFailureFragment().
			Render(renderArgs(ctx))
	}

    --> rememberMe := payload.RememberMe == "on"

	user, err := models.GetUserByEmail(
		ctx.Request().Context(),
		c.db.Pool,
		payload.Email,
	)
	if err != nil {
		return views.LoginFailureFragment().
			Render(renderArgs(ctx))
	}

	if err := user.ValidatePassword(payload.Password); err != nil {
		return views.LoginFailureFragment().
			Render(renderArgs(ctx))
	}

	if err := createAuthSession(ctx, user, --> rememberMe); err != nil {
		return views.LoginFailureFragment().
			Render(renderArgs(ctx))
	}

	return views.LoginSuccessFragment().
		Render(renderArgs(ctx))
}
```

```go
func createAuthSession(
	ctx echo.Context,
	user models.User,
	--> extendSession bool,
) error {
	s, err := session.Get(authSessionName, ctx)
	if err != nil {
		return err
	}

	--> maxAge := 604800
	--> if extendSession {
	--> 	maxAge = maxAge * 2
	--> }

	s.Options = &sessions.Options{
		Path:     "/",
		--> MaxAge:   maxAge,
		HttpOnly: true,
	}

	s.Values[authUserID] = user.ID
	s.Values[authUserEmail] = user.Email
	s.Values[authIsAthenticated] = true

	return s.Save(ctx.Request(), ctx.Response())
}
```
---

Create `views/contexts`

```go
// views/contexts/app.go
package contexts

import (
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type AppKey struct{}

func (AppKey) String() string {
	return ""
}

type App struct {
	echo.Context
	UserID          uuid.UUID
	IsAuthenticated bool
}
```

```go
// views/contexts/context.go
package contexts

import "context"

func ExtractApp(ctx context.Context) App {
	appCtx, ok := ctx.Value(AppKey{}).(App)
	if !ok {
		return App{}
	}

	return appCtx
}
```

```go
// controllers/controller.go
func setAppCtx(ctx echo.Context) context.Context {
	appcKey := contexts.AppKey{}
	appc := ctx.Get(appcKey.String())

	return context.WithValue(
		ctx.Request().Context(),
		appcKey,
		appc,
	)
}
```

```go
// controllers/controller.go
func renderArgs(ctx echo.Context) (context.Context, io.Writer) {
	return setAppCtx(ctx), ctx.Response().Writer
}
```
---

```go
// controllers/controller.go
func RegisterAppContext(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if strings.HasPrefix(c.Request().URL.Path, "/static") {
			return next(c)
		}

		s, err := session.Get(authSessionName, c)
		if err != nil {
			return next(c)
		}

		isAuthenticated, _ := s.Values[authIsAthenticated].(bool)
		userID, _ := s.Values[authUserID].(uuid.UUID)

		appContext := contexts.App{
			Context:         c,
			IsAuthenticated: isAuthenticated,
			UserID:          userID,
		}

		c.Set(contexts.AppKey{}.String(), appContext)

		return next(c)
	}
}
```

```go
// routes/routes.go
func NewRoutes(ctrl controllers.Controller) Routes {
	e := echo.New()

	e.Use(
		session.Middleware(
			sessions.NewCookieStore(
				[]byte(os.Getenv("SESSION_AUTH_KEY")),
				[]byte(os.Getenv("SESSION_ENC_KEY")),
			),
		),
		--> controllers.RegisterAppContext,
	)

	echo.MustSubFS(static.Files, "static")
	e.StaticFS("/static/", static.Files)

	return Routes{e, ctrl}
}
```

```templ

templ navElement(link, name string) {
    <a 
        class="font-semibold text-sm text-base-content mx-2 hover:text-base-content/70 hover:underline cursor-pointer" 
        href={templ.SafeURL(link)}
    >
        {name}
    </a>
}
```

```templ
templ navigation() {
	<header class="flex bg-base-300 w-full">
		<div class="bg-base-100 container mx-auto flex justify-center">
			<nav --> id="navBar"class="mt-6 p-2 rounded border border-base-content bg-base-300 w-fit">
                --> @navElement("/", "Home")
                --> @navElement("/articles", "Articles")
                --> @navElement("/about", "About")
		        --> if contexts.ExtractApp(ctx).IsAuthenticated {
                -->     @navElement("/logout", "Logout")
                --> }
			</nav>
		</div>
	</header>
}
```

```templ
// views/login.templ
templ LoginSuccessFragment() {
	<div class="flex flex-col items-center">
		<p
			class="text-success mb-2"
		>
			You've been authenticated.
		</p>
		<a href="/dashboard" class="text-white hover:text-white/50 hover:underline">Go to dashboard</a>
	</div>
    <div hx-swap-oob="beforeend:#navBar">
        @navElement("/logout", "Logout", nil)
    </div>
}
```
---

```go
// controllers/controller
func deleteAuthSession(ctx echo.Context) error {
	s, err := session.Get(authSessionName, ctx)
	if err != nil {
		return err
	}

	s.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
	}

	s.Values[authIsAthenticated] = false

	return s.Save(ctx.Request(), ctx.Response())
}
```

```go
// controllers/controller
func (c Controller) SessionDestroy(ctx echo.Context) error {
	if err := deleteAuthSession(ctx); err != nil {
		return views.LoginFailureFragment().
			Render(renderArgs(ctx))
	}

	return ctx.Redirect(http.StatusPermanentRedirect, "/")
}
```

```go
// routes/routes.go
func (r Routes) loadApp(e *echo.Echo) *echo.Echo {
	// setup routes for different pages
	r.e.GET("", func(c echo.Context) error {
		return r.ctrl.Home(c)
	})

	r.e.GET("/articles/:slug", func(c echo.Context) error {
		return r.ctrl.Article(c)
	})

	r.e.GET("/about", func(c echo.Context) error {
		return r.ctrl.About(c)
	})

	r.e.GET("/login", func(c echo.Context) error {
		return r.ctrl.SessionNew(c)
	})
	r.e.POST("/login", func(c echo.Context) error {
		return r.ctrl.SessionCreate(c)
	})

	--> r.e.GET("/logout", func(c echo.Context) error {
	--> 	return r.ctrl.SessionDestroy(c)
	--> })

	r.e.GET("*", func(c echo.Context) error {
		return views.ErrorPage(views.WithErrPageTitle("Oops!"), views.WithErrPageMsg("We could not find the page you're looking for.")).
			Render(c.Request().Context(), c.Response())
	})

	return r.e
}
```
---

## Episode 8

**Title**: Managing the blog using hypermedia api

### Episode 8 Script

```templ
// views/dashboard_base.templ
templ dashboardNavigation() {
	<header class="flex bg-base-300 w-full">
		<div class="bg-base-100 container mx-auto flex justify-center">
			<nav class="mt-6 p-2 rounded border border-base-content bg-base-300 w-fit">
				@navElement("/dashboard", "Home")
				@navElement("/dashboard/subscribers", "Subscribers")
				@navElement("/dashboard/newsletters", "Newsletters")
				@navElement("/logout", "Logout")
			</nav>
		</div>
	</header>
}
```

```templ
// views/dashboard_home.templ
templ stat(count int, statName string) {
	<div class="w-44 bg-base-200 border rounded flex flex-col items-center mx-10 p-4">
		<span class="text-lg text-white">{ strconv.Itoa(count) }</span>
		<p class="font-bold text-white text-sm">{ statName }</p>
	</div>
}
```

```templ
// views/dashboard_home.templ
templ DashboardHome() {
	@dashboardBase() {
		<div class="h-full flex-1 bg-base-100 container mx-auto flex flex-col items-center">
			<div class="w-fit flex mt-16">
				@stat(13, "New Subs")
				@stat(153, "Verified Subs")
				@stat(166, "Total Subs")
            </div>
		</div>
	}
}
```
---

```templ
// views/dashboard_home.templ
templ substable() {
	<div class="flex flex-col justify-between h-96">
		<h2 class="mb-4 text-lg text-white">Latest Subscribers</h2>
		<div class="bg-base-200 overflow-y-auto w-96 min-h-full max-h-96">
			<table class="text-white table-auto table-fixed w-full">
				<thead class="h-12 bg-base-300">
					<tr class="h-12">
						<th class="text-start pl-4">Email</th>
						<th class="text-end pr-4">Subscribed At</th>
					</tr>
				</thead>
				<tbody class="bg-base-300/10 align-top">
					<tr class="h-10 align-middle">
						<td class="pl-4">marcus@golangblogcourse.com</td>
						<td class="text-end pr-4">21-11-2024</td>
					</tr>
					<tr class="h-10 align-middle">
						<td class="pl-4">peter@golangblogcourse.com</td>
						<td class="text-end pr-4">11-01-2025</td>
					</tr>
					<tr class="h-10 align-middle">
						<td class="pl-4">carla@golangblogcourse.com</td>
						<td class="text-end pr-4">03-01-2025</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
}
```

```templ
// views/dashboard_home.templ
templ articlesTable() {
	<div id="articlesTableContainer" class="flex flex-col mr-10 h-96">
		<div class="flex justify-between">
			<h2 class="text-lg text-white">Latest Articles</h2>
			<a
				href="/dashboard/articles/new"
				class="text-sm mb-2 px-4 py-2 text-white rounded bg-base-300 cursor-pointer hover:bg-base-300/50 hover:font-semibold"
			>
				New Article
			</a>
		</div>
		<div class="bg-base-200 overflow-y-auto flex-1 min-h-full max-h-96">
			<table class="text-white table-auto table-fixed w-full">
				<thead class="h-12 bg-base-300">
					<tr class="h-12">
						<th class="text-start pl-4 w-1/3">Title</th>
						<th class="text-center">Status</th>
						<th class="text-center">Created at</th>
						<th class="text-center">Updated at</th>
						<th class="text-end pr-4"></th>
					</tr>
				</thead>
				<tbody class="bg-base-300/10 align-top">
					<tr class="h-10 align-middle">
						<td class="text-start pl-4">Placeholder Article</td>
						<td class={ "text-center", templ.KV("text-success", false), templ.KV("text-info", true) }>
							if false {
								Released
							}
							if true {
								Draft
							}
						</td>
						<td class="text-center">{ time.Now().CreatedAt.Format("2006-01-02") }</td>
						<td class="text-center">{ time.Now().UpdatedAt.Format("2006-01-02") }</td>
						<td class="text-end pr-4">
							<a
								class="text-sm px-2 py-1 text-white rounded bg-secondary cursor hover:bg-secondary/70"
								href={ templ.SafeURL(fmt.Sprintf("/dashboard/articles/%v/edit", uuid.New())) }
							>Edit</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
}
```

```templ
// views/dashboard_home.templ
templ DashboardHome() {
	@dashboardBase() {
		<div class="h-full flex-1 bg-base-100 container mx-auto flex flex-col items-center">
			<div class="w-fit flex mt-16">
				@stat(13, "New Subs")
				@stat(153, "Verified Subs")
				@stat(166, "Total Subs")
			</div>
			<div class="mt-24 h-96 w-4/5 mx-auto flex justify-around">
				--> @articlesTable()
				--> @substable()
			</div>
		</div>
	}
}
```
---

```sql
-- name: QueryArticlesPage :many
select 
	*
from articles
order by created_at desc
limit $1 offset $2;

-- name: QueryArticlesCount :one
select count(*) from articles;
```

```go
type PaginatedArticles struct {
	Articles []Article
	Total    int64
	Page     int32
	PageSize int32
}

func GetArticlesPage(
	ctx context.Context,
	dbtx db.DBTX,
	page int32,
	pageSize int32,
) (PaginatedArticles, error) {
	total, err := db.Stmts.QueryArticlesCount(ctx, dbtx)
	if err != nil {
		return PaginatedArticles{}, err
	}

	offset := (page - 1) * pageSize
	dbArticles, err := db.Stmts.QueryArticlesPage(
		ctx,
		dbtx,
		db.QueryArticlesPageParams{
			Limit:  pageSize,
			Offset: offset,
		},
	)
	if err != nil {
		return PaginatedArticles{}, err
	}

	articles := make([]Article, len(dbArticles))
	for i, dbSub := range dbArticles {
		articles[i] = Article{
			ID:         dbSub.ID,
			CreatedAt:  dbSub.CreatedAt.Time,
			UpdatedAt:  dbSub.UpdatedAt.Time,
			Title:      dbSub.Title,
			Filename:   dbSub.Filename,
			Slug:       dbSub.Slug,
			Excerpt:    dbSub.Excerpt,
			Draft:      dbSub.Draft,
			ReleasedAt: dbSub.ReleasedAt.Time,
			ReadTime:   dbSub.ReadTime.Int32,
		}
	}

	return PaginatedArticles{
		Articles: articles,
		Total:    total,
		Page:     page,
		PageSize: pageSize,
	}, nil
}
```
---

```templ
// views/dashboard_home.templ
type PostsTableProps struct {
	Articles         []models.Article
	CurrentPage      int64
	TotalPages       int64
	NextPageLink     string
	PreviousPageLink string
}

templ Poststable(props PostsTableProps) {
    // omitted
    for _, article := range props.Articles {
    	<tr class="h-10 align-middle">
    		<td class="text-start pl-4">{ article.Title }</td>
    		<td class={ "text-center", templ.KV("text-success", !article.ReleasedAt.IsZero()), templ.KV("text-info", article.ReleasedAt.IsZero()) }>
    			if !article.ReleasedAt.IsZero() {
    				Released
    			}
    			if article.ReleasedAt.IsZero() {
    				Draft
    			}
    		</td>
    		<td class="text-center">{ article.CreatedAt.Format("2006-01-02") }</td>
    		<td class="text-center">{ article.UpdatedAt.Format("2006-01-02") }</td>
    		<td class="text-end pr-4">
    			<a
    				class="text-sm px-2 py-1 text-white rounded bg-secondary cursor hover:bg-secondary/70"
    				href={ templ.SafeURL(fmt.Sprintf("/dashboard/articles/%v/edit", article.ID)) }
    			>Edit</a>
    		</td>
    	</tr>
    }
}
```

```templ
// views/dashboard_home.templ
	<div class="flex mt-4">
		<button
			hx-get={ props.PreviousPageLink }
			hx-swap="outerHTML"
			hx-target="#postsTableContainer"
			class={ "rounded cursor-pointer text-sm px-2 py-1 text-base-content hover:text-white bg-base-300 hover:bg-base-300/70", templ.KV("cursor-not-allowed opacity-50", props.TotalPages == 1 || props.CurrentPage == 1) }
			type="submit"
			if props.TotalPages == 1 || props.CurrentPage == 1 {
				disabled
			}
		>
			Previous
		</button>
		<button
			hx-get={ props.NextPageLink }
			hx-swap="outerHTML"
			hx-target="#postsTableContainer"
			class={ "rounded cursor-pointer ml-4 text-sm px-2 py-1 text-base-content hover:text-white bg-base-300 hover:bg-base-300/70", templ.KV("cursor-not-allowed opacity-50", props.TotalPages == props.CurrentPage) }
			if props.TotalPages == props.CurrentPage {
				disabled
			}
		>
			Next
		</button>
	</div>
```

```templ
type DashboardHomeProps struct {
	PostsTableProps PostsTableProps
}

templ DashboardHome(props DashboardHomeProps) {
    // omitted
}
```
---

```go
// controllers/controller.go
func (c Controller) DashboardHome(ctx echo.Context) error {
	const pageSize int64 = 10

	paginatedArticles, err := models.GetArticlesPage(
		ctx.Request().Context(),
		c.db.Pool,
		1,
		int32(pageSize),
	)
	if err != nil {
		slog.Error("could not get articles", "error", err.Error())
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	totalPages := max(1, (paginatedArticles.Total+pageSize-1)/pageSize)

	var nextPageLink string
	if totalPages > 1 {
		nextPageLink = "/fragments/dashboard/articles-table?page=2"
	}

	return views.DashboardHome(views.DashboardHomeProps{
		PostsTableProps: views.PostsTableProps{
			Articles:         paginatedArticles.Articles,
			CurrentPage:      1,
			TotalPages:       totalPages,
			NextPageLink:     nextPageLink,
			PreviousPageLink: "",
		},
	}).Render(renderArgs(ctx))
}
```

```go
// controllers/fragment.go
func (c Controller) ArticlesTableFragment(ctx echo.Context) error {
	const pageSize int64 = 10

	page, err := strconv.Atoi(ctx.QueryParam("page"))
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	if page == 0 {
		page = 1
	}

	paginatedArticles, err := models.GetArticlesPage(
		ctx.Request().Context(),
		c.db.Pool,
		int32(page),
		int32(pageSize),
	)
	if err != nil {
		slog.Error("could not get articles", "error", err.Error())
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	totalPages := max(1, (paginatedArticles.Total+pageSize-1)/pageSize)

	var nextPageLink string
	if totalPages > 1 {
		nextPageLink = "/fragments/dashboard/articles-table?page=2"
	}

	var previousPageLink string
	if page >= 2 {
		previousPageLink = fmt.Sprintf(
			"/fragments/dashboard/articles-table?page=%v",
			page-1,
		)
	}

	return views.Poststable(views.PostsTableProps{
		Articles:         paginatedArticles.Articles,
		CurrentPage:      int64(page),
		TotalPages:       totalPages,
		NextPageLink:     nextPageLink,
		PreviousPageLink: previousPageLink,
	}).
		Render(renderArgs(ctx))
}
```

```go
// routes/routes.go
func (r Routes) loadFragments(e *echo.Echo) *echo.Echo {
	fragmentsGroup := e.Group("/fragments")

	fragmentsGroup.GET("/dashboard/articles-table", func(c echo.Context) error {
		return r.ctrl.ArticlesTableFragment(c)
	}, controllers.AuthOnly)

	return e
}
```

```go
// routes/routes.go
func (r Routes) Load() *echo.Echo {
	e := r.loadApp()
	--> e = r.loadFragments(e)
	return r.loadDashboard(e)
}
```
---

## Episode 9

**Title**: implementing crud for articles

Might be a split into 2 episodes

### Episode 9 Script

```templ
// views/dashboard_article_new.templ
templ DashboardArticleNew() {
	@dashboardBase() {
		<div class="flex-1 bg-base-100 mx-auto container flex flex-col justify-center">
			<h1 class="mb-5 mx-auto text-xl text-white font-bold">New Article</h1>
		</div>
	}
}
```

```templ
// views/dashboard_article_new.templ
templ NewArticleForm(embeddedFiles []string) {
	<form
		hx-target="this"
		hx-swap="outerHTML"
		hx-post="/dashboard/articles"
		class="bg-base-300 p-4 w-96 mx-auto border rounded"
	>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Title
			</label>
			<input
				name="title"
				required
				placeholder="Article title here"
				type="text"
				class="bg-base-200 text-base-content px-2 py-1 border rounded mb-4"
			/>
		</span>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Filename
			</label>
			<select
				name="filename"
				class="bg-base-200 text-base-content px-2 py-1 border rounded mb-4"
			>
				<option value="">Select associated file</option>
				for _, file := range embeddedFiles {
					<option
						value={ file }
					>{ file }</option>
				}
			</select>
		</span>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Excerpt
			</label>
			<textarea
				name="excerpt"
				required
				placeholder="Article excerpt here"
				type="text"
				minlength="100"
				maxlength="160"
				class="bg-base-200 text-base-content px-2 py-1 border rounded mb-4"
			></textarea>
		</span>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Read time
			</label>
			<input
				name="read_time"
				required
				placeholder="Approx. read time"
				type="number"
				class="bg-base-200 text-base-content px-2 py-1 border rounded mb-4"
			/>
		</span>
		<span class="w-full flex justify-between">
			<span
				class="flex-1 text-white font-semibold"
			>
				Release
			</span>
			<input
				name="email"
				type="checkbox"
				class="bg-base-200 text-base-content px-2 py-1 border rounded mb-4"
			/>
		</span>
		<button
			class="w-full mt-8 px-2 py-1 font-bold border rounded text-white bg-base-200 hover:bg-base-100"
		>
			Submit
		</button>
	</form>
}
```

```templ
// views/dashboard_article_new.templ
type DashboardArticleNewProps struct {
    EmbeddedFiles []string
}

templ DashboardArticleNew(props DashboardArticleNewProps) {
	@dashboardBase() {
		<div class="flex-1 bg-base-100 mx-auto container flex flex-col justify-center">
			<h1 class="mb-5 mx-auto text-xl text-white font-bold">New Article</h1>
			@NewArticleForm()
		</div>
	}
}
```
---

```go
// controllers/controller.go
func (c Controller) DashboardArticlesNew(ctx echo.Context) error {
	embeddedArticles, err := articles.GetAll()
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	var articles []string
	for _, article := range embeddedArticles {
		articles = append(articles, article.Meta.Title)
	}

	return views.DashboardArticleNew(articles).
		Render(renderArgs(ctx))
}
```

```go
// routes/routes.go
func (r Routes) loadDashboard(e *echo.Echo) *echo.Echo {
	dashboardGroup := e.Group("/dashboard", controllers.AuthOnly)

	dashboardGroup.GET("", func(c echo.Context) error {
		return r.ctrl.DashboardHome(c)
	})

	--> dashboardGroup.GET("/articles/new", func(c echo.Context) error {
	--> 	return r.ctrl.DashboardArticlesNew(c)
	--> })

	return e
}
```
---

```go
// models/article.go
func NewArticle(
	ctx context.Context,
	dbtx db.DBTX,
	payload NewArticlePayload,
) (Article, error) {
	if payload.Title == "" {
		return Article{}, errors.Join(
			ErrInvalidPayload,
			ErrArticleTitleEmpty,
		)
	}
	if payload.Filename == "" && !payload.ReleasedAt.IsZero() {
		return Article{}, errors.Join(
			ErrInvalidPayload,
			ErrArticleFilenameEmpty,
		)
	}
	if len(payload.Excerpt) > 160 || len(payload.Excerpt) < 100 {
		return Article{}, errors.Join(
			ErrInvalidPayload,
			ErrArticleExcerptInsufficientLength,
		)
	}
    // omitted
}
```

```go
// controllers/controller.go
func (c Controller) DashboardArticlesCreate(ctx echo.Context) error {
	type newArticlePayload struct {
		Title    string `form:"title"`
		Filename string `form:"filename"`
		Excerpt  string `form:"excerpt"`
		ReadTime int64  `form:"read_time"`
		Release  string `form:"release"`
	}

	var payload newArticlePayload
	if err := ctx.Bind(&payload); err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	release := payload.Release == "on"
	var releasedAt time.Time
	if release {
		releasedAt = time.Now()
	}

	article, err := models.NewArticle(
		ctx.Request().Context(),
		c.db.Pool,
		models.NewArticlePayload{
			Title:      payload.Title,
			Filename:   payload.Filename,
			Excerpt:    payload.Excerpt,
			Draft:      !release,
			ReleasedAt: releasedAt,
			ReadTime:   int32(payload.ReadTime),
		},
	)
	if err != nil {
	    embeddedArticles, err := articles.GetAll()
	    if err != nil {
	    	return views.ErrorPage().Render(renderArgs(ctx))
	    }

	    var articles []string
	    for _, article := range embeddedArticles {
	    	articles = append(articles, article.Meta.Title)
	    }

		return views.NewArticleForm(articles).Render(renderArgs(ctx))
	}

	ctx.Response().
		Header().
		Set("HX-Redirect", fmt.Sprintf("/dashboard/articles/%v/edit", article.ID))
	ctx.Response().Writer.WriteHeader(http.StatusSeeOther)

	return nil
}
```

```go
// routes/routes.go
func (r Routes) loadDashboard(e *echo.Echo) *echo.Echo {
	dashboardGroup := e.Group("/dashboard", controllers.AuthOnly)

	dashboardGroup.GET("", func(c echo.Context) error {
		return r.ctrl.DashboardHome(c)
	})

	dashboardGroup.GET("/articles/new", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesNew(c)
	})
	--> dashboardGroup.POST("/articles", func(c echo.Context) error {
	--> 	return r.ctrl.DashboardArticlesCreate(c)
	--> })

	return e
}
```
---

```templ
// views/dashboard_article_edit.templ
templ DashboardArticleEdit() {
	@dashboardBase() {
		<div class="flex-1 bg-base-100 mx-auto container flex flex-col justify-center">
			<h1 class="mb-5 mx-auto text-xl text-white font-bold">Update Article</h1>
		</div>
	}
}
```

Copy/Paste NewArticleForm and make it into this:

```templ
// views/dashboard_article_edit.templ
type Field struct {
	Value  any
	Errors []string
}

type NewArticleFormProps struct {
	Fields    map[string]Field
	Filenames []string
}
```

```templ
// views/dashboard_article_edit.templ
templ ArticleForm(props ArticleFormProps, action map[string]string) {
	<form
		hx-target="this"
		hx-swap="outerHTML"
		if action["post"] != "" {
			hx-post={ action["post"] }
		}
		if action["update"] != "" {
			hx-put={ action["update"] }
		}
		class="bg-base-300 p-4 w-96 mx-auto border rounded"
	>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Title
			</label>
			<input
				name="title"
				required
				placeholder="Article title here"
				type="text"
				value={ props.Fields["title"].Value.(string) }
				class={ "bg-base-200 text-base-content px-2 py-1 border rounded mb-4", templ.KV("border-error mb-0", props.Fields["title"].Errors != nil) }
			/>
			if errors := props.Fields["title"].Errors; errors  != nil {
				<ul class="ml-4 list-disc text-error my-2">
					for _, err := range errors {
						<li>{ err }</li>
					}
				</ul>
			}
		</span>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Filename
			</label>
			<select
				name="filename"
				class={ "bg-base-200 text-base-content px-2 py-1 border rounded mb-4", templ.KV("border-error mb-0", props.Fields["filename"].Errors != nil) }
			>
				<option value="">Select associated file</option>
				for _, file := range props.Filenames {
					<option
						value={ file }
						if file == props.Fields["filename"].Value.(string) {
							selected
						}
					>{ file }</option>
				}
			</select>
			if errors := props.Fields["filename"].Errors; errors  != nil {
				<ul class="ml-4 list-disc text-error my-2">
					for _, err := range errors {
						<li>{ err }</li>
					}
				</ul>
			}
		</span>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Excerpt
			</label>
			<textarea
				name="excerpt"
				required
				placeholder="Article excerpt here"
				type="text"
				minlength="100"
				maxlength="160"
				class={ "bg-base-200 text-base-content px-2 py-1 border rounded mb-4", templ.KV("border-error mb-0", props.Fields["excerpt"].Errors != nil) }
			>
				{ props.Fields["excerpt"].Value.(string) }
			</textarea>
			if errors := props.Fields["excerpt"].Errors; errors  != nil {
				<ul class="ml-4 list-disc text-error my-2">
					for _, err := range errors {
						<li>{ err }</li>
					}
				</ul>
			}
		</span>
		<span class="flex flex-col">
			<label
				class="text-white mb-1 font-semibold"
			>
				Read time
			</label>
			<input
				name="read_time"
				required
				value={ props.Fields["read_time"].Value.(string) }
				placeholder="Approx. read time"
				type="number"
				class={ "bg-base-200 text-base-content px-2 py-1 border rounded mb-4", templ.KV("border-error mb-0", props.Fields["read_time"].Errors != nil) }
			/>
			if errors := props.Fields["read_time"].Errors; errors  != nil {
				<ul class="ml-4 list-disc text-error my-2">
					for _, err := range errors {
						<li>{ err }</li>
					}
				</ul>
			}
		</span>
		<span class="w-full flex justify-between">
			<span
				class="flex-1 text-white font-semibold"
			>
				Release
			</span>
			<input
				name="release"
				type="checkbox"
				if  props.Fields["release"].Value.(bool) {
					checked="checked"
				}
				class="px-2 py-1 border rounded"
				class={ "bg-base-200 text-base-content px-2 py-1 border rounded mb-4", templ.KV("border-error mb-0", props.Fields["release"].Errors != nil) }
			/>
			if errors := props.Fields["release"].Errors; errors  != nil {
				<ul class="ml-4 list-disc text-error my-2">
					for _, err := range errors {
						<li>{ err }</li>
					}
				</ul>
			}
		</span>
		<div class="flex justify-between">
			<button
				class="w-full mt-8 px-2 py-1 font-bold border rounded text-white bg-base-200 hover:bg-base-100"
			>
				Submit
			</button>
		</div>
	</form>
}
```

```templ
// views/dashboard_article_edit.templ
type DashboardArticleEditProps struct {
	FormProps ArticleFormProps
	Action    map[string]string
}

templ DashboardArticleEdit(props DashboardArticleEditProps) {
	@dashboardBase() {
		<div class="flex-1 bg-base-100 mx-auto container flex flex-col justify-center">
			<h1 class="mb-5 mx-auto text-xl text-white font-bold">Update Article</h1>
			@ArticleForm(props.FormProps, props.Action)
		</div>
	}
}
```
---

```go
// controllers/controller.go
func (c Controller) DashboardArticlesEdit(ctx echo.Context) error {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	article, err := models.GetArticle(ctx.Request().Context(), c.db.Pool, id)
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	embeddedArticles, err := articles.GetAll()
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	var embeddedArticleNames []string
	for _, embeddedArticle := range embeddedArticles {
		embeddedArticleNames = append(
			embeddedArticleNames,
			embeddedArticle.Meta.Title,
		)
	}

	return views.DashboardArticleEdit(
		views.DashboardArticleEditProps{
			FormProps: views.ArticleFormProps{
				Fields: map[string]views.Field{
					"title": {
						Value: article.Title,
					},
					"filename": {
						Value: article.Filename,
					},
					"excerpt": {
						Value: article.Excerpt,
					},
					"read_time": {
						Value: strconv.Itoa(int(article.ReadTime)),
					},
					"release": {
						Value: !article.ReleasedAt.IsZero(),
					},
				},
				Filenames: embeddedArticleNames,
			},
			Action: map[string]string{
				"update": fmt.Sprintf("/dashboard/articles/%v", article.ID),
			},
		},
	).
		Render(renderArgs(ctx))
}
```

```go
// routes/routes.go
func (r Routes) loadDashboard(e *echo.Echo) *echo.Echo {
	dashboardGroup := e.Group("/dashboard", controllers.AuthOnly)

	dashboardGroup.GET("", func(c echo.Context) error {
		return r.ctrl.DashboardHome(c)
	})

	dashboardGroup.GET("/articles/new", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesNew(c)
	})
	dashboardGroup.POST("/articles", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesCreate(c)
	})
	--> dashboardGroup.GET("/articles/:id/edit", func(c echo.Context) error {
	--> 	return r.ctrl.DashboardArticlesEdit(c)
	--> })

	return e
}
```

```go
// controllers/controller.go
func (c Controller) DashboardArticlesUpdate(ctx echo.Context) error {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	type updateArticlePayload struct {
		Title    string `form:"title"`
		Filename string `form:"filename"`
		Excerpt  string `form:"excerpt"`
		ReadTime int64  `form:"read_time"`
		Release  string `form:"release"`
	}

	var payload updateArticlePayload
	if err := ctx.Bind(&payload); err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	release := payload.Release == "on"
	var releasedAt time.Time
	if release {
		releasedAt = time.Now()
	}

	embeddedArticles, err := articles.GetAll()
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	var articles []string
	for _, article := range embeddedArticles {
		articles = append(articles, article.Meta.Title)
	}

	updatedArticle, err := models.UpdateArticle(
		ctx.Request().Context(),
		c.db.Pool,
		models.UpdateArticlePayload{
			ID:         id,
			Title:      payload.Title,
			Filename:   payload.Filename,
			Excerpt:    payload.Excerpt,
			Draft:      !release,
			ReleasedAt: releasedAt,
			ReadTime:   int32(payload.ReadTime),
		},
	)
	if err != nil {
		props := views.ArticleFormProps{
			Fields: map[string]views.Field{
				"title": {
					Value: payload.Title,
				},
				"filename": {
					Value: payload.Filename,
				},
				"excerpt": {
					Value: payload.Excerpt,
				},
				"read_time": {
					Value: strconv.Itoa(int(payload.ReadTime)),
				},
				"release": {
					Value: release,
				},
			},
			Filenames: articles,
		}

		if errors.Is(err, models.ErrArticleTitleEmpty) {
			field := props.Fields["title"]
			field.Errors = []string{
				models.ErrArticleTitleEmpty.Error(),
			}

			props.Fields["title"] = field
		}
		if errors.Is(err, models.ErrArticleFilenameEmpty) {
			field := props.Fields["filename"]
			field.Errors = []string{
				models.ErrArticleFilenameEmpty.Error(),
			}

			props.Fields["filename"] = field
		}
		if errors.Is(err, models.ErrArticleExcerptInsufficientLength) {
			field := props.Fields["excerpt"]
			field.Errors = []string{
				models.ErrArticleExcerptInsufficientLength.Error(),
			}

			props.Fields["excerpt"] = field
		}

		return views.ArticleForm(props, map[string]string{
			"update": fmt.Sprintf("/dashboard/articles/%v", id),
		}).
			Render(renderArgs(ctx))
	}

	return views.ArticleForm(views.ArticleFormProps{
		Fields: map[string]views.Field{
			"title": {
				Value: updatedArticle.Title,
			},
			"filename": {
				Value: updatedArticle.Filename,
			},
			"excerpt": {
				Value: updatedArticle.Excerpt,
			},
			"read_time": {
				Value: strconv.Itoa(int(updatedArticle.ReadTime)),
			},
			"release": {
				Value: !updatedArticle.ReleasedAt.IsZero(),
			},
		},
		Filenames: articles,
	}, map[string]string{
		"update": fmt.Sprintf("/dashboard/articles/%v", id),
	}).
		Render(renderArgs(ctx))
}
```

```go
// routes/routes.go
func (r Routes) loadDashboard(e *echo.Echo) *echo.Echo {
	dashboardGroup := e.Group("/dashboard", controllers.AuthOnly)

	dashboardGroup.GET("", func(c echo.Context) error {
		return r.ctrl.DashboardHome(c)
	})

	dashboardGroup.GET("/articles/new", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesNew(c)
	})
	dashboardGroup.POST("/articles", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesCreate(c)
	})
	dashboardGroup.GET("/articles/:id/edit", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesEdit(c)
	})
	--> dashboardGroup.PUT("/articles/:id", func(c echo.Context) error {
	--> 	return r.ctrl.DashboardArticlesUpdate(c)
	--> })

	return e
}
```
---

```go
// controllers/controller.go
func (c Controller) DashboardArticlesDelete(ctx echo.Context) error {
	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	if err := models.DeleteArticle(ctx.Request().Context(), c.db.Pool, id); err != nil {
		return views.ErrorPage().Render(renderArgs(ctx))
	}

	ctx.Response().
		Header().
		Set("HX-Redirect", "/dashboard")
	ctx.Response().Writer.WriteHeader(http.StatusSeeOther)

	return nil
}
```

```go
// routes/routes.go
func (r Routes) loadDashboard(e *echo.Echo) *echo.Echo {
	dashboardGroup := e.Group("/dashboard", controllers.AuthOnly)

	dashboardGroup.GET("", func(c echo.Context) error {
		return r.ctrl.DashboardHome(c)
	})

	dashboardGroup.GET("/articles/new", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesNew(c)
	})
	dashboardGroup.POST("/articles", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesCreate(c)
	})
	dashboardGroup.GET("/articles/:id/edit", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesEdit(c)
	})
	dashboardGroup.PUT("/articles/:id", func(c echo.Context) error {
		return r.ctrl.DashboardArticlesUpdate(c)
	})
	--> dashboardGroup.DELETE("/articles/:id", func(c echo.Context) error {
	--> 	return r.ctrl.DashboardArticlesDelete(c)
	--> })

	return e
}
```

```templ
templ ArticleForm(props ArticleFormProps, action map[string]string) {
    // omitted
	<div class="flex justify-between">
		<button
			class="w-full mt-8 px-2 py-1 font-bold border rounded text-white bg-base-200 hover:bg-base-100"
		>
			Submit
		</button>
		if action["update"] != "" {
			<button
				hx-delete={ action["update"] }
				class="ml-4 w-full mt-8 px-2 py-1 font-bold border border-bg-base-100 rounded text-warning-content bg-warning hover:bg-warning/70"
			>
				Delete
			</button>
		}
	</div>
    // omitted
}
```
---

REWORK NEW TO USE THE COMPONENT

---

## Episode 10

**Title**: Flashing ourselves/visual feedback

### Episode 10 Script

```go
// routes/contexts/toast.go
package contexts

import (
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type FlashKey struct{}

func (FlashKey) String() string {
	return "flash_key"
}

type FlashType string

const (
	FlashSuccess FlashType = "success"
	FlashError   FlashType = "error"
	FlashWarning FlashType = "warning"
	FlashInfo    FlashType = "info"
)

type FlashMessage struct {
	echo.Context
	ID        uuid.UUID
	Type      FlashType
	CreatedAt time.Time
	Message   string
}
```

```go
// controllers/controller.go
func RegisterFlashMessagesContext(
	next echo.HandlerFunc,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		if strings.HasPrefix(c.Request().URL.Path, "/static") {
			return next(c)
		}

		sess, err := session.Get(flashSessionKey, c)
		if err != nil {
			return err
		}

		flashMessages := []contexts.FlashMessage{}
		if flashes := sess.Flashes(flashSessionKey); len(
			flashes,
		) > 0 {
			for _, flash := range flashes {
				if msg, ok := flash.(contexts.FlashMessage); ok {
					flashMessages = append(
						flashMessages,
						contexts.FlashMessage{
							Context:   c,
							ID:        msg.ID,
							Type:      msg.Type,
							CreatedAt: msg.CreatedAt,
							Message:   msg.Message,
						},
					)
				}
			}

			if err := sess.Save(c.Request(), c.Response()); err != nil {
				return err
			}
		}

		c.Set(contexts.FlashKey{}.String(), flashMessages)

		return next(c)
	}
}
```

```go
func setAppCtx(ctx echo.Context) context.Context {
	appCtxKey := contexts.AppKey{}
	appCtx := ctx.Get(appCtxKey.String())

	--> withAppCtx := context.WithValue(
	--> 	ctx.Request().Context(),
	--> 	appCtxKey,
	--> 	appCtx,
	--> )

	--> flashCtxKey := contexts.FlashKey{}
	--> flashCtx := ctx.Get(flashCtxKey.String())

	--> return context.WithValue(
	--> 	withAppCtx,
	--> 	flashCtxKey,
	--> 	flashCtx,
	--> )
}
```
---

```go
// routes/contexts/context.go
func ExtractFlashMessages(ctx context.Context) []FlashMessage {
	value, ok := ctx.Value(FlashKey{}).([]FlashMessage)
	if !ok {
		return nil
	}

	return value
}
```

```templ
// views/toast_message.templ
templ toastBase(tType string, flash contexts.FlashMessage) {
	<div
		x-data="{ show: true }"
		x-show="show"
		x-transition:leave="transition ease-in duration-300"
		x-transition:leave-start="opacity-100 scale-100"
		x-transition:leave-end="opacity-0 scale-90"
		x-init="setTimeout(() => $el.remove(), 8000)"
		class="bg-base-300 rounded border border-white/50 flex flex-col w-72"
	>
		<div
			class="border-b-2 border-white/50 px-4 py-2 flex items-center justify-between"
		>
			<div
				class={ "rounded w-3 h-3", tType }
			></div>
			<div
				class="flex"
			>
				<p
					class="text-gray-400 text-sm"
				>{ carbon.CreateFromStdTime(flash.CreatedAt, carbon.Berlin).DiffForHumans() }</p>
				<button
					@click="show = false"
					class="ml-4 w-5 h-5 cursor-pointer"
					type="button"
				>
					<svg class="fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
						<path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
					</svg>
				</button>
			</div>
		</div>
		<span class="text-base-content max-h-40 p-4 text-wrap max-w-96 overflow-x-hidden overflow-y-auto">
			{ flash.Message }
		</span>
	</div>
}
```

```templ
// views/toast_message.templ
templ toastMessage(flash contexts.FlashMessage) {
	switch flash.Type {
		case contexts.FlashSuccess:
			@toastBase("bg-success", flash)
		case contexts.FlashInfo:
			@toastBase("bg-info", flash)
		case contexts.FlashError:
			@toastBase("bg-error", flash)
		case contexts.FlashWarning:
			@toastBase("bg-warning", flash)
	}
}
```

```templ
// views/dashboard_base.templ
		<div class="absolute bottom-5 right-5">
			for _, flash := range contexts.ExtractFlashMessages(ctx) {
				@toastMessage(flash)
			}
		</div>
```
---

```go
// controllers/controller.go
func addFlash(
	c echo.Context, flashType contexts.FlashType, msg string,
) error {
	sess, err := session.Get(flashSessionKey, c)
	if err != nil {
		return err
	}

	sess.AddFlash(contexts.FlashMessage{
		ID:        uuid.New(),
		Type:      flashType,
		CreatedAt: time.Now(),
		Message:   msg,
	}, flashSessionKey)

	return sess.Save(c.Request(), c.Response())
}
```

```go
func (c Controller) DashboardArticlesCreate(ctx echo.Context) error {
    // omitted
	if err := ctx.Bind(&payload); err != nil {
		if err := addFlash(ctx, contexts.FlashError, "could parse the form submission"); err != nil {
			slog.ErrorContext(
				ctx.Request().Context(),
				"could not add flash",
				"error",
				err,
			)
		}

		return views.NewArticleForm(views.NewArticleFormProps{}).
			Render(renderArgs(ctx))
	}

    // omitted
	if err != nil {
		if err := addFlash(ctx, contexts.FlashInfo, "article did not pass validation"); err != nil {
			slog.ErrorContext(
				ctx.Request().Context(),
				"could not add flash",
				"error",
				err,
			)
		}
        // omitted
    }

	if err := addFlash(ctx, contexts.FlashSuccess, "succesfully created article"); err != nil {
		slog.ErrorContext(
			ctx.Request().Context(),
			"could not add flash",
			"error",
			err,
		)
	}
	ctx.Response().
		Header().
		Set("HX-Redirect", fmt.Sprintf("/dashboard/articles/%v/edit", article.ID))
	ctx.Response().Writer.WriteHeader(http.StatusSeeOther)

	return nil
}
```

```go
// controllers/controller.go
func (c Controller) DashboardArticlesUpdate(ctx echo.Context) error {
    // omitted

	if err != nil {
	    if err := addFlash(ctx, contexts.FlashInfo, "could not updated article"); err != nil {
	    	slog.ErrorContext(
	    		ctx.Request().Context(),
	    		"could not add flash",
	    		"error",
	    		err,
	    	)
	    }

        // omitted
	}

	if err := addFlash(ctx, contexts.FlashSuccess, "succesfully updated article"); err != nil {
		slog.ErrorContext(
			ctx.Request().Context(),
			"could not add flash",
			"error",
			err,
		)
	}

	ctx.Response().
		Header().
		Set("HX-Redirect", fmt.Sprintf("/dashboard/articles/%v/edit", updatedArticle.ID))
	ctx.Response().Writer.WriteHeader(http.StatusSeeOther)

	return nil
}
```

```go
// controllers/controller.go
func (c Controller) DashboardArticlesDelete(ctx echo.Context) error {
    // omitted 

	if err := addFlash(ctx, contexts.FlashSuccess, "succesfully deleted article"); err != nil {
		slog.ErrorContext(
			ctx.Request().Context(),
			"could not add flash",
			"error",
			err,
		)
	}

	ctx.Response().
		Header().
		Set("HX-Redirect", "/dashboard")
	ctx.Response().Writer.WriteHeader(http.StatusSeeOther)

	return nil
}
```
---
