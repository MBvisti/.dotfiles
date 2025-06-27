---
id: index
aliases: []
tags: []
---

# Master Fullstack Golang

## Outline

### Master Full-Stack Golang: Zero to Deployed

**Overall Goal:** Equip participants with the skills to build, manage, and deploy full-stack web applications using Go on their own Virtual Private Server (VPS).

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

### Part 1: Foundations – Getting Started with Go and Web Basics

**Module 1: Setting the Stage**
* Lesson (main) 1.1: Welcome! Course Overview & The "Zero to Deployed" Journey
* Lesson (main) 1.2: The "Why": Why Choose Go for Web Applications?
* Lesson (main) 1.3: The Project: Why Build a Blog? (Learning, Portfolio, Skill Application)
* Lesson (main) 1.4: Modern Web Development: SSR vs. SPA (Brief Overview)
* Lesson (main) 1.5: Essential Toolkit & Setup Overview (Go, IDE, Git, Terminal)

**Module 2: Go for Web Developers – A Crash Course**
* Lesson (main) 2.1: Go Language Fundamentals (Syntax, Types, Control Flow, Functions, Packages)
* Lesson (main) 2.2: Structs and Interfaces in Go: Building Blocks for Web Apps
* Lesson (main) 2.3: Understanding Concurrency: Goroutines & Channels (Conceptual, relevance to web servers)
* Lesson (main) 2.4: Effective Error Handling in Go

**Module 3: Structuring Your Go Web Application**
* Lesson (main) 3.1: MVC (Model-View-Controller) Architecture + Adapting to Go (Theory)
* Lesson (main) 3.2: Project Initialization: `go mod init`, Folder Structure (cmd, controllers, models, psql, router, server)
* Lesson (main) 3.3: Creating a simple controller (singular method return simple html)
* Lesson (main) 3.4: Creating the router
* Lesson (main) 3.5: Creating the server
* Lesson (main) 3.6: Creating a singular entrypoint + justfile (cmd/app/main.go)

---

### Part 2: Building the basis of a web app

**Module 4: Crafting Views with Templ & Styling with Tailwind CSS**
* Lesson (main) 4.1: Templ & Views Introduction: Syntax, Components, Layouts, Passing Data (theory)
* Lesson (main) 4.2: Building The Landing page (practice)
* Lesson (main) 4.3: Introduction to Tailwind CSS: The Utility-First Philosophy (theory)
* Lesson (main) 4.4: The embed package (theory
* Lesson (main) 4.5: Setting up Static Assets with embed (practice)
* Lesson (main) 4.6: Adding base styles to landing page
* Lesson (main) 4.7: Templ Deep Dive: Components & Passing data (theory)
* Lesson (main) 4.8: Extracting components from landing page (practice)
* Lesson (main) 4.9: Adding and applying a theme (practice)
* Lesson (main) 4.10: Templ Deep Dive: Layouts (theory)
* Lesson (main) 4.11: Extracting the base layout (practice)
* Lesson (main) 4.12: Preparing the article page (practice)

**Module 5: Content Management – Markdown, Frontmatter, and Serving Articles**
* Lesson (main) 5.1: Content Storage Strategies: Files vs. Database (theory)
* Lesson (main) 5.2: ArticleService: Parsing Markdown to html (practice)
* Lesson (main) 5.3: Frontmatter: Adding Metadata to Markdown Files (theory)
* Lesson (main) 6.4: ArticleService: Parsing meta data (practice)
* Lesson (main) 5.5: ArticleService: Code Syntax Highlighting in Articles (practice)
* Lesson (main) 5.6: Making it come together (practice)

notes: 
- should this only show a specific article on the article page or articles on the landing page?

**Module 6: Introducing the Database
* Lesson (main) 6.1: Introducing Postgres & Setup
* Lesson (main) 6.2: Database migrations (theory)
* Lesson (main) 6.3: Creating the articles table (practice)
* Lesson (main) 6.4: SQLC Workflow: Configuration (sqlc.yaml), Writing SQL Queries for CRUD (theory)
* Lesson (main) 6.5: Creating the queries we need for articles (practice)
* Lesson (main) 6.6: Introducting models (theory)
* Lesson (main) 6.7: Refactoring: Switching from File-Based Articles to Database-Driven Content (practice)

### Part 3: Management and Authentication

**Module 7: User Authentication
* Lesson (main) 7.1: Authentication Introduction (theory)
* Lesson (side) 7.1.1: Users table (practice)
* Lesson (main) 7.2: Storing password securely: hashing and salting (theory)
* Lesson (main) 7.2: Storting password securly (practice)
* Lesson (main) 7.3: Session Management Deep Dive: Secure Cookies (HttpOnly, SameSite, Secure flags).
* Lesson (main) 7.4: Protecting Your Application: Middleware for Route Protection.
* Lesson (main) 7.5: Preventing Common Attacks: CSRF Protection.
* Lesson (main) 7.5.1: Database Schema: users Table Migration.
* Lesson (main) 7.5.2: User Model & Logic: Password Hashing, Validation Functions.
* Lesson (main) 7.5.3: Building the Login: Form, Handler, and Validation.
* Lesson (main) 7.5.4: Session Implementation: Using a Session Library (e.g., Gorilla Sessions) with Echo.
* Lesson (main) 7.5.5: Auth Middleware: Creating Middleware to Protect Authenticated Routes.
* Lesson (main) 7.5.6: CSRF Protection: Integrating CSRF Tokens into Forms and Handlers.
* Lesson (main) 7.5.7: Implementing Logout Functionality.
* Lesson (main) 7.5.8: Adding "Remember Me" for Persistent Sessions.

notes:
- create login page as side

**Module 8: Admin Dashboard – Managing Your Blog Content**
* Lesson (main) 9.1: Defining Requirements for a Blog Management Dashboard.
* Lesson (main) 9.2: UI/UX Considerations for the Admin Interface.
* Lesson (main) 9.3: Implementing CRUD (Create, Read, Update, Delete) for Blog Posts.
* Lesson (main) 9.4: Content Workflow: Managing Draft vs. Published Posts.
* Lesson (side) 9.4.1: Dashboard Layout: Creating a Dedicated Templ Layout for Admin Pages.
* Lesson (side) 9.4.2: Building Dashboard Views: List Posts, Create/Edit Post Form.
* Lesson (side) 9.4.3: Admin Handlers: Implementing CRUD Operations for Posts (using database layer).
* Lesson (side) 9.4.4: Database Update: Migration for is_draft Status in posts Table.
* Lesson (side) 9.4.5: Public Site Logic: Ensuring Only Published Posts are Visible.
* Lesson (side) 9.4.6: Enhancing Admin UX: Using HTMX for Smoother Interactions (Forms, Table Updates).

### Part 4: Advanced Features, Deployment, and Beyond

**Module 10: Engaging Your Audience – Subscribers and Email Notifications**
* Lesson (main) 10.1: Audience Building: The Value of Newsletter Subscriptions.
* Lesson (main) 10.2: Best Practices: Implementing Double Opt-In for Email Verification.
* Lesson (main) 10.3: Data Design: Storing Subscriber Information Securely.
* Lesson (main) 10.4: Token-Based Verification: Generating and Handling Secure Tokens.
* Lesson (main) 10.5: Email Delivery: Choosing an Email Service (e.g., AWS SES), Crafting HTML/Text Emails.
* Lesson (side) 10.5.1: Database Schema: subscribers and tokens Table Migrations.
* Lesson (side) 10.5.2: Models & Logic: Implementing Subscriber and Token Management.
* Lesson (side) 10.5.3: Subscription Form: Building the Form with HTMX for Interactive Feedback.
* Lesson (side) 10.5.4: Backend Logic: Handlers for Subscriber Creation and Verification Token Generation.
* Lesson (side) 10.5.5: Email Client Integration: Setting Up AWS SES SDK (or alternative).
* Lesson (side) 10.5.6: Email Templating: Creating Reusable HTML/Text Email Templates with Templ.
* Lesson (side) 10.5.7: Sending Emails: Implementing the Verification Email Dispatch.
* Lesson (side) 10.5.8: Verification Handler: Logic to Verify Email Addresses via Token.
* Lesson (side) 10.5.9: (Optional) Admin View: Basic Interface for Viewing Subscribers.

**Module 11: Sending Newsletters**
* Lesson (main) 11.1: Newsletter Strategy: Planning Your Content and Cadence.
* Lesson (main) 11.2: Content Creation: WYSIWYG Editors vs. Markdown for Newsletters.
* Lesson (main) 11.3: Reliable Sending: Ensuring Idempotency and Handling Failures.
* Lesson (main) 11.4: User Control: Implementing Unsubscribe Functionality.
* Lesson (side) 11.4.1: Database Schema: newsletters Table Migration.
* Lesson (side) 11.4.2: Admin CRUD: Interface for Creating, Managing, and Previewing Newsletters.
* Lesson (side) 11.4.3: Editor Integration: Adding a WYSIWYG Editor or Using a Markdown-to-HTML Flow.
* Lesson (side) 11.4.4: Sending Logic: System to Dispatch Newsletters to Verified Subscribers.
* Lesson (side) 11.4.5: Unsubscribe Mechanism: Token-Based Unsubscribe Links and Handlers.
* Lesson (side) 11.4.6: Email Templates: Designing Newsletter-Specific Email Layouts.

**Module 12: Preparing for Production – Best Practices**
* Lesson (main) 12.1: Production Mindset: Logging, Configuration, Robust Error Handling.
* Lesson (main) 12.2: Building for Release: The go build Command and Build Flags.
* Lesson (main) 12.3: "One-Man Army" Optimizations: Streamlining for Solo Developers.
* Lesson (main) 12.4: Hosting Options Overview: Focus on VPS for this Course.
* Lesson (side) 12.4.1: Structured Logging: Implementing slog for Better Production Logs.
* Lesson (side) 12.4.2: Configuration Management: Using Environment Variables (e.g., godotenv, Viper).
* Lesson (side) 12.4.3: Error Handling Polish: Custom Error Pages, User-Friendly Feedback.
* Lesson (side) 12.4.4: Build Script: Creating a Script for Consistent Production Builds.

**Module 13: Deploying Your Go Application to a VPS**
* Lesson (main) 13.1: Understanding VPS: What It Is, Why Use It, Choosing a Provider.
* Lesson (main) 13.2: Essential Server Security: SSH Keys, Firewalls (UFW), Regular Updates.
* Lesson (main) 13.3: Process Management: Running Your Go App Reliably with systemd.
* Lesson (main) 13.4: The Role of Reverse Proxies: Introduction to Caddy (or Nginx) for HTTPS and More.
* Lesson (main) 13.5: Production Database: Setup on VPS, Connection, Basic Backup Strategies.
* Lesson (side) 13.5.1: VPS Provisioning: Step-by-Step Guide (e.g., DigitalOcean, Linode).
* Lesson (side) 13.5.2: Initial Server Setup: Connecting via SSH, Basic Hardening.
* Lesson (side) 13.5.3: Software Installation: Go, Caddy, Postgres on the VPS.
* Lesson (side) 13.5.4: Application Deployment: Transferring Your Go Binary to the Server.
* Lesson (side) 13.5.5: systemd Service: Writing and Enabling a Service File for Your App.
* Lesson (side) 13.5.6: Caddy Configuration: Setting Up Caddy as a Reverse Proxy with Automatic HTTPS.
* Lesson (side) 13.5.7: Production Database: Creating the Database, User, Running Migrations.
* Lesson (side) 13.5.8: Final Configuration: Connecting Your App to the Production Database.

**Module 14: Containerization with Docker & Advanced Deployment (Optional Advanced Module)**
* Lesson (main) 14.1: Introduction to Docker: What, Why, and Key Concepts (Images, Containers, Dockerfile).
* Lesson (main) 14.2: Benefits of Containerizing Go Applications (Portability, Consistency, Scalability).
* Lesson (main) 14.3: Zero-Downtime Deployment Strategies: Overview (e.g., Blue/Green).
* Lesson (main) 14.4: Introduction to Traefik for dynamic routing and load balancing.
* Lesson (side) 14.4.1: Crafting a Dockerfile: Optimizing for Go Applications (Multi-stage builds).
* Lesson (side) 14.4.2: Local Containerization: Building and Running Your App with Docker Locally.
* Lesson (side) 14.4.3: Deploying Containers: Pushing to a Registry (e.g., Docker Hub) and Pulling on VPS.
* Lesson (side) 14.4.4: (Optional) Advanced Deployment: Setting up Traefik for Automated SSL and Simplified Container Management.

**Module 15: The Journey Continues – Maintenance, SEO, and Next Steps (Bonus)**
* Lesson (main) 15.1: Ongoing Maintenance: Server Updates, Application Monitoring, Database Backups.
* Lesson (main) 15.2: Developer SEO Basics: Sitemaps, Meta Tags, Structured Data.
* Lesson (main) 15.3: Expanding Your Horizons: Further Learning and Potential Project Enhancements.
* Lesson (main) 15.4: Course Recap: Celebrating Your Journey from Zero to Deployed!
* Lesson (side) 15.4.1: Practical Maintenance: Setting up a Simple Backup Script for Postgres.
* Lesson (side) 15.4.2: SEO Implementation: Adding a sitemap.xml and robots.txt.
* Lesson (side) 15.4.3: (Discussion) Ideas for Extending the Blog Project.
