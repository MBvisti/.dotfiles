---
id: knowledege-database--traefik-index
aliases: []
tags:
  - docker
  - infrastructure
---

[Back To Index](../index.md)

# Traefik

Using file provider and dynamic config, I should be able to provide multiple urls so I can point to a "backup" binary, i.e. the new one, when switching out the "main" one and should have no downtime

Path matches exactly that and nothing else, so fx Path(/blog) will only serve /blog while PathPrefix will serve /blog and everything else under it (blog/article, blog/about etc).

Traefik will return "yho" in the above case if you only have Path set.
