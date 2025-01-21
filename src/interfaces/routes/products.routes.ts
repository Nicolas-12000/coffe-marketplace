import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers';

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos disponibles.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 *       500:
 *         description: Error al obtener los productos.
 */
router.get('/', getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna un producto específico por su ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error al obtener el producto.
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Permite crear un nuevo producto.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto.
 *                 example: Café Colombiano
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *                 example: Café suave
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *                 example: 10.5
 *               stock:
 *                 type: number
 *                 description: Cantidad en stock.
 *                 example: 50
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       500:
 *         description: Error al crear el producto.
 */
router.post('/', createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Permite actualizar la información de un producto existente.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto.
 *                 example: Café Colombiano
 *               description:
 *                 type: string
 *                 description: Descripción del producto.
 *                 example: Café suave
 *               price:
 *                 type: number
 *                 description: Precio del producto.
 *                 example: 10.5
 *               stock:
 *                 type: number
 *                 description: Cantidad en stock.
 *                 example: 50
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error al actualizar el producto.
 */
router.put('/:id', updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Permite eliminar un producto existente.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error al eliminar el producto.
 */
router.delete('/:id', deleteProduct);

export default router;
