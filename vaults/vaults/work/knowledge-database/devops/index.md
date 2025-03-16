---
id: knowledge-database--dev-ops-index
aliases:
  - infra
tags: []
---

[Back To Index](/knowledge-database/index.md)

# DevOps

<!--toc:start-->
- [DevOps](#devops)
  - [Pulumi](#pulumi)
    - [Projects](#projects)
    - [Stacks](#stacks)
    - [Misc](#misc)
    - [Tips](#tips)
  - [Terraform](#terraform)
  - [Articles](#articles)
<!--toc:end-->

## Pulumi

Uses a desired state model; compute the desired state for a stack, deployment engine compares again current state and creates/updates/deletes based on that.

It's comprised of:
- Language hosts
- Deployment engine
- Resource providers

**Language hosts**:
Responsible for running a pulumi program and setting up the env where resources can be registered with the deployment engine.

Contains an executor, which is the shipped binary name like `pulumi-language-go` which is used to launch the runtime. It also contains a runtime, which prepares the program to be executed and observe the execution to detect resource registrations.

**Deployment engine**:
Responsible for figuring out the set of operations needed to go from current state to desired state.

Basically, the receives some signal about a resource registration, and then consults the existing state about what to do next, and then uses the resource provider execute the conclusion.

This engine is embedded into the `pulumi` CLI.

**Resource providers**:
Made up of a resource plugin and an SDK; resource plugin is the binary used by the deployment engine, and SDK provides bindings for each type of resource available.

Don't use getters and setters for pulumi based resources.

### Projects

A pulumi project is any folder that contains a `Pulumi.yaml` file and simply specifies the runime and where to look for the program that should be executed during deployments.

An example in go, that only uses a pre-built executable:
```yaml
name: my-project
runtime:
    name: go
    options:
        binary: mybinary
description: A minimal Go Pulumi program
```

**Paths**
When something in pulumi references resources in the local FS, it's always relative to the `cwd`. 

**Stack settings files**
Each stack located in a project is created as `Pulumi.<stackname>.yaml` and is typically located in the project root dir.

For stacks actively developed by multiple members, pulumi recommends to include these files in source control. Secrets are encrypted making it safe to do so.

See [this](https://www.pulumi.com/docs/concepts/projects/project-file/) for more info on configuration options.

### Stacks

To get the current stack, use: `stack := ctx.Stack()`.

### Misc

How to run Pulumi without adding a new go.mod and shit:

- create `cmd/infratructure/main.go` and add `Pulumi.*` files
- create `./infrastruture` and add files you need + import them in main.go
- run from root: `pulumi up --cwd ./cmd/infrastrucre/`
- Pulumi crosswalks provide apis that are higher level, i.e. they create subnets for you when you create a vpc and such

### Tips

**Outputs** is what pulumi provisions resources return and are not known by pulumi until the provisioning process is 
done. One way to references those outputs are doing something like this:
```go
// notice how we're using the apply function to wrap the building of the JSON string
bucketPolicy := bucket.Arn.ApplyT(func (arn string) (string, error) {
    policyJSON, err := json.Marshal(map[string]interface{}{
        "Version": "2012-10-17",
        "Statement": []map[string]interface{}{
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": []string{"s3:GetObject"},
                "Resource": []string{
                    arn, // I can now pass the arn directy
                },
            },
        },
    })
    if err != nil {
        return "", err
    }
  return string(policyJSON), nil
})
```

## Terraform

TODO

## Articles
  - [X] [How To Move a PostgreSQL Data Directory to a New Location on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-move-a-postgresql-data-directory-to-a-new-location-on-ubuntu-20-04)
  - [X] [Use NGINX as a Reverse Proxy](https://www.linode.com/docs/guides/use-nginx-reverse-proxy/)
  - [X] [How To Install and Use Docker on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
  - [X] [How To Secure Nginx with Let's Encrypt on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
  - [X] [How To Install Nginx on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
  - [X] [Setting up a remote Postgres database server on Ubuntu 18.04](https://blog.logrocket.com/setting-up-a-remote-postgres-database-server-on-ubuntu-18-04/)
  - [X] [How To Install and Use PostgreSQL on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04#step-8-adding-and-deleting-columns-from-a-table)
  - [X] [Install Docker Compose Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)
  - [X] [Multiple subdomains with nginx](https://blog.logrocket.com/how-to-build-web-app-with-multiple-subdomains-nginx/)
  - [X] [Initial Server Setup with Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04)
