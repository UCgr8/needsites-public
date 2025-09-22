import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { NAVIGATION_LINKS } from '../utils/constants';
import { cn } from '@/lib/utils';
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
      <header className="sticky top-0 z-50 glass-card backdrop-blur-2xl border-b border-white/20 shadow-lg" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <nav className="hidden lg:flex gap-2" role="navigation" aria-label="Main navigation">
              {NAVIGATION_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary relative overflow-hidden group',
                    isActive(path) 
                      ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  )}
                >
                  <span className="relative z-10">{label}</span>
                  {!isActive(path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Centered Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-3"
              aria-label="NeedSites - Go to homepage"
            >
              <img 
                src={logo} 
                alt="NeedSites" 
                className="h-16 w-auto group-hover:scale-110 transition-transform floating"
              />
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:block">
              <Link 
                to="/login" 
                className="px-6 py-3 bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-white font-bold rounded-xl btn-magnetic glow-orange text-sm relative overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-foreground hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="lg:hidden mt-6 pb-6 border-t border-white/10 animate-fade-in-up">
              <nav className="flex flex-col gap-3 mt-6" role="navigation" aria-label="Mobile navigation">
                {NAVIGATION_LINKS.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary',
                      isActive(path) 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    )}
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </Link>
                ))}
                <Link 
                  to="/login" 
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-white font-bold rounded-xl glow-orange text-center focus:outline-none focus:ring-2 focus:ring-needsites-orange focus:ring-offset-2"
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