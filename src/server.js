const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./swaggerOptions');
const specs = swaggerJsdoc(options);
const serve = swaggerUi.serve;
const setup = swaggerUi.setup(specs);

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api-docs', serve, setup);

app.use('/', routes);

const server = app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000`),
);
