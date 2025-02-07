import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz para representar un documento de café en MongoDB.
 */
export interface ICoffee extends Document {
  name: string;
  roastLevel: string;
  beanType: string;
  origin: string;
  price: number;
  rating: number;
  sellerId: string;
  isAvailable: boolean;
}

/**
 * Esquema de Mongoose para la colección de cafés.
 */
const CoffeeSchema = new Schema<ICoffee>({
  name: { type: String, required: true },
  roastLevel: { type: String, enum: ['LIGHT', 'MEDIUM', 'DARK'], required: true },
  beanType: { type: String, enum: ['ARABICA', 'ROBUSTA'], required: true },
  origin: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  sellerId: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

/**
 * Modelo de Mongoose para la colección de cafés.
 */
export const CoffeeModel = mongoose.model<ICoffee>('Coffee', CoffeeSchema);
