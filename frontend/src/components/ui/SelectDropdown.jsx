import React from 'react';

const SelectDropdown = ({
  id,
  label,
  options,
  value,
  onChange,
  required,
  disabled,
}) => (
  <div className="w-full">
    {label && <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>}
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
    >
      <option value="" disabled>Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default SelectDropdown;