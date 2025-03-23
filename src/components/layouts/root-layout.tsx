import { THEMES, useTheme } from '@/context/theme-context';
import { Check, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '../ui/sidebar';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DropdownMenu } from '../ui/dropdown-menu';
import { Link } from 'react-router';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-screen h-screen">
        <SidebarTrigger />

        <main className="flex flex-col flex-1 p-2">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Bugi</h1>
      </SidebarHeader>
      <SidebarContent>
        <nav>
          <SidebarGroup>
            <ul>
              <li>
                <Link to="/">Kanban</Link>
              </li>
              <li>
                <Link to="/matrix">Matrix</Link>
              </li>
              <li>
                <Link to="/timeline">Timeline</Link>
              </li>
            </ul>
          </SidebarGroup>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}

function ThemeToggle() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {theme} {currentTheme === theme && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { RootLayout };
