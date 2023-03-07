# Clarity Home Assigment: Restaurant Employees API Example

This example shows how to implement a **REST API** using [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## Getting started

### 1. Install NPM Dependencies

Inside the repo's root folder in terminal, tun the following command:

```
npm install
```

### 2. Setup DB

To immediately try out the API, setup a Dummy DB. Inside the repo's root folder in terminal, tun the following command:

```
npx prisma migrate dev --name init
```
Or, if you want to connect to a production database, modify the `schema.prisma` and `.env` files in the `/prisma` folder

### 3. Start the REST API server locally
Inside the repo's root folder in terminal, tun the following command:

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `server.js`, e.g. [`http://localhost:3000/employees`](http://localhost:3000/employees).

## Running in Docker
This presumes you have docker installed on your machine

### 1. Build the docker
Inside the repo's root folder in terminal, tun the following command:
```
ocker build . -t <some-memorable-tag-name>
```

### 2. Run the docker

```
docker run -p <external-port-of-your-choice>:3000 -d <some-memorable-tag-name>
```

## Tests
//todo: write about tests
