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
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  origin: string;
  altitude: number;
  roastLevel: string;
  beanType: string;
  processingMethod: string;
  harvestDate?: Date;
  roastDate?: Date;
  attributes: any;
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
   * Método estático para convertir un objeto en una instancia de Coffee.
   * @param data - Datos del café provenientes de la base de datos.
   * @returns Una instancia de Coffee.
   */
  static toCoffeeEntity(data: any): Coffee {
    return new Coffee({
      id: data._id.toString(),
      name: data.name,
      description: data.description,
      price: data.price,
      rating: data.rating,
      stock: data.stock,
      origin: data.origin,
      altitude: data.altitude,
      roastLevel: data.roastLevel,
      beanType: data.beanType,
      processingMethod: data.processingMethod,
      harvestDate: data.harvestDate ? new Date(data.harvestDate) : undefined,
      roastDate: data.roastDate ? new Date(data.roastDate) : undefined,
      attributes: data.attributes,
      images: data.images,
      sellerId: data.sellerId,
      isAvailable: data.isAvailable
    });
  }

  /**
   * Validar los atributos del café.
   */
  private validateAttributes(): void {
    if (!this.attributes) {
      throw new Error("Los atributos del café son obligatorios.");
    }
    const { acidity, body, sweetness, bitterness, aroma } = this.attributes;
    [acidity, body, sweetness, bitterness, aroma].forEach((value) => {
      if (value < 1 || value > 5) {
        throw new Error("Los atributos del café deben estar en una escala de 1 a 5.");
      }
    });
  }

  /**
   * Validar el precio del café.
   */
  private validatePrice(): void {
    if (this.price <= 0) {
      throw new Error("El precio del café debe ser mayor a 0.");
    }
  }

  /**
   * Validar el stock del café.
   */
  private validateStock(): void {
    if (this.stock < 0) {
      throw new Error("El stock del café no puede ser negativo.");
    }
  }
}
