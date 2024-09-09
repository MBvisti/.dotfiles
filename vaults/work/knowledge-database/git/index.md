---
id: knowledge-database--git-index
aliases:
  - git
tags:
  - vsc
---

[Back To Index](../index.md)

# Git knowledge

<!--toc:start-->
- [Git knowledge](#git-knowledge)
  - [To see see the evolution of a line range](#to-see-see-the-evolution-of-a-line-range)
  - [To search for a specific PR](#to-search-for-a-specific-pr)
  - [To get entire history for a file](#to-get-entire-history-for-a-file)
<!--toc:end-->

## To see see the evolution of a line range
`git log -L start,end:file-name`

## To search for a specific PR
`gh pr list --search 'search-term-here'`
`gh pr list --author 'author-here'`

## To get entire history for a file 
`git log -p -- file-name`
