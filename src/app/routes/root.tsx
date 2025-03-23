import { Outlet } from 'react-router';
import { RootLayout } from '@/components/layouts/root-layout';
function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export { Root };
