import { Repository, EntityTarget, DataSource, ObjectLiteral } from "typeorm";
import { IRepository } from "../../core/interfaces/IRepository";

/**
 * Clase genérica para manejar operaciones básicas de un repositorio con TypeORM.
 * Implementa la interfaz IRepository<T>.
 * @template T - Tipo de entidad que maneja el repositorio.
 */
export abstract class BaseRepository<T extends ObjectLiteral> implements IRepository<T> {
  protected repository: Repository<T>;

  /**
   * Constructor para inicializar el repositorio con TypeORM.
   * @param {EntityTarget<T>} entity - Entidad que manejará el repositorio.
   * @param {DataSource} dataSource - Fuente de datos de TypeORM.
   */
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    this.repository = dataSource.getRepository<T>(entity);
  }

  /**
   * Busca una entidad por su ID.
   * @param {string} id - Identificador único de la entidad.
   * @returns {Promise<T | null>} - La entidad encontrada o null si no existe.
   */
  async findById(id: string): Promise<T | null> {
    return await this.repository.findOne({ where: { id } } as any);
  }

  /**
   * Obtiene todas las entidades.
   * @returns {Promise<T[]>} - Lista de todas las entidades en la base de datos.
   */
  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  /**
   * Crea una nueva entidad.
   * @param {T} item - Datos de la entidad a crear.
   * @returns {Promise<T>} - La entidad creada.
   */
  async create(item: T): Promise<T> {
    const entity = this.repository.create(item);
    return await this.repository.save(entity);
  }

  /**
   * Actualiza una entidad existente.
   * @param {string} id - ID de la entidad a actualizar.
   * @param {Partial<T>} item - Campos a actualizar.
   * @returns {Promise<T>} - La entidad actualizada.
   */
  async update(id: string, item: Partial<T>): Promise<T> {
    await this.repository.update(id, item);
    const updatedEntity = await this.findById(id);
    if (!updatedEntity) throw new Error(`Entity with ID ${id} not found`);
    return updatedEntity;
  }

  /**
   * Elimina una entidad por su ID.
   * @param {string} id - ID de la entidad a eliminar.
   * @returns {Promise<void>} - Confirmación de eliminación.
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Guarda una entidad (operación upsert).
   * @param {T} item - Entidad a guardar.
   * @returns {Promise<T>} - La entidad guardada.
   */
  async save(item: T): Promise<T> {
    return await this.repository.save(item);
  }
}
