import { useState } from 'react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { ColumnHeader } from './header';
import { ColumnContent } from './column-content';
import type { Column } from '../column';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';

function ColumnCard({
  id,
  type,
  title,
  tasksIds,
  onDelete,
}: Column & {
  onDelete: () => void;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // const tasks: { id: string; title: string }[] = Array.from({
  //   length: 50,
  // }).map((_, index) => ({
  //   id: `task-${index}`,
  //   title: `Task ${index}`,
  // }));

  const tasks: { id: string; title: string }[] = [];

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="min-w-[350px]">
      <ColumnHeader ref={headerRef}>
        <h3>{title}</h3>
        <DeleteDialog onConfirm={onDelete} />
      </ColumnHeader>
      <ColumnContent headerHeight={headerHeight}>
        {tasks.map((task) => (
          <Card key={task.title}>
            <CardContent>{task.title}</CardContent>
          </Card>
        ))}
      </ColumnContent>
    </div>
  );
}

function DeleteDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <X />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Column</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this column?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ColumnCard };
