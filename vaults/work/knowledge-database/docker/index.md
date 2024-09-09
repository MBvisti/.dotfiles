---
id: knowledge-database--docker-index
aliases:
  - docker
tags: []
---

[Back To Index](../index.md)

# Docker

<!--toc:start-->
- [Docker](#docker)
  - [Images](#images)
  - [Clean all](#clean-all)
  - [Logs](#logs)
  - [CMD vs. Entrypoint](#cmd-vs-entrypoint)
  - [Getting 509](#getting-509)
  - [Docker compose](#docker-compose)
  - [Networking in docker compose](#networking-in-docker-compose)
  - [Env variables](#env-variables)
  - [Mount project to volume](#mount-project-to-volume)
  - [Zero downtime deploys](#zero-downtime-deploys)
  - [Misc](#misc)
  - [Connecting to containers/images/whaterver (non docker-compose)](#connecting-to-containersimageswhaterver-non-docker-compose)
<!--toc:end-->

## Images
On building, running and managing images

## Clean all

`docker system prune -a` will remove all images, containers and volumes.

## Logs
To get the logs of an image, run `docker logs first-3-chars-of-image-name`

## CMD vs. Entrypoint
Basically, when using `CMD` you can override it in the `cli` which you can't do with `Entrypoint`. 

## Getting 509
If you're getting 509 while making request from "inside" a docker image you probably need to include certs:
  - `COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/`

`CMD` defines the default execution for the image; if nothing is specified in the `run` command, it uses this.

## Docker compose
All notes related directly to docker compose.

## Networking in docker compose
When using docker-compose it automatically creates a network that the services can join.

## Env variables
You can either specify env variables using the `environment: ` key or using the `--env-file=FILE-NAME` as part of the
`docker-compose up` cmd.

## Mount project to volume
This will be make it so you can make changes without rebuilding the image (like done at everphone)

## Zero downtime deploys
[Article](https://coderbook.com/@marcus/how-to-do-zero-downtime-deployments-of-docker-containers/)

[Rollout](https://github.com/Wowu/docker-rollout) | combined with traefik will make zero downtime deploys easy

## Misc

## Connecting to containers/images/whaterver (non docker-compose)
  1. First, create a network: `docker network create name-here`.
  2. Second, add `--network name-of-network` to the `docker run` command args
     of the containers that need to talk to each other 
  3. Profit
  4. Run with `--network host`
