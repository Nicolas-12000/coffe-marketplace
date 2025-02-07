import { Request, Response } from 'express';

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = [
      { id: '1', name: 'Café Colombiano', description: 'Café suave', price: 10.5, stock: 50 },
      { id: '2', name: 'Café Brasileño', description: 'Café fuerte', price: 12.0, stock: 30 },
    ];
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los productos' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = { id, name: 'Café Colombiano', description: 'Café suave', price: 10.5, stock: 50 }; // Simulación
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || !price || stock == null) {
      res.status(400).send({ message: 'Datos incompletos' });
      return;
    }
    const newProduct = { id: Date.now().toString(), name, description, price, stock }; // Simulación
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send({ message: 'Error al crear el producto' });
  }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const updatedProduct = { id, name, description, price, stock }; // Simulación
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    res.status(200).send({ message: `Producto con ID ${id} eliminado` });
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el producto' });
  }
};
