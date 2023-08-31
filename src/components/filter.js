import React, {useState} from "react";
export default function Filter({ onFilterChange }) {
    const [filterValue, setFilterValue] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setFilterValue(value);
        onFilterChange(value);
    };

    return (
        <>
            <input
                className="filter-bar"
                type="search"
                placeholder="Filter by category/title..."
                value={filterValue}
                onChange={handleChange}
            />
        </>
    );
}