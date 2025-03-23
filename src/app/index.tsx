import { AppRouter } from './router';
import { ThemeProvider } from '@/context/theme-context';
function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export { App };
