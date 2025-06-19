import React from 'react';

const InputText = React.forwardRef(({
  type = 'text',
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  invalid = false,
  disabled = false,
  required = false,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  const inputId = name || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
          {required && <span className="text-pink-500 ml-0.5">*</span>}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${inputId}-error` : undefined}
        className={`
           w-full rounded-md px-3 py-2 border
           bg-white dark:bg-white/5
          font-normal placeholder:font-light sm:text-sm/6 
          placeholder:text-zinc-500
          dark:text-white 
            focus:ring-4
          ${invalid
            ? 'border-red-400 hover:border-pink-500 focus:border-pink-500 focus:ring-pink-300/30'
            : 'border-zinc-300 hover:border-zinc-400 focus:border-blue-400 focus:ring-cyan-300/20 dark:border-zinc-600 dark:hover:border-zinc-500'}
          focus:outline-none focus:ring-2
          transition-colors duration-200
          disabled:bg-zinc-100 disabled:border-zinc-200 disabled:cursor-not-allowed
          dark:disabled:bg-white/10 dark:disabled:border-zinc-600
          ${className}
        `}
        {...props}
      />


    </div>
  );
});

InputText.displayName = 'InputText';

export default InputText;