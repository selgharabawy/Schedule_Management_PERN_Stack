# Server - the backend of the schedule handling app (Express) (A PERN Stack)

## Getting Setup
create a new postgres database (local or remote) then change the configurations in the ".env" file to match the new db.

Then, restore the db using dump file named "dbexport.pgsql" to a database
psql -U postgres schedules_pern_db < dbexport.pgsql

### Installing Dependencies

#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `server` directory of this repository. After cloning, open your terminal and run:

```
npm install
```

>_tip_: **npm i** is shorthand for **npm install**

## Required Tasks

## Running Your Frontend in Dev Mode

The frontend app was built using create-react-app. In order to run the app in development mode use ```npm start```. You can change the script in the ```package.json``` file. 

Open [http://localhost:2006](http://localhost:2006) to view it in the browser. The page will reload if you make edits.<br>

```
npm start
```

## API Routes and Configurations

Main configurations are located in the file server.js
The schedule related api routes are located in the ./routes directory
The PG pool is located in ./db where it connects to a postgresql database

A db_dump is 
