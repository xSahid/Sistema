const Card = ({ children, className = '', ...props }) => {
  const classes = `card ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export { Card }; 