import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Emergency Planner API',
            version: '1.0.0',
            description: 'API documentation for Emergency Planner',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        tags: [
            {
                name: 'Authentication',
                description: 'Authentication endpoints'
            }
        ]
    },
    apis: ['./src/routes/*.ts'],
    onDemand: true,
    verbose: true,
    failOnErrors: true
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;