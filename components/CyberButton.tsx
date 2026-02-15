import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative font-mono font-bold uppercase py-3 px-6 tracking-widest transition-all duration-200 border-2 clip-path-polygon hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-cyber-neonGreen text-cyber-black border-cyber-neonGreen hover:bg-transparent hover:text-cyber-neonGreen shadow-[0_0_15px_rgba(57,255,20,0.5)]",
    secondary: "bg-transparent text-cyber-neonBlue border-cyber-neonBlue hover:bg-cyber-neonBlue hover:text-cyber-black shadow-[0_0_10px_rgba(0,255,255,0.3)]",
    danger: "bg-transparent text-cyber-neonPink border-cyber-neonPink hover:bg-cyber-neonPink hover:text-white shadow-[0_0_10px_rgba(255,0,255,0.3)]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
