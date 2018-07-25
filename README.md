# TravelInn: A Mock HostelWorld Reviews Module
I refactored legacy code for the back end of a mock HostelWorld reviews module.

## Related Projects

  - https://github.com/airBnC/calendar-module
  - https://github.com/TravelInn/Overview
  - https://github.com/TravelInn/Header


## Table of Contents

1. [Description](#Description)
1. [Requirements](#Requirements)

## Description
> I loaded the database with 10M primary records, with 3-4 secondary records each. Through Nginx load balancer and Redis caching, I was able to reach +2800RPS with <100ms latency.

Initially, the microservice that I inherited had a page load time of >1s, for one client. This server was not load tested. By refactoring the backend to use PostgreSQL instead of MongoDB, I was able to increase page load time to <25ms. Using loader.io and New Relic, I load tested my data and found that it could handle only about 100RPS. After additional configuration and refactoring, I was able to get to +2800 RPS. Ask me about the project!

## Requirements
### To Run This Module
From within the root directory:
npm run start

##Images
> Nginx load balancer used.
### Without Redis caching:
![noRedis](./images/noRedis.png)<!-- .element height="50%" width="50%" -->
### With Redis caching:
![redis](./images/redis.png)<!-- .element height="50%" width="50%" -->