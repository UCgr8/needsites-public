import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'desktop' | 'mobile';
}

export function NavigationLink({ 
  to, 
  children, 
  onClick, 
  className,
  variant = 'desktop'
}: NavigationLinkProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const baseStyles = "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary font-semibold";
  
  const desktopStyles = cn(
    baseStyles,
    "px-4 py-3 rounded-xl text-sm relative",
    isActive(to) 
      ? "nav-link-active text-primary bg-primary/10 border border-primary/20" 
      : "nav-link-inactive text-muted-foreground hover:text-primary hover:bg-primary/5"
  );

  const mobileStyles = cn(
    baseStyles,
    "block px-4 py-3 rounded-2xl text-base min-h-[44px] flex items-center",
    isActive(to)
      ? "nav-link-active text-primary bg-primary/10 border border-primary/20"
      : "nav-link-inactive text-foreground hover:text-primary hover:bg-primary/10"
  );

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        variant === 'desktop' ? desktopStyles : mobileStyles,
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}