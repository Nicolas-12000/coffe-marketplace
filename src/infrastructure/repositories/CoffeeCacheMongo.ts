import { ICoffeeRepository, CoffeeSearchFilters } from '../../core/interfaces/ICoffeeRepository';
import { Coffee } from '../../core/entities/Coffee';
import { CoffeeModel } from '../database/mongo/CoffeeModel';

/**
 * Repositorio para manejar la caché de productos de café en MongoDB.
 * Solo permite operaciones de lectura.
 */
export class CoffeeCacheMongo implements ICoffeeRepository {
    /**
     * Busca un producto de café por su ID en la caché.
     * @param {string} id - Identificador único del café.
     * @returns {Promise<Coffee | null>} - El producto de café encontrado o null si no existe.
     */
    async findById(id: string): Promise<Coffee | null> {
        try {
            const coffeeData = await CoffeeModel.findById(id).lean();
            return coffeeData ? this.toCoffeeEntity(coffeeData) : null;
        } catch (error) {
            console.error(`Error buscando café por ID: ${id}`, error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Obtiene todos los productos de café en la caché.
     * @returns {Promise<Coffee[]>} - Lista de todos los productos de café.
     */
    async findAll(): Promise<Coffee[]> {
        try {
            const coffeeDataList = await CoffeeModel.find().lean();
            return coffeeDataList.map(this.toCoffeeEntity);
        } catch (error) {
            console.error('Error obteniendo todos los cafés', error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Crea un nuevo producto de café en la caché.
     * @param {Coffee} coffee - Datos del nuevo producto de café.
     * @returns {Promise<Coffee>} - El producto de café creado.
     */
    async create(coffee: Coffee): Promise<Coffee> {
        try {
            const coffeeData = await CoffeeModel.create(coffee);
            return this.toCoffeeEntity(coffeeData);
        } catch (error) {
            console.error('Error creando un nuevo café', error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Actualiza un producto de café en la caché.
     * @param {string} id - Identificador único del producto.
     * @param {Partial<Coffee>} coffee - Datos a actualizar.
     * @returns {Promise<Coffee>} - El producto de café actualizado.
     * @throws {Error} - Si el café no se encuentra.
     */
    async update(id: string, coffee: Partial<Coffee>): Promise<Coffee> {
        try {
            const coffeeData = await CoffeeModel.findByIdAndUpdate(id, coffee, { new: true }).lean();
            if (!coffeeData) {
                throw new Error(`Coffee with ID ${id} not found`);
            }
            return this.toCoffeeEntity(coffeeData);
        } catch (error) {
            console.error(`Error actualizando café con ID: ${id}`, error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Elimina un producto de café en la caché.
     * @param {string} id - Identificador único del café.
     * @returns {Promise<void>}
     */
    async delete(id: string): Promise<void> {
        try {
            await CoffeeModel.findByIdAndDelete(id).lean();
        } catch (error) {
            console.error(`Error eliminando café con ID: ${id}`, error);
            throw error;
        }
    }

    /**
     * Guarda un producto de café en la caché.
     * @param {Coffee} coffee - El producto de café a guardar.
     * @returns {Promise<Coffee>}
     */
    async save(coffee: Coffee): Promise<Coffee> {
        try {
            const coffeeData = await CoffeeModel.create(coffee);
            return this.toCoffeeEntity(coffeeData);
        } catch (error) {
            console.error('Error guardando café', error);
            throw error;
        }
    }
  
    /**
     * Busca un producto de café por su nombre en la caché.
     * @param {string} name - Nombre del café.
     * @returns {Promise<Coffee | null>} - El producto de café encontrado o null si no existe.
     */
    async findByName(name: string): Promise<Coffee | null> {
        try {
            const coffeeData = await CoffeeModel.findOne({ name }).lean();
            return coffeeData ? this.toCoffeeEntity(coffeeData) : null;
        } catch (error) {
            console.error(`Error buscando café por nombre: ${name}`, error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Realiza una búsqueda avanzada de productos de café utilizando filtros en la caché.
     * @param {CoffeeSearchFilters} filters - Filtros de búsqueda.
     * @returns {Promise<Coffee[]>} - Lista de productos que coinciden con los filtros.
     */
    async search(filters: CoffeeSearchFilters): Promise<Coffee[]> {
        try {
            const coffeeDataList = await CoffeeModel.find(filters).lean();
            return coffeeDataList.map(this.toCoffeeEntity);
        } catch (error) {
            console.error('Error realizando búsqueda avanzada en la caché', error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Obtiene todos los productos de café de un vendedor específico en la caché.
     * @param {string} sellerId - Identificador único del vendedor.
     * @returns {Promise<Coffee[]>} - Lista de productos del vendedor.
     */
    async findBySellerId(sellerId: string): Promise<Coffee[]> {
        try {
            const coffeeDataList = await CoffeeModel.find({ sellerId }).lean();
            return coffeeDataList.map(this.toCoffeeEntity);
        } catch (error) {
            console.error(`Error buscando cafés del vendedor: ${sellerId}`, error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Obtiene los productos de café mejor calificados en la caché.
     * @param {number} [limit=10] - Número máximo de productos a devolver.
     * @returns {Promise<Coffee[]>} - Lista de productos mejor calificados.
     */
    async findTopRated(limit = 10): Promise<Coffee[]> {
        try {
            const coffeeDataList = await CoffeeModel.find()
                .sort({ rating: -1 })
                .limit(limit)
                .lean();
            return coffeeDataList.map(this.toCoffeeEntity);
        } catch (error) {
            console.error('Error obteniendo los cafés mejor calificados', error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Encuentra productos similares a uno específico en la caché.
     * @param {string} coffeeId - Identificador único del producto de referencia.
     * @param {number} [limit=5] - Número máximo de productos similares a devolver.
     * @returns {Promise<Coffee[]>} - Lista de productos similares.
     */
    async findSimilar(coffeeId: string, limit = 5): Promise<Coffee[]> {
        try {
            const coffeeData = await CoffeeModel.findById(coffeeId).lean();
            if (!coffeeData) return [];

            const similarCoffees = await CoffeeModel.find({
                roastLevel: coffeeData.roastLevel,
                beanType: coffeeData.beanType,
                _id: { $ne: coffeeId },
            })
                .limit(limit)
                .lean();

            return similarCoffees.map(this.toCoffeeEntity);
        } catch (error) {
            console.error(`Error buscando cafés similares a: ${coffeeId}`, error);
            throw error; // Lanza el error después de registrarlo
        }
    }

    /**
     * Lanza un error si se intenta actualizar el stock en la caché.
     * @param {string} id - Identificador único del producto.
     * @param {number} quantity - Cantidad a actualizar (positiva o negativa).
     * @throws {Error} - Siempre lanza un error porque no se permite actualizar stock en la caché.
     */
    async updateStock(id: string, quantity: number): Promise<Coffee> {
        throw new Error('No se puede actualizar el stock en la caché de MongoDB.');
    }

    /**
     * Convierte un documento de MongoDB en una instancia de la entidad `Coffee`.
     * @param {any} coffeeData - Datos del café obtenidos de MongoDB.
     * @returns {Coffee} - Instancia de la entidad `Coffee`.
     */
    private toCoffeeEntity(coffeeData: any): Coffee {
        return new Coffee({
            id: coffeeData._id.toString(), // Convertir el ID de MongoDB a string
            name: coffeeData.name,
            roastLevel: coffeeData.roastLevel,
            beanType: coffeeData.beanType,
            origin: coffeeData.origin,
            price: coffeeData.price,
            rating: coffeeData.rating,
            sellerId: coffeeData.sellerId,
            isAvailable: coffeeData.isAvailable,
            images: coffeeData.images || [],
            description: coffeeData.description || "",
            stock: coffeeData.stock || 0,
            attributes: coffeeData.attributes || { acidity: 0, body: 0, sweetness: 0, bitterness: 0, aroma: 0 },
            altitude: coffeeData.altitude || 0,
            processingMethod: coffeeData.processingMethod || "",
        });
    }
}