import type { Entity } from '@/types/api';

type Column = Entity<{
  type: 'todo' | 'in-progress' | 'done';
  title: string;
  tasksIds: string[];
}>;

export type { Column };
