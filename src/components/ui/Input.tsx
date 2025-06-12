"use client";

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
    };

    return (
      <div className="relative group">
        {/* Input Container */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-400 transition-colors duration-300 z-10">
              {icon}
            </div>
          )}

          {/* Input Field */}
          <input
            type={type}
            className={cn(
              "peer w-full px-4 py-4 bg-surface-secondary/50 border border-surface-tertiary rounded-xl",
              "text-white placeholder-transparent backdrop-blur-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50",
              "transition-all duration-300 ease-out",
              "hover:border-primary-500/30 hover:bg-surface-secondary/70",
              icon ? "pl-12" : "pl-4",
              error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" : "",
              className
            )}
            placeholder={label}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
            {...props}
          />

          {/* Floating Label */}
          <motion.label
            className={cn(
              "absolute left-4 pointer-events-none transition-all duration-300 ease-out",
              icon ? "left-12" : "left-4",
              isFocused || hasValue || props.value
                ? "top-2 text-xs text-primary-400 font-medium"
                : "top-1/2 transform -translate-y-1/2 text-base text-gray-400",
              error ? "text-red-400" : ""
            )}
            initial={false}
            animate={{
              scale: isFocused || hasValue || props.value ? 0.85 : 1,
            }}
          >
            {label}
          </motion.label>

          {/* Focus Ring Effect */}
          <div className="absolute inset-0 rounded-xl bg-primary-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-xl shadow-glow opacity-0 group-focus-within:opacity-30 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.div>
        )}

        {/* Success Indicator */}
        {!error && hasValue && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input; 