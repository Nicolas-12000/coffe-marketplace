import { Router } from 'express';
import { RecommendationsController } from '../controllers/recommendations.controller';

const router = Router();
const recommendationsController = new RecommendationsController();

/**
 * @swagger
 * /api/recommendations/{userId}:
 *   get:
 *     tags:
 *       - Recomendaciones
 *     summary: Obtiene recomendaciones personalizadas de café para un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: query
 *         name: flavorProfile
 *         schema:
 *           type: string
 *         description: Perfil de sabor preferido
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de recomendaciones
 *     responses:
 *       200:
 *         description: Lista de recomendaciones de café
 *       500:
 *         description: Error del servidor
 */
router.get('/:userId', recommendationsController.getRecommendations.bind(recommendationsController));

/**
 * @swagger
 * /api/recommendations/similar/{coffeeId}:
 *   get:
 *     tags:
 *       - Recomendaciones
 *     summary: Obtiene cafés similares a uno específico
 *     parameters:
 *       - in: path
 *         name: coffeeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del café de referencia
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de cafés similares
 *     responses:
 *       200:
 *         description: Lista de cafés similares
 *       500:
 *         description: Error del servidor
 */
router.get('/similar/:coffeeId', recommendationsController.getSimilarCoffees.bind(recommendationsController));

export default router;
