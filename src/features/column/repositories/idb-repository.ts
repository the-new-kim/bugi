import type { ApiResponse } from '@/types/api';
import type { Column } from '../column';
import type { ColumnRepository, CreateColumnParams } from './types';

const COLUMN_STORE_NAME = 'column' as const;

class IndexedDBColumnRepository implements ColumnRepository {
  constructor(private readonly db: IDBDatabase) {}

  async findAll() {
    return new Promise<ApiResponse<Column[]>>((resolve, reject) => {
      const transaction = this.db.transaction(COLUMN_STORE_NAME, 'readonly');
      const store = transaction.objectStore(COLUMN_STORE_NAME);
      const request: IDBRequest<Column[]> = store.getAll();
      request.onsuccess = () => {
        resolve({
          ok: true,
          results: request.result,
          page: 1,
          totalPages: 1,
          total: request.result.length,
        });
      };
      request.onerror = () => {
        reject({ ok: false, error: request.error });
      };
    });
  }

  async findById(id: string) {
    return new Promise<ApiResponse<Column | null>>((resolve, reject) => {
      const transaction = this.db.transaction(COLUMN_STORE_NAME, 'readonly');
      const store = transaction.objectStore(COLUMN_STORE_NAME);
      const request: IDBRequest<Column | null> = store.get(id);
      request.onsuccess = () => {
        resolve({ ok: true, results: request.result });
      };
      request.onerror = () => {
        reject({ ok: false, error: request.error });
      };
    });
  }

  async create(column: CreateColumnParams) {
    return new Promise<ApiResponse<{ id: string }>>((resolve, reject) => {
      const transaction = this.db.transaction(COLUMN_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(COLUMN_STORE_NAME);
      const request = store.add({ ...column, tasksIds: [] });
      request.onsuccess = () => {
        resolve({ ok: true, results: { id: request.result as string } });
      };
      request.onerror = () => {
        reject({ ok: false, error: request.error });
      };
    });
  }

  async update(column: Column) {
    return new Promise<ApiResponse<{ id: string }>>((resolve, reject) => {
      const transaction = this.db.transaction(COLUMN_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(COLUMN_STORE_NAME);
      const request = store.put(column);
      request.onsuccess = () => {
        resolve({ ok: true, results: { id: request.result as string } });
      };
      request.onerror = () => {
        reject({ ok: false, error: request.error });
      };
    });
  }

  async delete(id: string) {
    return new Promise<ApiResponse<null>>((resolve, reject) => {
      const transaction = this.db.transaction(COLUMN_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(COLUMN_STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => {
        resolve({ ok: true, results: null });
      };
      request.onerror = () => {
        reject({ ok: false, error: request.error });
      };
    });
  }
}

export { IndexedDBColumnRepository };
