import { IRepository } from './IRepository';
import { Coffee, RoastLevel, BeanType } from '../Coffee';

/**
 * Filtros para realizar búsquedas avanzadas de productos de café.
 */
export interface CoffeeSearchFilters {
  /**
   * Nivel de tueste del café.
   * @type {RoastLevel}
   * @example RoastLevel.MEDIUM
   */
  roastLevel?: RoastLevel;

  /**
   * Tipo de grano de café.
   * @type {BeanType}
   * @example BeanType.ARABICA
   */
  beanType?: BeanType;

  /**
   * Origen del café.
   * @type {string}
   * @example "Colombia"
   */
  origin?: string;

  /**
   * Precio mínimo del café.
   * @type {number}
   * @example 5000
   */
  minPrice?: number;

  /**
   * Precio máximo del café.
   * @type {number}
   * @example 15000
   */
  maxPrice?: number;

  /**
   * Calificación mínima del café.
   * @type {number}
   * @example 4.5
   */
  minRating?: number;

  /**
   * Identificador del vendedor del café.
   * @type {string}
   * @example "seller123"
   */
  sellerId?: string;

  /**
   * Indica si el café está disponible.
   * @type {boolean}
   * @example true
   */
  isAvailable?: boolean;
}

/**
 * Repositorio específico para manejar operaciones relacionadas con la entidad Coffee.
 * Extiende la interfaz genérica IRepository.
 */
export interface ICoffeeRepository extends IRepository<Coffee> {
  /**
   * Busca un producto de café por su nombre.
   * @param {string} name - Nombre del café.
   * @returns {Promise<Coffee | null>} El producto de café encontrado o null si no existe.
   * @example
   * const coffee = await coffeeRepository.findByName('Café Especial');
   */
  findByName(name: string): Promise<Coffee | null>;

  /**
   * Realiza una búsqueda avanzada de productos de café utilizando filtros.
   * @param {CoffeeSearchFilters} filters - Filtros de búsqueda.
   * @returns {Promise<Coffee[]>} Una lista de productos que coinciden con los filtros.
   * @example
   * const results = await coffeeRepository.search({ origin: 'Colombia', minPrice: 10000 });
   */
  search(filters: CoffeeSearchFilters): Promise<Coffee[]>;

  /**
   * Obtiene todos los productos de café asociados a un vendedor específico.
   * @param {string} sellerId - Identificador único del vendedor.
   * @returns {Promise<Coffee[]>} Una lista de productos del vendedor.
   * @example
   * const coffees = await coffeeRepository.findBySellerId('seller123');
   */
  findBySellerId(sellerId: string): Promise<Coffee[]>;

  /**
   * Actualiza el stock de un producto de café.
   * @param {string} id - Identificador único del producto.
   * @param {number} quantity - Cantidad a actualizar (puede ser positiva o negativa).
   * @returns {Promise<Coffee>} El producto con el stock actualizado.
   * @example
   * const updatedCoffee = await coffeeRepository.updateStock('coffee123', -5);
   */
  updateStock(id: string, quantity: number): Promise<Coffee>;

  /**
   * Obtiene los productos de café mejor calificados.
   * @param {number} [limit] - Número máximo de productos a devolver.
   * @returns {Promise<Coffee[]>} Una lista de los productos mejor calificados.
   * @example
   * const topRated = await coffeeRepository.findTopRated(10);
   */
  findTopRated(limit?: number): Promise<Coffee[]>;

  /**
   * Encuentra productos similares a uno específico.
   * @param {string} coffeeId - Identificador único del producto de referencia.
   * @param {number} [limit] - Número máximo de productos similares a devolver.
   * @returns {Promise<Coffee[]>} Una lista de productos similares.
   * @example
   * const similarCoffees = await coffeeRepository.findSimilar('coffee123', 5);
   */
  findSimilar(coffeeId: string, limit?: number): Promise<Coffee[]>;
}
