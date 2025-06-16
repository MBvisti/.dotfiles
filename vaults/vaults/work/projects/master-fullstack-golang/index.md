---
id: projects--master-fullstack-golang-course-index
aliases: []
tags: []
---

[Back To Index](/projects/index.md)

# Master Fullstack Golang

<!--toc:start-->
- [Master Fullstack Golang](#master-fullstack-golang)
  - [Outline](#outline)
     - [Part 1: Foundations](#part-1-foundations)
     - [Part 2: Building A Static Blog](#part-1-foundations)
     - [Part 3: Becoming data-driven](#part-1-foundations)
     - [Part 4: Authentication and Management](#part-1-foundations)
     - [Part 5: Building an audience](#part-1-foundations)
     - [Part 6: Going live](#part-1-foundations)
  - [Part 1: Foundations](./part-one-foundations.md)
  - [Part 2: Building A Static Blog](./part-two-building-a-static-blog.md)
<!--toc:end-->

## Outline

**Overall Goal:** Equip participants with the skills to build, manage, and deploy full-stack web applications using Go on their own Virtual Private Server (VPS).

**Learning Approach: Dual Story-lines**

Each module will have a main story line that focuses on theory and key implementation and side stories that shows the complete implementation.

The idea is to make the course more consumable if you don't want to watch all the coding. So a course participant can watch the main story line from start to finish and learn all the material. For extra in-depth, they can see the side stories that shows you everything.

**Main story-line**:
* focus on the what and why
* provide theoretical and practical foundation

**Side story-line**:
* shows everything from start to finish
* will be supplementary to main story line
* should be used for finishing elements that has a lot of duplication (ui work for example)

---

### Part 1: Foundations

Set the stage for the course, introduce golang and web devlopment

**Module 1: Setting the Stage**
* Lesson (main) 1.1: Welcome! Course Overview
* Lesson (main) 1.2: Why Choose Go for Web Applications?
* Lesson (main) 1.3: Why Build a Blog?
* Lesson (main) 1.4: Modern Web Development: MPA vs SPA
* Lesson (main) 1.5: Getting access to code

**Module 2: Golang Crash Course
* Lesson (main) 2.1: Go Language Fundamentals 
* Lesson (main) 2.2: Structs and Interfaces in Go: Building Blocks for Web Apps
* Lesson (main) 2.3: Understanding Concurrency: Goroutines & Channels
* Lesson (main) 2.4: Effective Error Handling in Go

**Module 3: Structuring Your Go Web Application**
* Lesson (main) 3.1: MVC (Model-View-Controller) Architecture
* Lesson (main) 3.2: MVC (Model-View-Controller) Adapting it for Go Web Apps
- [ ] Lesson (main) 3.3: Project Initialization: `go mod init`, Folder Structure Setup
* Lesson (main) 3.4: Creating a simple controller
* Lesson (main) 3.5: Creating a simple model
* Lesson (main) 3.6: Choosing a router: Echo
* Lesson (main) 3.7: Creating a route with echo
* Lesson (main) 3.8: Setting up the server

---

### Part 2: Building A Static Blog

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
* Lesson (main) 5.4: Adding styles to Landing page (practice)
* Lesson (side) 5.4.1: Making landing page responsive
* Lesson (main) 5.5: Adding styles to components (practice)
* Lesson (main) 5.6: The article page (practice)
* Lesson (side) 5.6.1: Making article page (practice)

**Module 6: Markdown, frontmatter and processing**
* Lesson (main) 6.1: Content Storage Strategies (embed vs db)
* Lesson (main) 6.2: Markdown for Blogging
* Lesson (main) 6.3: Frontmatter: Adding Structured Metadata to Markdown Files
* Lesson (main) 6.4: The Rendering Pipeline: Parsing Markdown to HTML
* Lesson (main) 6.5: Enhancing Readability: Code Syntax Highlighting in Articles.

---

### Part 3: Becoming data-driven

Should show the basics of working with a database, introducing models and showing data from db on the page.

**Module 7: Working with database 101**
* Lesson (main) 7.1: Introduction to PSQL
* Lesson (main) 7.2: Getting Postgres Setup
* Lesson (main) 7.3: Database Design
* Lesson (main) 7.4: Database Migrations
* Lesson (main) 7.5: Migration management with Goose
* Lesson (main) 7.4: Introduction to SQLC.

**Module 8: Pulling article meta data**
* Lesson (main) 8.1: Creating the articles table
* Lesson (main) 8.2: Creating CRUD queries for articles
* Lesson (main) 8.3: Generating Go code using SQLC
* Lesson (main) 8.4: Our Article model (something about the 'function' strategy here? i.e. why models should just accept arguments)
* Lesson (main) 8.5: Using our article model in controllers

---

### Part 4: Authentication and Management

Should show how authentication work and how we can manage the blog from the dashboard.

**Module 9: Authentication & Authorization**
* Lesson (main) 9.1: Introduction: Authentication vs. Authorization.
* Lesson (main) 9.2: Secure Password Handling: Hashing, Salting, and Pepper.
* Lesson (main) 9.3: Managing Session With Cookies
* Lesson (main) 9.4: Middleware for Route Protection.
* Lesson (main) 9.5: CSRF Protection
* Lesson (main) 9.6: User Model & Logic: Password Hashing, Validation Functions
* Lesson (side) 9.6.1: Users table migration and CRUD queries
* Lesson (main) 9.7: Building the Login
* Lesson (main) 9.8: Error handling in the UI
* Lesson (main) 9.9: Session Implementation
* Lesson (side) 9.10: Creating Middleware to Protect Authenticated Routes
* Lesson (main) 9.11: Implementing Logout Functionality
* Lesson (main) 9.12: Adding "Remember Me" for Persistent Sessions

**Module 10: Admin Dashboard – Managing Your Blog Content**
* Lesson (main) 10.1: Defining Requirements for a Blog Management Dashboard.
* Lesson (main) 10.2: UI/UX Considerations for the Admin Interface.
* Lesson (main) 10.3: Implementing CRUD (Create, Read, Update, Delete) for Blog Posts.
* Lesson (main) 10.4: Content Workflow: Managing Draft vs. Published Posts.
* Lesson (side) 10.4.1: Dashboard Layout: Creating a Dedicated Templ Layout for Admin Pages.
* Lesson (side) 10.4.2: Building Dashboard Views: List Posts, Create/Edit Post Form.
* Lesson (side) 10.4.3: Admin Handlers: Implementing CRUD Operations for Posts (using database layer).
* Lesson (side) 10.4.4: Database Update: Migration for is_draft Status in posts Table.
* Lesson (side) 10.4.5: Public Site Logic: Ensuring Only Published Posts are Visible.
* Lesson (side) 10.4.6: Enhancing Admin UX: Using HTMX for Smoother Interactions (Forms, Table Updates).

---

### Part 5: Building an audience

Should teach the user how to handle subscribers and sending emails

**Module 11: Subscribers and email verification**
* Lesson (main) 11.1: The subscriber flow
* Lesson (side) 11.1.1: Subscribers table
* Lesson (side) 11.1.2: CRUD queries and subsriber model
* Lesson (main) 11.2: Token-Based Verification
* Lesson (main) 11.3: Email Delivery: Choosing an Email Service
* Lesson (main) 11.4: Sending HTML and Text emails
* Lesson (main) 11.5: Email validation view
* Lesson (main) 11.6: Injecting a subscription form in articles
* Lesson (main) 11.7: Unsubscribing and deliverability

**Module 12: Sending Newsletters**
* Lesson (main) 12.1: Introduction
* Lesson (side) 12.1.1: Creating the overview (dashboard)
* Lesson (side) 12.1.2: Creating the form (dashboard)
* Lesson (main) 12.1: WYSIWYG Editors
* Lesson (main) 12.2: Scheduling the sending (riverqueue)

---

### Part 6: Going live

Should teach the user the basics of running a go app

**Module 13: Preparing for Production**
* Lesson (main) 13.1: Telemetry
* Lesson (main) 13.2: Caching Assets
* Lesson (main) 13.3: Caching Views

**Module 14: Virtual Private Servers**
* Lesson (main) 14.1: Introduction to VPS
* Lesson (main) 14.2: SSH hardening
* Lesson (main) 14.3: The Role of Reverse Proxies
* Lesson (main) 14.4: Production Database
* Lesson (main) 14.6: Running Your Go App Reliably with systemd.

**Module 15: Docker and Containerization**
* Lesson (main) 15.1: Introduction to Docker
* Lesson (main) 15.2: Containerizing Go Applications
* Lesson (main) 15.3: Zero-Downtime Deployment
* Lesson (main) 15.4: Introduction to Traefik
* Lesson (main) 15.5: Going live with traefik
* Lesson (main) 15.6: Automation options
