---
id: projects--youtube--vibe-coding
aliases: []
tags: []
---

[Back To Index](/projects/youtube/index.md)

# How To Vibe Code Professionally

A short video showing how I work with claude code.

Should break down how I go about generating a plan for claude to follow and maximizing context window for each task. Then go about how I then parallise my work with git worktrees.

Could use the rewrite of mbvlabs as an example (the create/edit pages for the case study, newsletter and subscriber).

Talk about how it's like 80% done but that it's way easier to edit once you have a base.

Talk about how having components and clearly defined ways of doing things make it alot easier/produces better results.

Include this [link](https://x.com/oasiscentral_/status/1828324101699534966) somehow (liam talking about if oasis would have been a success without noel)

## Video promise

Get more done faster, responsibly.

Get on the right track faster-it's easier to edit than create.

More is now available to you

## Structure

**how to youtube 101**
> thumbnail and title make a promise
> video delivers on promise in first 30 seconds 
> share trust credentials first minute
> cast vision of their future life
> share unadulterated value

1. Hook
2. Quick single task example
3. Workflows & limited context
talk about worksflows in claude.md and how to optimize context
make sure it has 'quality check' tools available
4. Expanded single task example
add a single feature to mbvlabs using workflow
4. Increasing output exponentially
talk about git worktrees and how we can now scale different task
5. Concerns, reality checks and when not to use
more code is a liability. 
congratulations, you're now a product manager.
you must create the design, and be responsible for what goes into master.
for highly complex tasks, don't use agents, discuss ideas sure, but write the code yourself (which you get to do faster with the low hanging fruits out of the way).
6. Outro

General approach to using agentic coding and types of task it excels at. Be aware of the context window, limit it to only relevant files/areas of the codebase.
It can't just run wild without seriously degrading in performance. You need a plan (show clip of mike tyson saying everyone has a plan until they get punched in the face)
2. CLAUDE.md
How I structure my claude.md file for different workflows and general guidelines
3. Single task workflow
Show one piece of work done without parallel tasks
4. Git worktrees
Quick intro to worktrees
5. Multiple tasks at once
Show running 3 tasks at once
6. Overall considerations
Get to a naive implementation faster to validate the approach-fix/improve once certain this is the correct path

## Introduction

**Script**

Agentic coding is all the rage right now-but how do you use it professionally? can you use it professionally? does it really make you more productive?

Let's take a look.

Two things, in my experience, is necessary to get good results with agentic coding:
1. you need a plan you create iteratively with claude
2. accept that you have now become a full-time code reviewer and product manager

What I want from agentic coding is not assistance or fast autocomplete. I want it to write the parts of my code that is repetitive and boring.

I want to speed up exploration of new concepts and features so I can get real-world confirmation that i'm on the right path.

For that to really work, I need to be able to present a short description (maybe some paths to relevant files or code examples as well) to claude and have it run with independently of me, so I can focus on other tasks.

I basically want my own Jarvis.

## Workflow break-down

**Script**

I use claude chat for discussing ideas or one-shotting code for very primitive ideas for me to then expand upon with claude code or myself.

With claude code, I have defined 3 workflows in my CLAUDE.md file:

1. standard workflow
this simply does research, ask questions and preps a task.md file that I then review and adjust

2. prepared task
this is typically used after the standard worklow but could also be used with a task i myself write from scratch.
essentially, it reads a markdown file that contains relevant information about a task. it then presents me with a summary and any questions it might have, before starting to work on it.
this allows me to make final adjustments

3. review task
i don't use this a lot, but sometimes I stack tasks on each other to for context to the agent if the task is large. this workflow then reviews the entire task file and examines the git history to generate a summary of the changes

they key thing here is to be as hands-off as possible. this naturally result in me giving it simple tasks, but the bar for what is simple has been raised.

examples of tasks:
- take this migration and generate CRUD sql queries and model functions for it
- take this example markup, adapt it to the current style of the app and create a view for it
- take this model and generate seed data functionality for it

all of these elements are required in most web apps but can be very tedious to write (especially in Golang, my language of choice).

getting the boilerplate out of the way, and starting from a place that's 70-80% complete speeds up process.

### What do you want

Side note, what i call tedious, some might call exciting. there has been a lot of debate in the community as to the benefits of agentic coding. some, especially the ones who seem to really _love_ programming and writing code as been very vocal against it. they have valid points. but the genie is out of the bottle now, so it's not going away.

for other people, me included, the exciting part of programming is the end result or the product. solving the problem in an elegant way is the joy, not implementing the solution.

## Singular task

_meta_: pick intro to mbvlabs project

i've a open-source starter template for golang web apps called grafto, where whenever i release a new version, i test it out on one of my existing apps. right now, i'm rebuiding the site for my consultancy/freelance business. all you see here is 100% vibe coded with claude code. i've used inspiriation from tailwindui and haven't yet reworked the content, i simply wanted the shell to be in place first.

and all of this has been done in the span of a couple of days on the side. it's not perfect and definitely needs adjustments but that's the point, it gets me 80% of the way without me having to stop my other work.

## Hook

a.
It's the year of agents! 

But, while everyone is arguing about AI taking our jobs, I'm out here shipping production code using claude code.

Here is my worklow that has made me fully embrace agentic coding.

b.
It's the year of agents!

Everyone's arguing about AI taking our jobs. Meanwhile, I'm using Claude Code to do 3x the work in half the time.

Let me show you the worklow that has made me fully embrace agentic coding.

## Quick Single Task Demo

**meta**:
use mbvlabs as example

## Workflows workflow workflows

## Outro

Agentic code helps me get to the point I want to be at faster, while doing less of the task that I don't like doing.

Golang is pretty verbose at times, and while I love writing it, I also get fed up with it after a few hours. This workflow lets me plan a feature/fix/etc on a high level and quickly test it out with code. Once I'm happy with the overall design, I can go back in and fix/improve/correct whatever the agent did.

To me, this is super exciting. Of course, if you love writing the code this workflow obviously is not for you and it might also be a bit provacative. However, the genie is out of the bottle. Better embrace it.





