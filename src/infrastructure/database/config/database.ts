import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { CoffeeEntity } from '../postgres/CoffeeEntity';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['src/core/entities/*.ts'], // Ruta a las entidades
    synchronize: true, // ❗ Cambia a false en producción
    logging: process.env.NODE_ENV === 'development',
    extra: {
      poolSize: Number(process.env.DATABASE_POOL_MAX) || 10, // Pool de conexiones
    },
  });