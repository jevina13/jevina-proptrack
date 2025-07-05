import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Grid } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">PropTrack</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {!isDashboard ? (
            <>
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Properties
              </Link>
              <Button asChild variant="outline">
                <Link to="/dashboard">
                  <Grid className="mr-2 h-4 w-4" />
                  Agent Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/dashboard/properties" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/properties') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Properties
              </Link>
              <Link 
                to="/dashboard/inquiries" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/inquiries') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Inquiries
              </Link>
              <Link 
                to="/dashboard/viewings" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/viewings') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Viewings
              </Link>
              <Button asChild variant="outline" size="sm">
                <Link to="/">Public View</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile menu could be added here */}
      </div>
    </header>
  );
};