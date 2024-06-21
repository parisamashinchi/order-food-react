export default function Button({ children, textStyle, className, ...props })  {
   const  buttonStyle = textStyle ? 'text-button' : 'button';
  return <button
    className={`${buttonStyle} ${className}`}
    {...props}
  >
    {children}
  </button>;
};
