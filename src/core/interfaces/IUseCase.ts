import { IRepository } from './IRepository';
import { Coffee } from '../entities/Coffee';

/**
 * Parámetros de búsqueda para realizar consultas avanzadas de productos de café.
 */
export interface ICoffeeSearchParams {
  /**
   * Nivel de tueste del café.
   * @type {string}
   * @example "medium"
   */
  roastLevel?: string;

  /**
   * Tipo de grano de café.
   * @type {string}
   * @example "arabica"
   */
  beanType?: string;

  /**
   * Origen del café.
   * @type {string}
   * @example "Colombia"
   */
  origin?: string;

  /**
   * Precio mínimo del café.
   * @type {number}
   * @example 10.5
   */
  minPrice?: number;

  /**
   * Precio máximo del café.
   * @type {number}
   * @example 20.0
   */
  maxPrice?: number;

  /**
   * Calificación mínima del café.
   * @type {number}
   * @example 4.5
   */
  minRating?: number;

  /**
   * ID del vendedor.
   * @type {string}
   * @example "seller123"
   */
  sellerId?: string;

  /**
   * Disponibilidad del café.
   * @type {boolean}
   * @example true
   */
  isAvailable?: boolean;
}

/**
 * Interfaz para el repositorio de productos de café.
 */
export interface ICoffeeRepository extends IRepository<Coffee> {
  /**
   * Encuentra un café por su nombre.
   * @param {string} name - El nombre del café.
   * @returns {Promise<Coffee | null>} - Una promesa que resuelve con el café encontrado o null si no se encuentra.
   */
  findByName(name: string): Promise<Coffee | null>;

  /**
   * Busca cafés según los parámetros de búsqueda.
   * @param {ICoffeeSearchParams} params - Los parámetros de búsqueda.
   * @returns {Promise<Coffee[]>} - Una promesa que resuelve con una lista de cafés que coinciden con los parámetros de búsqueda.
   */
  search(params: ICoffeeSearchParams): Promise<Coffee[]>;

  /**
   * Encuentra cafés por el ID del vendedor.
   * @param {string} sellerId - El ID del vendedor.
   * @returns {Promise<Coffee[]>} - Una promesa que resuelve con una lista de cafés vendidos por el vendedor especificado.
   */
  findBySellerId(sellerId: string): Promise<Coffee[]>;

  /**
   * Actualiza el stock de un café.
   * @param {string} id - El ID del café.
   * @param {number} quantity - La cantidad a actualizar.
   * @returns {Promise<Coffee>} - Una promesa que resuelve con el café actualizado.
   */
  updateStock(id: string, quantity: number): Promise<Coffee>;

  /**
   * Encuentra cafés dentro de un rango de precios.
   * @param {number} minPrice - El precio mínimo.
   * @param {number} maxPrice - El precio máximo.
   * @returns {Promise<Coffee[]>} - Una promesa que resuelve con una lista de cafés dentro del rango de precios especificado.
   */
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Coffee[]>;

  /**
   * Encuentra los cafés mejor calificados.
   * @param {number} [limit] - El número máximo de cafés a retornar.
   * @returns {Promise<Coffee[]>} - Una promesa que resuelve con una lista de los cafés mejor calificados.
   */
  findTopRated(limit?: number): Promise<Coffee[]>;

  /**
   * Encuentra cafés con atributos similares.
   * @param {Coffee['attributes']} attributes - Los atributos del café.
   * @param {number} [limit] - El número máximo de cafés a retornar.
   * @returns {Promise<Coffee[]>} - Una promesa que resuelve con una lista de cafés con atributos similares.
   */
  findBySimilarAttributes(attributes: Coffee['attributes'], limit?: number): Promise<Coffee[]>;
}