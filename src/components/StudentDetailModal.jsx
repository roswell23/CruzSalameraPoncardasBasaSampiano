import React from 'react';

function StudentDetailModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200 overflow-hidden scale-in">
        {/* Modal Header Cover */}
        <div className="bg-emerald-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-extrabold text-2xl shadow-lg border border-yellow-400">
              {student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="badge badge-warning badge-sm font-bold text-[10px] uppercase tracking-wider mb-1">
                {student.id}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight">{student.name}</h3>
              <p className="text-xs text-white/75 mt-0.5">{student.email}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="card-body p-6 space-y-4 text-xs">
          {/* Key Academic Stat Row */}
          <div className="grid grid-cols-3 gap-3 bg-base-200/50 p-3 rounded-2xl border border-base-300/50 text-center">
            <div>
              <p className="text-[10px] text-base-content/40 font-bold uppercase">Course</p>
              <p className="font-extrabold text-base-content/80 mt-0.5">
                {student.course === 'BS Computer Science' ? 'BSCS' :
                 student.course === 'BS Information Technology' ? 'BSIT' :
                 student.course === 'BS Software Engineering' ? 'BSSE' :
                 student.course === 'BS Computer Engineering' ? 'BSCE' : student.course}
              </p>
            </div>
            <div className="border-x border-base-300">
              <p className="text-[10px] text-base-content/40 font-bold uppercase">Year</p>
              <p className="font-extrabold text-base-content/80 mt-0.5">{student.year.split(' ')[0]}</p>
            </div>
            <div>
              <p className="text-[10px] text-base-content/40 font-bold uppercase">GPA</p>
              <p className="font-extrabold text-emerald-700 mt-0.5">{student.gpa.toFixed(2)}</p>
            </div>
          </div>

          {/* Details Lists */}
          <div className="space-y-3">
            <h4 className="font-bold text-[11px] text-base-content/40 uppercase tracking-wider border-b border-base-200 pb-1">
              Personal Information
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-base-content/45 font-semibold block mb-0.5">Gender</span>
                <span className="font-bold text-base-content/85 text-[13px]">{student.gender}</span>
              </div>
              <div>
                <span className="text-base-content/45 font-semibold block mb-0.5">Status</span>
                <span className={`badge badge-sm font-bold ${
                  student.status === 'Active' ? 'badge-success bg-emerald-500/10 text-emerald-700' :
                  student.status === 'On Leave' ? 'badge-warning bg-amber-500/10 text-amber-700' :
                  'badge-error bg-red-500/10 text-red-700'
                }`}>
                  {student.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-base-content/45 font-semibold block mb-0.5">Contact Number</span>
                <span className="font-mono font-semibold text-base-content/80 text-[11px]">
                  {student.contact || 'Not Provided'}
                </span>
              </div>
              <div>
                <span className="text-base-content/45 font-semibold block mb-0.5">Enrollment Status</span>
                <span className="font-semibold text-base-content/80">Regular Enrollee</span>
              </div>
            </div>

            <div>
              <span className="text-base-content/45 font-semibold block mb-0.5">Home Address</span>
              <span className="font-semibold text-base-content/80 text-[11px]">
                {student.address || 'Not Provided'}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-[11px] text-base-content/40 uppercase tracking-wider border-b border-base-200 pb-1">
              Explanation for Real System
            </h4>
            <p className="text-[10px] text-base-content/50 leading-relaxed italic">
              In a fully implemented system, this profile view will query a database backend to display academic records, enrollments, billing balances, and transcripts.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-base-200/50 p-4 border-t border-base-200 flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-primary bg-emerald-800 hover:bg-emerald-900 border-emerald-800 text-white rounded-xl text-xs h-9 min-h-9 px-5 cursor-pointer font-bold"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailModal;
