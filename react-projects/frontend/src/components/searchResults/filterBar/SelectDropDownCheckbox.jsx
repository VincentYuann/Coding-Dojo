import { useState, useRef, useEffect } from "react";

function SelectDropDownCheckbox({ label, name, options, selectedValue, onChange, multiSelect = false }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropDownDivRef = useRef(null)

    // Toggle the div that shows all the options
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (dropDownDivRef.current && !dropDownDivRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const getButtonLabel = () => {
        // Nothing selected
        if (!selectedValue || selectedValue.length === 0) return label;

        if (multiSelect) {
            const constFirstGenreID = selectedValue[0];
            return `${options.find(option => option.label === constFirstGenreID)} + [${selectedValue.length - 1}]`;
        } else {
            const option = options.find(option => option.value === selectedValue);
            return option ? option.label : label;
        }
    }

    const isChecked = (value) => {
        if (multiSelect) {
            return selectedValue.contains(value) ? True : False
        } else {
            return (selectedValue === value) ? True : False
        }
    }

    return (
        <div className="filter-dropdown" ref={dropDownDivRef}>
            <button
                type="button"
                className="filter-dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{getButtonLabel()}</span>
                <span className="arrow">▼</span>
            </button>

            {isOpen &&
                <div className="filter-dropdown-menu">
                    {options.map((option) => (
                        <label key={option.value} className="dropdown-menu-item">
                            <input
                                name={name}
                                value={option.value}
                                type="checkbox"
                                checked={() => isChecked(option.value)}
                                onChange={onChange}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>

            }
        </div>
    );
}

export default SelectDropDownCheckbox;