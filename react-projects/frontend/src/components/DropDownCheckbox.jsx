import { useState, useRef, useEffect } from "react";

function DropDownCheckbox({ filterParamKey, options, value, onChange: setFilterObject, multiselect = false, disabled = false }) {
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

        // Deletes the event so it doesn't stack up overtime
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // DATA: Convert each value into an array (if it isn't already), filter out any empty values, and convert everything to strings for easier comparison 
    const selectedArray = [].concat(value)
        .filter(value => value !== null && value !== undefined && value !== "")
        .map(String);


    const getButtonLabel = () => {
        if (selectedArray.length === 0 || !value) {
            const defaultLabel = filterParamKey.charAt(0).toUpperCase() + filterParamKey.slice(1);
            return defaultLabel;
        }

        // Find the matching option
        const match = options.find(option => String(option.value) === selectedArray[0]);

        // Safety check: If no match found, fall back to the key name
        const firstMatchingLabel = match ? match.label : filterParamKey;

        return multiselect && selectedArray.length > 1
            ? `${firstMatchingLabel} (+${selectedArray.length - 1})`
            : firstMatchingLabel;
    }


    const handleFilterObjectUpdate = (e) => {
        const { name, value: clickedValue, checked } = e.target;
        const stringValue = String(clickedValue);

        if (multiselect) {
            if (checked) { // Add to list
                setFilterObject(prev => ({ ...prev, [name]: [...selectedArray, stringValue] }));
            } else { // Remove from list
                const newArray = selectedArray.filter(val => String(val) !== stringValue);
                setFilterObject(prev => ({ ...prev, [name]: newArray }));
            }
        } else { // Replace value
            if (checked) {
                setFilterObject(prev => ({ ...prev, [name]: stringValue }));
            } else { // Remove value 
                setFilterObject(prev => ({ ...prev, [name]: "" }));
            }

        }
    }


    return (
        <div className="filter-dropdown" ref={dropDownDivRef}>
            <button
                type="button"
                className="filter-dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span>{getButtonLabel()}</span>
                <span className="arrow">{isOpen ? " ▲" : " ▼"}</span>
            </button>

            {isOpen &&
                <div className="filter-dropdown-menu">
                    {options.map((option) => (
                        <label key={option.value} className="dropdown-menu-item">
                            <input
                                name={filterParamKey}
                                value={option.value}
                                type="checkbox"
                                checked={selectedArray.includes(String(option.value))}
                                onChange={() => {
                                    handleFilterObjectUpdate;
                                    if (!multiselect) setIsOpen(false);
                                }}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>

            }
        </div>
    );
}

export default DropDownCheckbox;