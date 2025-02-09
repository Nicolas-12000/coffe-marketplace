import express, { Request, Response, NextFunction } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppDataSource } from './infrastructure/database/config/database';
import { CoffeeRepositoryPostgres } from './infrastructure/repositories/CoffeeRepositoryPostgres';
import { ICoffeeRepository } from './core/interfaces/ICoffeeRepository';

// Cargar variables de entorno
dotenv.config();

// Importar rutas
import authRoutes from './api/routes/auth.routes';
import productRoutes from './api/routes/products.routes';
import recommendationRoutes from './api/routes/recommendations.routes';

// Inicializar la aplicación
const app = express();

// Middlewares de seguridad y logging
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); // Permitir CORS
app.use(helmet()); // Protección de seguridad
app.use(morgan('dev')); // Logger para desarrollo

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos y preparar el repositorio
let coffeeRepository: ICoffeeRepository;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Base de datos conectada con éxito');

    // Inicializar el repositorio de café
    coffeeRepository = new CoffeeRepositoryPostgres(AppDataSource);
  })
  .catch((error) => {
    console.error('❌ Error conectando a la base de datos:', error);
  });

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
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./src/api/routes/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Rutas principales de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/recommendations', recommendationRoutes);

// Ruta de prueba para ver los cafés en la base de datos
app.get('/coffees', async (req: Request, res: Response) => {
  try {
    const coffees = await coffeeRepository.findAll(); // Método heredado de BaseRepository
    res.json(coffees);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta base para verificar el estado del servidor
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: '✅ Server is running!' });
});

// Manejo global de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`❌ Error: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📑 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
