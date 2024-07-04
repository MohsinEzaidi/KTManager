import { useEffect, useState } from "react";
import {
  faUser,
  faCheckCircle,
  faExclamationCircle,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TaskFilters({
  onFilterChange,
  allUsers,
  allStatuses,
  allNecessities,
}) {
  const [userFilter, setUserFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [necessityFilter, setNecessityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleFilterChange = () => {
    // Pass the filters to the parent component
    onFilterChange({
      user: userFilter,
      status: statusFilter,
      necessity: necessityFilter,
      date: dateFilter, // Include the date filter value
    });
  };

  useEffect(() => {
    // Set userFilter when component mounts
    if (localStorage.getItem("USER_FUNCTION") === "admin") {
      setUserFilter("");
    } else {
      setUserFilter(localStorage.getItem("COLLABORATEUR_ID") || "");
    }
  }, []);

  return (
    <div className='filters flex items-center space-x-4 flex-wrap gap-y-4'>
      {localStorage.getItem("USER_FUNCTION") === "admin" ? (
        <div className='flex items-center space-x-2 max-lg:basis-full'>
          <FontAwesomeIcon icon={faUser} className='text-gray-50' />
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className='max-lg:grow border border-gray-300 px-3 py-2 rounded-md'
          >
            <option value=''>All Users</option>
            {allUsers.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <></>
      )}

      <div className='flex items-center space-x-2 max-lg:basis-full'>
        <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='max-lg:grow border border-gray-300 px-3 py-2 rounded-md'
        >
          <option value=''>All Statuses</option>
          {allStatuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center space-x-2 max-lg:basis-full'>
        <FontAwesomeIcon icon={faExclamationCircle} className='text-red-500' />
        <select
          value={necessityFilter}
          onChange={(e) => setNecessityFilter(e.target.value)}
          className='max-lg:grow border border-gray-300 px-3 py-2 rounded-md'
        >
          <option value=''>All Necessities</option>
          {allNecessities.map((necessity, index) => (
            <option key={index} value={necessity}>
              {necessity === "l"
                ? "Low"
                : necessity === "n"
                ? "Normal"
                : necessity === "h"
                ? "High"
                : "urgent"}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center space-x-2 max-lg:basis-full'>
        <label htmlFor='dateFilter' className='text-gray-50'>
          <FontAwesomeIcon icon={faCalendar}/>
        </label>
        <input
          type='date'
          id='dateFilter'
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className='max-lg:grow border border-gray-300 px-3 py-2 rounded-md'
        />
      </div>
      <button
        onClick={handleFilterChange}
        className='bg-green-400 text-gray-50 px-4 py-2 rounded-md hover:bg-secondary-dark max-lg:basis-full'
      >
        Apply Filters
      </button>
    </div>
  );
}

export default TaskFilters;
