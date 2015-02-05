

A simple API Management Gateway server for RESTful APIs. The gateway accepts all calls made to it, pass them on to the proxied API (Twitter API), and return the results back to the caller. Implemented using Loopback Framework and Node.js.


## Usage

Features Implemented - 
1. Gateway API accepting calls ( CRUD operations) & sending to proxied API , getting the response and return to user.
 - Designed Calculator API for testing post operation. & used Facebook graph open api to test the get operation.
2. API Authontication  - Cookies & session implemented using Passport utility. 
3. Black Listing IP -  Blocking calls to perticular API.
4. Maintaining statistics data like- API list and requested count till date. 

## Developing

Express.js
Passport
Mongoose


### Tools
Express.js
Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
