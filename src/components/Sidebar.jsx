import React from 'react';

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Student Directory', icon: '👨‍🎓' },
    { id: 'courses', label: 'Course Catalog', icon: '📚' },
    { id: 'info', label: 'CvSU Vision & Mission', icon: '🏫' }
  ];

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 p-4 flex flex-col justify-between hidden md:flex h-[calc(100vh-64px)] overflow-y-auto">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <p className="px-4 text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-3">Main Menu</p>
          <ul className="menu menu-md w-full gap-1.5 p-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left font-semibold flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/10'
                      : 'hover:bg-base-300 text-base-content/75 hover:text-base-content'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span> {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User profile footer */}
      <div className="border-t border-base-300 pt-4 mt-auto">
        <div className="flex items-center gap-3 px-2">
          <div className="avatar placeholder">
            <div className="bg-emerald-800 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm border border-yellow-400">
              AD
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold leading-none mb-1">Admin User</h4>
            <p className="text-[10px] text-base-content/50">admin@cvsu.edu.ph</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;