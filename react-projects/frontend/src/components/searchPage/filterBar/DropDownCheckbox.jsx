import { useState, useRef, useEffect } from "react";

function SelectDropDownCheckbox({ label, name, options, selectedValue, onChange, multiselect = false }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropDownDivRef = useRef(null)

    // DATA: Always treat as an array
    const selectedArray = [].concat(selectedValue)
        .filter(value =>
            value !== null &&
            value !== undefined
        )
        .map(String);
    console.log(selectedArray)

    // Toggle the div that shows all the options
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (dropDownDivRef.current && !dropDownDivRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        // Deletes the event so it doesn't stack up overtime
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const getButtonLabel = () => {
        if (selectedArray.length === 0 || selectedValue === "") return label

        const firstMatchingLabel = options.find(option => String(option.value) === selectedArray[0]).label;
        console.log(firstMatchingLabel)

        if (multiselect) {
            return `${firstMatchingLabel} (${selectedArray.length})`
        } else {
            return firstMatchingLabel
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
                <span className="arrow"> ▼</span>
            </button>

            {isOpen &&
                <div className="filter-dropdown-menu">
                    {options.map((option) => (
                        <label key={option.value} className="dropdown-menu-item">
                            <input
                                name={name}
                                value={option.value}
                                type="checkbox"
                                checked={selectedArray.includes(String(option.value))}
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