import { IRepository } from './IRepository';
import { Coffee } from '../Coffee';

export interface ICoffeeSearchParams {
  roastLevel?: string;
  beanType?: string;
  origin?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sellerId?: string;
  isAvailable?: boolean;
}

export interface ICoffeeRepository extends IRepository<Coffee> {
  findByName(name: string): Promise<Coffee | null>;
  search(params: ICoffeeSearchParams): Promise<Coffee[]>;
  findBySellerId(sellerId: string): Promise<Coffee[]>;
  updateStock(id: string, quantity: number): Promise<Coffee>;
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Coffee[]>;
  findTopRated(limit?: number): Promise<Coffee[]>;
  findBySimilarAttributes(attributes: Coffee['attributes'], limit?: number): Promise<Coffee[]>;
}