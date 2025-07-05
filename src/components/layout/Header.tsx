import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Grid, Menu, Building, MessageSquare, Calendar } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">PropTrack</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {!isDashboard ? (
                  <>
                    <Link 
                      to="/" 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-accent ${
                        location.pathname === '/' ? 'bg-accent text-primary font-medium' : 'text-muted-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="h-4 w-4" />
                      <span>Properties</span>
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-accent text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Grid className="h-4 w-4" />
                      <span>Agent Dashboard</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-accent ${
                        location.pathname === '/dashboard' ? 'bg-accent text-primary font-medium' : 'text-muted-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Grid className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/dashboard/properties" 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-accent ${
                        location.pathname.includes('/properties') ? 'bg-accent text-primary font-medium' : 'text-muted-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Building className="h-4 w-4" />
                      <span>Properties</span>
                    </Link>
                    <Link 
                      to="/dashboard/inquiries" 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-accent ${
                        location.pathname.includes('/inquiries') ? 'bg-accent text-primary font-medium' : 'text-muted-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Inquiries</span>
                    </Link>
                    <Link 
                      to="/dashboard/viewings" 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-accent ${
                        location.pathname.includes('/viewings') ? 'bg-accent text-primary font-medium' : 'text-muted-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Viewings</span>
                    </Link>
                    <Link 
                      to="/" 
                      className="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-accent text-muted-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="h-4 w-4" />
                      <span>Public View</span>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};