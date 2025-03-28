import { useService } from '@/context/service-context';
import { useEffect, useState } from 'react';
import { ColumnCard } from '@/features/column/components/column-card';
import { CreateColumn } from '@/features/column/components/create-column';
import type { Column } from '@/features/column/column';

function KanbanRoute() {
  const { columnService } = useService();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    columnService.findAll().then((res) => setColumns(res.results));
  }, [columnService]);

  const handleDeleteColumn = (id: string) => {
    columnService.delete(id).then(() => {
      columnService.findAll().then((res) => setColumns(res.results));
    });
  };

  return (
    <div className="flex-1 size-full">
      <div className="flex flex-col gap-2 size-full [&>*]:px-2">
        <h1>Kanban</h1>
        <div className="flex-1 overflow-auto pb-20 !pr-20">
          <div className="inline-flex gap-2">
            {columns.map((column) => (
              <ColumnCard
                key={column.id}
                onDelete={() => handleDeleteColumn(column.id)}
                {...column}
              />
            ))}
            <CreateColumn
              onSuccess={() =>
                columnService.findAll().then((res) => setColumns(res.results))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { KanbanRoute };
