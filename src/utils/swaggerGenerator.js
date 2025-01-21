const swaggerJsDoc = require("swagger-jsdoc");
const fs = require("fs");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coffee Marketplace API",
      version: "1.0.0",
      description: "API para gestionar el marketplace de café",
    },
  },
  apis: ["src/interfaces/routes/*.ts"], // Define dónde están tus rutas documentadas
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Guardar el JSON generado en un archivo
fs.writeFileSync("./swagger.json", JSON.stringify(swaggerSpec, null, 2));
