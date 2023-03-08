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

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `server.js`, e.g. [`http://localhost:3000/v1/employees`](http://localhost:3000/v1/employees).

## API (Documentation)
The API is documented. Documentation is generated from the code using Swagger (openAPI).
you can reach it here: [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs).

## Running in Docker
This presumes you have docker installed on your machine

### 1. Build the docker
Inside the repo's root folder in terminal, tun the following command:
```
docker build . -t <some-memorable-tag-name>
```

### 2. Run the docker

```
docker run -p <external-port-of-your-choice>:3000 -d <some-memorable-tag-name>
```

## Tests

### Disclaimers
- The API tests are partial - I have supplied tests for multiple endpoints but not all of them
- API tests are done vs. the local db and start / teardown the server before / after tests.
- **NOTE:** In "real life" tests will not be done against a real database, but instead will use some mocks / data fixtures

## running tests
Inside the repo's root folder in terminal, tun the following command:
```
npm test
```

**NOTE:** The test will only work if you have connected the db (see getting started above)

## Kubernetes
The repo comes with a k8s deployment settings in the `deployment.yaml` file
**NOTE:** Currently the settings refer to an image on docker.io. 
You can push the image to your desired cloud (aws EKS, google GKE, etc.).
Remember to change the `spec:container:image` value in the `deployment.yaml` file
