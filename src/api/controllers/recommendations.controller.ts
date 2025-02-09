import { Request, Response } from "express";
import { RecommendCoffee } from "../../core/useCases/coffee/RecommendCoffee";
import { CoffeeRepositoryPostgres } from "../../infrastructure/repositories/CoffeeRepositoryPostgres";
import { CoffeeCacheMongo } from "../../infrastructure/repositories/CoffeeCacheMongo";
import { AppDataSource } from "../../infrastructure/database/config/database";

/**
 * Controlador para manejar recomendaciones de café.
 */
export class RecommendationsController {
  private recommendCoffee: RecommendCoffee;

  constructor() {
    const postgresRepository = new CoffeeRepositoryPostgres(AppDataSource);
    const mongoCache = new CoffeeCacheMongo();
    this.recommendCoffee = new RecommendCoffee(postgresRepository, mongoCache);
  }

  /**
   * Obtiene recomendaciones personalizadas para un usuario.
   * @param req - Request de Express.
   * @param res - Response de Express.
   */
  async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const { flavorProfile, acidity, body } = req.query;

      // Obtener recomendaciones usando el caso de uso
      const recommendations = await this.recommendCoffee.execute(userId, {
        flavorProfile: flavorProfile as string,
        acidity: acidity ? parseInt(acidity as string) : undefined,
        body: body ? parseInt(body as string) : undefined
      });

      res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error en recomendaciones:', error);
      res.status(500).json({ 
        message: 'Error al obtener recomendaciones',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  /**
   * Obtiene recomendaciones similares a un café específico.
   * @param req - Request de Express.
   * @param res - Response de Express.
   */
  async getSimilarCoffees(req: Request, res: Response): Promise<void> {
    try {
      const coffeeId = req.params.coffeeId;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

      const similarCoffees = await this.recommendCoffee.findSimilarCoffees(coffeeId, limit);
      res.status(200).json(similarCoffees);
    } catch (error) {
      console.error('Error obteniendo cafés similares:', error);
      res.status(500).json({ 
        message: 'Error al obtener cafés similares',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}
