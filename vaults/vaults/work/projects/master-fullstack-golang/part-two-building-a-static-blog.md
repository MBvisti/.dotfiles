---
id: part-two-building-a-static-blog
aliases: []
tags: []
---

[Back To Index](/projects/master-fullstack-golang/index.md)

# Part 2: Building A Static Blog

## Outline

Should show how you can build the complete blog without a database, i.e. as simple as possible.

**Module 4: Views with templ**
* Lesson (main) 4.1: Templ Deep Dive: Syntax, Components, Layouts, Passing Data (theory)
* Lesson (main) 4.2: Building with Templ: Creating Base Layouts (practice)
* Lesson (main) 4.3: Building The Landing page (practice)
* Lesson (main) 4.4: Extracting elements into components (practice)
* Lesson (main) 4.5: Building The article page (practice)

**Module 5: Utility-first styles with tailwind**
* Lesson (main) 5.1: Introduction to Tailwind CSS: The Utility-First Philosophy (theory)
* Lesson (main) 5.2: Adding tailwind to the project
* Lesson (main) 5.3: Static Assets in Go
* Lesson (main) 5.4: Adding styles to Landing page
* Lesson (main) 5.5: Making landing page responsive
* Lesson (main) 5.6: Adding styles to components
* Lesson (main) 5.7: Adding styles to the article page
* ~Lesson (main) 5.7.1: Making article page responsive~

**Module 6: Markdown, frontmatter and processing**
* Lesson (main) 6.1: Content Storage Strategies (embed vs db)
* Lesson (main) 6.2: Markdown for Blogging
* Lesson (main) 6.3: Frontmatter: Adding Structured Metadata to Markdown Files
* Lesson (main) 6.4: The Rendering Pipeline: Parsing Markdown to HTML
* ~Lesson (main) 6.5: Enhancing Readability: Code Syntax Highlighting in Articles.~
* Lesson (main) 6.5: You could deploy this right now

## Module 4: Views with Templ

### Lesson 4.1: Templ Deep Dive (WIP title)

**What**:
Presentation with a few code examples. Show where we come from, i.e. standard library.

**Part One**
First, let's quickly see how HTML templating works in Go's standard library:
```go
go// render.go
func renderHTML() ([]byte, error) {
    tmpl, err := template.ParseFiles("template.html")
    if err != nil {
        return nil, err
    }
    
    var buf bytes.Buffer
    err = tmpl.Execute(&buf, data)
    if err != nil {
        return nil, err
    }
    
    return buf.Bytes(), nil
}
```
```html
html<!-- template.html -->
<h1>Blog Post by {{.Author}}</h1>
<p>Published: {{.PublicationDate}}</p>
```

This works, but has limitations: no type safety, runtime parsing, and awkward syntax.

**Part Two:** Basic Component Structure

```templ
package views

type UserData struct {
    Name  string
    Email string
    Role  string
}

templ UserCard(user UserData) {
    <div class="user-card">
        <h3>{ user.Name }</h3>
        <p>{ user.Email }</p>
        <span class="role">{ user.Role }</span>
    </div>
}

templ BaseLayout(title string) {
    <!DOCTYPE html>
    <html>
    <head>
        <title>{ title }</title>
        <meta charset="UTF-8">
    </head>
    <body>
        { children... }
    </body>
    </html>
}

templ UserPage(users []UserData) {
    @BaseLayout("Users Dashboard") {
        <div class="container">
            <h1>User Management</h1>
            for _, user := range users {
                @UserCard(user)
            }
        </div>
    }
}
```

**Introduction**
Welcome to this deep dive into Templ, a modern templating library that's changing how we build web applications with Go. If you've been frustrated with Go's standard html/template package or wished you could write templates that feel more like modern component-based frameworks, Templ might be exactly what you're looking for.

In the next 10 minutes, we'll explore what Templ is, why it was created, its core features, and most importantly, when you should choose it over Go's standard templating approach.
What is Templ? (1 minute)

Templ is a templating language and library for Go that compiles templates to Go code at build time. Unlike traditional templating engines that parse templates at runtime, Templ generates type-safe Go functions that return rendered HTML.

The key insight behind Templ is simple: instead of treating templates as strings with embedded logic, treat them as code that generates HTML. This approach brings several immediate benefits - type safety, better performance, and IDE support that actually works.

Templ was created by Adrian Hesketh as a response to the limitations of existing Go templating solutions. It's designed specifically for building modern web applications where you want the safety and performance of Go with the developer experience of component-based frameworks.

**Core Features and Syntax**
Let's look at what makes Templ special. The syntax is clean and Go-like, but designed specifically for HTML generation.

**Component Definition**
```templ
templ Hello(name string) {
    <div>
        <h1>Hello, { name }!</h1>
    </div>
}
```

This defines a component called Hello that takes a string parameter. Notice how parameters are strongly typed - this is one of Templ's biggest advantages.

**Composition and Reusability**
```templ
templ Layout(title string) {
    <!DOCTYPE html>
    <html>
        <head><title>{ title }</title></head>
        <body>
            { children... }
        </body>
    </html>

}

templ Page() {
    @Layout("My App") {
        <main>
            @Hello("World")
        </main>
    }
}
```
Components compose naturally. The @ symbol calls other components, and children... allows for slot-like behavior.

**Control Flow**
```templ
templ UserList(users []User) {
    <ul>
        for _, user := range users {
            <li>{ user.Name } - { user.Email }</li>
        }
    </ul>
}
```

Control flow uses Go syntax directly. No need to learn template-specific conditionals or loops.
CSS and JavaScript Integration

```templ
templ StyledComponent() {
    <div class={ "button", templ.KV("active", isActive) }>
        Click me
    </div>
}
```

Templ handles CSS classes intelligently and even supports scoped styles.

**Compilation Process**
Here's where Templ gets interesting. When you run templ generate, it converts your .templ files into Go functions.

A component like Hello(name string) becomes a Go function with the signature:

gofunc Hello(name string) templ.Component

This component implements the io.WriterTo interface, so it can be rendered directly to HTTP responses, files, or any other writer. The generated code is optimized - it pre-allocates buffers, uses efficient string concatenation, and includes proper HTML escaping.

This compilation step is what enables the type safety and performance benefits we get with Templ.

Templ vs Standard Library (3 minutes)
Now let's compare Templ with Go's standard html/template package across several dimensions.

Type Safety
Standard Library:
gotmpl := template.Must(template.New("hello").Parse(`
    <h1>Hello, {{.Name}}!</h1>
`))
data := struct{ Name string }{"World"}
tmpl.Execute(w, data)
If you mistype .Name or pass the wrong data structure, you'll get a runtime error or silent failure.
Templ:
templtempl Hello(name string) {
    <h1>Hello, { name }!</h1>
}
Mistype name and you get a compile-time error. Pass the wrong type and your code won't compile.

- The standard library parses templates at runtime, creating overhead for each request. 
- Templ generates optimized Go code that runs at native speed. In benchmarks, Templ can be 2-3x faster than standard templates for complex rendering.
- Templ files get full IDE support because they compile to Go code.
- Templ errors point to specific lines in your template files, and you can set breakpoints in the generated Go code.
- Templ uses Go syntax you already know, with strong typing throughout.

Templ Advantages:
- Type Safety: Compile-time error checking prevents runtime template failures
- Performance: Generated code runs faster than parsed templates
- IDE Support: Full autocomplete, syntax highlighting, and refactoring
- Component Model: Natural composition and reusability
- Modern DX: Feels like React or Vue but generates server-side HTML
- CSS Integration: Built-in support for scoped styles and dynamic classes

### Lesson 4.2: Building with Templ: Creating Base Layouts

```templ
package views

import (
    "fmt"
    "time"
)

templ base() {
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<title>
				Technical Ramblings
			</title>
		</head>
		<body>
	        <nav>
	        	<ul>
	                <li><
	                	<a href="/">Home</a>
	                </li>
	        	</ul>
	        </nav>
			{ children... }
	        <footer>
	        	<p>
	        		All rights reserved.
	        	</p>
	        	<p>
	        		{ fmt.Sprintf("©%v", time.Now().Year()) } <a href="https://mbvlabs.com">mbvlabs</a>
	        	</p>
	        </footer>
		</body>
	</html>
}
```

### Lesson 4.3: Building The Landing page

```templ
package views

templ LandingPage() {
	@base() {
		<main>
			<section>
				<h1>
					software engineering, prompting and existential dread
				</h1>
				<p>
					a tech blog exploring software engineering until our AI overlords takes over.
				</p>
			</section>
			<section>
				<div>
	                <a href="">
	                    Twitter
	                </a>
	                <a href="">
	                    LinkedIn
	                </a>
	                <a href="">
	                    GitHub
	                </a>
				</div>
			</section>
			<section>
	            <h2>Latest Articles</h2>
				<div>
	                <div>
	                	<h3>
	                		How to get started with Golang
	                	</h3>
	                	<p>
	                		A simple guide for how you can get started quickly writing Golang.
	                	</p>
	                    <a href="/articles/how-to-get-started-with-golang">
	                    	Read here
	                    	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
	                    		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
	                    	</svg>
	                    </a>
	                </div>
				</div>
			</section>
		</main>
	}
}
```

```go
func (c *Controller) LandingPage(ec echo.Context) error {
	return views.LandingPage().
		Render(ec.Request().Context(), ec.Response())
}
```

```go
func (r *Router) LoadRoutes() *echo.Echo {
	r.routes.GET("", func(c echo.Context) error {
		return r.ctrls.LandingPage(c)
	})

	return r.routes
}
```

### Lesson 4.4: Extracting elements into components

```templ
templ navigationItem(link, title string) {
	<li>
		<a href={ templ.SafeURL(link) }>{ title }</a>
	</li>
}

templ navigation() {
	<nav>
		<ul>
			@navigationItem("/", "Home")
		</ul>
	</nav>
}

templ footer() {
	<footer>
		<p>
			All rights reserved.
		</p>
		<p>
			{ fmt.Sprintf("©%v", time.Now().Year()) } <a href="https://mbvlabs.com">mbvlabs</a>
		</p>
	</footer>
}
```

```templ
templ socialLink(href, text string) {
	<a href={ templ.SafeURL(href) }>
		{ text }
	</a>
}

templ sectionHeader(title string) {
	<h2>{ title }</h2>
}

templ ctaLinkWithArrow(href, text string) {
	<a href={ templ.SafeURL(href) }>
		{ text }
		<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
		</svg>
	</a>
}

templ articleCard(title, excerpt, slug string) {
	<div>
		<h3>
			{ title }
		</h3>
		<p>
			{ excerpt }
		</p>
		@ctaLinkWithArrow(fmt.Sprintf("/articles/%v", slug), "Read now")
	</div>
}
```

```templ
templ LandingPage() {
	@base() {
		<main>
			<section>
				<h1>
					software engineering, prompting and existential dread
				</h1>
				<p>
					a tech blog exploring software engineering until our AI overlords takes over.
				</p>
			</section>
			<section>
				<div>
					@socialLink("", "Twitter/X")
					@socialLink("", "LinkedIn")
					@socialLink("", "GitHub")
				</div>
			</section>
			<section>
				@sectionHeader("Latest Articles")
				<div>
					@articleCard("How do get started with Golang", "A simple guide for how you can get started quickly writing Golang.", article.Slug)
				</div>
			</section>
		</main>
	}
}
```

### Lesson 4.5: Building The article page

```templ
package views

templ ArticlePage(title, date, content, author, content, readTime string) {
	@base() {
		<main>
			<article>
				<header>
					<h1>
						{ title }
					</h1>
	            <div>
	            	<div>
	            		<span>Published on: { date }</span>
	            		<span>•</span>
	            		<span>by <span>{ author }</span></span>
	            	</div>
	            	<div>
	            		<span>{ readTime } min read</span>
	            		<span>•</span>
	            		<span>{ category }</span>
	            	</div>
	            </div>
				</header>
				<p>{ content }</p>
			</article>
		</main>
	}
}
```

```go
func (c *Controller) ArticlePage(ec echo.Context) error {
	return views.ArticlePage("", "", "", "", "", "").
		Render(ec.Request().Context(), ec.Response())
}
```

```go
func (r *Router) LoadRoutes() *echo.Echo {
	r.routes.GET("", func(c echo.Context) error {
		return r.ctrls.LandingPage(c)
	})

	r.routes.GET("/articles/:slug", func(c echo.Context) error {
		return r.ctrls.ArticlePage(c)
	})

	return r.routes
}
```

## Module 5: Utility-first styles with tailwind

### 5.1: Introduction to Tailwind CSS: The Utility-First Philosophy

### 5.2: Adding tailwind to the project

```sh
npm init
```

```json
{
	"name": "master-fullstack-golang",
	"version": "1.0.0",
	"type": "module",
	"author": "mbv",
	"license": "ISC",
	"scripts": {
		"build-css": "vite build"
	},
	"dependencies": {
		"@tailwindcss/vite": "^4.1.8",
		"tailwindcss": "^4.1.8"
	},
	"devDependencies": {
		"@tailwindcss/typography": "^0.5.16"
	}
}
```

```js
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(() => {
	return {
		build: {
			emptyOutDir: false,
			outDir: "./assets/css",
			rollupOptions: {
				output: {
					assetFileNames: "styles.css",
				},
				input: "./base.css",
			}
		},
		server: false,
		plugins: [
			tailwindcss(),
		],
	}
})
```

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@source "./views";
```

### 5.3: Static Assets in Go

```go
package assets

import "embed"

//go:embed *
var Files embed.FS
```

```go
func (c *Controller) Styles(ec echo.Context) error {
	file, err := assets.Files.ReadFile("css/styles.css")
	if err != nil {
		return err
	}

	return ec.Blob(http.StatusOK, "text/css", file)
}
```

```go
func (r *Router) LoadRoutes() *echo.Echo {
	r.routes.GET("", func(c echo.Context) error {
		return r.ctrls.LandingPage(c)
	})

	r.routes.GET("/articles/:slug", func(c echo.Context) error {
		return r.ctrls.ArticlePage(c)
	})

	--> r.routes.GET("/assets/css/styles.css", func(c echo.Context) error {
	--> 	return r.ctrls.Styles(c)
	--> })

	return r.routes
}
```

```templ
templ base() {
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<title>
				Technical Ramblings
			</title>
			--> <link href="/assets/css/styles.css" rel="stylesheet"/>
		</head>
		<body>
			@navigation()
			{ children... }
			@footer()
		</body>
	</html>
}
```

### 5.4: Adding styles to Landing page

```
templ LandingPage() {
	@base() {
		<main class="flex-1 w-full flex flex-col">
			<section class="mt-16 flex flex-col items-center text-center max-w-4xl mx-auto">
				<h1 class="text-5xl font-bold mb-6 leading-tight text-gray-900">
					software engineering, prompting and existential dread
				</h1>
				<p class="text-base text-xl text-gray-600 max-w-2xl leading-relaxed">
					a tech blog exploring software engineering until our AI overlords takes over.
				</p>
			</section>
			<section class="mt-12 px-8 flex justify-center">
				<div class="flex gap-8">
					@socialLink("", "Twitter/X")
					@socialLink("", "LinkedIn")
					@socialLink("", "GitHub")
				</div>
			</section>
			<section class="mt-16 px-8 max-w-4xl mx-auto w-full">
				@sectionHeader("Latest Articles")
				<div class="grid grid-cols-1">
					@articleCard("How do get started with Golang", "A simple guide for how you can get started quickly writing Golang.", article.Slug)
				</div>
			</section>
		</main>
	}
}
```

### 5.5: Making landing page responsive

Notes:
- acknowledge that we have been doing things the wrong way according to 5.1 (laptop first instead of mobile)

```templ
templ LandingPage() {
	@base() {
		<main class="flex-1 w-full flex flex-col">
			<section class="mt-8 md:mt-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center max-w-4xl mx-auto">
				<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight text-gray-900">
					software engineering, prompting and existential dread
				</h1>
				<p class="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
					a tech blog exploring software engineering until our AI overlords takes over.
				</p>
			</section>
			<section class="mt-8 md:mt-12 px-4 sm:px-6 lg:px-8 flex justify-center">
				<div class="flex gap-4 sm:gap-8">
					@socialLink("", "Twitter/X")
					@socialLink("", "LinkedIn")
					@socialLink("", "GitHub")
				</div>
			</section>
			<section class="mt-12 md:mt-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
				@sectionHeader("Latest Articles")
				<div class="grid grid-cols-1">
					for _, article := range payload {
						@articleCard(article.Title, article.Excerpt, article.Slug)
					}
				</div>
			</section>
		</main>
	}
}
```

### 5.6: Adding styles to components

```templ
templ socialLink(href, text string) {
	<a class="py-2 px-4 text-center sm:text-left text-slate-600 font-medium hover:text-gray-900 hover:underline transition-colors min-h-[44px] flex items-center justify-center" href={ templ.SafeURL(href) }>
		{ text }
	</a>
}

templ ctaLinkWithArrow(href, text string) {
	<a class="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm" href={ templ.SafeURL(href) }>
		{ text }
		<svg class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
		</svg>
	</a>
}

templ sectionHeader(title string) {
	<h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">{ title }</h2>
}

templ articleCard(title, excerpt, slug string) {
	<div class="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer">
		<h3 class="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
			{ title }
		</h3>
		<p class="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
			{ excerpt }
		</p>
		@ctaLinkWithArrow(fmt.Sprintf("/articles/%v", slug), "Read now")
	</div>
}
```

### 5.7: Adding styles to the article page

```templ
templ ArticlePage(title, date, content, author, category, readTime string) {
	@base() {
		<main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<article class="bg-white prose lg:prose-xl">
				<header class="mb-8">
					<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
						{ title }
					</h1>
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 border-b border-gray-200 pb-6">
						<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
							<span class="font-medium">Published on: { date }</span>
							<span class="hidden sm:inline">•</span>
							<span>by <span class="font-medium text-gray-900">{ author }</span></span>
						</div>
						<div class="flex items-center gap-4 mt-2 sm:mt-0">
							<span>{ readTime } min read</span>
							<span class="hidden sm:inline">•</span>
							<span>{ category }</span>
						</div>
					</div>
				</header>
				<p>Content</p>
			</article>
		</main>
	}
}
```

## Module 6: Markdown, frontmatter and processing

### 6.1: Content Storage Strategies (embed vs db)

### 6.2: Markdown for Blogging

Notes:
- add a few dummy articles to assets without frontmatter

### 6.3: Frontmatter: Adding Structured Metadata to Markdown Files

Notes:
- add meta data to articles
- talk about slugs

### 6.4: The Rendering Pipeline: Parsing Markdown to HTML

Notes:
- talk about dependency injection and how it can be too much of a good thing

```go
package services

import (
	"bytes"

	chromahtml "github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/yuin/goldmark"
	highlighting "github.com/yuin/goldmark-highlighting/v2"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"go.abhg.dev/goldmark/frontmatter"
)

var markdownParser = goldmark.New(
	goldmark.WithExtensions(
		&frontmatter.Extender{},
		extension.GFM,
		highlighting.NewHighlighting(
			highlighting.WithStyle("nord"),
			highlighting.WithFormatOptions(
				chromahtml.WithLineNumbers(true),
			),
		),
	),
)

type Meta struct {
	Title    string `yaml:"title"`
	Date     string `yaml:"date"`
	Desc     string `yaml:"description"`
	Slug     string `yaml:"slug"`
	ReadTime string `yaml:"readTime"`
}

type Article struct {
	Content string
	Meta    Meta
}

func ParseMarkdownToHtml(content string) (Article, error) {
	var htmlOutput bytes.Buffer
	parserCtx := parser.NewContext()
	if err := markdownParser.Convert([]byte(content), &htmlOutput, parser.WithContext(parserCtx)); err != nil {
		return Article{}, err
	}

	var meta Meta
	if err := frontmatter.Get(parserCtx).Decode(&meta); err != nil {
		return Article{}, err
	}

	return Article{
		Content: htmlOutput.String(),
		Meta:    meta,
	}, nil
}
```

```go
func (c *Controller) ArticlePage(ec echo.Context) error {
	slug := ec.Param("slug")
	file, err := assets.Files.ReadFile(fmt.Sprintf("articles/%s.md", slug))
	if err != nil {
		return err
	}

	article, err := services.ParseMarkdownToHtml(string(file))
	if err != nil {
		return err
	}

	return views.ArticlePage(article.Meta.Title, article.Meta.Date, article.Content, article.Meta.ReadTime).
		Render(ec.Request().Context(), ec.Response())
}
```

```go
func (c *Controller) LandingPage(ec echo.Context) error {
	files, err := assets.Files.ReadDir("articles")
	if err != nil {
		return err
	}

	articles := make([]views.ArticlePayload, len(files))
	for i, dirEntry := range files {
		if dirEntry.IsDir() {
			continue
		}
		file, err := assets.Files.ReadFile("articles/" + dirEntry.Name())
		if err != nil {
			return err
		}

		parsedArticle, err := services.ParseMarkdownToHtml(string(file))
		if err != nil {
			return err
		}

		articles[i] = views.ArticlePayload{
			Title:   parsedArticle.Meta.Title,
			Excerpt: parsedArticle.Meta.Desc,
			Slug:    parsedArticle.Meta.Slug,
		}
	}

	return views.LandingPage(articles).
		Render(ec.Request().Context(), ec.Response())
}
```
