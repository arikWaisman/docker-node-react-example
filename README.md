# docker-node-react-example
example of using docker to run a node app, react app, mysql and nginx together

## To Run
make sure you have docker and docker-compose install on your machine

copy .env.example into a .env file and modify

run for development mode (so the api restarts with changes)
```bash
./compose-development.sh
```

for production mode just run
```bash
docker-compose up
```
this will build up the docker containers for the node api, mysql 5.7, react build process and nginx.

if you are going to be building or making changes to the react app ```bash cd ``` into the `client/` directory and run ```bash npm run start ``` to spin 
up webpack dev server to watch for code changes. webpack dev server will proxy the api requests to node apps container

## Node Api/DB
I am using MySQL 5.7 for the DB and used Express and the Sequelize ORM for models, migrations and seeding. Upon successful build of the containers the node app will be seeded 5 users, a single doctor and 4 patients. 

upon successful log a user will receive a token. That token is to be used for all endpoints as an Authorization header `Authorization: Your-Token`.

## Client App
This is a single page React Redux app. You will need to log in to get the JWT token to view specific pages.

The tokens will only last for one hour, and you will be redirected to `/signin` if you try to access a protected route with an expired token

There is some level of User/Role route management (there is some on the API side as well) going on so you will be redirected to the dashboard you are allowed to visist if you try to access pages/routes that do not match your user type.

Any user routes:
```
/
/signin
```

Patient only routes:
```
/patient/{userId}/edit
```

Doctor only routes:
```
/patients
/patient/{userId}/detail
```