import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { NAVIGATION_LINKS } from '../utils/constants';
import { cn } from '../utils/cn';
import logo from '../assets/logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  useScrollLock(mobileMenuOpen);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <nav className="hidden lg:flex gap-1" role="navigation" aria-label="Main navigation">
              {NAVIGATION_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
                    isActive(path) 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Centered Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2"
              aria-label="NeedSites - Go to homepage"
            >
              <img 
                src={logo} 
                alt="NeedSites" 
                className="h-12 w-auto group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:block">
              <Link 
                to="/login" 
                className="px-4 py-2 bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-white font-semibold rounded-xl hover:from-needsites-orange-dark hover:to-needsites-orange transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-needsites-orange focus:ring-offset-2"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="lg:hidden mt-4 pb-4 border-t border-border">
              <nav className="flex flex-col gap-2 mt-4" role="navigation" aria-label="Mobile navigation">
                {NAVIGATION_LINKS.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
                      isActive(path) 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    )}
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </Link>
                ))}
                <Link 
                  to="/login" 
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-white font-semibold rounded-xl hover:from-needsites-orange-dark hover:to-needsites-orange transition-all duration-200 shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-needsites-orange focus:ring-offset-2"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main role="main">{children}</main>
    </div>
  );
}