import React from 'react';

function SearchBar({
  searchQuery,
  setSearchQuery,
  filterCourse,
  setFilterCourse,
  filterYear,
  setFilterYear
}) {
  const courses = [
    "All Courses",
    "BS Computer Science",
    "BS Information Technology",
    "BS Software Engineering",
    "BS Computer Engineering"
  ];

  const years = [
    "All Years",
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year"
  ];

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 p-4">
      <div className="flex flex-col lg:flex-row gap-3 items-center">
        {/* Text Input Search */}
        <div className="relative w-full lg:flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <span className="text-gray-400 text-sm">🔍</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name, ID, or course..."
            className="input input-bordered pl-10 w-full bg-base-100 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-base-content/40 hover:text-base-content/75 cursor-pointer font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters and Reset Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row w-full lg:w-auto gap-2">
          {/* Course Filter */}
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="select select-bordered bg-base-100 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl text-xs w-full sm:w-44 flex-1"
          >
            {courses.map((c) => (
              <option key={c} value={c === "All Courses" ? "" : c}>
                {c}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="select select-bordered bg-base-100 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl text-xs w-full sm:w-32 flex-1"
          >
            {years.map((y) => (
              <option key={y} value={y === "All Years" ? "" : y}>
                {y}
              </option>
            ))}
          </select>

          {/* Reset Filters */}
          {(searchQuery || filterCourse || filterYear) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCourse('');
                setFilterYear('');
              }}
              className="btn btn-ghost btn-sm rounded-xl text-success hover:bg-success/10 text-xs px-3.5 h-10 min-h-10 cursor-pointer font-semibold border border-dashed border-success/30 col-span-2 sm:col-span-1 w-full sm:w-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;