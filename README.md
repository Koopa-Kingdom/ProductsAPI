# ProductsAPI
API Router and Database built using speed-oriented architecture

## Technology used
Node.js, Express, postgreSQL, jest, AWS EC2, and NGINX

## Major project Points
- Improved request throughput of existing service from 4 requests/sec to upward of 400 requests/sec by implementing NGINX load balancers to horizontally - scale server requests to the AWS EC2 instances
- Lowered Query execution time from over 200ms down to under 1ms execution time in PostgreSQL by implementing aggregate queries, and foreign key indexes
- Decreased Stress Testing cycle length by using Loader.io to identify and revise bottlenecks
