---
id: projects--golang-blog-course--module-four-index
aliases:
  - gbc
tags: []
---

[Back](/projects/golang-blog-course/index.md)

<!--toc:start-->
- [Module Four](#module-four)
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
<!--toc:end-->

# Module Four

Current Planned Vids:
1. Choose your own adventure
2. Writing in markdown (?)
3. Parsing markdown to HTML
4. Frontmatter and meta information
5. Making our code examples look nice
6. Final touches to the site

## Episode 1

Should provide the viewer with an overview of the available options for storing the article content.

Options to focus on:
1. S3 compatible storage in front of an CDN
  - more engineering overhead
  - might be better once you've enough articles
2. Embedding articles in binary
  - less engineering overhead
  - might not scale as well when num articles reach a certain point

Quick explanation of how you'd setup S3 bucket and CDN.

Talk about why and how we're going to use option 2 for this course.

### Episode 1 Script

Welcome to module 4!

Before we get started building the functionality to start showing real articles on the blog, I want to provide you with two paths forward.

Essentially, we need to store our articles as files _somewhere_. 

We've already setup a way to embed static files the binary of our application.

But, we could also opt for another approach and use something like S3-compatible storage, put it in front of a CDN and call it a day.

This would technically be a more scalable approach compared to embedding the files in the binary, but also adds overhead.

---

Let's start with the more scalable but complex option: using S3-compatible storage with a CDN.

What you'll need:
- An S3 bucket or compatible storage service
- A CDN service like Cloudflare or CloudFront
- Basic setup:
  1. Create your bucket
  2. Configure CDN to point to bucket
  3. Upload articles as files
  4. Serve via CDN URLs

Pros:
- Highly scalable
- Great for large number of articles
- Efficient content delivery
- Easy to update content

Cons:
- More complex setup
- Additional running costs
- More moving parts to maintain

---

Now let's look at embedding articles directly in your application binary:
- Articles stored as part of your Go code
- Compiled directly into your application
- No external dependencies
- Perfect for smaller blogs

Pros:
- Simple to implement
- Zero additional infrastructure
- Fast deployment
- No extra costs

Cons:
- Requires rebuild to update content
- Less suitable for large content volumes
- Larger binary size

---

For this course, we'll use the binary embedding approach because:
- It's perfect for learning
- Minimal setup required
- Focus on Go programming
- Easy to understand and implement

In the next video, we'll dive into writing our articles in markdown and how to embed them in our application.

## Episode 2

Focus on what markdown is, why it's good and what it offers us compared to using a WYSIWYG editor.

### Episode 2 Script

Since you bought a course on programming you have probably already heard and are familiar with markdown.

Markdown is a lightweight markup language that lets you write formatted text using simple, easy-to-read plain text symbols - 
for example, using asterisks to make text *bold* or hashtags to create headings. 

The simplicity of Markdown means you can write content in any text editor without needing special software, and its plain text 
nature makes it perfect for version control systems like Git. 

Unlike complex word processors or HTML editors, markdown allows you to focus on writing content while using intuitive symbols 
like dashes for lists or backticks for code blocks, making it incredibly beginner-friendly. 

It's widely used by developers, writers, and content creators because your markdown files can be easily converted into properly formatted HTML, PDFs, or other document formats. 
Let me show you the basic syntax of Markdown and how it looks when written:

# This is a Level 1 Header
## This is a Level 2 Header
### This is a Level 3 Header

You can make text **bold** using double asterisks, or *italic* using single asterisks.
You can also combine them for ***bold and italic*** text.

Here's how to create lists:

Unordered list:
- First item
- Second item
  - Sub-item
  - Another sub-item
- Third item

Numbered list:
1. First step
2. Second step
3. Third step

To create a link, use [square brackets for the text](https://example.com)

> This is how you create a blockquote
> You can have multiple lines
> In your quote

For code, you can use `inline code` with single backticks

Or create code blocks with triple backticks:
```go
func main() {
    fmt.Println("Hello, World!")
}
```

You can also create tables:
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

---
Three hyphens create a horizontal rule like the one above

And finally, you can add images like this:
![Alt text for image](image-url.jpg)

That covers most of the common Markdown syntax you'll use daily!

## Episode 3

Add an article package that provides a variable with all our embedded articles.

Should setup Goldmark for parsing.

### Episode 3 Script

INTRO 

In our previous episode, we explored different approaches for storing blog content and decided to embed our articles directly in our binary for its simplicity and ease of implementation. Now it's time to put that decision into action.

In this episode, we'll build the core functionality that makes our embedded articles work. We'll create a robust system for managing markdown content, including setting up the file structure, creating an articles package to handle our embedded files, and implementing the Goldmark markdown parser to transform our content into HTML.

By the end of this video, you'll have a working system that can:
- Embed markdown files into your binary
- List all available articles
- Parse markdown content into HTML
- Display formatted articles on your blog

---

1. Create folders
2. Add dummy article

```sh
mkdir -p articles/content
```

```sh
vi articles/content/article-1.md
```

```md
## Sub header

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Cras libero justo, feugiat eget risus eleifend, scelerisque tristique ante.
Vivamus non dui lorem. Aliquam vulputate justo sed venenatis ornare.
In vel sollicitudin odio. Nunc scelerisque, ante vitae iaculis bibendum,
tortor sem ullamcorper neque, nec lacinia urna nisi pellentesque erat.
Pellentesque habitant morbi tristique senectus et netus et malesuada fames
ac turpis egestas. Vivamus ac tortor mattis, mattis metus sit amet, lacinia
nulla. Nunc consequat vitae turpis nec eleifend.

## Sub header

Praesent in urna eu odio placerat semper non quis neque. Vestibulum ante
ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
Maecenas vitae pretium odio. Fusce mollis massa sapien, nec luctus augue
mollis ac. Curabitur at cursus enim, quis mollis elit.

Integer aliquam, dui et tincidunt fringilla, diam orci consectetur tellus,
sed volutpat nulla metus a enim. Phasellus eget nisl eu massa gravida

```go
package main

import "fmt"

func main() {
        fmt.Println("Hello, world!")
}
```

---

1. Add articles.go file
2. Add logic to embed files
3. Add func to pull out all files and return filenames

```go
// articles/articles.go
package articles

import "embed"

//go:embed content/*.md
var embeddedArticles embed.FS

const contentDir = "content"

func GetAll() ([]string, error) {
    files, err := embeddedArticles.ReadDir(contentDir)
    if err != nil {
        return nil, err
    }

    var fileNames []string
    for _, file := range files {
        if file.IsDir() {
            continue
        }

        fileNames = append(fileNames, strings.Split(file.Name(), ".")[0])
    }

    return fileNames, nil
}
```

---

1. Pull out all article files
2. Update the articleCards to use a loop
3. Show home page

```templ
// views/home.html
templ HomePage(files []string) {
// remove hardcoded articleCards
for _, file := range files {
   @articleCard(file, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", fmt.Sprintf("/articles/%s", file))
}
```

```go 
// controllers/controller.go
func Home(c echo.Context) error {
    articles, err := articles.GetAll()
    if err != nil {
        slog.Error("failed to get articles", "error", err)
        return err
    }

    return views.HomePage(files).Render(c.Request().Context(), c.Response())
}
```

1. Fix layout issues in base and homepage
2. Show screen

```templ
// views/base.html
templ base() {
    <main class="flex-1 flex flex-col w-full">
        { children...}
    </main>
}
```

```templ
// views/home.html
templ HomePage(files []string) {
    <div class="h-full flex-1 bg-base-100 container mx-auto flex flex-col items-center">
        // omitted
    </div>
}
```

---

1. Add goldmark
2. Add parser func
3. Add GetByName func

```sh 
go get github.com/yuin/goldmark 
```

```go
// articles/articles.go
package articles

func parseContent(content string) (string, error) {
    var htmlOutput bytes.Buffer
    if err := goldmark.Convert([]byte(content), &htmlOutput); err != nil {
        return "", nil
    }

    return htmlOutput.String(), nil
}
```

```go
// articles/articles.go
package articles

func GetByName(fileName string) (string, error) {
    content, err := embeddedArticles.ReadFile(fmt.Sprintf("%s/%s.md", contentDir, name)
    if err != nil {
        return "", err
    }

    return parseContent(string(content)), nil
}

func parseContent(content string) (string, error) {
    var htmlOutput bytes.Buffer
    if err := goldmark.Convert([]byte(content), &htmlOutput); err != nil {
        return "", nil
    }

    return htmlOutput.String(), nil
}
```

---

1. Update ArticleView
2. Update ArticleHandler
3. Show screen

```templ

import (
    "context"
    "io"
)
// views/article.templ
func unsafe(html string) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, w io.Writer) (err error) {
		_, err = io.WriteString(w, html)
		return err
	})
}

templ ArticlePage(title, content string) {
    // remove hardcoded text
    <article class="mt-12 w-full px-4 md:px-0 md:w-4/5 prose lg:prose-xl text-base-content prose:h2:text-base-content">
        @unsafe(content)
    </article>
}
```

```go 
// controllers/controller.go
func Article(c echo.Context) error {
    // omitted
    article, err := articles.GetByName(slug)
    if err != nil {
        slog.Error("could not get article", "error", err.Error())
        return err
    }

    return views.ArticlePage(slug, article).Render(c.Request().Context(), c.Response())
}
```

---

Great! 

We've now got our markdown articles successfully embedding into our binary and rendering as HTML on our blog. 
The system we've built provides a solid foundation for managing and displaying our content.

However, you might have noticed that we're still missing some important metadata about our articles - things like publication dates, author information, or article descriptions. In the next episode, we'll enhance our system by implementing frontmatter support.

Frontmatter is a powerful way to add structured metadata to our markdown files, which will allow us to:
- Add proper titles and descriptions to our articles
- Include publication dates and author information
- Create better article previews on our home page
- Organize our content with tags and categories

## Episode 4

Explain on frontmatter and meta information.

Add frontmatter parsing to the goldmark parser and, add an extra article and add the relevant frontmatter/metainformation to these articles.

### Episode 4 Script

INTRO

---

1. Install extension
2. Add fronmatter extension
3. Add meta information parser to parse content
4. Update GetByName
5. Update GetAll

```sh 
go get go.abhg.dev/goldmark/frontmatter@latest
```

```go
// articles/articles.go
// uses optional pattern - show Markdown & Extender interface
var md = goldmark.New(
    goldmark.WithExtensions(&frontmatter.Extender{}),
)
```

```go
// articles/articles.go
type Article struct {
    Content string
    Meta Meta
}

type Meta struct {
    Title string    `yaml:"title"`
    Date  string    `yaml:"date"`
    Desc  string    `yaml:"description"`
    Tags  []string  `yaml:"tags"`
    Slug  string    `yaml:"slug"`
}
```

```go
// articles/articles.go
func parseContent(content string) (Article, error) {
    var htmlOutput bytes.Buffer
    parserCtx := parser.NewContext()

    if err := md.Convert([]byte(content), &htmlOutput, parser.WithContext(parserCtx)); err != nil {
        return Article{}, err
    }

    var meta Meta
    if err := frontmatter.Get(parserCtx).Decode(&meta); err != nil {
        return Article{}, err
    }

    return Article{
        Content: htmlOutput.String(),
        Meta: meta,
    }, nil
}
```

---

```go
// articles/articles.go
func Get(name string) (Article, error) {
    article, err := embeddedArticles.ReadFile(fmt.Sprintf("%s/%s.md", contentDir, name)
    if err != nil {
        return Article{}, err
    }

    return article, nil
}
```

```go
// articles/articles.go
func GetAll() ([]Article, error) {
    files, err := embeddedArticles.ReadDir(contentDir)
    if err != nil {
        return nil, err
    }

    var articles []Article
    for _, file := range files {
        if file.IsDir() {
            continue
        }

        article, err := GetByName(strings.Split(file.Name(), ".")[0])
        if err != nil {
            return nil, err
        }

        articles = append(articles, article)
    }

    return articles, nil
}
```

---

1. Update ArticlePage to include date from Frontmatter
2. Update HomePage to list Articles with title, desc and tags from Frontmatter
3. Update Controllers
4. Add metadata to article
5. Show screen

```templ
// views/article.templ
templ ArticlePage(article Article) {
    // omitted
    <h1>{article.Meta.Title}</h1>
    <div>
        <p>{ article.Meta.Date }</p>
    </div>
    <article>
        @unsafe(article.Content)
    </article>
}
```

```templ
// views/home.templ
templ HomePage(articles []articles.Article) {
    for _, article := range articles {
		@articleCard(article.Meta.Title, article.Meta.Desc, fmt.Sprintf("/articles/%s", article.Meta.Slug), article.Meta.Tags)
    }
}
```

```go
// controllers/controller.go
func Home(c echo.Context) error {
	articles, err := articles.GetByAll()
	if err != nil {
		slog.Error("could not get articles", "error", err.Error())
		return err
	}

	return views.HomePage(articles).Render(c.Request().Context(), c.Response())
}
```

```go
// controllers/controller.go
func Article(c echo.Context) error {
	slug := c.Param("slug")

	article, err := articles.GetByName(slug)
	if err != nil {
		slog.Error("could not get article", "error", err.Error())
		return err
	}

	return views.ArticlePage(article.Meta.Title, article.Content, article.Meta.Date).
		Render(c.Request().Context(), c.Response())
}
```

REMEMBER TO UPDATE FILE AND RESTART SERVER

```md
// articles/content/article-1.md
---
title: My first article
tags: [test, learning]
description: |
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
date: 2024-11-20
slug: article-1
---
```
---

OUTRO

## Episode 5

Adds the highlight extension.

Discuss the chroma package.

Show we have access to different languages syntax out of box.

### Episode 5 Script

INTRO

---

1. Get required packages
2. Update `md` with new extensions
3. Show page

```sh 
go get -u github.com/alecthomas/chroma/v2
go get -u github.com/yuin/goldmark-highlighting/v2
```

```go 
import (
    //omitted

	chromahtml "github.com/alecthomas/chroma/v2/formatters/html"
	highlighting "github.com/yuin/goldmark-highlighting/v2"
)

// articles/article.go
var md = goldmark.New(
	goldmark.WithExtensions(
		&frontmatter.Extender{},
		highlighting.NewHighlighting(
			highlighting.WithStyle("gruvbox"),
			highlighting.WithFormatOptions(
				chromahtml.WithLineNumbers(true),
			),
		),
	),
)
```

---

1. Add article-2 with different code language examples
1. Make fun of JavaScript
2. Show browser

```md
// articles/content/article-2.md
```rust
pub fn main() {
    println!("hello, world");
}
```

```js
function main() {
    console.log("hello world");
}
```

---

OUTRO

## Episode 6

Add other articles, footer and 500 page.

Talk about showing different approaches to templ.

Set up the stage for module 5.

### Episode 6 Script

Welcome to the final episode of Module 4! In this video, we'll put the finishing 
touches on our blog by adding two important components: 
an About page and proper error handling pages.

We'll explore different approaches to using templ, including a more object-oriented 
style with methods, and I'll show you how to implement the builder pattern for 
creating flexible, configurable error pages. By the end of this episode, our 
blog will have a more professional feel with proper error handling and a 
complete user experience.

Let's dive in and see how we can make our blog more robust and user-friendly!

---

```templ
type AboutPage struct {
	Paragraphs []string
}

templ (ap AboutPage) Compile() {
	@base() {
		<div class="h-full flex-1 bg-base-100 container mx-auto flex justify-center items-center py-10">
			<div class="mt-10 w-full md:w-1/2 flex flex-col">
				<h1 class="text-4xl font-bold text-base-content mb-2">About My Blog</h1>
				for _, paragraph := range ap.Paragraphs {
					<p class="text-lg text-base-content mb-4">{ paragraph }</p>
				}
			</div>
		</div>
	}
}
```

```go
func About(c echo.Context) error {
	return views.AboutPage{
		Paragraphs: []string{},
	}.Compile().
		Render(c.Request().Context(), c.Response())
}
```

```go
r.e.GET("/about", func(c echo.Context) error {
	return controllers.About(c)
})
```

```go
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a enim ac lacus mollis lobortis ut sed ex. Mauris leo dolor, iaculis in lorem vel, egestas condimentum purus. Nunc volutpat dolor et sapien tincidunt mollis. Maecenas egestas magna et mi tempor aliquet. Nullam nec dignissim lectus. Suspendisse potenti. Maecenas in tempus nisi, nec tincidunt augue. Integer sed ante enim. Proin ut orci mollis, tristique est ac, sodales tortor. Donec ullamcorper ligula velit, eget bibendum sem porttitor ac. Mauris elit diam, tempus vitae lectus ut, pulvinar gravida neque. Sed in nulla sollicitudin, suscipit velit vel, ultrices felis. Suspendisse commodo eros id nisl consectetur, quis posuere felis ultrices. Fusce tincidunt tincidunt sagittis.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id finibus dolor. Aenean dignissim sapien vitae viverra pellentesque. Sed id ipsum ut dolor vulputate sodales. Nunc iaculis, velit nec placerat eleifend, erat urna feugiat diam, at semper diam turpis non purus. Nam nec pretium nisl. Vivamus ligula sem, elementum sit amet malesuada in, efficitur a elit. Duis in tempor tellus. Mauris ligula ante, dignissim elementum pharetra vel, commodo suscipit elit. Nulla dapibus volutpat ligula, sed porttitor massa interdum et. Phasellus ac dui et arcu tincidunt elementum at ut quam.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id finibus dolor. Aenean dignissim sapien vitae viverra pellentesque. Sed id ipsum ut dolor vulputate sodales. Nunc iaculis, velit nec placerat eleifend, erat urna feugiat diam, at semper diam turpis non purus. Nam nec pretium nisl. Vivamus ligula sem, elementum sit amet malesuada in, efficitur a elit. Duis in tempor tellus. Mauris ligula ante, dignissim elementum pharetra vel, commodo suscipit elit. Nulla dapibus volutpat ligula, sed porttitor massa interdum et. Phasellus ac dui et arcu tincidunt elementum at ut quam.",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id finibus dolor. Aenean dignissim sapien vitae viverra pellentesque. Sed id ipsum ut dolor vulputate sodales. Nunc iaculis, velit nec placerat eleifend, erat urna feugiat diam, at semper diam turpis non purus. Nam nec pretium nisl. Vivamus ligula sem, elementum sit amet malesuada in, efficitur a elit. Duis in tempor tellus. Mauris ligula ante, dignissim elementum pharetra vel, commodo suscipit elit. Nulla dapibus volutpat ligula, sed porttitor massa interdum et. Phasellus ac dui et arcu tincidunt elementum at ut quam.",
```

```templ
<p class={ "text-lg text-base-content", templ.KV("mb-4", i != len(ap.Paragraphs)-1) }>{ paragraph }</p>
```


---

```templ
type errorPageData struct {
	link      string
	linkTitle string
	title     string
	msg       string
}
```

```templ
type errorPageOption func(*errorPageData)

func WithErrPageTitle(title string) errorPageOption {
	return func(isepd *errorPageData) {
		isepd.title = title
	}
}
```

```templ
templ errorPage(data errorPageData) {
	@base() {
		<div class="h-full flex-1 bg-base-100 container mx-auto flex justify-center items-center">
			<div class="w-full md:w-2/5 flex flex-col">
				<h1 class="text-2xl font-bold text-base-content mb-2">{ data.title }</h1>
				<p class="text-lg text-base-content">{ data.msg }</p>
				<div class="flex mt-4 text-lg text-base-content">
					<p class="mr-2">Please try again, or go back to</p>
					<a class="font-semibold hover:underline" href={ templ.SafeURL(data.link) }>{ data.linkTitle }.</a>
				</div>
			</div>
		</div>
	}
}
```

```templ
func ErrorPage(opts ...errorPageOption) templ.Component {
	data := &errorPageData{
		title:     "Oops! Something went wrong on our end",
		msg:       "Sorry this is not working correctly. We have registered this error and are working on fixing it.",
		link:      "/",
		linkTitle: "our home page",
	}

	for _, opt := range opts {
		opt(data)
	}

	return errorPage(*data)
}
```

---

```templ
func WithErrPageMsg(msg string) errorPageOption {
	return func(epd *errorPageData) {
		epd.msg = msg
	}
}

func WithErrPageLink(link string) errorPageOption {
	return func(epd *errorPageData) {
		epd.link = link
	}
}

func WithErrPageLinkTitle(title string) errorPageOption {
	return func(epd *errorPageData) {
		epd.linkTitle = title
	}
}
```

```go
func Home(c echo.Context) error {
	allArticles, err := articles.GetAll()
	if err != nil {
		slog.Error("could not get articles", "error", err.Error())
	--> return views.ErrorPage().Render(c.Request().Context(), c.Response())
	}

	return views.HomePage(allArticles).
		Render(c.Request().Context(), c.Response())
}
```

```go
func Article(c echo.Context) error {
	slug := c.Param("slug")

	article, err := articles.Get(slug)
	if err != nil {
		slog.Error("could not get article", "error", err.Error())
	--> return views.ErrorPage(
	-->	views.WithErrPageTitle("That doesn't seem right"),
    --> views.WithErrPageMsg("Sorry, I couldn't find that article."),
	    ).Render(c.Request().Context(), c.Response())
	}

    // omitted...
}
```

```go
func Article(c echo.Context) error {
    // omitted...

	allArticles, err := articles.GetAll()
	if err != nil {
		slog.ErrorContext(
			c.Request().Context(),
			"could not get all articles",
			"error",
			err,
		)

    --> return views.ErrorPage().Render(c.Request().Context(), c.Response())
	}

    // omitted...
```

---

```go
func (r Routes) Load() *echo.Echo {
	// omitted

--> r.e.GET("*", func(c echo.Context) error {
--> 	return views.ErrorPage(views.WithErrPageTitle("Oops!"), views.WithErrPageMsg("We could not find the page you're looking for.")).
--> 		Render(c.Request().Context(), c.Response())
--> })

	return r.e
}
```

---

And there we have it! We've successfully added an About page and implemented a flexible error handling system using templ. We've seen how templ can be used in different ways - from simple component functions to more complex patterns like the builder pattern we used for our error pages.

Our blog now handles various error scenarios gracefully, providing users with clear messages and helpful navigation options when things go wrong. We've also demonstrated how to structure larger components with multiple configuration options while keeping the code clean and maintainable.

In the next module, we'll focus on adding authentication and user management to our blog, allowing us to create an admin interface for managing our content. See you there!
