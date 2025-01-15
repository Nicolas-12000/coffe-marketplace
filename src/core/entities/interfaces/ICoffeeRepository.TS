import { IRepository } from './IRepository';
import { Coffee, RoastLevel, BeanType } from '../Coffee';

export interface CoffeeSearchFilters {
  roastLevel?: RoastLevel;
  beanType?: BeanType;
  origin?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sellerId?: string;
  isAvailable?: boolean;
}

export interface ICoffeeRepository extends IRepository<Coffee> {
  findByName(name: string): Promise<Coffee | null>;
  search(filters: CoffeeSearchFilters): Promise<Coffee[]>;
  findBySellerId(sellerId: string): Promise<Coffee[]>;
  updateStock(id: string, quantity: number): Promise<Coffee>;
  findTopRated(limit?: number): Promise<Coffee[]>;
  findSimilar(coffeeId: string, limit?: number): Promise<Coffee[]>;
}