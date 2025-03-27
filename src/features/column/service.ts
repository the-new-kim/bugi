import type {
  ColumnRepository,
  CreateColumnParams,
} from './repositories/types';
import type { Column } from './column';
class ColumnService {
  constructor(private readonly repository: ColumnRepository) {}

  async findAll() {
    return this.repository.findAll();
  }
  async findById(id: string) {
    return this.repository.findById(id);
  }
  async create(column: CreateColumnParams) {
    return this.repository.create(column);
  }
  async update(column: Column) {
    return this.repository.update(column);
  }
  async delete(id: string) {
    return this.repository.delete(id);
  }
}

export { ColumnService };
