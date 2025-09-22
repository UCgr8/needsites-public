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
export default function Layout({
  children
}: LayoutProps) {
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
    <div className="min-h-screen bg-background relative">
      {/* Simplified Apple Liquid Glass Navigation */}
      <header className="liquid-nav" role="banner">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-end lg:justify-between">
            {/* Left Navigation */}
            <nav className="hidden lg:flex gap-2" role="navigation" aria-label="Main navigation">
              {NAVIGATION_LINKS.map(({ path, label }) => (
                <Link 
                  key={path} 
                  to={path} 
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary',
                    isActive(path) 
                      ? 'liquid-glass text-white' 
                      : 'text-foreground hover:text-white hover:bg-white/10'
                  )}
                >
                  <span className="relative z-10">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Centered Logo */}
            <Link 
              to="/" 
              className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-3 transition-transform duration-300 hover:scale-105" 
              aria-label="NeedSites - Go to homepage"
            >
              <div className="flex items-center space-x-3">
                <img 
                  src={logo} 
                  alt="NeedSites Logo" 
                  className="h-12 w-auto group-hover:scale-110 transition-all duration-300" 
                />
              </div>
            </Link>

            {/* Right side container */}
            <div className="flex items-center gap-4">
              {/* Login Button - Desktop */}
              <Link 
                to="/login" 
                className="hidden lg:block liquid-glass-button bg-gradient-to-r from-needsites-orange to-needsites-orange-dark hover:from-needsites-orange-dark hover:to-needsites-orange"
              >
                <span className="relative z-10">Login</span>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="lg:hidden liquid-glass-button text-foreground hover:bg-white/20" 
                aria-expanded={mobileMenuOpen} 
                aria-controls="mobile-menu" 
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="lg:hidden animate-scale-in">
              <div className="liquid-glass m-4 p-4 rounded-3xl">
                <div className="space-y-2">
                  {NAVIGATION_LINKS.map(({ path, label }) => (
                    <Link 
                      key={path} 
                      to={path} 
                      className={cn(
                        'block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary',
                        isActive(path) 
                          ? 'liquid-glass text-white' 
                          : 'text-foreground/90 hover:text-white hover:bg-white/10'
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
      <main role="main">{children}</main>
    </div>
  );
}