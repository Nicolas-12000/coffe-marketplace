import { v4 as uuidv4 } from 'uuid';

export enum RoastLevel {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  MEDIUM_DARK = 'MEDIUM_DARK',
  DARK = 'DARK'
}

export enum BeanType {
  ARABICA = 'ARABICA',
  ROBUSTA = 'ROBUSTA',
  BLEND = 'BLEND'
}

export enum ProcessingMethod {
  WASHED = 'WASHED',
  NATURAL = 'NATURAL',
  HONEY = 'HONEY',
  ANAEROBIC = 'ANAEROBIC'
}

export interface CoffeeAttributes {
  readonly acidity: number;     // 1-5
  readonly body: number;        // 1-5
  readonly sweetness: number;   // 1-5
  readonly bitterness: number;  // 1-5
  readonly aroma: number;       // 1-5
}

export interface ICoffeeProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  origin: string;
  altitude?: number;
  roastLevel: RoastLevel;
  beanType: BeanType;
  processingMethod: ProcessingMethod;
  harvestDate?: Date;
  roastDate?: Date;
  attributes: CoffeeAttributes;
  images: string[];
  sellerId: string;
  isAvailable: boolean;
}

export class Coffee {
  readonly id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  origin: string;
  altitude?: number;
  roastLevel: RoastLevel;
  beanType: BeanType;
  processingMethod: ProcessingMethod;
  harvestDate?: Date;
  roastDate?: Date;
  attributes: CoffeeAttributes;
  images: string[];
  sellerId: string;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor(props: ICoffeeProps) {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.rating = 0;
    this.reviewCount = 0;
    
    Object.assign(this, props);

    this.validateAttributes();
    this.validatePrice();
    this.validateStock();
  }

  private validateAttributes(): void {
    const { acidity, body, sweetness, bitterness, aroma } = this.attributes;
    
    const checkAttribute = (name: string, value: number): void => {
      if (value < 1 || value > 5) {
        throw new Error(`${name} must be between 1 and 5`);
      }
    };

    checkAttribute('acidity', acidity);
    checkAttribute('body', body);
    checkAttribute('sweetness', sweetness);
    checkAttribute('bitterness', bitterness);
    checkAttribute('aroma', aroma);
  }

  private validatePrice(): void {
    if (this.price <= 0) {
      throw new Error('Price must be greater than 0');
    }
  }

  private validateStock(): void {
    if (this.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
  }

  updateStock(quantity: number): void {
    const newStock = this.stock + quantity;
    if (newStock < 0) {
      throw new Error('Insufficient stock');
    }
    this.stock = newStock;
    this.isAvailable = this.stock > 0;
    this.updatedAt = new Date();
  }

  updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('Price must be greater than 0');
    }
    this.price = newPrice;
    this.updatedAt = new Date();
  }

  addReview(rating: number): void {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    const totalRating = this.rating * this.reviewCount + rating;
    this.reviewCount++;
    this.rating = +(totalRating / this.reviewCount).toFixed(1);
    this.updatedAt = new Date();
  }

  update(props: Partial<Omit<ICoffeeProps, 'id' | 'sellerId'>>): void {
    if (props.price !== undefined) {
      this.updatePrice(props.price);
    }
    if (props.stock !== undefined) {
      this.updateStock(props.stock - this.stock);
    }
    if (props.attributes) {
      this.attributes = props.attributes;
      this.validateAttributes();
    }

    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      origin: this.origin,
      altitude: this.altitude,
      roastLevel: this.roastLevel,
      beanType: this.beanType,
      processingMethod: this.processingMethod,
      harvestDate: this.harvestDate,
      roastDate: this.roastDate,
      attributes: this.attributes,
      images: this.images,
      sellerId: this.sellerId,
      isAvailable: this.isAvailable,
      rating: this.rating,
      reviewCount: this.reviewCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}