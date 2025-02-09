import { Coffee } from "../../entities/Coffee";
import { ICoffeeRepository } from "../../interfaces/ICoffeeRepository";

/**
 * Caso de uso para recomendar cafés a los usuarios.
 */
export class RecommendCoffee {
  constructor(
    private readonly postgresRepo: ICoffeeRepository,  // Repositorio de PostgreSQL
    private readonly mongoRepo: ICoffeeRepository     // Repositorio de MongoDB (caché)
  ) {}

  /**
   * Obtiene recomendaciones de café para un usuario.
   * @param userId - Identificador del usuario.
   * @returns Lista de cafés recomendados.
   */
  async execute(
    userId: string, 
    filters?: { 
      flavorProfile?: string; 
      acidity?: number; 
      body?: number 
    }
  ): Promise<Coffee[]> {
    try {
      const userPreferences = await this.postgresRepo.findBySellerId(userId);
      
      if (userPreferences.length > 0) {
        return this.postgresRepo.findSimilar(userPreferences[0].id, 5);
      }
      
      return this.mongoRepo.findTopRated(5);
    } catch (error) {
      console.error('Error en RecommendCoffee:', error);
      throw new Error('Error al obtener recomendaciones');
    }
  }

  async getSimilar(coffeeId: string, limit: number = 5): Promise<Coffee[]> {
    try {
      // Primero intentamos obtener cafés similares de PostgreSQL
      const similarCoffees = await this.postgresRepo.findSimilar(coffeeId, limit);
      
      // Si no encontramos suficientes cafés similares en PostgreSQL, complementamos con MongoDB
      if (similarCoffees.length < limit) {
        const mongoSimilar = await this.mongoRepo.findSimilar(coffeeId, limit - similarCoffees.length);
        return [...similarCoffees, ...mongoSimilar];
      }
      
      return similarCoffees;
    } catch (error) {
      console.error('Error obteniendo cafés similares:', error);
      throw new Error('Error al obtener cafés similares');
    }
  }

  /**
   * Obtiene cafés similares a uno específico.
   * @param coffeeId - ID del café de referencia
   * @param limit - Número máximo de resultados
   */
  async findSimilarCoffees(coffeeId: string, limit: number = 5): Promise<Coffee[]> {
    try {
      const similarCoffees = await this.postgresRepo.findSimilar(coffeeId, limit);
      
      if (similarCoffees.length < limit) {
        const mongoSimilar = await this.mongoRepo.findSimilar(coffeeId, limit - similarCoffees.length);
        return [...similarCoffees, ...mongoSimilar];
      }
      
      return similarCoffees;
    } catch (error) {
      console.error('Error obteniendo cafés similares:', error);
      throw new Error('Error al obtener cafés similares');
    }
  }
}
