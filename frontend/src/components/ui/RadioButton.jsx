import React from 'react';

const RadioButton = ({ name, options, selectedValue, onChange }) => (
  <div className="flex flex-col space-y-2">
    {options.map((opt) => (
      <label key={opt.value} className="flex items-center space-x-2 text-sm">
        <input
          type="radio"
          name={name}
          value={opt.value}
          checked={selectedValue === opt.value}
          onChange={onChange}
          className="text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <span>{opt.label}</span>
      </label>
    ))}
  </div>
);

export default RadioButton;
