/**
 * Interfaz genérica para un repositorio.
 * @template T - El tipo de entidad que maneja el repositorio.
 */
export interface IRepository<T> {
  /**
   * Encuentra una entidad por su ID.
   * @param {string} id - El ID de la entidad.
   * @returns {Promise<T | null>} - Una promesa que resuelve con la entidad encontrada o null si no se encuentra.
   */
  findById(id: string): Promise<T | null>;

  /**
   * Encuentra todas las entidades.
   * @returns {Promise<T[]>} - Una promesa que resuelve con una lista de todas las entidades.
   */
  findAll(): Promise<T[]>;

  /**
   * Crea una nueva entidad.
   * @param {T} item - La entidad a crear.
   * @returns {Promise<T>} - Una promesa que resuelve con la entidad creada.
   */
  create(item: T): Promise<T>;

  /**
   * Actualiza una entidad existente.
   * @param {string} id - El ID de la entidad a actualizar.
   * @param {Partial<T>} item - Los campos a actualizar.
   * @returns {Promise<T>} - Una promesa que resuelve con la entidad actualizada.
   */
  update(id: string, item: Partial<T>): Promise<T>;

  /**
   * Elimina una entidad por su ID.
   * @param {string} id - El ID de la entidad a eliminar.
   * @returns {Promise<void>} - Una promesa que resuelve cuando la entidad ha sido eliminada.
   */
  delete(id: string): Promise<void>;

  /**
   * Guarda una entidad (operación upsert).
   * @param {T} item - La entidad a guardar.
   * @returns {Promise<T>} - Una promesa que resuelve con la entidad guardada.
   */
  save(item: T): Promise<T>;  // Para operaciones upsert
}