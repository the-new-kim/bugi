import type { ColumnService } from '@/features/column/service';
import { createContextFactory } from '@/lib/create-context-factory';

const [ServiceProvider, useService] = createContextFactory<{
  columnService: ColumnService;
}>();

export { ServiceProvider, useService };
