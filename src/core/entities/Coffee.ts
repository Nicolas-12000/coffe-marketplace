import { v4 as uuidv4 } from 'uuid';

/**
 * Enum para los niveles de tostado del café.
 */
export enum RoastLevel {
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  MEDIUM_DARK = 'MEDIUM_DARK',
  DARK = 'DARK'
}

/**
 * Enum para los tipos de granos de café.
 */
export enum BeanType {
  ARABICA = 'ARABICA',
  ROBUSTA = 'ROBUSTA',
  BLEND = 'BLEND'
}

/**
 * Enum para los métodos de procesamiento del café.
 */
export enum ProcessingMethod {
  WASHED = 'WASHED',
  NATURAL = 'NATURAL',
  HONEY = 'HONEY',
  ANAEROBIC = 'ANAEROBIC'
}

/**
 * Interfaz para los atributos del café.
 * Cada atributo se califica en una escala de 1 a 5.
 */
export interface CoffeeAttributes {
  readonly acidity: number;     // 1-5
  readonly body: number;        // 1-5
  readonly sweetness: number;   // 1-5
  readonly bitterness: number;  // 1-5
  readonly aroma: number;       // 1-5
}

/**
 * Interfaz para las propiedades de un objeto de café.
 */
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

/**
 * Representa un producto de café.
 */
export class Coffee {
  /** Identificador único para el café. */
  readonly id: string;

  /** Nombre del café. */
  name: string;

  /** Descripción del café. */
  description: string;

  /** Precio del café. */
  price: number;

  /** Stock disponible. */
  stock: number;

  /** Origen del café (por ejemplo, país o región). */
  origin: string;

  /** Altitud donde se cultivó el café (opcional). */
  altitude?: number;

  /** Nivel de tostado del café. */
  roastLevel: RoastLevel;

  /** Tipo de grano utilizado para el café. */
  beanType: BeanType;

  /** Método de procesamiento utilizado para el café. */
  processingMethod: ProcessingMethod;

  /** Fecha de cosecha de los granos de café (opcional). */
  harvestDate?: Date;

  /** Fecha de tostado del café (opcional). */
  roastDate?: Date;

  /** Atributos como acidez, cuerpo, dulzura, amargor y aroma. */
  attributes: CoffeeAttributes;

  /** Lista de URLs de imágenes del café. */
  images: string[];

  /** Identificador del vendedor. */
  sellerId: string;

  /** Indica si el café está disponible. */
  isAvailable: boolean;

  /** Calificación promedio del café. */
  rating: number;

  /** Número de reseñas recibidas. */
  reviewCount: number;

  /** Fecha de creación del objeto de café. */
  readonly createdAt: Date;

  /** Fecha de última actualización del objeto de café. */
  updatedAt: Date;

  /**
   * Constructor para crear un objeto de café.
   * @param props - Propiedades para inicializar el objeto de café.
   */
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

  /**
   * Valida los atributos del café (acidez, cuerpo, dulzura, amargor, aroma).
   * Lanza un error si algún atributo está fuera del rango 1-5.
   */
  private validateAttributes(): void {
    const { acidity, body, sweetness, bitterness, aroma } = this.attributes;

    const checkAttribute = (name: string, value: number): void => {
      if (value < 1 || value > 5) {
        throw new Error(`${name} debe estar entre 1 y 5`);
      }
    };

    checkAttribute('acidity', acidity);
    checkAttribute('body', body);
    checkAttribute('sweetness', sweetness);
    checkAttribute('bitterness', bitterness);
    checkAttribute('aroma', aroma);
  }

  /**
   * Valida que el precio sea mayor a 0.
   * Lanza un error si el precio es inválido.
   */
  private validatePrice(): void {
    if (this.price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
  }

  /**
   * Valida que el stock no sea negativo.
   * Lanza un error si el stock es inválido.
   */
  private validateStock(): void {
    if (this.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
  }

  /**
   * Actualiza el stock con una cantidad dada.
   * Lanza un error si el stock resultante es negativo.
   * @param quantity - Cantidad para ajustar el stock (positiva o negativa).
   */
  updateStock(quantity: number): void {
    const newStock = this.stock + quantity;
    if (newStock < 0) {
      throw new Error('Stock insuficiente');
    }
    this.stock = newStock;
    this.isAvailable = this.stock > 0;
    this.updatedAt = new Date();
  }

  /**
   * Actualiza el precio del café.
   * Lanza un error si el nuevo precio es inválido.
   * @param newPrice - El nuevo precio del café.
   */
  updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    this.price = newPrice;
    this.updatedAt = new Date();
  }

  /**
   * Agrega una reseña con una calificación dada.
   * Lanza un error si la calificación está fuera del rango 1-5.
   * @param rating - La calificación para agregar (1-5).
   */
  addReview(rating: number): void {
    if (rating < 1 || rating > 5) {
      throw new Error('La calificación debe estar entre 1 y 5');
    }
    const totalRating = this.rating * this.reviewCount + rating;
    this.reviewCount++;
    this.rating = +(totalRating / this.reviewCount).toFixed(1);
    this.updatedAt = new Date();
  }

  /**
   * Actualiza las propiedades del café con los datos parciales proporcionados.
   * Valida precio, stock y atributos si se proporcionan.
   * @param props - Propiedades parciales para actualizar.
   */
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

  /**
   * Convierte el objeto de café a un objeto JSON.
   * @returns Una representación en JSON del objeto de café.
   */
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
