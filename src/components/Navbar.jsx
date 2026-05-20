import React from 'react';

function Navbar() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="navbar bg-base-100 border-b border-base-200 px-4 sm:px-6 py-3 justify-between shadow-sm sticky top-0 z-30">
      {/* Brand Section */}
      <div className="navbar-start gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-extrabold text-md sm:text-lg shadow-md shadow-emerald-700/25 border border-yellow-400 shrink-0">
            🏫
          </div>
          <div>
            <h1 className="text-xs sm:text-sm md:text-md font-extrabold tracking-tight text-emerald-800 leading-none">
              <span className="inline sm:hidden">CvSU PORTAL</span>
              <span className="hidden sm:inline">CAVITE STATE UNIVERSITY</span>
            </h1>
            <span className="text-[9px] sm:text-[10px] font-bold text-yellow-600 tracking-wider uppercase block mt-0.5 leading-none">
              Student System
            </span>
          </div>
        </div>
      </div>

      {/* Date Display (Center) - hidden on small/medium screens */}
      <div className="navbar-center hidden lg:flex">
        <div className="bg-base-200/60 px-4 py-1.5 rounded-full border border-base-300 text-xs font-semibold text-base-content/70 flex items-center gap-2">
          <span>📅</span> {currentDate}
        </div>
      </div>

      {/* Profile & Actions (Right) */}
      <div className="navbar-end gap-1.5 sm:gap-3">
        {/* Quick System Badge */}
        <div className="badge badge-success badge-outline font-semibold gap-1 text-[10px] sm:text-[11px] py-2.5 hidden sm:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
          SY 2025-2026
        </div>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-200 relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 w-2 h-2 rounded-full bg-yellow-500 ring-2 ring-base-100"></span>
        </button>

        {/* Admin Avatar */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm sm:btn-md avatar border border-base-300 hover:border-emerald-600">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[11px] sm:text-xs">
              AD
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 border border-base-200 rounded-box w-52">
            <li className="menu-title px-4 py-2 text-xs font-bold text-base-content/40">Logged in as</li>
            <li className="px-4 py-1 pb-3 border-b border-base-200">
              <p className="font-bold p-0 leading-none">Admin User</p>
              <p className="text-[11px] text-base-content/50 p-0 mt-0.5">admin@cvsu.edu.ph</p>
            </li>
            <li className="mt-2">
              <a className="py-2 hover:bg-base-200">👤 My Profile</a>
            </li>
            <li>
              <a className="py-2 hover:bg-base-200">⚙️ Settings</a>
            </li>
            <li className="mt-1 border-t border-base-200 pt-1">
              <a className="py-2 text-error hover:bg-error/10 hover:text-error">🚪 Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
