const options = {
    definition: {
        openapi: '3.0.0',
        components: {
            schemas: {
                Employee: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'John Smith'
                        },
                        email: {
                            type: 'string',
                            example: 'john.smith@example.com'
                        },
                        employment_start_date: {
                            type: 'string',
                            format: 'date',
                            example: '2022-01-01'
                        },
                        job_id: {
                            type: 'integer',
                            example: 1
                        }
                    }
                },
                Role: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'Manager'
                        }
                    }
                }
            }
        },
        info: {
            title: 'Employee API',
            version: '1.0.0',
            description: 'API for managing employee records'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: [`${__dirname}/routes.js`, `${__dirname}/server.js`]
};
console.log(__dirname)
module.exports = options;
