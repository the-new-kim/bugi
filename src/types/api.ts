type BaseEntity = {
  id: string;
  createdAt: number;
};

type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

type ApiResponse<T = void> = T extends void
  ? {
      ok: boolean;
      error?: Error;
    }
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends any[]
    ? {
        ok: boolean;
        results: T;
        error?: Error;
        page: number;
        totalPages: number;
        total: number;
      }
    : {
        ok: boolean;
        results: T;
        error?: Error;
      };

export type { BaseEntity, Entity, Meta, ApiResponse };
