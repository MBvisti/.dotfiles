---
id: projects--golang-blog-course--module-five-index
aliases:
  - gbc
tags: []
---

[Back](/projects/golang-blog-course/index.md)

<!--toc:start-->
- [Module Five](#module-five)
  - [Episode 1](#episode-1)
    - [Episode 1 Script](#episode-1-script)
  - [Episode 2](#episode-2)
    - [Episode 2 Script](#episode-2-script)
<!--toc:end-->

# Module Five

Current Planned Vids:
1. What's a migration
2. Our first migration: Posts Table
3. Creating the database layer
4. Show latest posts
5. Slugs and human readable URLs

## Episode 1

**Title**: What's a migration

Should explain the basics of database migrations:
- how to think about them
- what's an up and down version
- use the analogy of changing tires of a running car
- what to be aware of

### Episode 1 Script

One of the most essential concetps when working witht a database is migrations. 

No matter if it's a personal project or large enterprise applications, understanding migrations will make your life much easier.

---

First of all: What is a database migration?

It's very similar to version control but for the structure of your database.

As our applications evolves over time so does the data requirements and structures.

In practice, migrations often involves two parts: an up and a down version.
1. A way to make changes to our database going forward
2. A way to undo those changes if something goes wrong

This is not a requirement but it's good practice.

Let's look at a simple example:
```sql
-- up migration
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT
);

-- down migration
DROP TABLE posts;
```

The "up" migration creates our table, while the "down" migration provides a way to undo that change by dropping the table.

---

When working with migrations, there are several key things to keep in mind:

1. Migrations should be immutable
   - Once a migration is applied and deployed, never modify it
   - Create a new migration instead of changing an existing one
   - Think of them like Git commits - you don't change history

2. Always test migrations
   - Test both the up and down migrations
   - Verify data integrity after migration
   - Have a backup plan if something goes wrong

3. Be careful with production data
   - Always backup before migrating
   - Consider the impact of schema changes on existing data
   - Plan for rollback scenarios

---

Here are some best practices I've learned:

1. Keep migrations small and focused
   - One conceptual change per migration
   - Easier to understand and rollback if needed

2. Use meaningful names
   - Name migrations based on what they do
   - Include timestamps for ordering
   - Example: "20230615_create_posts_table.sql"

---

In the next episode, we'll put this knowledge into practice by creating our first migration for the posts table. We'll set up a proper migration system and implement both up and down migrations.

Remember: migrations might seem complex at first, but they're just a tool to help us make database changes safely and reliably. Once you get comfortable with the concept, you'll wonder how you ever managed without them.

See you in the next episode where we'll start writing actual migration code!

## Episode 2

**Title**: Our first migration: Posts Table

- Moving frontmatter/meta info to the database and why
- Running up & down versions
- Brief talk about doing this in prod and mention we will tackle this later on

### Episode 2 Script

INTRO

Using Goose, refer to M1E5 for setup.

---

refer back to Getting started with postgres

```sh
psql -U blog_admin

create database blog_dev with owner 'blog_admin';
```

```sh
mkdir -p psql/migrations
```

```sh
goose -dir psql/migrations postgres postgresql://blog_admin:password@localhost:5432/blog_dev create create_articles_table sql
```

```sql
-- UP
CREATE TABLE IF NOT EXISTS articles(
    id uuid primary key,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    title varchar(255) not null,
    filename varchar(255) not null,
    slug varchar(255) not null,
    excerpt text not null,
    draft boolean not null default true,
    released_at timestamp with time zone,
    read_time integer
);

-- DOWN
DROP TABLE IF EXISTS articles;
```

It's common practice to use the plural form when naming tables but it's not a requirement.

Next, let's look at our primary key. We're using UUIDs instead of sequential IDs for several reasons:
- They're globally unique
- They prevent ID enumeration attacks
- They hide the size of our dataset from users

---

Option 1 (without timezone):
```sql
created_at timestamp not null,
updated_at timestamp not null
```

Option 2 (with timezone):
```sql
created_at timestamp with time zone not null,
updated_at timestamp with time zone not null
```

The difference is crucial:
- `timestamp` (without time zone) stores the exact date and time as-is (UTC)
- `timestamp with time zone` stores the time in UTC internally and converts it based on the timezone for the connecting client

Option 1 better for:
- Local-only applications where all users are in the same timezone
- When you need to record an exact time without timezone conversion
- Recording scheduled events that should happen at specific local times regardless of timezone
- Cases where you want to avoid timezone conversion complexity

Option 2 better for:
- Applications serving users across multiple timezones
- Systems that need to track when events actually occurred globally
- Distributed systems where servers might be in different timezones
- Data that needs to account for daylight savings time

Regardless of which you choose, be consistent throughout your application and document your choice. Also ensure your application servers and database have their timezone configurations properly set.

For our blog, we're choosing `timestamp` (without time zone) because:
- We'll explicitly store everything in UTC
- Handle timezone conversions in our application layer
- Makes it easier to reason about time-based operations

---

The rest of the fields are just using basic data types:
```sql
title varchar(255) not null,
filename varchar(255) not null,
slug varchar(255) not null,
excerpt text not null,
draft boolean not null default true,
released_at timestamp,
read_time integer
```

```sh
goose -dir psql/migrations postgres postgresql://blog_admin:password@localhost:5432/blog_dev up
```

---

In the next episode, we'll create the database layer in Go to interact with this table, implementing proper repository patterns and database operations.

## Episode 3

**Title**: Creating the database layer

- separation of concerns
- everything goes through the models
- explain sqlc
- std interface for database dbtx
    - no dependency injections for central application layer
    - makes it usable across models of needed
    - a bit of uncle bob clean arch

### Episode 3 Script

INTRO

---

```yaml
// sqlc.yaml

version: "2"
sql:
- schema: "psql/migrations"
  queries: "psql"
  engine: "postgresql"
  gen:
    go:
      package: "db"
      out: "models/internal/db"
      output_db_file_name: "db.go"
      output_models_file_name: "entities.go"
      emit_methods_with_db_argument: true
      sql_package: "pgx/v5"
      overrides:
        - db_type: "uuid"
          go_type: "github.com/google/uuid.UUID"
```

```go
package psql

import (
	"context"
	"embed"
	"errors"
	"log/slog"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/riverqueue/river"
)

//go:embed migrations/*
var Migrations embed.FS

var (
	ErrInternalDB = errors.New(
		"an error occurred that was not possible to recover from",
	)
	ErrBeginTx             = errors.New("could not begin transaction")
	ErrRollbackTx          = errors.New("could not rollback transaction")
	ErrCommitTx            = errors.New("could not commit transaction")
	ErrNoRowWithIdentifier = errors.New(
		"could not find requested row in database",
	)
)

// - Handles concurrent requests efficiently by maintaining multiple connections
// - Automatically manages connection lifecycle (creation, reuse, and cleanup)
// - Improves performance by reducing connection overhead
func CreatePooledConnection(
	ctx context.Context,
	uri string,
) (*pgxpool.Pool, error) {
	dbpool, err := pgxpool.New(ctx, uri)
	if err != nil {
		slog.Error("could not establish connection to database", "error", err)
		return nil, err
	}

	return dbpool, nil
}

type Postgres struct {
	Pool  *pgxpool.Pool
	Queue *river.Client[pgx.Tx]
}

func NewPostgres(dbPool *pgxpool.Pool, queue *river.Client[pgx.Tx]) Postgres {
	return Postgres{
		dbPool,
		queue,
	}
}

// func (p Postgres) BeginTx(ctx context.Context) (pgx.Tx, error) {
// 	tx, err := p.Pool.Begin(ctx)
// 	if err != nil {
// 		slog.ErrorContext(ctx, "could not begin transaction", "reason", err)
// 		return nil, errors.Join(ErrBeginTx, err)
// 	}
//
// 	return tx, nil
// }
//
// func (p Postgres) RollBackTx(ctx context.Context, tx pgx.Tx) error {
// 	if err := tx.Rollback(ctx); err != nil {
// 		slog.ErrorContext(ctx, "could not rollback transaction", "reason", err)
// 		return errors.Join(ErrRollbackTx, err)
// 	}
//
// 	return nil
// }
//
// func (p Postgres) CommitTx(ctx context.Context, tx pgx.Tx) error {
// 	if err := tx.Commit(ctx); err != nil {
// 		slog.ErrorContext(ctx, "could not commit transaction", "reason", err)
// 		return errors.Join(ErrCommitTx, err)
// 	}
//
// 	return nil
// }
```

```sql
-- psql/articles.sql
-- name: QueryArticles :many
SELECT * FROM articles ORDER BY released_at desc;
```

```sh
sqlc compile && sqlc generate
```

```go
//go:embed migrations/*
var Migrations embed.FS
```

```go
func migrateDB(ctx context.Context, pool *pgxpool.Pool) error {
	ctx, cancel := context.WithTimeoutCause(
		ctx,
		5*time.Minute,
		errors.New("migration timeout of 5 minutes reached"),
	)
	defer cancel()

	gooseLock, err := lock.NewPostgresSessionLocker()
	if err != nil {
		return err
	}

	fsys, err := fs.Sub(psql.Migrations, "migrations")
	if err != nil {
		return err
	}

	db := stdlib.OpenDBFromPool(pool)

	gooseProvider, err := goose.NewProvider(
		goose.DialectPostgres,
		db,
		fsys,
		goose.WithVerbose(true),
		goose.WithSessionLocker(gooseLock),
	)
	if err != nil {
		return err
	}

	_, err = gooseProvider.Up(ctx)
	if err != nil {
		return err
	}

	return nil
}
```

```go
func main() {
	ctx := context.Background()
	pool, err := psql.CreatePooledConnection(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	if err := migrateDB(ctx, pool); err != nil {
		panic(err)
	}

	routes := routes.NewRoutes()
	srv := server.NewServer("0.0.0.0", 8080, routes.Load())

	srv.Start()
}
```

explore the output a bit

## Episode 4

**Title**: Show latest posts

- implement models to get latest posts
- update controller 
- update view/home.templ

### Episode 4 Script

INTRO

---

```go
//models/internal/db/statements.go
var Stmts = New()
```

```go
type Article struct {
    ID uuid.UUID
	CreatedAt  time.Time
	UpdatedAt  time.Time
	Title      string
	Filename   string
	Slug       string
	Excerpt    string
	Draft      bool
	ReleasedAt time.Time
	ReadTime   int32
}
```

```go
func GetLatestArticles(ctx context.Context, dbtx db.DBTX) ([]Article, error) {
    articleRows, err := db.Stmts.QueryArticles(ctx)
    if err != nil {
        return nil, err
    }

	for _, ar := range articleRows {
        var articles []Article
		if !ar.Draft {
			articles = append(articles, Article{
				ID:         ar.ID,
				CreatedAt:  ar.CreatedAt.Time,
				UpdatedAt:  ar.ReleasedAt.Time,
				Title:      ar.Title,
				Filename:   ar.Filename,
				Slug:       ar.Slug,
				Excerpt:    ar.Excerpt,
				Draft:      ar.Draft,
				ReleasedAt: ar.ReleasedAt.Time,
				ReadTime:   ar.ReadTime.Int32,
			})
		}
	}

	return articles, nil
}
```

---

```go
type Controllers struct {
	db psql.Postgres
}

func NewControllers(db psql.Postgres) Controllers {
	return Controllers{db}
}
```

** UPDATE THE CONTROLLERS TO BE METHODS **

```templ
// views/home.templ
templ HomePage(articles []models.Article) {
    // omitted

	<div class="flex flex-col items-center mb-12">
		for _, article := range articles {
			@articleCard(article.Title, article.Excerpt, fmt.Sprintf("/articles/%s", article.Slug))
		}
	</div>
}
```

```go
// routes/routes.go
type Routes struct {
	e           *echo.Echo
	controllers controllers.Controllers
}

func NewRoutes(controllers controllers.Controllers) Routes {
    // omitted
	return Routes{e, controllers}
}
```

** UPDATE ROUTES TO USE CONTROLLER DEPS **

```go
// main.go
func main() {
    // omitted

	psql := psql.NewPostgres(pool)
	controllers := controllers.NewControllers(psql)

	routes := routes.NewRoutes(controllers)
    // omitted
}
```

---

```zsh
psql -U blog_admin -d blog_dev
```

```sql
insert into articles (id, created_at, updated_at, title, filename, slug, excerpt, draft, released_at, read_time) values (gen_random_uuid(), now(), now(), 'My first article', 'article-1.md', 'article-1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', false, now(), 5);

insert into articles (id, created_at, updated_at, title, filename, slug, excerpt, draft, released_at, read_time) values (gen_random_uuid(), now(), now(), 'My second article', 'article-2.md', 'article-1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', true, now(), 5);
```

## Episode 5

**Title**: Slugs and human readable URLs

- what are slugs
- why use slugs
- implement logic to create article with slug from title

### Episode 5 Script

INTRO
---
In this episode, we're going to talk about URLs - specifically, how to make them more user-friendly using something called "slugs". If you've ever wondered why blog posts have nice readable URLs instead of just ID numbers, this episode is for you.

MAIN CONTENT
---
Let's start with a simple question: What is a slug?

A slug is a URL-friendly version of a text string, typically created from a title or name. For example:
- Title: "My First Blog Post!"
- Slug: "my-first-blog-post"

Instead of having URLs like:
```
https://myblog.com/articles/550e8400-e29b-41d4-a716-446655440000
```

We can have URLs like:
```
https://myblog.com/articles/my-first-blog-post
```

Why are slugs important? There are several key benefits:

1. SEO (Search Engine Optimization)
   - Search engines prefer descriptive URLs
   - Keywords in URLs can improve search rankings
   - Makes your content more discoverable

2. User Experience
   - Users can understand the URL before clicking
   - Easier to remember and share
   - More professional appearance
   - Better accessibility for screen readers

3. Analytics and Tracking
   - More meaningful data in analytics tools
   - Easier to identify content in logs
   - Better understanding of user behavior

4. Social Sharing
   - URLs look better when shared on social media
   - More likely to get clicked
   - Provides context even without preview cards


---

**code**:
```sql
-- name: InsertArticle :one
insert into articles 
	(id, created_at, updated_at, title, filename, slug, excerpt, draft, released_at, read_time) 
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;
```

```sh
sqlc compile && sqlc generate
```

```sh
go get -u github.com/gosimple/slug
```

```go
type NewArticlePayload struct {
	Title      string
	Filename   string
	Excerpt    string
	Draft      bool
	ReleasedAt time.Time
	ReadTime   int32
}

func NewArticle(
	ctx context.Context,
	dbtx db.DBTX,
	payload NewArticlePayload,
) (Article, error) {
	now := pgtype.Timestamptz{
		Time:  time.Now(),
		Valid: true,
	}
	articleRow, err := db.Stmts.InsertArticle(ctx, dbtx, db.InsertArticleParams{
		ID:        uuid.New(),
		CreatedAt: now,
		UpdatedAt: now,
		Title:     payload.Title,
		Filename:  payload.Filename,
		Slug:      slug.Make(payload.Title),
		Excerpt:   payload.Excerpt,
		Draft:     payload.Draft,
		ReleasedAt: pgtype.Timestamptz{
			Time:  payload.ReleasedAt,
			Valid: true,
		},
		ReadTime: pgtype.Int4{
			Int32:   payload.ReadTime,
			Valid: true,
		},
	})
	if err != nil {
		return Article{}, err
	}

	return Article{
		ID:         articleRow.ID,
		CreatedAt:  articleRow.CreatedAt.Time,
		UpdatedAt:  articleRow.UpdatedAt.Time,
		Title:      articleRow.Title,
		Filename:   articleRow.Filename,
		Slug:       articleRow.Slug,
		Excerpt:    articleRow.Excerpt,
		Draft:      articleRow.Draft,
		ReleasedAt: articleRow.ReleasedAt.Time,
		ReadTime:   articleRow.ReadTime.Int32,
	}, nil
}
```

---
 
```go
var ErrInvalidPayload = errors.New("provided payload did not pass validation")
```

```go
	if payload.Title == "" {
		return Article{}, errors.Join(
			ErrInvalidPayload,
			errors.New("title must not be empty"),
		)
	}
	if payload.Filename == "" {
		return Article{}, errors.Join(
			ErrInvalidPayload,
			errors.New("filename must not be empty"),
		)
	}
	if payload.Excerpt == "" {
		return Article{}, errors.Join(
			ErrInvalidPayload,
			errors.New("excerpt must not be empty"),
		)
	}
```

```go
var (
	ErrInvalidPayload = errors.New("provided payload did not pass validation")
	ErrDBInsert       = errors.New("could not insert record into database")
)
```

```go
	articleRow, err := db.Stmts.InsertArticle(ctx, dbtx, db.InsertArticleParams{
        // omitted
	})
	if err != nil {
		return Article{}, errors.Join(ErrDBInsert, err)
	}
```

---











