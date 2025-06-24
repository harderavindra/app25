import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
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
        <div className="w-full max-w-[200px] min-w-[200px]" ref={dropdownRef}>
            {label && <label className="block text-sm mb-1 text-gray-700">{label}</label>}

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-2 pr-10 text-left truncate rounded-lg bg-neutral-50  focus:outline-none  focus:bg-white focus:*:text-neutral-800 ${selected.length > 0 ? 'border border-blue-300 bg-white' : 'border border-stone-100 '} shadow-sm hover:bg-white transition-colors duration-200 relative`}>
                    {selected.length
                        ? selected.map((s) => s.label).join(', ')
                        : placeholder}
                    <span className={`absolute right-2 top-3 `}>
                        <RiExpandUpDownLine size={18} />
                    </span>
                </button>
                {clearable && selected.length > 0 && (
                    <button
                        onClick={handleClear}
                        className="absolute w-5 h-5 -top-3 -right-3 bg-neutral-800 flex  items-center justify-center rounded-full  text-sm text-neutral-50 hover:underline focus:outline-none cursor-pointer"
                    >
                        <FiX />
                    </button>
                )}
                {isOpen && (
                    <ul className="absolute mt-1 w-fit min-w-full max-h-60 overflow-auto bg-white rounded-lg  shadow-2xl z-10">

                        {options.map((option) => (
                            <li
                                key={option.value}
                                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-50"
                                onClick={() => toggleOption(option)}
                            >
                                <span className={`w-4 h-4 border-2 border-white rounded-full ring-2 ring-neutral-800 ${isSelected(option) ? 'bg-neutral-800' : 'bg-white'}`} />
                                {option.label}
                            </li>
                        ))}

                    </ul>
                )}
            </div>
        </div>
    );
};

export default FilterDropdown;
