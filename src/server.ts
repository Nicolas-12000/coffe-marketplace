import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan'; // Para logs de solicitudes HTTP
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Importar rutas
import authRoutes from './interfaces/routes/auth.routes';
import productRoutes from './interfaces/routes/products.routes';
import recommendationRoutes from './interfaces/routes/recommendations.routes';

// Inicializar la aplicación
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para permitir CORS (Acceso desde otros dominios)
app.use(cors());

// Logs HTTP con morgan
app.use(morgan('dev'));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coffee Marketplace API',
      version: '1.0.0',
      description: 'API para gestionar un marketplace de café',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto si el servidor usa otro dominio o puerto
      },
    ],
  },
  apis: ['./src/interfaces/routes/*.ts'], // Cambia esta ruta si tus rutas están en otro directorio
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Rutas principales de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/recommendations', recommendationRoutes);

// Ruta base para verificar el estado del servidor
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running!' });
});

// Manejo global de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Solo muestra el stack en desarrollo
  });
});

// Escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
