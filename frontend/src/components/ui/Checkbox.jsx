import React from 'react';

const Checkbox = ({ id, label, checked, onChange, disabled }) => (
  <div className="flex items-center space-x-2">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    />
    <label htmlFor={id} className="text-sm">{label}</label>
  </div>
);

export default Checkbox;
