import type { ApiResponse } from '@/types/api';
import type { Column } from '../column';

type CreateColumnParams = Omit<Column, 'id' | 'tasksIds' | 'createdAt'>;

interface ColumnRepository {
  findAll: () => Promise<ApiResponse<Column[]>>;
  findById: (id: string) => Promise<ApiResponse<Column | null>>;
  create: (column: CreateColumnParams) => Promise<ApiResponse<{ id: string }>>;
  update: (column: Column) => Promise<ApiResponse<{ id: string }>>;
  delete: (id: string) => Promise<ApiResponse>;
}

export type { ColumnRepository, CreateColumnParams };
