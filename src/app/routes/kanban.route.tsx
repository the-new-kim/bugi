import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const mockData = [
  {
    title: 'To Do',
    items: Array.from({ length: 15 }, (_, index) => ({
      title: `Item ${index + 1}`,
    })),
  },
  {
    title: 'In Progress',
    items: Array.from({ length: 0 }, (_, index) => ({
      title: `Item ${index + 1}`,
    })),
  },
  {
    title: 'Done',
    items: Array.from({ length: 30 }, (_, index) => ({
      title: `Item ${index + 1}`,
    })),
  },
];

function KanbanRoute() {
  return (
    <div className="flex-1 size-full py-2">
      <div className="flex flex-col gap-2 size-full [&>*]:px-2">
        <h1>Kanban</h1>
        <div className="flex-1 grid grid-cols-3 gap-2 overflow-auto">
          {mockData.map((column) => (
            <KanbanColumn key={column.title} {...column} />
          ))}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({
  title,
  items,
}: {
  title: string;
  items: { title: string }[];
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div>
      <KanbanColumnHeader ref={headerRef}>
        <h3>{title}</h3>
      </KanbanColumnHeader>
      <KanbanColumnContent headerHeight={headerHeight}>
        {items.map((item) => (
          <Card key={item.title}>
            <CardContent>{item.title}</CardContent>
          </Card>
        ))}
      </KanbanColumnContent>
    </div>
  );
}

function KanbanColumnHeader({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      className="sticky top-0 z-10 bg-background shadow-sm border-b"
      ref={ref}
    >
      <div className="border border-b-0  bg-card rounded-t-xl p-2">
        {children}
      </div>
    </div>
  );
}

function KanbanColumnContent({
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

export { KanbanRoute };
