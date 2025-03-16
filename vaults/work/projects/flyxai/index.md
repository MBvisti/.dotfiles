---
id: projects--flyxai-index
aliases:
  - flyxai
tags:
  - freelance
  - work
---

[Back To Index](/projects/index.md)

# Flyxai

<!--toc:start-->
- [Flyxai](#flyxai)
  - [Tasks](#tasks)
  - [Old](#old)

<!--toc:end-->

## Tasks
- [ ] Implement OpenRouter with hatched for baby sheets
- [ ] Add hatchet to infra

## Project Heimdall

Replace for OpenRouter.

### What does OpenRouter do

Basically, it's an unified API that has the option for fallbacks if a provider is down and handles rate limits better.

**Provider Routing**

>OpenRouter routes requests to the best available providers for your model, given your preferences, including prompt size and output length. 
>By default, requests are load balanced across the top providers to maximize uptime, but you can customize how this works using the provider object in the request body.

It load balances a request across providers with a strategy of:
1. Prioritize providers that haven't had an outage in the last 30 secs
2. Look at the lowest cost option of all stable providers
3. Use remaining providers as fallback

Custom routing is also an option where you can specify which providers to prioritize.

Lets you opt-in to data privacy with the model provider log attemps.

If you want to ensure your request is only served by the top-tier provider you can disable fallback.

You can ignore providers.

**Model Routing**

In beta (?)

**Req/Res**

Mimicks OpenAI's chat api very closely

---

## OLD

### Auth Token

The rails api takes the string "szrch_{usage}_{id}_{token}", and pulls out
the usage and token part. From there, it compares those two ("{usage}_{token}") to the keydigest.

### API Memberships

First created user gets an "owner_id" => that user's id

#### Invitations

Create a random token and then check **in code** if the token is older than **7 days**.

Can be refactored later when we start working on the infrastructure.

When everything is collected under an Organisation we can double check that a user exists so we don't have to necessarily create one.

#### Searches endpoint

Setup seems to be: insert queue topic, with an id "service.search.search.2.5.0.<id>", that triggers a consumer to start the searches and then listen on a topic that provides the responses. These then gets stored.

Much like SQS or Pub/Sub.

$### LinkedIn API

Available APIs
- Talent Hub
- Business Solutions
- Sales API

Limited in what data you can get due to user privacy.

**Talent Hub API**:

Manages end-to-end recruitment workflow

Features:
- Job posting management
- Candidate search and filtering
- Application tracking
- Pipeline management
- Interview scheduling
- Hiring team collaboration

Integration points:
- Job distribution networks
- Assessment platforms
- Background check services
- HRIS systems

**Organization Lookup API (Business Solutions)**:

Available information:
- Basic company details
- Industry classification
- Employee count ranges
- Headquarters location
- Specialties
- Recent updates

Search capabilities:
- By company name
- By LinkedIn company ID
- By website domain
- By registration number

**Sales API**:

Has three services:
- Display (UI components)
- Analytics (monitor employees)

[source](https://www.reddit.com/r/startups/comments/1dulqbc/success_with_linkedin_apis/)
> The internal API of the main LinkedIn website (codename voyager) can extract these info
> The internal APIs of Sales Navigator et Recruiter can extract these info, much more and scrape data at industrial scale

