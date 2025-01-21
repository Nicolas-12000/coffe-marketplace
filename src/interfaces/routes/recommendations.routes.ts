import express from 'express';
import { getRecommendations } from '../controllers/recommendations.controller';

const router = express.Router();

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Obtener recomendaciones de productos
 *     description: Retorna una lista de productos recomendados.
 *     tags:
 *       - Recommendations
 *     responses:
 *       200:
 *         description: Lista de recomendaciones obtenida exitosamente.
 *       500:
 *         description: Error al obtener las recomendaciones.
 */
router.get('/', getRecommendations);

export default router;
