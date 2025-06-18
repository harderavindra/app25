const Button = ({
  type = 'button',
  children,
  onClick,
  disabled,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = `
    inline-flex items-center justify-center px-5 py-2.5
    text-white rounded-lg font-medium transition focus:outline-none focus:ring-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-zinc-600 hover:bg-zinc-700 focus:ring-zinc-500',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    outline: 'bg-transparent border border-zinc-500 text-zinc-800 hover:bg-zinc-100 dark:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;