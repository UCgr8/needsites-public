import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { NAVIGATION_LINKS } from '../utils/constants';
import { cn } from '@/lib/utils';
import { useIsMobile } from '../hooks/use-mobile';
import logo from '../assets/logo.png';
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({
  children
}: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  
  useScrollLock(mobileMenuOpen);

  // Handle ESC key and focus management
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Focus first link in mobile menu
      const firstLink = mobileMenuRef.current?.querySelector('a');
      firstLink?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [mobileMenuOpen]);

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
                ref={menuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="lg:hidden liquid-glass-button text-foreground hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center gap-2" 
                aria-expanded={mobileMenuOpen} 
                aria-controls="mobile-menu" 
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                {isMobile && window.innerWidth <= 420 && (
                  <span className="text-sm font-medium">Menu</span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                onClick={closeMobileMenu}
                aria-hidden="true"
              />
              
              {/* Drawer sliding from right */}
              <div 
                id="mobile-menu" 
                ref={mobileMenuRef}
                className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border z-50 lg:hidden transform transition-transform duration-300 ease-out"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 id="mobile-menu-title" className="text-lg font-semibold">Menu</h2>
                    <button 
                      onClick={closeMobileMenu}
                      className="liquid-glass-button text-foreground hover:bg-white/20 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Close menu"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="flex-1 p-6 space-y-2" role="navigation" aria-label="Mobile navigation">
                    {NAVIGATION_LINKS.map(({ path, label }) => (
                      <Link 
                        key={path} 
                        to={path} 
                        className={cn(
                          'block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] flex items-center',
                          isActive(path) 
                            ? 'liquid-glass text-white' 
                            : 'text-foreground/90 hover:text-white hover:bg-white/10'
                        )} 
                        onClick={closeMobileMenu}
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                  
                  {/* Footer */}
                  <div className="p-6 border-t border-border">
                    <Link 
                      to="/login" 
                      className="block liquid-glass-button bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-center min-h-[44px] flex items-center justify-center" 
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main role="main">{children}</main>
    </div>
  );
}