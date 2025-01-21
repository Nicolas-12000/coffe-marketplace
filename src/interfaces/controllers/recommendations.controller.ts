import { Request, Response } from 'express';

// Obtener recomendaciones personalizadas
export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { flavorProfile, acidity, body } = req.query;

    const recommendations = [
      { id: '1', name: 'Café Colombiano', flavorProfile: 'ácido', acidity: 4, body: 3 },
      { id: '2', name: 'Café Etíope', flavorProfile: 'frutal', acidity: 5, body: 2 },
    ];

    const filtered = recommendations.filter((product) => {
      if (flavorProfile && product.flavorProfile !== flavorProfile) return false;
      if (acidity && product.acidity !== parseInt(acidity as string)) return false;
      if (body && product.body !== parseInt(body as string)) return false;
      return true;
    });

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener recomendaciones' });
  }
};
