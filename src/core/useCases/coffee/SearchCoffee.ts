import { ICoffeeRepository } from "../../interfaces/ICoffeeRepository";

export class SearchCoffee {
  private repository: ICoffeeRepository;

  constructor(repository: ICoffeeRepository) {
    this.repository = repository;
  }

  async execute(query: string) {
    if (!query.trim()) {
      throw new Error("El término de búsqueda no puede estar vacío.");
    }

    return this.repository.findByName(query);
  }
}
