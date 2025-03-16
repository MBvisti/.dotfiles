---
id: projects--golang-blog-course--module-one-index
aliases: []
tags: []
---

[Back](/projects/golang-blog-course/index.md)

<!--toc:start-->
- [Module One](#module-one)
  - [Episode 1](#episode-1)
    - [Human Generated Script](#human-generated-script)
    - [AI Generated Script](#ai-generated-script)
  - [Episode 2](#episode-2)
    - [Human Generated Script](#human-generated-script)
    - [AI Generated Script](#ai-generated-script)
  - [Episode 3](#episode-3)
    - [Human Generated Script](#human-generated-script)
    - [AI Generated Script](#ai-generated-script)
  - [Episode 4](#episode-4)
    - [Human Generated Script](#human-generated-script)
    - [AI Generated Script](#ai-generated-script)
<!--toc:end-->

# Module One

Current Planned Vids:
1. Welcome and what we're building
2. Why build and start a blog
3. Why Go
4. What about React/Vue/Nextjs/etc
5. Getting setup

## Episode 1

Focus should be to get people comfortable with what they are/have buying/bought and give a quick overview of whats planned. 

Would be awesome to show the finished blog - could come later.

### Human Generated Script 

1. Introduction

Welcome to the Golang Blog Course!

In this course I'll be teaching you to build full-stack web applications with Golang. 

You'll be building a personal blog that will include a roboust backend, a dashboard for managing subscribers, articles and newsletters. 

By the end of this course you will have the skills to build real production-grade web applications from the ground up.

2. Tech overview

The tech stack we will be working with consists only of a few components.

It includes, in addition to Go:

2. Echo: A high-performance, minimalist Go web framework that we'll use to structure our application.

3. Templ: A modern HTML templating engine for Go that allows for type-safe, efficient rendering.

4. HTMX: This tool will help us create dynamic, interactive frontends without heavy JavaScript frameworks.

5. Alpine.js: A lightweight JavaScript framework for those times when we need a bit more frontend functionality.

6. Tailwind: CSS framework for easier styling

7. Postgresql: For all our database needs

This gives us a lean and efficient stack that will enable you to build fast and scalable web applications, with minimal complexity.

The rest of this module introduces you to the why of building server-side rendered applications in Go instead of something like React and how a personal blog can benefit your career.

These are not necessary for completing the course; only the part about getting setup and accessing the accompaying repository. 

Feel free to skip the rest if you just want to get started with the code.

### AI Generated Script 

1. Introduction (30 seconds)

Welcome to our course on building full-stack web applications with Golang! In this journey, we'll dive deep into creating a personal blog platform that's not just functional, but scalable and efficient. You'll learn how to craft a robust backend, create an intuitive dashboard for managing articles and subscribers, and even implement a newsletter system. By the end of this course, you'll have the skills to build complex web applications from the ground up.

2. Technologies Overview (60 seconds)

Let's quickly run through the powerful tech stack we'll be using:

1. Golang: Our core backend language, known for its simplicity and performance.
2. Echo: A high-performance, minimalist Go web framework that we'll use to structure our application.
3. Templ: A modern HTML templating engine for Go that allows for type-safe, efficient rendering.
4. HTMX: This tool will help us create dynamic, interactive frontends without heavy JavaScript frameworks.
5. Alpine.js: A lightweight JavaScript framework for those times when we need a bit more frontend functionality.

This combination gives us a lean, efficient stack capable of building fast, scalable web applications with minimal complexity.

3. Project Structure (60 seconds)

Our project will follow a clean, modular structure based on the Model-View-Controller (MVC) architecture. This time-tested pattern will help us organize our code effectively:

Models: Representing our data structures and business logic
Views: Our Templ files for server-side rendering of HTML
Controllers: Handling the application logic and connecting models with views

On the backend, we'll organize our Go code into:

Routes: Defining our API endpoints
Controllers: Implementing the logic for each route
Models: Managing data and business rules

For the frontend, we'll focus on server-side rendered HTML:

Templates: Our Templ files for generating dynamic HTML on the server
Static assets: CSS, JavaScript, and images

We'll also set up a database to persist our blog posts, user data, and subscriber information.
This MVC structure, combined with server-side rendering, will give us a clear separation of concerns, making our code easier to manage and scale. It also provides better initial page load times and SEO benefits compared to client-side rendering approaches.

4. Key Features (90 seconds)

Let's explore the core features we'll be implementing:

1. Article Management:
   - Create, read, update, and delete blog posts
   - Rich text editing for content creation
   - Tagging and categorization system

2. Subscriber Handling:
   - User registration and authentication
   - Subscriber list management
   - User profile customization

3. Newsletter Functionality:
   - Composing newsletters with a user-friendly interface
   - Scheduling newsletter sends
   - Tracking open rates and engagement

As we build these features, you'll learn how to integrate backend logic with frontend interactivity, creating a seamless user experience. We'll use HTMX to make our interface dynamic and responsive, while leveraging Alpine.js for more complex client-side interactions.

5. Iterative Development Approach (60 seconds)

Throughout this course, we'll embrace an iterative development approach. Here's how we'll tackle our project:

1. We'll start with a basic structure, implementing core functionality like displaying a list of blog posts.
2. In each iteration, we'll add new features or improve existing ones. For example, we might add user authentication, then build on that to create the subscriber system.
3. We'll continuously refine our code, improving performance and user experience with each pass.
4. Testing will be an integral part of each iteration, ensuring our application remains stable as it grows.

This approach mirrors real-world development practices, teaching you not just how to code, but how to manage and evolve a project over time.

6. Real-World Application and Problem-Solving (45 seconds)

The skills you'll gain in this course extend far beyond building a blog. You'll learn to:

- Tackle common web development challenges, like handling user authentication securely and managing database connections efficiently.
- Scale your application to handle increased traffic and data.
- Adapt the project structure for different types of web applications, from e-commerce platforms to social media sites.

Most importantly, you'll develop the problem-solving skills needed to overcome the unique challenges each project presents. By the end of this course, you'll have the confidence to approach any web development task with this powerful and efficient tech stack.

Let's embark on this exciting journey to mastering full-stack web development with Golang!

## Episode 2

Title: Why Go

Should argue why one would use Go for web development

### Human Generated Script 

So, why should you use Go?

If we ignore the high salaries and vast diversity of projects to work on, Go is in its essence a very simple language, that most pick up very fast.

You generally have one way of doing things which means you get to focus on building the product, not semantics.

While learning in of itself can be fun, you reach a certain point in your career, where the thing you're working should be the interesting part, _not_ the technologies you use.

If you've done any development in languages like Javascript you likey experienced a certain amount of fatigue, having to upgrade dependencies consistently, trouble keeping up. The list goes on.

You will generally experience with Go that you can leave a project for 6 months, come back, and leave off just where you started.

---

But, being simple is not enough, we also need to be able to build things. This is where the standard library comes in-it inludes everything you'd need to build web applications. 

You will still be using external packages but having a solid foundation that you know will be maintained and secure, lets you work very quickly, and without having breaking changes consistently.

As you will see in this course, if you're new to programming, developing applications involves a lot of iteration.

Being able to rely heavily on the standard library makes this iteration process must more efficient.

---

Having our applications live only on our local computer will only be fun for so long. We want other people to use them as well.

Lots of businesses have been created to solve this problem; getting your application live on the internet.

But with Go (and, other languages that compiles to a single binary) it's a different story. Most likely, you would want to deploy to a linux environment which is where 99% of applications lives.

Go will compile to a single program that you can upload to any linux environment and have it run. And should you want to containerize it using Docker, Go works just great here as well.

When I say that Go compiles to a single binary I mean that everything our application needs gets packaged into a single standalone executable file.

This is quite different from Python or JS where you have to distribute the source code alog with any required libraries. 

Having a single binary also enables easier version management of our applications, everything becomes a complete and self-contained version.

So deployment, as you will see, it very straight forward with go.

---

I would be remiss if I didn't mention performance, memory efficiency and concurrency. Go is _fast_, and will let you squeeze out a lot of usage of a simple virtual private server.

If you opt to go for the serverless option having a low memory footprint will equate to lots of savings.

Services such as aws lambda lets you run 1000s of instances and will charge you for time running and memory size of the individual instance. Fast execution with low memory usage is the key in those scenarios.

And while you might not even need concurrency for most of your day-to-day tasks, at least for web development, Go's model makes it easy to begin with. Still hard conceptually, but your're quickly up and running with only:

```go
go func() {}()
```

---

### AI Generated Script 

[Opening shot: Go logo with web development icons]

When it comes to web development, Go is quickly becoming a go-to language for developers worldwide. Let's dive into why Go, also known as Golang, is making waves in the web development scene.

Simplicity

One of Go's biggest strengths is its simplicity. With only 25 keywords, Go's syntax is minimal and easy to learn. This simplicity isn't just about being beginner-friendly – it has real, tangible benefits for development teams.

Firstly, it means faster onboarding for new team members. Whether you're bringing in fresh graduates or experienced developers from other languages, they can pick up Go quickly and start contributing sooner.

Secondly, Go's simplicity allows developers to focus on solving problems rather than deciphering complex syntax. This leads to more productive coding sessions and faster development cycles.

Lastly, Go's straightforward syntax promotes consistency across projects and teams. When everyone's code looks similar, it's easier to maintain and collaborate on projects.

[Visual: Split screen showing complex code vs. clean Go code]

Powerful Standard Library

Go comes with a robust standard library that's a web developer's dream. It includes everything you need to build powerful web applications right out of the box.

You've got a full-featured HTTP server and client, JSON encoding and decoding utilities, and even cryptography functions – all built-in and ready to use.

What's truly impressive is that you can create robust web servers using just the standard library. No need to pull in a ton of external dependencies. This leads to cleaner, more maintainable codebases.

[Visual: Diagram of Go's standard library components]

Concurrency Model

Go's approach to concurrency is one of its standout features. While you might not use it every day, when you need it, it's a game-changer.

Go introduces goroutines, which are lightweight threads managed by the Go runtime. They allow you to run functions concurrently with minimal overhead.

Channels complement goroutines, providing a safe way for these concurrent processes to communicate. This model makes it much easier to write programs that efficiently handle multiple tasks simultaneously.

For web applications, this means you can handle numerous client requests concurrently without breaking a sweat. Your applications can scale more easily and provide better responsiveness to users.

[Visual: Animation showing concurrent requests being handled]

Performance

When it comes to performance, Go punches above its weight. It offers near-C speed with the convenience of a high-level language.

Go compiles quickly, which means faster build times and a more efficient development process. It's also very memory-efficient, allowing you to make the most of your server resources.

These performance characteristics make Go an excellent choice for high-load, real-time web applications. Whether you're building a chat application, a game server, or a high-traffic API, Go can handle it with ease.

[Visual: Graph comparing Go's performance to other languages]

Deployment Simplicity

Deploying Go applications is refreshingly simple. Go compiles to a single binary, which includes all dependencies. This means no runtime dependencies to manage – just upload and run.

This simplicity extends to containerization as well. Go applications can be packaged into incredibly small Docker images, sometimes as small as 10MB. This leads to faster deployments and lower storage costs.

Whether you're deploying to cloud services or bare metal servers, Go's deployment model simplifies the process and reduces the chance of environment-related issues.

[Visual: Diagram of Go's deployment process]

Growing Ecosystem for Web Development

While Go's standard library is powerful, the ecosystem around Go is growing rapidly, making web development even easier.

Templ is a great example. It's a type-safe alternative to html/template, allowing you to build reusable UI components in pure Go.

For database interactions, SQLC generates type-safe Go code from SQL, making database operations both safer and more efficient.

HTMX is gaining popularity in the Go community, allowing developers to access AJAX, CSS Transitions, WebSockets, and Server Sent Events directly in HTML, with minimal JavaScript.

These tools, among others, are pushing the boundaries of what's possible with Go in web development. We're seeing a trend towards full-stack Go applications, where both the frontend and backend are written in Go.

[Visual: Logos of popular Go web development tools]

Go's simplicity, powerful features, and growing ecosystem make it an excellent choice for web development. Whether you're building a simple API or a complex web application, Go provides the tools and performance you need to succeed.

So why not give Go a try for your next web project? You might just find it's the language you've been looking for.

[Closing shot: "Go: Simplifying Web Development"]

## Episode 3

Title: Why build and start a blog

Should focus on the benefits of writing for learning purposes and exposure.

Mentioned relationships you have built because of blog posts.

Learning how to manage and maintain an application in a more controlled environment. 

Exposure therapy: making your own small website go down and fixing it, is much less intimidating than doing it at work. You'll quickly learn what to do and what happens for xyz which will make you more confident.

Learning how the web works, seo and search engines, marketing and overall business. While you might not end up making any money from your blog, you at least get exposed to that side of your work, which will make you a more well-rounded developer. 

Understanding the marketing and business side will make your day-to-day work more efficient, both in output and communitcation.

### Human Generated Script 

Welcome to episode three where I will go over why I think you should start and run your own blog.

---

Why should you have a blog and even more importantly, why should you build one yourself?

If you're in marketing, the answer to the first question will be pretty obvious to you. Content marketing has been growing like crazy. Especially with the developments in AI.

But what's the benefit to you as, I assume, a developer?

---

Personally, my learning has been supercharged after I started writing about new concepts/technologies/ideas that I've explored over the years.

Putting some experience into words will solidify to a much greater extend as you work through knowledge gaps and "aha" moments. 

If you also try to explain it a simple way you are forcing yourself to be more clear and precise, leading to a better understanding of a topic.

---

It will also provide you with more chances for expanding your network, build relationships in the industry and contribute to the community.

Not to mention that you now have a backlog of case studies you can show to potential employers in the future, or it could even attract business partners or freelance clients.

---

Communitcation is a much larger part of software engineering than we give it credit for.

Being able to describe something in written form, consise and clear, will make you stand out.

This becomes crucial when you are in a remote role.

---

But, perhaps more importantly, it gives you hand-on experience in managing a web application. 

It's a controlled environment where you can experiment and make mistakes, without taking down the production server your job.

Want to learn a new language? re-write your blog in that language. Want to learn kubernetes and dev ops? change your hosting environment to use that.

Continuous exposure to the elements of running web applications will make you a better developer, and not panic when something goes wrong. 

The more you tinker with these things the better you will beccome.

### AI Generated Script 

Hey there, fellow developers! Today, we're diving into a topic that might surprise you: why you should build and start a blog. Now, I know what you're thinking - "Another task on my already overflowing plate?" But trust me, the benefits are worth it, and they go far beyond what you might expect. Let's break it down.

**Learning Through Writing**

First up, let's talk about how blogging supercharges your learning. When you write about a concept, you're forced to understand it deeply enough to explain it to others. It's like the old saying goes, "If you can't explain it simply, you don't understand it well enough."

Blogging helps you solidify your knowledge. As you craft your posts, you'll often find gaps in your understanding. These "aha!" moments are golden opportunities for growth. Plus, to keep your blog fresh, you'll naturally stay up-to-date with industry trends. It's a win-win situation!

**Building Relationships and Networks**

Now, here's something that took me by surprise when I started blogging - the relationships you build. Your blog becomes a magnet for like-minded professionals. Suddenly, you're not just shouting into the void; you're part of a community.

I remember when I wrote a post about a tricky bug I encountered. Within days, I was chatting with developers from around the world who had faced similar issues. One of those conversations led to a collaboration on an open-source project, and another resulted in a job offer!

Your blog can attract potential collaborators, employers, or even clients. It's like having a 24/7 networking event, but you get to attend in your pajamas!

**Practical Application Management**

Let's get hands-on for a moment. Building and maintaining a blog is like running your own mini web application. It's a controlled environment where you can experiment, make mistakes, and learn without the pressure of a production environment at work.

You'll get to understand the full stack of web technologies. From choosing a hosting provider to configuring your CMS, from optimizing database queries to tweaking your CSS - it's a practical crash course in web development.

**Exposure Therapy for Tech Issues**

Speaking of learning experiences, let's talk about every developer's nightmare - downtime. When your blog goes down (and trust me, at some point, it will), you're the one who has to fix it. It's like exposure therapy for tech issues!

Dealing with these problems in a low-stakes environment builds your confidence. The first time your blog crashes, you might panic. But by the third time, you'll be calmly working through your mental checklist of potential issues. This confidence and problem-solving ability will make you a rockstar when similar issues crop up at work.

**Broadening Your Skill Set**

Now, here's where things get really interesting. Blogging introduces you to a whole new world beyond pure coding. You'll dip your toes into SEO, figuring out how to make your posts more visible to search engines. You'll learn about content marketing as you try to grow your audience.

You might even get a taste of the business side of things. While you may not be aiming to monetize your blog, understanding how online businesses work can give you valuable insights.

**Becoming a Well-Rounded Developer**

All of these experiences add up to make you a more well-rounded developer. Understanding the marketing and business perspective can dramatically improve your day-to-day work.

You'll communicate more effectively with non-technical team members because you'll understand their priorities. When a product manager talks about SEO requirements, you won't just nod along - you'll have meaningful input.

This broader perspective can also make your work more efficient. You'll anticipate needs better and ask the right questions earlier in the development process.

So there you have it - the surprising benefits of building and starting a blog as a developer. It's not just about sharing your knowledge (although that's awesome too). It's about learning, growing, connecting, and becoming a more confident and well-rounded professional.

Remember, every expert was once a beginner. Your unique experiences and perspective are valuable, and there's someone out there who can learn from what you share. So why not give it a shot? Start your blog today, and who knows where it might lead you. Happy coding, and happy blogging!

## Episode 4

Title: What about react/vue/angular

Should focus on why you would want to build using server-side rendered apps compared to a modern approach with SPAs.

Benefits of server-side rendered apps:
- only one consumer of the api (bad desc)
- validation happens only once and in the same place
- client is tigher coupled to the API making building faster
- no need to maintain an api in the same sense
- json apis is flexible but you pay for that in terms of complexity. Make sure you need the benefits before you pay the cost
- split frontend and backend adds to the mental model/complexity of the project

### Human Generated Script 

So, you might be wondering if we're going to be using React/Vue/Svelte/etc to build the UI.

It's a fair thought, in the last 10 years or so the industry as a whole have moved towards single-page applications, most drivenly by the adoption from FANG companies and everyone else following along.

But, for a lot of applications the, I think the quote unquote old school way is a better fit.

---

But, let's start with some basic terminology: 
- what is server-side renderd or SSR
- what is single-page application or SPA.

Server-side rendering process and generate the HTML for each page on the server, sending a fully-formed page to the browser. 

This contrasts with SPAs, which send minimal HTML and rely on JavaScript to construct the page in the browser.

SPAs does create a smoother and more app-like experience, compared to server-side rendered applications.

---

This is mitigated as we will see later by using a tool called htmx.

---

The benefits, in my opionion, that server-side rendered apps has over single-page applications is:
1. simplified archecture and data flow
2. reduced complexity

---

The first point, simplified architecture and data flow, is an important one because it's something most developers today haven't been taught or experienced.

By having the server render the content, we create a unified process for data handling and presentation, making the client, i.e. the browser, and server more tighly coupled which leads to more straightforward and managable codebases.

We do not have to split our codebase into a "frontend" and a "backend". The entire UI flow becomes one process.

You might have heard the term "RESTful API" which today, for most developers, means a JSON based data API.

But something has been lost in translation since a JSON based API cannot fulfill the requirements originally stated in Roy Fielding's (the man behind the term) thesis.

The idea has been adapted to fit the data api of today's web application but it comes with a few hurdles, as it inherently must be generic, since it can be consumed by many different clients.

You need to know most of your applications workflows since each one would need an endpoint. 

But you must also reduce request overhead so you don't end up with N+1 workflows to get the data your app needs (one of the reasons GraphQL was created, but that outside of the scope for this video).

Then, you must also maintain and ensure that you do not break the API for all the consumers of it. 

---

By having a server-side rendered application you're essentially creating a hypermedia (an extension of the H for hypertext, in HTML) API that's so tighly coupled with the client, you no longer need API documentation or versioning.

The whole process is streamlined.

You could, potentially, still need an API so that your customers can consume their data. But this would be a highly specialized API which in this case is desirable as it's quite a hard thing to get right, and maintain, as we saw earlier.

You also get the benefit of security and centralized validation logic, deduplicating the effort between client and server to validate data input from the user.

The attach surfrace is reduced.

With all of the above, you should become clear that complexity is reduced quite significantly as the moving parts is reduced.

---

Of course, it's not all sunshine and rainbows with SSR. 

Server-side rendering can make scalability more challenging as your servers do more work. 

Even though initial load times might be higher with an SPA due to its size, the client does most of the work after its rendered.

This is a common cited argument which is true. But, for this to matter, you would need so much traffic that you most likely will be swimming in money, so hiring enough people to maintain a data API is no big issue.

The user experience for highly interactive applications might not feel as smooth compared to SPAs. 

---

For highly interactive applications, of which there are few, SPA's are the right way to go and pay the extra cost in terms of complexity and development time.

But most applications you and I interact with are essentially doing four operations on data: create, read, update and delete. And here, server-side rendered applications shine!

### AI Generated Script 

Certainly. I'll revise the script to use a more active voice throughout. Here's the updated version:

Title: Why Server-Side Rendering Outshines Single-Page Applications

Hey there, developers and tech enthusiasts! Today, we're tackling a hot topic in web development: server-side rendering versus single-page applications. You've heard the buzz about React, Vue, and Angular, but let's explore when the "old school" approach of server-side rendering becomes your best bet.

Let's start with the basics. Server-side rendering processes and generates HTML for each page on the server, sending fully-formed pages to the browser. This contrasts with SPAs, which send minimal HTML and rely on JavaScript to construct the page in the browser.

So, why should you choose server-side rendering? Let's break it down.

First, server-side rendering offers a simplified architecture and data flow. It creates a unified process for data handling, with your server acting as the single source of truth. It consumes APIs and processes data before sending it to the client. This tighter coupling between client and server leads to a more straightforward, manageable codebase.

This simplified architecture directly translates to a streamlined development process. You'll iterate faster because you won't constantly switch between frontend and backend contexts. You'll also significantly reduce API management overhead. Say goodbye to maintaining separate API documentation or worrying about version mismatches between your frontend and backend.

Server-side rendering boosts security and data integrity too. You can centralize your validation logic, eliminating the need to duplicate efforts between client and server. This approach reduces the potential attack surface for malicious users.

Let's talk about complexity - or rather, how server-side rendering reduces it. It often results in a simpler mental model for your application. Fewer moving parts in your tech stack make it easier for new team members to get up to speed and for everyone to maintain the codebase over time.

Performance is another area where server-side rendering shines. It improves initial page load times, especially for content-heavy sites. This approach also leads to better performance on low-end devices, as it sends less JavaScript to the client. And don't forget about SEO - search engines love server-rendered content because it's immediately available for crawling and indexing.

On the server side, you gain additional advantages. You can implement simpler and more effective caching strategies at the server level. You also get easier access to server-side analytics and logging, giving you more insight into how users interact with your application.

So, when does server-side rendering become the best choice? It all comes down to your project requirements. If you're building a content-heavy site, an e-commerce platform, or any application where SEO is crucial, server-side rendering will likely serve you best. It's also worth considering if your team feels more comfortable with traditional web development paradigms.

Of course, we need to address some common concerns. Server-side rendering can make scalability more challenging, as your servers do more work. The user experience for highly interactive applications might not feel as smooth compared to SPAs. And developers more familiar with SPA frameworks might face a learning curve.

But here's the kicker - you don't have to make an all-or-nothing choice. Hybrid approaches are gaining popularity. You can combine server-side rendering for initial page loads with client-side interactivity for a smooth user experience. This approach gives you the best of both worlds: great initial load times and SEO, plus the interactivity of SPAs where it matters most.

To wrap up, server-side rendering offers a compelling package of benefits: simplified architecture, streamlined development, improved security, reduced complexity, and solid performance. While it won't fit every project, it deserves serious consideration, especially if you feel bogged down by the complexity of modern SPA development.

Remember, the best technology choice fits your project's needs, your team's skills, and your long-term maintenance plans. Don't just follow the hype - think critically about what your application really needs.

So, the next time you kick off a new project, give server-side rendering a serious thought. It might just provide the simplicity and control you've been searching for. Happy coding!
