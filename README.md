# RPT15 - SDC - Dr. Karp

> A clone of the web app, Steam, and its page for the Stardew Valley game.

## Set Up CRUD Endpoints
 - `GET /api/features/:gameId`
    - returns all features for a specific game
 - `POST /api/features/`
    - adds more features to the database
 - `PUT /api/features/:gameId`
    - updates a specific games features
 - `DELETE /api/features/:gameId`
    - removes the features for a specific game

These endpoints do not actually function as it was not required to for this project.

## Database

  * MySQL
  * CouchDB

  I chose mysql as the database for this service.

## Deployed

  Deployed mysql on one EC2 instance, deployed service on a separate EC2 instance.

  I had trouble seeding the database instance, but the fix was manipulating the security group to allow access to the instance. The database would only seed around 6.7 million datasets, instead of the full 10 million, and it took over 3 hours. Due to lack of time and the need to move on, I could not go back to optimize the seeding script. I decided to work with what had already been seeded.

  I had trouble connecting the service instance to the database instance, but once again it was just a security group issue.

## DBMS Initial Stress Tests

  This test was done via loader.io: clients per second with a duration of 15s, endpoint: 5000000.

  | DBMS  | Route | RPS  | LATENCY | ERROR RATE |
  | ----- | ----- | ---- | ------- | ---------- |
  | MySQL | GET   | 1    | 133 ms  | 0.0% |
  | MySQL | GET   | 10   | 131 ms  | 0.0% |
  | MySQL | GET   | 100  | 127 ms  | 0.0% |
  | MySQL | GET   | 1000 | 3550 ms | 0.0% |
  | MySQL | POST  | 1    | ------- | 100% |

## First Optimization

  I decided to see if gzipping the bundle.js file would make a sizable difference. I only tested the GET request because the database was too full and wouldn't accept any POST requests, nor does this service use it. Here are the results:

  | DBMS  | Route | RPS   | LATENCY | ERROR RATE |
  | ----- | ----- | ----- | ------- | ---------- |
  | MySQL | GET   | 1     | 132 ms  | 0.0%  |
  | MySQL | GET   | 10    | 132 ms  | 0.0%  |
  | MySQL | GET   | 100   | 126 ms  | 0.0%  |
  | MySQL | GET   | 1000  | 3402 ms | 0.0%  |
  | MySQL | GET   | 5000  | 8012 ms | 57.4% |
  | MySQL | GET   | 10000 | 9210 ms | 82.3% |

  Unfortunately, I hadn't tested the 5000 or 10,000 rps ranges in my initial stress tests, so I cannot compare those values. The latency for 1000 rps did decrease a bit.

## Second Optimization

  I decided to try redis caching to further optimize the requests. Here are the results:

  | DBMS  | Route | RPS   | LATENCY | ERROR RATE |
  | ----- | ----- | ----- | ------- | ---------- |
  | MySQL | GET   | 1     | 131 ms  | 0.0%  |
  | MySQL | GET   | 10    | 132 ms  | 0.0%  |
  | MySQL | GET   | 100   | 125 ms  | 0.0%  |
  | MySQL | GET   | 1000  | 3392 ms | 0.0%  |
  | MySQL | GET   | 5000  | 7966 ms | 55.3% |
  | MySQL | GET   | 10000 | 8891 ms | 76.0% |

  Both the latency and the error rate dropped significantly.
