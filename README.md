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
