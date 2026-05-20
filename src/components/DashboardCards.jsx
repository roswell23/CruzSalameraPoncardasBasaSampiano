import React from 'react';

function DashboardCards({ studentsCount, coursesCount = 12, facultyCount = 24 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Students Card */}
      <div className="card bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-md hover:shadow-xl transition-all border-0 relative overflow-hidden group">
        <div className="absolute right-0 bottom-0 translate-y-4 translate-x-2 text-9xl opacity-10 group-hover:scale-110 transition-transform select-none">
          👨‍🎓
        </div>
        <div className="card-body p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Total Enrolled Students</span>
              <p className="text-4xl font-extrabold mt-1 tracking-tight">{studentsCount}</p>
            </div>
            <div className="text-2xl bg-white/10 p-2.5 rounded-xl border border-white/10">
              👨‍🎓
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Active Institution Directory</span>
          </div>
        </div>
      </div>

      {/* Courses Card */}
      <div className="card bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-md hover:shadow-xl transition-all border-0 relative overflow-hidden group">
        <div className="absolute right-0 bottom-0 translate-y-4 translate-x-2 text-9xl opacity-10 group-hover:scale-110 transition-transform select-none">
          📚
        </div>
        <div className="card-body p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Offered Programs</span>
              <p className="text-4xl font-extrabold mt-1 tracking-tight">{coursesCount}</p>
            </div>
            <div className="text-2xl bg-white/10 p-2.5 rounded-xl border border-white/10">
              📚
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>CEIT Undergrad Catalog</span>
          </div>
        </div>
      </div>

      {/* Faculty Card */}
      <div className="card bg-gradient-to-br from-blue-800 to-blue-950 text-white shadow-md hover:shadow-xl transition-all border-0 relative overflow-hidden group">
        <div className="absolute right-0 bottom-0 translate-y-4 translate-x-2 text-9xl opacity-10 group-hover:scale-110 transition-transform select-none">
          🏫
        </div>
        <div className="card-body p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">Faculty Members</span>
              <p className="text-4xl font-extrabold mt-1 tracking-tight">{facultyCount}</p>
            </div>
            <div className="text-2xl bg-white/10 p-2.5 rounded-xl border border-white/10">
              🏫
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>Active Educators & Advisers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;