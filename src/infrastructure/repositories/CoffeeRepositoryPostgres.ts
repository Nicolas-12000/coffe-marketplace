import { Repository, DataSource } from "typeorm";
import { Coffee } from "../../core/entities/Coffee";
import { BaseRepository } from "./BaseRepository";
import { ICoffeeRepository, CoffeeSearchFilters } from '../../core/interfaces/ICoffeeRepository';
/**
 * Implementación del repositorio para la entidad Coffee en PostgreSQL.
 * Extiende BaseRepository y cumple con la interfaz ICoffeeRepository.
 */
export class CoffeeRepositoryPostgres
  extends BaseRepository<Coffee>
  implements ICoffeeRepository
{
  private coffeeRepository: Repository<Coffee>;

  /**
   * Constructor del repositorio de café para PostgreSQL.
   * @param {DataSource} dataSource - Fuente de datos de TypeORM.
   */
  constructor(dataSource: DataSource) {
    super(Coffee, dataSource);
    this.coffeeRepository = dataSource.getRepository(Coffee);
  }

  /**
   * Busca un producto de café por su nombre.
   * @param {string} name - Nombre del café.
   * @returns {Promise<Coffee | null>} El producto de café encontrado o null si no existe.
   * @example
   * const coffee = await coffeeRepository.findByName('Café Especial');
   */
  async findByName(name: string): Promise<Coffee | null> {
    return this.coffeeRepository.findOne({ where: { name } });
  }

  /**
   * Realiza una búsqueda avanzada de productos de café utilizando filtros.
   * @param {CoffeeSearchFilters} filters - Filtros de búsqueda.
   * @returns {Promise<Coffee[]>} Una lista de productos que coinciden con los filtros.
   * @example
   * const results = await coffeeRepository.search({ origin: 'Colombia', minPrice: 10000 });
   */
  async search(filters: CoffeeSearchFilters): Promise<Coffee[]> {
    const query = this.coffeeRepository.createQueryBuilder("coffee");

    if (filters.roastLevel) {
      query.andWhere("coffee.roastLevel = :roastLevel", { roastLevel: filters.roastLevel });
    }
    if (filters.beanType) {
      query.andWhere("coffee.beanType = :beanType", { beanType: filters.beanType });
    }
    if (filters.origin) {
      query.andWhere("coffee.origin = :origin", { origin: filters.origin });
    }
    if (filters.minPrice !== undefined) {
      query.andWhere("coffee.price >= :minPrice", { minPrice: filters.minPrice });
    }
    if (filters.maxPrice !== undefined) {
      query.andWhere("coffee.price <= :maxPrice", { maxPrice: filters.maxPrice });
    }
    if (filters.minRating !== undefined) {
      query.andWhere("coffee.rating >= :minRating", { minRating: filters.minRating });
    }
    if (filters.sellerId) {
      query.andWhere("coffee.sellerId = :sellerId", { sellerId: filters.sellerId });
    }
    if (filters.isAvailable !== undefined) {
      query.andWhere("coffee.isAvailable = :isAvailable", { isAvailable: filters.isAvailable });
    }

    return query.getMany();
  }

  /**
   * Obtiene todos los productos de café asociados a un vendedor específico.
   * @param {string} sellerId - Identificador único del vendedor.
   * @returns {Promise<Coffee[]>} Una lista de productos del vendedor.
   * @example
   * const coffees = await coffeeRepository.findBySellerId('seller123');
   */
  async findBySellerId(sellerId: string): Promise<Coffee[]> {
    return this.coffeeRepository.find({ where: { sellerId } });
  }

  /**
   * Actualiza el stock de un producto de café.
   * @param {string} id - Identificador único del producto.
   * @param {number} quantity - Cantidad a actualizar (puede ser positiva o negativa).
   * @returns {Promise<Coffee>} El producto con el stock actualizado.
   * @throws {Error} Si el producto no se encuentra.
   * @example
   * const updatedCoffee = await coffeeRepository.updateStock('coffee123', -5);
   */
  async updateStock(id: string, quantity: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new Error("Café no encontrado");
    }
    coffee.stock += quantity;
    return this.coffeeRepository.save(coffee);
  }

  /**
   * Obtiene los productos de café mejor calificados.
   * @param {number} [limit=5] - Número máximo de productos a devolver.
   * @returns {Promise<Coffee[]>} Una lista de los productos mejor calificados.
   * @example
   * const topRated = await coffeeRepository.findTopRated(10);
   */
  async findTopRated(limit: number = 5): Promise<Coffee[]> {
    return this.coffeeRepository.find({
      order: { rating: "DESC" },
      take: limit,
    });
  }

  /**
   * Encuentra productos similares a uno específico.
   * @param {string} coffeeId - Identificador único del producto de referencia.
   * @param {number} [limit=5] - Número máximo de productos similares a devolver.
   * @returns {Promise<Coffee[]>} Una lista de productos similares.
   * @throws {Error} Si el producto de referencia no se encuentra.
   * @example
   * const similarCoffees = await coffeeRepository.findSimilar('coffee123', 5);
   */
  async findSimilar(coffeeId: string, limit: number = 5): Promise<Coffee[]> {
    const coffee = await this.coffeeRepository.findOne({ where: { id: coffeeId } });
    if (!coffee) {
      throw new Error("Café no encontrado");
    }
    return this.coffeeRepository.find({
      where: { origin: coffee.origin, beanType: coffee.beanType },
      take: limit,
    });
  }
}
