import { useState } from "react";
import { faRocket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProjectFilters({ onFilterChange, allLibelles }) {
  const [nameFilter, setNameFilter] = useState("");
  const [nameMatches, setNameMatches] = useState([]);

  const handleFilterChange = () => {
    // Pass the filters to the parent component
    onFilterChange({ name: nameFilter });
  };

  const filterNames = (value) => {
    const filteredNames = allLibelles.filter((libelle) =>
      libelle.toLowerCase().includes(value.toLowerCase())
    );
    setNameMatches(filteredNames);
  };

  const handleNameInputChange = (value) => {
    setNameFilter(value);
    filterNames(value);
  };

  const handleNameSelect = (selectedName) => {
    setNameFilter(selectedName);
    setNameMatches([]); // Clear the dropdown list
  };

  return (
    <div className="filters flex items-center space-x-4 relative">
      <div className="relative flex items-center">
        <FontAwesomeIcon icon={faSearch} className="text-gray-50 mr-2" />
        <input
          type="text"
          placeholder="Filter by Libelle"
          value={nameFilter}
          onChange={(e) => handleNameInputChange(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md basis-1/3"
        />
        {nameMatches.length > 0 && (
          <ul className="absolute top-full left-0 w-full dropdown-list mt-1 bg-white border border-gray-300 rounded-md">
            {nameMatches.map((match, index) => (
              <li
                key={index}
                className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => handleNameSelect(match)}
              >
                {match}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleFilterChange}
        className="bg-green-400 text-gray-50 px-4 py-2 rounded-md hover:bg-secondary-dark"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default ProjectFilters;
