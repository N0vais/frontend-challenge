import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-[#D4A373] text-[#0F0C08] hover:bg-[#B88655] font-semibold',
      secondary: 'bg-[#2A2118] text-[#F3E5D8] hover:bg-[#3D3024]',
      outline: 'border border-[#3D3024] text-[#F3E5D8] hover:bg-[#1A1510]',
      ghost: 'text-[#F3E5D8] hover:bg-[#1A1510]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A373] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';