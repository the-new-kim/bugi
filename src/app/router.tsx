import { RouterProvider, createBrowserRouter } from 'react-router';
import { useMemo } from 'react';
import { Root } from './routes/root';
import { NotFound } from './routes/not-found';
import { KanbanRoute } from './routes/kanban.route';
import { EisenhowerMatrixRoute } from './routes/eisenhower-matrix.route';
import { TimelineRoute } from './routes/timeline.route';

const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      element: <Root />,
      children: [
        {
          path: '/',
          element: <KanbanRoute />,
        },
        {
          path: '/matrix',
          element: <EisenhowerMatrixRoute />,
        },
        {
          path: '/timeline',
          element: <TimelineRoute />,
        },
      ],
    },
  ]);

function AppRouter() {
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} />;
}

export { AppRouter };
