const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple CRUD API application with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'https://localhost:3000/api',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
