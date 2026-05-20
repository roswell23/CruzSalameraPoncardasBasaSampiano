import React from 'react';
import SearchBar from '../components/SearchBar';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';

function StudentDirectory({
  searchQuery,
  setSearchQuery,
  filterCourse,
  setFilterCourse,
  filterYear,
  setFilterYear,
  filteredStudents,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onAddOrUpdateStudent,
  currentEditStudent,
  onCancelEdit
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Directory Filter and Table (Left Col-span-2) */}
      <div className="lg:col-span-2 space-y-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCourse={filterCourse}
          setFilterCourse={setFilterCourse}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
        />
        
        <StudentTable
          students={filteredStudents}
          onView={onViewStudent}
          onEdit={onEditStudent}
          onDelete={onDeleteStudent}
        />
      </div>

      {/* Form Entry Column (Right) */}
      <div id="student-form-section" className="space-y-6">
        <StudentForm
          onSubmit={onAddOrUpdateStudent}
          currentEditStudent={currentEditStudent}
          onCancel={onCancelEdit}
        />

        {/* Quick Info Box */}
        <div className="card bg-emerald-900/5 border border-emerald-900/10 p-5 rounded-2xl text-xs">
          <h4 className="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
            <span>💡</span> Form Operations Guide
          </h4>
          <ul className="text-[11px] text-base-content/65 list-disc pl-4 mt-2 space-y-1.5 leading-relaxed">
            <li>Submit the form with a new Student ID to register a new enrollee in the active list.</li>
            <li>Select a student from the table and click <strong>✏️ Edit</strong> to pull their details into this form, turning the mode to "Edit".</li>
            <li>Validation ensures required fields are set and that GPA remains within the 1.0 - 5.0 range.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentDirectory;
