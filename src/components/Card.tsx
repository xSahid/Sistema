import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  const classes = `card ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card }; 