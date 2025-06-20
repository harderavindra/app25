import React from 'react';

const SelectDropdown = ({
  id,
  name,
  label,
  options = [],
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  invalid = false,
  className = '',
  wrapperClassName = '',
}) => {
  const inputId = id || name || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
          {required && <span className="text-pink-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        aria-invalid={invalid}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-white/5
          placeholder:text-zinc-500 text-sm
          ${invalid
            ? 'border-red-400 hover:border-pink-500 focus:border-pink-500 focus:ring-pink-300/30'
            : 'border-zinc-300 hover:border-zinc-400 focus:border-blue-400 focus:ring-cyan-300/20 dark:border-zinc-600 dark:hover:border-zinc-500'}
          focus:outline-none focus:ring-2
          transition-colors duration-200
          disabled:bg-zinc-100 disabled:border-zinc-200 disabled:cursor-not-allowed
          dark:disabled:bg-white/10 dark:disabled:border-zinc-600
          ${className}
        `}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
