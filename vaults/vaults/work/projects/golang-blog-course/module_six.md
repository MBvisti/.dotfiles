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
