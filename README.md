# Authorization Demo

## Setup
Clone this repo:
```
git clone https://github.com/jamiesonbates/authorization-demo.git
npm install
```

Create a database:
```
createdb authorization_demo_dev
npm run knex migrate:latest
npm run knex seed:run
```

Create a JWT_KEY:
```
bash -c 'echo "JWT_KEY="$(openssl rand -base64 65)' > .env
```

Don't forget to start your server:
```
npm start
```

## Problem
You have inherited a backend application that exposes credit cards to the world. Anyone can access a persons credit cards with the right information. your job is to secure these routes by building in an authorization step.

### Steps:
1. Identify routes that are exposed. (below)
2. Build authorization function (middleware).
3. Apply function to appropriate routes.


### Routes:
 1. GET credit cards 
 ```
 http GET localhost:8000/api/credit_cards/1 
 ```
Will return a list of credit cards in the response. Your task is to add an authorization step that will return a 401 'Unauthorized' error if the user is not authorized. 
 
 2. POST credit cards
 ```
 http POST localhost:8000/api/credit_cards creditCardNumber=1234567890123456 type="Visa" userId=1
 ```
Will create a credit card and return 'Successful' in the response. Your task is to add an authorization step that will return a 401 'Unauthorized' error if the user is not authorized. 
 
 3. DELETE a credit card
 ```
 http DELETE localhost:8000/api/credit_cards/1
 ```
 Will delete a credit card and return the deleted row in the response. Your task is to add an authorization step that will return a 401 'Unauthorized' error if the user is not authorized. 
 
## BONUS
Once you have secured the routes and are getting 401 'Unauthorized' in the response, alter the routes so that they also rely upon the user information within the claim. You may need to investigate other routes to figure out what data is being referred to.

You can create a username and password with this command:
```
http POST localhost:8000/api/users username="INSERT NAME HERE" password="GIVE PASSWORD HERE"
```

The response should look something like this: 
![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/632/1._fish__-Users-jamiesonbates-Projects-g56-testing-authorization-demo__fish__iTerm2__Today_at_8.39.05_AM.png)

You can save the token and attach it to requests to "authorize" your request with httpie. 
**NOTE:** this is how it has to be done with HTTPie only. This is because HTTP sends each request in isolation and doesn't have access to information that would be stored by the browser.

This is what sending a request with a token, in a Cookie, will look like:
```
http GET localhost:8000/api/credit_cards 'Cookie:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTUwMTc3NDMyMiwiZXhwIjoxNTA0MzY2MzIyfQ.dFKb2MUAJsNwQ8WG3unUB3SfZXuOEMz1MnKh-64KuFg;'
```

**NOTE:** if this does not work for you, ensure that you are using data from the claim to take action within a route. In addition, make sure you have copied the token from the response correctly (you will need to copy everything from 'token' until the semi-colon (';').

