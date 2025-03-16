---
id: projects--content-index
aliases: []
tags:
  - youtube
  - shorts
  - tiktok
  - videos
---

[Back To Index](/projects/index.md)

# Content

Content holds everything from ideas, to blog posts to shorts and long form videos. Doesn't matter the platform it should originate from here.

<!--toc:start-->
- [Content](#content)
  - [Ideas](#ideas)
  - [Working Title](#working-title)
    - [Database infrastructure setup](#database-infrastructure-setup)
<!--toc:end-->

## Ideas

Dump of everything that could be a video, short, tiktok or blog post

- How to setup Postgresql on a VPS | video, tiktok
- How to configure traefik on a VPS | video, tiktok
- Zero-downtime deployment with rollout | video, tiktok, short
- Using systemd to run Go apps | tiktok, short
- Confining your entire build process in your docker image | tiktok, short
- Configuring caddy as your reverse proxy | tiktok, short
- Traefik for non-docker workflows | tiktok, short
- Interactivity with HTMX | video, tiktok, short
  - Doing partials with htmx
- Doing NLP with Go | video, tiktok
- Did I build a start-up in 5 days | video, tiktok
  - value urgency to get stuff out
  - doing is the most important part
  - forcing you to get scrappy therefore forcing you to focus on the core (spinning up apps for customers)
- Indiehackers/bootstrappers guide to infrastructure | video, tiktok
- All you need is HTMX, tailwind and Go | video, tiktok
- Zero-downtime deploys on a VPS | video
- Using embeddings for social listening | video, tiktok
- Reduce your components, lessons from musk | tiktok, short
- Requirements are inherently unclear, that's why we iterate | video, tiktok
- Dedicate time for developers to clean under the carpet, i.e. the pile that has been swept under the rug | tiktok, shorts
- Your grand parents had it right; not every solution needs to be solved with the latest advancement in tech or html, css, js is probably fine | video, tiktok, short
- If your team consists of engineers early on in their career | tiktok, short
  - allocate time for building prototypes
  - need to learn and deal with unknowns unknowns
- Learn how to install your own software  | tiktok, short
  - (riff on the important of knowing how to configure and setup the tools you use and not just use version managers)
- I quit my job, moved to Berlin and started freelancing | tiktok, short
- My favorite tool for database/sql is sqlc combined with squrriel | tiktok, short, video
- My favorite tool for views are templ 
- Benefits of types and staying in one language | video, short, tiktok
- What's the simplest you can do for hosting Go apps? (vps, systemd guide) | video, tiktok
- Building the course ui for golang blog course
- An even saner approach to structuring Go apps | mortenvistisen.com
  - Write an updating version of the first article I did on structuring Go apps based on Grafto.
- Concurrency and my wife | mortenvistisen.com
  - An introduction to concurrency, what it is and how it works in Go explained through daily stories around how my wife does certain tasks.
- Dude! Where's my error? | mortenvistisen.com
  - A guide/reflection on how to do error handling in Go from the perspective of Grafto.
  - https://middlemost.com/failure-is-your-domain/
* Creating my own validation package | mortenvistisen.com
* How to interview people | mbvlabs.com
- Edge routing with traefik | mortenvistisen.com or mbvlabs.com
- How to automate ssl, get zero-downtime deployments with Docker and Traefik | mortenvistisen.com or mbvlabs.com
- Build a saas product in 5 days | mortenvistisen.com or mbvlabs.com
- Blog about building a no-code blog product | mortenvistisen.com or mbvlabs.com
- Why more SWEs should have a blog | mortenvistisen.com
- Approach to rolling your own auth | mortenvistisen.com
- SEO for software engineers and indiehackers
- The Indiehacker's guide to infra
  - [Dan's article on hetzner](https://shipixen.com/tutorials/self-host-web-app-on-a-hetzner-virtual-machine)
- Microservices was mainly meant as a scaling strategy for teams
  - something about how it's likely to relevant for most businesses
- The love for little bash scripts

## Working Title

Whatever content is currently being worked on.

### Database infrastructure setup

Record from start to end the process to get a VPS and S3 bucket created on hetzner using terraform, install and configure postgres, add automated backup/db dump once a day using a golang binary.

Make it secure:
- Disable empty password
- Change default ssh port 
- Disable root ssh login.
- Allow only certain user to access through ssh
- Add fail-to-ban

**Relevant links**:
- [Deploy to VPS tutorial](https://www.youtube.com/watch?v=fuZoxuBiL9o)
- [OpenSSH security and hardening](https://linuxhandbook.com/ssh-hardening-tips/)
- [Kamal ready vps with terraform](https://dylancastillo.co/posts/create-a-kamal-ready-vps-on-hetzner-using-terraform.html)
- [Terraform hetzner setup](https://github.com/luizkowalski/terraform-hetzner)

































