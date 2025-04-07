---
id: projects--golang-blog-course-index
aliases:
  - gbc
tags:
  - course
  - golang
---

[Back To Index](/projects/index.md)

# Golang Blog Course

<!--toc:start-->
- [Golang Blog Course](#golang-blog-course)
  - [Outline](#outline)
    - [Module One - Introduction](#module-one-introduction)
    - [Module Two - Tech Stack Walkthrough](#module-two-tech-stack-walkthrough)
    - [Module Three - Creating the MVP](#module-three-creating-the-mvp)
    - [Module Four - Managing content](#module-four-managing-content)
    - [Module Five - Adding a Databases](#module-five-adding-a-databases)
    - [Module six - Managing our blog](#module-six-managing-our-blog)
    - [Module seven - Adding subscribers](#module-seven-adding-subscribers)
    - [Module eight - Sending newsletter](#module-eight-sending-newsletter)
    - [Module nine - Going live](#module-nine-going-live)
    - [Bonus Module - SEO and Blogging tips](#bonus-module-seo-and-blogging-tips)
  - [Module One](./module_one.md#module-one)
  - [Module two](./module_two.md#module-two)
  - [Module three](./module_three.md#module-three)
  - [Module four](./module_four.md#module-four)
  - [Module five](./module_five.md#module-five)
  - [Module six](./module_six.md#module-six)
  - [Module seven](./module_seven.md#module-seven)
  - [List of courses](#list-of-courses)
<!--toc:end-->

## TODOs

- [ ] Reshoot M3E3 (wrong tailwind directive)

## Outline

Taking some inspiriation from Aaron Francis's High Performance Sqlite and dividing everything into modules. 

Look into how Jon Calhoun has structured his Web Development Course.

Aim is around 2-3 hours content.

Overall goal: get people new to Go efficient in building web applications in a Go stack with a multi-page application approach (traditional apps).

It should cover:
1. Why Go and MPA
2. Structuring Go apps
3. Achieving just enough interactivity (htmx + alpinejs)
4. Databases
5. Authentication
6. Subscribers and newsletters
7. Servers and deployments
8. (bonus) SEO for developers

*Version 1**:
### Module One - Introduction
1. Welcome and what are we building (Welcome to the lab)
2. Why Go
3. Why build and start a blog
4. What about React/Vue/Nextjs/etc
5. Getting setup and source files<

### Module Two - Tech Stack Walkthrough
1. Quick introduction to Go (skip if know Go)
2. Structuring Go apps & MVC
3. Creating views with templ
4. Just enough interactivity (HTMX & alpine.js)
5. Databases
6. Servers, routers and endpoints

### Module Three - Creating the MVP
1. What are the minimum requirements?
2. Setting up echo and our first handlers/controllers
3. Creating our first views
4. Wrapping our views in layouts
5. Styling with tailwind
6. Utilizing Go embed for static assets
7. Styling the home page
8. Styling the article page
9. Adding HTMX and Alpinejs to static assets

### Module Four - Managing content
1. Choose your path (least amount of work, s3ish vs embed etc)
2. Writing in markdown
3. Adding a post manager
4. Frontmatter and meta information
5. Serving content
6. Parsing markdown to html
7. Making our code examples look nice
8. (bonus) Add a R2 bucket for content?

### Module Five - Adding a Databases
1. Postgres and setup
2. What is migrations
3. Our first migration: posts table
4. Adding the database layer
5. Showing our latest posts
6. Slugs and human readable URLs
7. (bonus) What about sqlite3?

### Module six - Managing our blog
1. What are the minimum requirements?
2. Separate from base layout
3. Creating a rough outline of the dashboard
4. Our second migration: users table
5. Introduction to authentication
6. Salting and hashing passwords
7. Authenticating users
8. Remember me
9. Managing blog posts through CRUD
10. Our third migration: altering posts table (is_draft)
11. Only show posts not in draft

### Module seven - Adding subscribers
1. What are the minimum requirements?
2. Our fourth migration: subscribers table
3. Creating our subscription form
4. Adding interactivity with htmx
5. Saving new subscribers in the database
6. Verifying subscriber emails
7. Our fifth migration: tokens table
8. Email validation tokens
9. Email validation view
10. Sending validation emails (html + txt with aws SES)
11. Making it all come together

### Module eight - Sending newsletter
1. What are the minimum requirements?
2. Our sixth migration: newsletters table
3. Necessary CRUD operations
4. Adding a WYSIWYG editor
5. Sending a newsletter and idempotency
6. Respecting privacy: unsubscribe tokens
7. Updating base email template
8. Create newsletter email
9. Finishing up

### Module nine - Going live
1. Optimize for the one-man army
2. Make servers great again (Servers are not dangerous?)
3. Setting up a reverse proxy with caddy
4. Using systemd to run your application
5. Containerising your application
6. Zero downtime deploys with traefik
7. Simple postgres setup

### Bonus Module - SEO and Blogging tips
1. Write down your ideas
2. Research related keywords
3. Cross post
4. Adopt a fuck-it attitude

## List of courses

- [Jon Calhoun](https://usegolang.com) | $299 one-time payment + upsells
- [Markus](https://golang.dk) | €100 one-time payment + upsells
- [The Ultimate Guide to Debugging With Go](https://www.bytesizego.com/the-ultimate-guide-to-debugging-with-go) - $99 one-time payment
- [The Art of Command Line Interfaces](https://www.bytesizego.com/art-of-cli-golang) | $99 one-time payment
- [Full Time Go Dev]https://fulltimegodev.com/)
