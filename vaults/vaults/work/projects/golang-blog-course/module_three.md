---
id: projects--golang-blog-course--module-three-index
aliases: []
tags: []
---

[Back](/projects/golang-blog-course/index.md)

<!--toc:start-->
- [Module Three](#module-three)
  - [Episode 1](#episode-1)
    - [Episode 1 Script](#episode-1-script)
  - [Episode 2](#episode-2)
    - [Episode 2 Script](#episode-2-script)
  - [Episode 3](#episode-3)
    - [Episode 3 Script](#episode-3-script)
  - [Episode 4](#episode-4)
    - [Episode 4 Script](#episode-4-script)
  - [Episode 5](#episode-5)
    - [Episode 5 Script](#episode-5-script)
  - [Episode 6](#episode-6)
    - [Episode 6 Script](#episode-6-script)
  - [Episode 7](#episode-7)
    - [Episode 7 Script](#episode-7-script)
<!--toc:end-->

# Module Three

Current Planned Vids:
1. What are the minimal requirements
2. Doing some initial plumbing
3. Embedding static assets
4. Creating our first views
5. Tailwind & utility-first CSS
6. Styling the landing page
7. Styling the article page

## Episode 1

Should outline the module and talk about starting as minimal as possible.

Provide a simple diagram in excalidraw of the landing page and article page.

### Episode 1 Script

Welcome to module 3 where we will be creating the MVP version of our blog.

The focus is to get something on the screen that implements the basic requirements and then continously improve from that point.

---

I typically try to create a basic illustration of what I'm building; excalidraw is a great tool for this as it does not allow for too much details so you stay focus on the foundamentals.

It's tempting to do everything at once but you will find that starting with a limited scope, ends up resulting in better products and software.

We don't know what we don't know, which sounds obvious, but is important to take into account when building something new.

Leaving things a bit too simple provides us with space for learning while doing.

This will always beat all the planning you have done upfront.

So, for now, we need two pages for now: the landing page and the article page.

---

For the landing page we are going to show a headline to catch visitors attention.

And a sub-header that explains a little about the focus of the blog.

Then a bunch of links to socials to hopefully build an audience as the blog gets bigger.

Finally, a list of latest posts that contains the title and short excerpt of the article.

We will eventually pull these posts from the database but for now we can just use some dummy data.

---

For the article page, we're going to show the title of the article, a back button, the author and publication date and the actual article.

In upcoming episodes, we will be adding a subscription box so we can build our newsletter.

We will also show other articles at the end to improve SEO and hopefully keep our readers interested.

Same as with the landing page, we will use some lorem ipsum text as a placeholder articles.

---

We will eventually make this application data-driven and start to employ some nice UX features using HTMX.

But let's focus on the basics and just get something on the screen that works on a foundamental level.

## Episode 2

Should setup the basics structure for the app that we can start building upon.

Should contain:
- views
- controllers
- server

And then stuff like `resources`, `database` etc will come as the module progresses.

### Episode 2 Script

We are almost ready to start building. We have the background knowledge, a basic outline of our task that's limited in scope.

But before we begin, we need to do some basic plumbing. 

Let's take what we talked about in structuring Golang applications, and create a base we can build our MVP from.

---

Let's start by initialising a go module in an empty directory and call it blog:

```bash
    go mod init blog
```

then add a few dependencies:
```bash
go get github.com/labstack/echo/v4
go get github.com/a-h/templ/cmd/templ@latest
```

And to get started we only need four packages:
- a views package
- a controllers/handlers package
- a routes package
- a server package

which all then comes together in our `main.go` file.

(create the directories and a matching .go file)
```bash
views/
controllers/
server/
routes/
main.go
```

---

In our views package I just want to create a base template for now:

```templ
// views/base.templ
package views

templ base() {
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>My Blog</title>
	</head>
		<body>
			{ children... }
		</body>
	</html>
}
```

Nothing new here, we created a base template that we can wrap other views/pages in using the `{ children...}` syntax.

---

For our handlers, we don't need a lot of structure for now, this will come later when we start to add dependencies like a database, cookies, auth etc.

```go
// controllers/controller.go

package controllers

import "github.com/labstack/echo/v4"

func Home(c echo.Context) error {
    return nil
}

func Article(c echo.Context) error {
    return nil
}
```
(might have to jump out and run `go mod tidy`)

---

```go
// routes/routes.go
package routes

import "github.com/labstack/echo/v4"

type Routes struct {
	e *echo.Echo
}

func NewRoutes() Routes {
	e := echo.New()

	return Routes{e}
}
```

We will add our controllers to the `Routes` struct soon so that we can direct request to the right controller.

For now, we just need to add a `Load()` method to the `Routes` struct.

This is so we make sure that our routes are registered before we pass the routes to the server.

It will also allow us to more easily split up our routes in the futureas they grow.

```go
func (r Routes) Load() *echo.Echo {
    // register routes

    return r.e
}
```

---

In our server package we will have everything needed to run the server, pretty obvious.

But later on when we start to add authentication we will also add middleware under this package.

```go
// server/server.go
package server

import (
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

type Server struct {
	host   string
	port   int32
	routes *echo.Echo
}

func NewServer(host string, port int32, routes *echo.Echo) Server {
	return Server{host, port, routes}
}

func (s Server) Start() {
	srv := http.Server{
		Addr:         fmt.Sprintf("%v:%v", s.host, s.port),
		Handler:      s.routes,
		ReadTimeout:  time.Second,
		WriteTimeout: 10 * time.Second,
	}

	slog.Info("starting the server", "host", s.host, "port", s.port)
	if err := srv.ListenAndServe(); err != nil {
		panic(err)
	}
}
```

---

And finally, the `main.go` file, where everything comes together in the end.

```go
// main.go
package main

import (
	"blog/routes"
	"blog/server"
)

func main() {
	routes := routes.NewRoutes()
	srv := server.NewServer("0.0.0.0", 8080, routes.Load())

	srv.Start()
}
```

---

Run `go run main.go`

## Episode 3

Should just quickly explain static files and resources so that it's setup and
ready when we start creating our views next video.

There will be a separate video on tailwind and utility-first css.

### Episode 3 Script

One final item remains before we can properly start building the blog.

We need what is known as static assets to be shipped with our application.

Static assets are files that don't change once deployed and includes:
- images
- css stylesheets
- javascript files

etc.

This will enable us to add styling and interactivity to the blog.

Luckily Go makes this very easy as it allows us to embed these files into the final binary that gets created when we run `go build`.

---

We will begin with adding tailwind so we can start doing some styling while we build our views.

In the next video we will be covering tailwind in a bit more detail, the philosophy behind it and how it works.

So if your new to tailwind please just stick with this video and it will become more clear in the next video.

So let's begin with creating a `static` and `resources` directory.

Inside the static directory we just need a `css` directory for now.

(cd into resources)
Then we need to initialize a `package.json` file in the resources directory.

```bash
npm init
```

Then we add tailwind as a dependency and initialize a configuration file:
```bash
npm install -D tailwindcss
npx tailwindcss init
```

In the configuration file we can customize and change how tailwind behaves.

We don't need that right now, we only need to tell it where to look for files that contains the tailwind css classes which happens in `content`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../views/**/*.templ"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Then, let's create a file called `base.css` which are going to contain all of the base styles from the tailwind library:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now, we can tell tailwind to look at the files specified in the path we gave it earlier in the config file and output a `css` file we can embed in our binary as a static asset.

```js
// package.json
"watch-css": "npx tailwindcss -i ./base.css -o ../static/css/output.css --watch"
```

If we then run `npm run watch-css` we should have a file in the static folder.

---

We already have our base template, so all we need to is to reference the file that just created and it will be included in all the pages we wrap in it.

```html
<link href="/static/css/output.css" rel="stylesheet">
```

Finally, we need to tell our application to include all of the files that live in the `static` directory.

If we jump into the `static` directory and create a file called `static.go`

We can utilize the `embed` package from the standard library.

```go
package static

import "embed"

//go:embed *
var Files embed.FS
```

The comment above the variable tells the Go compiler to include everyting in the current directory.

---

We can now use the variable we just created called `Files` and have our router direct request to these files.

```go
     echo.MustSubFS(static.Files, "static")
     e.StaticFS("/static", static.Files)
```

We have to tell echo that it must remove the prefix "static" that gets included when we use `go:embed`. 

Otherwise we would have to reference the files as `/static/static`.

Finally, we just use our router's `StaticFS` function, point to a patch and give it our Files variable.

We can the spin up our server and go to: `localhost:8080/static/css/output.css` and see that it returns a file with a bunch of css.

## Episode 4

Should build a very rough view of the two UI pages. Only focus on getting the elements done and on the page.

Start by quickly running through setting up routes and hooking up controllers for both pages.

### Episode 4 Script

Let's quickly create our routes, we will need two:
1. Home route
2. Article route (`/articles/:slug`)

```go
// routes/routes.go
r.e.GET("", func(c echo.Context) error {
	return controllers.Home(c)
})

r.e.GET("/articles/:slug", func(c echo.Context) error {
	return controllers.Article(c)
})
```

Next, we create our HomePage and ArticlePage views.

```go
// views/home.templ
package views

templ HomePage() {
	@base() {
		<div>I'm home</div>
	}
}
```

```go
// views/article.templ
package views

templ ArticlePage() {
	@base() {
		<div>I'm article page</div>
	}
}
```
Then we need templ to generate the Go version of these two views.

`templ generate`

Finally, we connect those in our respective controllers:

```go
// controllers/controller.go
package controllers

import (
	"blog/views"

	"github.com/labstack/echo/v4"
)

func Home(c echo.Context) error {
	return views.HomePage().Render(c.Request().Context(), c.Response().Writer)
}

func Article(c echo.Context) error {
	return views.ArticlePage().Render(c.Request().Context(), c.Response().Writer)
}
```

Once this file starts to feel crowded we can begin splitting it up but for now, this is perfectly fine.

---

```html
<!-- views/base.templ -->
<body class="flex flex-col min-h-screen">
	<header class="h-12 w-screen">
		<div class="h-full mx-auto container flex items-center justify-between">
			<a class="font-bold" href="/">MyBlog</a>
			<nav>
				<a class="mx-2 hover:underline cursor-pointer" href="/">Home</a>
				<a class="mx-2 hover:underline cursor-pointer" href="/articles">Articles</a>
				<a class="ml-2 hover:underline cursor-pointer" href="/about">About</a>
			</nav>
		</div>
	</header>
	{ children... }
</body>
```

---

```html
<!-- views/home.templ -->
templ HomePage() {
	@base() {
		<main class="w-screen">
			<div class="container mx-auto flex flex-col items-center">
			</div>
		</main>
	}
}
```

```html
<div class="mt-10 h-32 w-32 rounded-full border border-gray-800"></div>
<h1 class="mt-10 text-4xl">Headline</h1>
<h2 class="mt-4 text-xl">Sub headline</h2>
<div class="flex justify-between mt-12 w-96">
	<a class="font-semibold" href="https://x.com">Twitter/X</a>
	<a class="font-semibold" href="https://linkedin.com">LinkedIn</a>
	<a class="font-semibold" href="https://youtube.com">YouTube</a>
</div>
```

```html
<h2 class="mt-20 text-2xl font-bold">Latest Posts</h2>
<a href="/articles/article-1-title">
	<div class="cursor-pointer mt-4 p-4 border border-black rounded w-96 flex flex-col">
		<h3 class="text-lg">Article 1 Title</h3>
		<p class="mt-2">Excerpt goes here</p>
	</div>
</a>
<a href="/articles/article-2-title">
	<div class="cursor-pointer mt-4 p-4 border border-black rounded w-96 flex flex-col">
		<h3 class="text-lg">Article 2 Title</h3>
		<p class="mt-2">Excerpt goes here</p>
	</div>
</a>
<a href="/articles/article-3-title">
	<div class="cursor-pointer mt-4 p-4 border border-black rounded w-96 flex flex-col">
		<h3 class="text-lg">Article 3 Title</h3>
		<p class="mt-2">Excerpt goes here</p>
	</div>
</a>
<a href="/articles/article-4-title">
	<div class="cursor-pointer mt-4 p-4 border border-black rounded w-96 flex flex-col">
		<h3 class="text-lg">Article 4 Title</h3>
		<p class="mt-2">Excerpt goes here</p>
	</div>
</a>
<a href="/articles/article-5-title">
	<div class="cursor-pointer mt-4 p-4 border border-black rounded w-96 flex flex-col">
		<h3 class="text-lg">Article 5 Title</h3>
		<p class="mt-2">Excerpt goes here</p>
	</div>
</a>
```

---

```html
<!-- views/article.templ -->
templ ArticlePage(title string) {
	@base() {
		<main class="w-screen relative">
		</main>
	}
}
```

```html
<!-- views/article.templ -->
<a 
    class="absolute left-5 top-8 border rounded px-4 py-2 hover:bg-black hover:text-white" href="/">Back
</a>
```

```html
<!-- views/article.templ -->
<div class="container mx-auto flex flex-col items-center">
	<h1 class="mt-10 text-4xl">{ title }</h1>
	<div class="mt-4 flex">
		<p class="">20/11/2024</p>
		<p class="mx-2">
			-
		</p>
		<p class="">MBV</p>
	</div>
</div>
```

```html
<!-- views/article.templ -->
<article class="mt-12 w-[50rem]">
	<p class="my-2">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras libero justo, feugiat eget risus eleifend, scelerisque tristique ante. Vivamus non dui lorem. Aliquam vulputate justo sed venenatis ornare. In vel sollicitudin odio. Nunc scelerisque, ante vitae iaculis bibendum, tortor sem ullamcorper neque, nec lacinia urna nisi pellentesque erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ac tortor mattis, mattis metus sit amet, lacinia nulla. Nunc consequat vitae turpis nec eleifend. Praesent in urna eu odio placerat semper non quis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas vitae pretium odio. Fusce mollis massa sapien, nec luctus augue mollis ac. Curabitur at cursus enim, quis mollis elit.
	</p>
	<p class="my-2">
		Integer aliquam, dui et tincidunt fringilla, diam orci consectetur tellus, sed volutpat nulla metus a enim. Phasellus eget nisl eu massa gravida consectetur. Maecenas condimentum orci in leo laoreet fermentum. Ut porta ac quam non lacinia. Nunc mattis porttitor gravida. Maecenas hendrerit tellus non risus tincidunt dapibus. Nullam eros elit, accumsan sed enim quis, aliquam tempor ex. Sed rhoncus orci mi, quis congue neque posuere at. Fusce leo mi, porttitor at augue in, posuere dapibus mauris. Aliquam scelerisque, sem ac finibus egestas, leo tortor maximus augue, ut iaculis justo urna eu quam. In auctor augue aliquet dapibus lobortis. Mauris dictum fringilla interdum. Quisque hendrerit fermentum nisi, at elementum orci interdum non. Fusce viverra a ligula a lacinia. Aliquam erat volutpat. Aliquam tristique risus vel lorem consequat tristique.
	</p>
	<p class="my-2">
		Vivamus at ullamcorper eros, id egestas lacus. Ut ac ante id sapien molestie tempus eu non libero. Nullam vestibulum mollis sapien non vestibulum. Morbi ac sem mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas vehicula metus at aliquam ultrices. Aliquam tempor nec sapien id viverra. Phasellus luctus nulla vel ullamcorper pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec tristique est, ac viverra metus. Fusce non pretium nibh. Vivamus ac pellentesque ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque vel dolor ut dui auctor ultricies sit amet quis risus. Praesent in laoreet nibh. Duis eget pulvinar metus.
	</p>
	<p class="my-2">
		Donec sed ultrices purus. Phasellus feugiat euismod tristique. Pellentesque pellentesque pellentesque dolor sit amet accumsan. Curabitur laoreet placerat nunc vel fermentum. Phasellus euismod risus at erat efficitur cursus. Proin rutrum rutrum enim, a interdum justo posuere rutrum. Nullam condimentum sagittis tortor a sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus ac varius arcu.
	</p>
	<p class="my-2">
		Sed sit amet turpis ipsum. Vestibulum non vulputate metus. Etiam ac tristique felis. Vivamus eu aliquet tortor. Donec sit amet tortor nisl. Quisque pellentesque ligula in dui aliquet, eget ullamcorper nulla vulputate. Vestibulum egestas metus purus. Quisque nec euismod tellus. Praesent ut volutpat justo. Sed dapibus quam ut sapien cursus ultricies. Cras posuere ante lacus, vel venenatis nibh laoreet et. Phasellus eros elit, fringilla non est a, ultrices eleifend ante.
	</p>
</article>
```

```html
<!-- views/article.templ -->
<div class="mt-12 w-[50rem] divider-y border border-black"></div>
<h2 class="mt-2 font-semibold">If you enjoyed this article, consider one of these: </h2>
<ul class="mt-4 list-disc">
	<li>Other article 1</li>
	<li>Other article 2</li>
	<li>Other article 3</li>
	<li>Other article 4</li>
</ul>
```

---

```go
// controllers/controller.go
func Article(c echo.Context) error {
	slug := c.Param("slug")

	var title string
	switch slug {
	case "article-1-title":
		title = "Article 1"
	case "article-2-title":
		title = "Article 2"
	case "article-3-title":
		title = "Article 3"
	case "article-4-title":
		title = "Article 4"
	case "article-5-title":
		title = "Article 5"
	}

	return views.ArticlePage(title).Render(c.Request().Context(), c.Response().Writer)
}
```

```bash
templ generate && go run main.go
```

## Episode 5

Should just provide a quick overview and introduction to tailwindcss and utility-first css.

### Episode 5 Script

We've been using a bit of tailwind, but I haven't really explained what it is and why it's so popular in frontend development. The TL;DR of this video: better DX and speed of development with easier maintainability for vast majority of developers.

There are alternatives and different approaches that would technically be better, but software is a game of trade-offs, and tailwind gets you way past "good enough" in a very short time.

---

Tailwind's approach to styling and css is called "utility-first". 

This diverts from the traditional idea of cascading style sheets, where you write classes that can target many elements, to applying self-contained utility classes directly to the html.

These utility classes does one thing and one thing well.

If you want to add some padding to an element, you'll use `p-x` and replace `x` with a numeric value that decides how much. 

We we use `p-4`, it will be equivalent to `padding: 4 4 4 4` in traditional css.

---

The philosophy behind tailwind is to build your ui using what is known as "mobile-first". 

This simply means that you start by build out the UI for mobile sized screens and then adjust your UI accordingly as you go up in screen size.

To accomplish this, tailwind has these prefixes you can use to target various screens:
- 'sm:' prefix applies styles from small screens
- 'md:' for medium screens
- 'lg:' for large screens

They each target a specfic width and will take precedence once that specific size is reached.

So 'md:flex' means "only become a flex container on medium-sized screens and up". 

It's responsive design made incredibly simple.

---

There are of course alternatives to tailwind which have been around for a long time.

These include:
- Bootstrap
- BEM
- SCSS

plus a bunch more. Tailwind will take you very far but it's always good to know what other options are available.

Let's quickly compare tailwind to the alternatives

---

**Compared to Bootstrap**

Bootstrap gives you pre-built components like cards, navbars, and buttons with predefined styles. You drop these components into your HTML using Bootstrap's classes like 'btn btn-primary'.
Let's look at a button example:

Bootstrap:
```html
<button class="btn btn-primary">Click me</button>
```

Tailwind:
```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

With Bootstrap, you're locked into their design decisions unless you override them with custom CSS. Tailwind gives you the building blocks to create your own unique designs from scratch - no need to fight against existing styles.

Think of it this way: Bootstrap is like buying pre-made furniture, while Tailwind gives you high-quality wood and tools to build exactly what you want.

---

**Compared to BEM (Block Element Modifier)**

With BEM, you create semantic, descriptive classes like 'card__title--large'. In Tailwind, you'd directly apply 'text-xl font-bold' to achieve the same result.

BEM: More semantic, but requires more setup
Tailwind: Faster, more flexible, less context-switching between HTML and CSS

**Compared to SCSS**

SCSS lets you nest styles and create variables. Tailwind does this through configuration and utility classes.

Instead of:
```css
.button {
    background: blue;
    &:hover { background: darkblue; }
}
```

In Tailwind, you'd write:
```html
<button class="bg-blue-500 hover:bg-blue-700">
```

---

To recap, here's the pros/cons of tailwind:

Pros of Tailwind:
- Rapid development speed
- Consistent design system
- No context switching
- Highly customizable
- Smaller final CSS bundle

Cons to Be Aware Of:
- Learning curve for beginners
- HTML can look cluttered
- Requires initial configuration
- Potential performance overhead if not used carefully

A big pro for tailwind is how easy it is to customize. 

You can get very far with something like bootstrap but it has always been hard to modify it.

Most of the time, you can tell when something is made using bootstrap. That isn't necessarily
the case with tailwind.

Tailwind isn't just a tool - it's a philosophy of building UIs. 

It might feel weird at first, but once you get it, there's no going back.

## Episode 6

Should style and make the home page responsive.

### Episode 6 Script

INTRO

---

While tailwind offer a wide range of options for colors, typically, it's easier to thing in terms of what purpose a color has.

As we already talked about, tailwind can be customised as much as you want. But, you can also extended it with your own colors, spacing, fonts etc.

Lets extend our tailwind configuration with some colors to make styling the blog a bit easier.

```js
	theme: {
		extend: {
			colors: {
				'primary': '#8BA4B0',
				'primary-content': '#181616',
				'secondary': '#A292A3',
				'secondary-content': '#181616',
				'accent': '#C4B28A',
				'accent-content': '#181616',
				'neutral': '#C8C093',
				'neutral-content': '#181616',
				'base-100': '#2D2B2B',
				'base-200': '#222020',
				'base-300': '#181616',
				'base-content': '#C5C9C5',
				'info': '#7FB4CA',
				'info-content': '#181616',
				'success': '#8A9A7B',
				'success-content': '#181616',
				'warning': '#E6C384',
				'warning-content': '#181616',
				'error': '#C4746E',
				'error-content': '#181616'
			}
		}
	},
```

This colorscheme is what I used for the golangblogcourse.com.

The naming of these are pretty widely used but you can look them up if you need.

---

Next, we need to make some changes to our base template.

```html
<NEW>bg-base-300 overflow-x-hidden</NEW>
<body class="flex flex-col min-h-screen">
    <header class="h-12 w-screen">
		<div class="h-full mx-auto container flex items-center justify-between">
			<a class="font-bold" href="">MyBlog</a>
			<nav>
				<a class="mx-2 hover:underline cursor-pointer" href="/">Home</a>
				<a class="mx-2 hover:underline cursor-pointer" href="/articles">Articles</a>
				<a class="mx-2 hover:underline cursor-pointer" href="/about">About</a>
			</nav>
		</div>
	</header>
    <NEW>
    <main class="flex-1 w-full">
		{ children... }
	</main>
    </NEW>
</body>
```

1. `bg-base-300`: This adds a background color to the entire body. It's needed to:
   - Ensure a consistent background color across the entire page
   - Prevent any white/default background from showing through
   - Match the design system's color scheme

2. `overflow-x-hidden`: This prevents horizontal scrolling by hiding any content that overflows horizontally. It's needed to:
   - Stop unwanted horizontal scrollbars from appearing
   - Keep the layout contained within the viewport width
   - Fix potential layout issues on mobile devices

3. The new `<main>` wrapper with `flex-1 w-full`:
   - `flex-1`: Makes the main content area grow to fill available vertical space
   - `w-full`: Ensures the main content spans the full width of its container
   - This structure is needed to:
     - Create a proper page layout with header and main content
     - Enable footer positioning at bottom if added later
     - Provide a consistent container for page content

These changes establish a solid foundation for a responsive layout while preventing common layout issues like unwanted scrolling or inconsistent spacing.

Templ makes it super easy to create components and its a good way of writing maintainble code.

So, let's quickly extract the navigation into a component.

```html
templ navigation() {
<header class="flex bg-base-300 w-full">
  <div class="bg-base-100 container mx-auto flex justify-center">
    <nav class="mt-6 p-2 rounded border border-base-content bg-base-300 w-fit">
	  <a class="font-semibold text-sm text-base-content mx-2 hover:text-base-content/70 hover:underline cursor-pointer" href="/">Home</a>
	</nav>
  </div>
</header>
}
```

```html
<body class="bg-base-300 flex flex-col min-h-screen overflow-x-hidden">
	<new>@navigation()</new>
	<main class="flex-1 w-full">
		{ children... }
	</main>
</body>
```

Let's spin up the server and see what we have now. 

Remember that tailwind is mobile-first so that's where we will start.

For the unaware, most browser has a built-in tool where we can see the site in different screen sizes.

---

Let's start by removing the main element that now comes from the base template.

```html
 <NEW>flex-1 bg-base-100</NEW>
<div class="container mx-auto flex flex-col items-center">
	<div class="flex flex-col mt-12 w-full">
		<div class="mx-auto w-40 h-40 rounded">
			<img class="p-2 bg-base-300" src="https://mortenvistisen.com/static/images/mbv.png"/>
		</div>
		<div class="mx-auto flex flex-col items-center w-full">
			<h1 class="text-4xl font-bold text-base-content text-center">Lorem ipsum dolor sit amet consectetur</h1>
			<h2 class="mt-2 text-base text-base-content text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h2>
		</div>
	</div>
</div>
```

```html
<div class="bg-base-300 p-2 rounded flex justify-around mt-10 w-72">
	<a class="font-semibold hover:text-secondary/70 text-xs text-secondary" href="">Twitter/X</a>
	<a class="font-semibold hover:text-secondary/70 text-xs text-secondary" href="">LinkedIn</a>
	<a class="font-semibold hover:text-secondary/70 text-xs text-secondary href="">Youtube</a>
</div>
```

```html
<h2 class="mt-20 text-2xl font-bold text-base-content">Latest Posts</h2>
<div class="flex flex-col items-center mb-12">
	<a href="/articles/article-1-title">
		<div class="cursor-pointer mt-4 p-4 border border-black rounded flex flex-col bg-base-300 w-80">
			<h3 class="text-lg text-base-content">Article 1 Title</h3>
			<p class="text-base-content/70 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
			<a class="mt-2 text-accent hover:font-semibold" href="/articles/article-1-title">Read article</a>
		</div>
	</a>
</div>
```

---

```html
<div class="flex-1 bg-base-100 container mx-auto flex flex-col items-center">
	<div class="flex flex-col mt-12 w-full">
		<div class="mx-auto w-40 h-40 rounded">
			<img class="p-2 bg-base-300" src="https://mortenvistisen.com/static/images/mbv.png"/>
		</div>
		<div class="mx-auto flex flex-col items-center w-full <NEW>md:w-1/2</NEW>">
			<h1 class="text-4xl font-bold text-base-content text-center">Lorem ipsum dolor sit amet consectetur</h1>
			<h2 class="mt-2 text-base text-base-content text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h2>
		</div>
	</div>
	<div class="bg-base-300 p-2 rounded flex justify-around mt-10 w-72 <NEW>md:w-96</NEW>">
		<a class="hover:text-secondary/70 text-xs <NEW>md:text-sm</NEW> text-secondary font-semibold" href="">Twitter/X</a>
		<a class="hover:text-secondary/70 text-xs <NEW>md:text-sm</NEW> text-secondary font-semibold" href="">LinkedIn</a>
		<a class="hover:text-secondary/70 text-xs <NEW>md:text-sm</NEW> text-secondary font-semibold" href="">Youtube</a>
	</div>
	<h2 class="mt-20 text-2xl font-bold text-base-content">Latest Posts</h2>
	<div class="flex flex-col items-center mb-12">
		<a href="/articles/article-1-title">
			<div class="bg-base-300 cursor-pointer mt-4 p-4 border border-black rounded w-80 flex flex-col <NEW>md:w-96 lg:w-2/3</NEW>">
				<h3 class="text-base-content text-lg">Article 1 Title</h3>
				<p class="text-base-content/70 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
				<a class="mt-2 text-accent hover:font-semibold" href="/articles/article-1-title">Read article</a>
			</div>
		</a>
        {repeat 4}
	</div>
</div>
```

---

```html
templ hero(headline string, subHeadline string) {
	<div class="flex flex-col mt-12 w-full">
		<div class="mx-auto w-40 h-40 rounded">
			<img class="p-2 bg-base-300" src="https://mortenvistisen.com/static/images/mbv.png"/>
		</div>
		<div class="mx-auto flex flex-col items-center w-full md:w-1/2">
			<h1 class="text-4xl font-bold text-base-content text-center">{ headline }</h1>
			<h2 class="mt-2 text-base text-base-content text-center">{ subHeadline }</h2>
		</div>
	</div>
}
```

```html
@hero("Lorem ipsum dolor sit amet consectetur", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua")
```

---

```html
templ socialLink(href string, platform string) {
	<a class="hover:text-secondary/70 text-xs md:text-sm text-secondary font-semibold" href={ templ.SafeURL(href) }>{ platform }</a>
}
```

```html
<div class="bg-base-300 p-2 rounded flex justify-around mt-10 w-72 md:w-96">
    @socialLink("https://x.com", "Twitter/X")
    @socialLink("https://linkedin.com", "LinkedIn")
    @socialLink("https://youtube.com", "Youtube")
</div>

```

---

```html
templ articleCard(title string, excerpt string, href string) {
	<a href={ templ.SafeURL(href) }>
		<div class="bg-base-300 cursor-pointer mt-4 p-4 border border-black rounded w-80 md:w-96 lg:w-2/3 flex flex-col">
			<h3 class="text-base-content text-lg">{ title }</h3>
			<p class="text-base-content/70 mt-2">{ excerpt }</p>
			<a class="mt-2 text-accent hover:font-semibold" href={ templ.SafeURL(href) }>Read article</a>
		</div>
	</a>
}
```

```html
<div class="flex flex-col items-center mb-12">
    @articleCard("Article 1 Title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", "/articles/article-1-title")
    @articleCard("Article 2 Title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", "/articles/article-2-title")
    @articleCard("Article 3 Title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", "/articles/article-3-title")
    @articleCard("Article 4 Title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", "/articles/article-4-title")
    @articleCard("Article 5 Title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", "/articles/article-5-title")
</div>
```

## Episode 7

Should style and make the article page responsive.

### Episode 7 Script

INTRO

---

```bash
npm install -D @tailwindcss/typography
```

```js
plugins: [
	require('@tailwindcss/typography'),
],
```

---

DELETE `<main></main>`

```html
OLD
<a class="absolute left-5 top-8 border rounded px-4 py-2 hover:bg-black hover:text-white" href="/">Back</a>
<div class="container mx-auto flex flex-col items-center">
	<h1 class="mt-10 text-4xl">{ title }</h1>
	<div class="mt-4 flex">
		<p class="">20/11/2024</p>
		<p class="mx-2">
			-
		</p>
		<p class="">MBV</p>
	</div>
</div>
NEW
<div class="relative container mx-auto flex flex-col items-center flex-1 bg-base-100">
	<a class="invisible md:visible absolute left-5 top-8 border rounded px-4 py-2 text-base-content bg-base-300 hover:bg-base-300/20 hover:font-semibold" href="/">Back</a>
	<div class="flex flex-col items-center px-4">
		<h1 class="mt-10 text-4xl font-bold text-base-content">{ title }</h1>
		<div class="mt-4 flex">
			<p class="text-base-content">20/11/2024</p>
			<p class="mx-2 text-base-content">
				-
			</p>
			<p class="text-base-content">MBV</p>
		</div>
	</div>
</div>
```


---

```html
OLD
<article class="mt-12 w-[50rem]">

NEW
<article class="mt-12 w-full px-4 md:px-0 md:w-4/5 prose lg:prose-xl">
```

```html
OLD
<p class="my-2"></p>

NEW
<p class="text-base-content">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras libero justo, feugiat eget risus eleifend, scelerisque tristique ante. Vivamus non dui lorem. Aliquam vulputate justo sed venenatis ornare. In vel sollicitudin odio. Nunc scelerisque, ante vitae iaculis bibendum, tortor sem ullamcorper neque, nec lacinia urna nisi pellentesque erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ac tortor mattis, mattis metus sit amet, lacinia nulla. Nunc consequat vitae turpis nec eleifend. Praesent in urna eu odio placerat semper non quis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas vitae pretium odio. Fusce mollis massa sapien, nec luctus augue mollis ac. Curabitur at cursus enim, quis mollis elit.
</p>
```

```html
<div class="mt-6 w-full md:w-4/5 lg:w-full divider-y border border-base-content"></div>
```

---


```html
OLD
<div class="mt-12 w-[50rem] divider-y border border-black"></div>

<h2 class="mt-2 font-semibold">If you enjoyed this article, consider one of these: </h2>

<ul class="mt-4 list-disc">
	<li>Other article 1</li>
	<li>Other article 2</li>
	<li>Other article 3</li>
	<li>Other article 4</li>
</ul>
NEW
<h2 class="px-4 mt-4 font-semibold text-base-content">If you enjoyed this article, consider one of these: </h2>

<ul class="mt-4 mb-10 list-disc">
	<li class="text-base-content">Other article 1</li>
	<li class="text-base-content">Other article 2</li>
	<li class="text-base-content">Other article 3</li>
	<li class="text-base-content">Other article 4</li>
</ul>
```



