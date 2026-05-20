import React from 'react';

function StudentTable({ students, onView, onEdit, onDelete }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge-success bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'On Leave':
        return 'badge-warning bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'Inactive':
        return 'badge-error bg-red-500/10 text-red-700 border-red-500/20';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
      <div className="p-5 border-b border-base-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="card-title text-base font-bold text-emerald-800">
            Student Registry ({students.length})
          </h2>
          <p className="text-xs text-base-content/50 mt-0.5">
            Active registry of students. Actions adapt to device viewports.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {students.length === 0 ? (
          /* Empty State Conditional Rendering */
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-bold text-base text-base-content/80">No Students Found</h3>
            <p className="text-xs text-base-content/40 mt-1 max-w-sm">
              We couldn't find any students matching your search query or filters. Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          <table className="table table-zebra w-full text-xs">
            <thead>
              <tr className="bg-base-200/50 text-base-content/70">
                <th className="font-bold py-3.5 pl-4 sm:pl-6 hidden md:table-cell">Student ID</th>
                <th className="font-bold py-3.5 pl-4 md:pl-3">Student Info</th>
                <th className="font-bold py-3.5 hidden md:table-cell">Course & Year</th>
                <th className="font-bold py-3.5">Status</th>
                <th className="font-bold py-3.5 pr-4 sm:pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-base-200/30 transition-colors">
                  {/* ID Column (hidden on mobile, shown on desktop) */}
                  <td className="font-mono font-bold text-emerald-800 py-4 pl-4 sm:pl-6 hidden md:table-cell">
                    {student.id}
                  </td>
                  
                  {/* Student Info Column (responsive: renders ID, course, year inline on mobile) */}
                  <td className="py-3 pl-4 md:pl-3">
                    <div className="flex items-center gap-2.5">
                      <div className="avatar placeholder hidden xs:flex">
                        <div className="w-8 h-8 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center font-bold text-[10px] border border-emerald-800/20">
                          {student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-base-content/90 flex flex-wrap items-center gap-1.5">
                          <span>{student.name}</span>
                          {/* Mobile-only ID badge */}
                          <span className="badge badge-warning font-bold text-[8px] px-1 py-1.5 h-auto md:hidden uppercase leading-none border border-yellow-500/20 bg-yellow-500/10 text-yellow-800">
                            {student.id}
                          </span>
                        </div>
                        <div className="text-[10px] text-base-content/40">{student.email}</div>
                        {/* Mobile-only Course & Year description */}
                        <div className="text-[10px] font-semibold text-emerald-800/80 md:hidden mt-1 flex flex-wrap items-center gap-1">
                          <span>{student.course}</span>
                          <span className="text-base-content/30">•</span>
                          <span className="text-base-content/50">{student.year}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Course & Year Column (hidden on mobile, shown on desktop) */}
                  <td className="py-4 hidden md:table-cell">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-base-content/80">{student.course}</span>
                      <span className="text-[10px] text-base-content/40">{student.year}</span>
                    </div>
                  </td>
                  
                  {/* Status Badge (always shown) */}
                  <td className="py-4">
                    <span className={`badge badge-xs sm:badge-sm border font-bold py-2 ${getStatusBadgeClass(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  
                  {/* Actions Column (icon-only on mobile, full-button on desktop) */}
                  <td className="py-4 pr-4 sm:pr-6 text-right">
                    <div className="flex justify-end gap-1 sm:gap-1.5">
                      {/* View Button */}
                      <button
                        onClick={() => onView(student)}
                        className="btn btn-ghost btn-xs text-emerald-800 hover:bg-emerald-50 rounded-lg font-bold px-1.5 sm:px-2 cursor-pointer h-7 min-h-7 border border-emerald-200"
                        title="View Profile Details"
                      >
                        <span>👁️</span>
                        <span className="hidden sm:inline ml-0.5">View</span>
                      </button>
                      
                      {/* Edit Button */}
                      <button
                        onClick={() => onEdit(student)}
                        className="btn btn-ghost btn-xs text-amber-600 hover:bg-amber-50 rounded-lg font-bold px-1.5 sm:px-2 cursor-pointer h-7 min-h-7 border border-amber-200"
                        title="Edit Student Info"
                      >
                        <span>✏️</span>
                        <span className="hidden sm:inline ml-0.5">Edit</span>
                      </button>
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => onDelete(student.id)}
                        className="btn btn-ghost btn-xs text-red-600 hover:bg-red-50 rounded-lg font-bold px-1.5 sm:px-2 cursor-pointer h-7 min-h-7 border border-red-200"
                        title="Delete Student Record"
                      >
                        <span>🗑️</span>
                        <span className="hidden sm:inline ml-0.5">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentTable;