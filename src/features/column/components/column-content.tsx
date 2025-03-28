import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

function ColumnContent({
  children,
  headerHeight,
}: {
  children: React.ReactNode;
  headerHeight: number;
}) {
  return (
    <div
      className="flex flex-col gap-2 p-2 sticky border border-t-0 rounded-b-xl"
      style={{ top: `${headerHeight}px` }}
    >
      <div className="flex flex-col gap-2">{children}</div>
      <Button variant="ghost" className="justify-start">
        <Plus size={16} /> Create Task
      </Button>
    </div>
  );
}

export { ColumnContent };
