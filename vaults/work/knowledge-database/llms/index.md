---
id: knowledege-database--llms-index
aliases: []
tags:
  - ml
  - ai
---

[Back To Index](/knowledge-database/index.md)

# LLMs

Collection of everything related to llms: coding, writing, etc


## Coding

> ## Chat-based LLMs do best with exam-style questions
> Give an LLM a specific objective and all the background material it needs so it can craft a well-contained code review packet and expect it to adjust as you question it. 
>
> There are two major elements to this:
> - Avoid creating a situation with so much complexity and ambiguity that the LLM gets confused and produces bad results. This is why I have had little success with chat inside my IDE. My workspace is often messy, the repository I am working on is by default too large, it is filled with distractions. One thing humans appear to be much better than LLMs at (as of January 2025) is not getting distracted. That is why I still use an LLM via a web browser, because I want a blank slate on which to craft a well-contained request.
> - Ask for work that is easy to verify. Your job as a programmer using an LLM is to read the code it produces, think about it, and decide if the work is good. You can ask an LLM to do things you would never ask a human to do. “Rewrite all of your new tests introducing an <intermediate concept designed to make the tests easier to read>” is an appalling thing to ask a human, you’re going to have days of tense back-and-forth about whether the cost of the work is worth the benefit. An LLM will do it in 60 seconds and not make you fight to get it done. Take advantage of the fact that redoing work is extremely cheap.
> The ideal task for an LLM is one where it needs to use a lot of common libraries (more than a human can remember, so it is doing a lot of small-scale research for you), working to an interface you designed or produces a small interface you can verify as sensible quickly, and it can write readable tests. Sometimes this means choosing the library for it, if you want something obscure (though with open source code LLMs are quite good at this).
> 
> You always need to pass an LLM’s code through a compiler and run the tests before spending time reading it. They all produce code that doesn’t compile sometimes. (Always making errors I find surprisingly human, every time I see one I think, there but for the grace of God go I.) The better LLMs are very good at recovering from their mistakes, often all they need is for you to paste the compiler error or test failure into the chat and they fix the code.

[source](https://crawshaw.io/blog/programming-with-llms)
