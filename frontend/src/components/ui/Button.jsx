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
    inline-flex items-center justify-center px-5 py-2.5 cursor-pointer
    text-white uppercase rounded-lg font-medium transition focus:outline-none focus:ring-2
    disabled:opacity-20 disabled:cursor-not-allowed disabled:text-neutral-400
  `;

  const variants = {
    primary: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 ',
    secondary: 'bg-neutral-900 hover:bg-neutral-950 focus:ring-neutral-300',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    outline: 'bg-transparent border border-zinc-500 text-zinc-800 hover:bg-zinc-100 dark:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;