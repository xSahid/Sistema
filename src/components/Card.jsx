const Card = ({ children, className = '', ...props }) => {
  const baseClasses = 'bg-white rounded-lg shadow-md p-6 border border-gray-200';
  const classes = `${baseClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card }; 