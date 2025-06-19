import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { RiExpandUpDownLine } from "react-icons/ri";

const FilterDropdown = ({
    label,
    options = [],
    selected = [],
    onChange,
    placeholder = 'Select...',
    multiSelect = true,
    clearable = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleOption = (option) => {
        const exists = selected.find((s) => s.value === option.value);

        if (multiSelect) {
            const newSelection = exists
                ? selected.filter((s) => s.value !== option.value)
                : [...selected, option];
            onChange(newSelection);
        } else {
            onChange([option]);
            setIsOpen(false);
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange([]);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isSelected = (option) => selected.some((s) => s.value === option.value);

    return (
        <div className="w-full max-w-[200px]" ref={dropdownRef}>
            {label && <label className="block text-sm mb-1 text-gray-700">{label}</label>}

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-2 pr-10 text-left truncate rounded-lg  focus:outline-none  focus:bg-blue-100 focus:*:text-blue-100 ${selected.length > 0 ? ' bg-blue-100  *:text-blue-500' : ' bg-white'} shadow-sm hover:bg-blue-50 transition-colors duration-200 relative`}>
                    {selected.length
                        ? selected.map((s) => s.label).join(', ')
                        : placeholder}
                <span className={`absolute right-2 top-3 `}>
                    <RiExpandUpDownLine size={18}   />
                </span>
                </button>


              

                {isOpen && (
                    <ul className="absolute mt-1 w-fit min-w-full max-h-60 overflow-auto bg-white rounded-md border shadow-2xl z-10">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-blue-50"
                                onClick={() => toggleOption(option)}
                            >
                                <span className={`w-4 h-4 border-2 rounded-full ring-2 ring-blue-500 ${isSelected(option) ? 'bg-blue-500' : 'bg-white'}`} />
                                {option.label}
                            </li>
                        ))}
                          {clearable && selected.length > 0 && (
                            <li className="px-4 py-2 text-blue-600 hover:bg-blue-50 cursor-pointer relative">
                    <button
                        onClick={handleClear}
                        className="text-sm text-blue-600 hover:underline focus:outline-none"
                    >
                        Clear
                    </button>
                    </li>
                )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FilterDropdown;
