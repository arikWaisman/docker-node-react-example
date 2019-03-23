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
This is a single page React Redux app
