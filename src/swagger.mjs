import swaggerJSDoc from 'swagger-jsdoc';
import path from "path"

const port = process.env.PORT
// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for your API',
  },
  servers: [{
    url: `http://localhost:${port}`,
    description: 'Development server',
  }],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // apis: ['./routes/signup_route.mjs'], // Path to the ECMAScript module API route files to be documented
  //apis: ['./routes/route_index.mjs'], // Path to the ECMAScript module API route files to be documented
  //apis: ['./routes/employee_router.mjs'], // Path to the ECMAScript module API route files to be documented

  apis: [
    path.join('./src/routes/signup_route.mjs'),
    path.join('./src/routes/login_route.mjs'),
    path.join('./src/routes/admin_router.mjs'),
    path.join('./src/routes/employee_router.mjs'),
    path.join('./src/routes/developers_router.mjs'),
    path.join('./src/routes/logout_route.mjs'),

    // Add more route files here as needed
  ],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;