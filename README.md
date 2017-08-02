# Authorization Demo

## Setup
Clone this repo:
```
git clone https://github.com/jamiesonbates/authorization-demo.git
```

Create a database:
```
createdb authorization_demo_dev
```

Create a JWT_KEY:
```
bash -c 'echo "JWT_KEY="$(openssl rand -base64 65)' > .env
echo '.env' > .gitignore
```

## Problem
You have inherited a backend application that exposes credit cards to the world. Anyone can access a persons credit cards with the right information. your job is to secure these routes by building in an authorization step.

### Steps:
1. Identify routes that are exposed.
2. Build authorization function (middleware).
3. Apply function to appropriate routes.
