---
id: knowledge-database--aws-index
aliases: []
tags:
  - cloud-provider
  - infrastructure
---

[Back To Index](/knowledge-database/index.md)

# AWS

<!--toc:start-->
- [AWS](#aws)
  - [VPC](#vpc)
    - [IP Addresses](#ip-addresses)
    - [CIDR Range](#cidr-range)
    - [Subnets](#subnets)
    - [NACL](#nacl)
    - [Security Groups](#security-groups)
    - [Gateway](#gateway)
    - [Route tables](#route-tables)
  - [AWS Organizations](#aws-organizations)
  - [Sharing resources](#sharing-resources)
  - [IAM](#iam)
    - [Policies](#policies)
  - [Identity Providers](#identity-providers)
  - [Load Balancer](#load-balancer)
  - [Elastic Container Service](#elastic-container-service)
  - [Library](#library)
    - [Articles](#articles)
    - [Videos](#videos)
<!--toc:end-->

## VPC
_virtual private cloud_

Works like a private network, where you can isolate the resources within it, much like a fence. It separates resources within it from resources in another VPC.

### IP Addresses 

Two versions, IPv4 and IPv6, where the latter is replacing the former due to improvements in protocol and the former running out of address space (too many connected things online).

IPv4 are 32bit addresses, each segment (number before the dot) is 8-bit, and can be any number been 0-255. These are also known as octet.

### CIDR Range

**example cidr range**:
`10.0.0.0/24`

A CIDR range consists of 4 octaves, each number before the dot, each containing 8 bits. Added up, gives you 32bits which makes up the address space of an IPv4. Now, there is also a number after the slash, which determines the amount of addresses this range can hold. 

Since we in the example cidr range have `/24` means we can only change the 4th octave. You always start from the left and count 8 bits for each range, so with `/24` the first 3 octaves are locked to whatever value they have. If you have `/16`, you can change the last two octaves and so on.

With `/24` you have addresses in the range of `10.0.0.1` to `10.0.0.254`, with `/16` you have `10.0.0.1` to `10.0.255.254`. 

With `/16`, we have a total of 65536 addresses, but we can't use the first and last address, so we have 65534 addresses to use.

### Subnets

Is a defined set of network IP addresses that can be used to increase the security and efficiency of network communications. They can be thought of as postal addresses.

You have a public subnet for all public applications and private subnet for all private applications.

Subnets gets connected to a VPC through the vpc's ID.

Often, you'll create 2+ private and public subnets in different availability zones, to ensure high availability. You also have to set the cidr range for the subnets and would often opt to have lots of IPs for the private and few for the public. This could be set like this:

**Public subnet**:
`10.0.0.0/16`

**Private subnet**:
`10.0.1.0/16`

Where we add the 1 to the private subnet so they are different.

A subnet is required for you to lunch resources in a VPC.

### NACL

Network access control lists are stateless, a virtual firewall that protects the subnet. It's stateless, so allowing something in would not be remembered. TODO update

Default is that everything is allowed in and out.

### Security Groups

Acts as virtual firewalls in EC2 instances. They control inbound and outbound traffic for the instances that are associated with them. They can be thought of as a set of firewall rules that control the traffic for the instance.

Security groups are stateful.

### Gateway

In generally, a gateway connects a VPC to another network.

**NAT Gateway**

A network address translations service can be used so that private subnets can access the internet, but nothing can access the server from the outside. This will be created in a public subnet, which can access the internet, through the private subnet's route tables. It goes like this:

The private subnet's route table reaches out to the nat gateway in the pubic subnet, which then reaches out to the internet.

### Route tables

A route table belongs to a VPC and gets associated with a subnet.

## AWS Organizations

An aws organization can be used to consolidate a companies aws accounts so they can be administered as a single unit. Accounts can be organized into a tree-like structure that has `root` at the top and `organizational units` under it. Each account you create, can be directly under the root or placed within an organizational unit.

`root` is simple the parent container for everything, if a policy is applied to `root`, it will apply to every `organizational unit` and account within. Same goes for an `organizational unit`, if you place a policy on it, it will apply to all accounts and `sub organizational units` within that unit.

There are two types of `accounts` in an aws organization:
- management account
- member account

The management account is the one who created the organization, can do all a manager can do, and is also the one responsible for paying the bill, hence, has the responsibility of a payer account.

A member account is every account in the org and can only be a member of one org at a time.

[Source](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html)
**Difference between account & user**:
After signing up for an account at aws, you've a root user, from which you can create new users belonging to that account through IAM. This can be people or applications. So when we create a new account as part of an organizational unit, we can add users through IAM that we then can grant access to this account (and its resources).

## Sharing resources

We can share resources between accounts within an organization. An example of doing this with an s3 bucket in account A, to be accessed by account B, would be to update the bucket policy like so:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowOrganizationToReadStateBucketBucket",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::account-b-id:root"
            },
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::pulumi-state-oparko",
                "arn:aws:s3:::pulumi-state-oparko/*"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:PrincipalOrgID": "o-org-id"
                }
            }
        }
    ]
}
```

Since both account A and B is in an organization with `o-org-id`, this is allowed and account B can now access the `pulumi-state-oparko` bucket.

This is done by setting this condition:

```json            
  "Condition": {
    "StringEquals": {
      "aws:PrincipalOrgID": "o-org-id"
    }
  }
```

See this [stackoverflow post](https://stackoverflow.com/questions/49055018/aws-s3-bucket-organization-access-policy) for more.


TODO add info about why

## IAM

Two keywords to be aware of in iam, `who` and `permissions`. 

Who can be a:
- `user`
- `group`
- `role` 
 
While `permissions` are `policies` that are attached to one or more of those. Basically, authentication vs authorization.

An **iam user** can be both a human and a service/application, that need long term access to resources. 

**iam groups** are logically groupings that an iam user can be placed into, an apply `permissions` on a group level. 

**iam roles** can be used to grant temporary access to multiple identities.

### Policies

There are two variations of `iam policies`:
- trust
- permission

Trust says who can assume a given `iam role`, once a role is assumed by an identity, aws provides a temporary security credential(s). It's how aws authenticates a role to ensure that only an allowed identity, can assume the role. However, this only works for a period of time.

Permission policies, on the other hand, simply defines the permissions a role has and by proxy, the permissions the identity assuming the role will have.

Policies are attached to identities (user, group, role) but can also be attached to resources (named as resource based policies), and are written in `json`. A policy contains:
- Sid, which is short for statement id and is `optional`. Can be used to quickly grasp what the statement does
- Effect, which can be either `allow` or `deny`
- Action, which says operations can be done on a service, defined as: `service:operation` i.e. `s3:ListObjects`
- Resource, which is the resources this policy interacts with, typically uses an arn i.e. `arn:aws:s3:::bucket-name`

## Identity Providers
[Link](https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/) -> after finishing role, go in and add a "customer inline policy" to be specific about what the role can do, i.e.:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "GithubActionAssumeRepositoryRole",
			"Effect": "Allow",
			"Action": [
				"ecr:BatchCheckLayerAvailability",
				"ecr:CompleteLayerUpload",
				"ecr:GetDownloadUrlForLayer",
				"ecr:InitiateLayerUpload",
				"ecr:PutImage",
				"ecr:UploadLayerPart",
				"ecr:GetAuthorizationToken"
			],
			"Resource": "*"
		}
	]
}
```

under: `iam -> roles -> <role-name> -> permissions policies -> add inline policy`

## Load Balancer

## Elastic Container Service

## Library

### Articles
- [An AWS account for getting into other accounts](https://src-bin.com/an-aws-account-just-for-getting-into-other-aws-accounts) | account management
- [Setting up AWS accounts for your organization](https://docs.sst.dev/setting-up-aws/) | account management
- [AWS IAM Policies: A Practical Approach](https://blog.awsfundamentals.com/aws-iam-policies-a-practical-approach)
- [Get to Grips with AWS IAM Roles: Terms, Concepts, and Examples](https://blog.awsfundamentals.com/aws-iam-roles-terms-concepts-and-examples)
- [Setup AWS](https://sst.dev/docs/aws-accounts/)

### Videos
- [AWS Networking Basics For Programmers](https://www.youtube.com/watch?v=2doSoMN2xvI) | networking

