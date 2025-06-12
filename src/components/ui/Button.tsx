"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    className, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center rounded-xl font-semibold
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-4 focus:ring-primary-500/20
      disabled:opacity-50 disabled:cursor-not-allowed
      overflow-hidden group
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-primary-500 to-primary-600 
        text-white shadow-glow
        hover:from-primary-400 hover:to-primary-500 
        hover:shadow-glow-lg hover:scale-105
        active:scale-95
      `,
      secondary: `
        bg-surface-secondary border border-surface-tertiary 
        text-gray-100 shadow-elevation-2
        hover:bg-surface-tertiary hover:border-primary-500/30
        hover:shadow-glow hover:scale-105
        active:scale-95
      `,
      ghost: `
        bg-transparent text-primary-400 
        hover:bg-primary-500/10 hover:text-primary-300
        hover:scale-105 active:scale-95
      `,
      outline: `
        bg-transparent border-2 border-primary-500 
        text-primary-400 shadow-inner-glow
        hover:bg-primary-500 hover:text-white 
        hover:shadow-glow hover:scale-105
        active:scale-95
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-gradient-shift" />
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out" />
        </div>

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && (
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 