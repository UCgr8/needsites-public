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
    <div className="min-h-screen liquid-mesh-bg relative overflow-hidden">
      {/* Apple-style Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 animate-mesh-pulse"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-needsites-blue/8 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-needsites-orange/6 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-needsites-blue/4 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Apple Liquid Glass Navigation */}
      <header className="liquid-nav" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <nav className="hidden lg:flex gap-2" role="navigation" aria-label="Main navigation">
              {NAVIGATION_LINKS.map(({ path, label }, index) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary liquid-interactive',
                    isActive(path) 
                      ? 'liquid-glass text-white' 
                      : 'text-foreground hover:text-white hover:bg-white/10'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Centered Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-3 liquid-interactive"
              aria-label="NeedSites - Go to homepage"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 liquid-glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 animate-liquid-glow">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-xl font-bold liquid-gradient-text hidden sm:block">NeedSites</span>
              </div>
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:block">
              <Link 
                to="/login" 
                className="liquid-glass-button bg-gradient-to-r from-needsites-orange to-needsites-orange-dark hover:from-needsites-orange-dark hover:to-needsites-orange animate-liquid-glow"
              >
                <span className="relative z-10">Login</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden liquid-glass-button text-white hover:bg-white/20"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="lg:hidden animate-page-fade">
              <div className="liquid-glass m-4 p-4 rounded-3xl">
                <div className="space-y-2">
                  {NAVIGATION_LINKS.map(({ path, label }, index) => (
                    <Link
                      key={path}
                      to={path}
                      className={cn(
                        'block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary',
                        `stagger-fade-${Math.min(index + 1, 4)}`,
                        isActive(path) 
                          ? 'liquid-glass text-white' 
                          : 'text-foreground hover:text-white hover:bg-white/10'
                      )}
                      onClick={closeMobileMenu}
                    >
                      {label}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Link 
                      to="/login" 
                      className="block liquid-glass-button bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-center"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main role="main" className="animate-page-fade">{children}</main>
    </div>
  );
}