import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import StudentDetailModal from "../components/StudentDetailModal";
import initialStudents from "../data/students";

// Page Views
import StudentDirectory from "./StudentDirectory";
import CourseCatalog from "./CourseCatalog";
import CvsuInfo from "./CvsuInfo";

function Dashboard() {
  // Global App State
  const [students, setStudents] = useState(() => {
    // Try to load from localStorage if available (or fall back to initial data)
    const saved = localStorage.getItem("cvsu_students");
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentEditStudent, setCurrentEditStudent] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("cvsu_students", JSON.stringify(students));
  }, [students]);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Student CRUD Operations
  const handleAddOrUpdateStudent = (studentData) => {
    const exists = students.some((s) => s.id === studentData.id);

    if (exists) {
      // Edit/Update mode
      setStudents((prev) =>
        prev.map((s) => (s.id === studentData.id ? studentData : s))
      );
      showToast(`Student ${studentData.name} updated successfully!`, "info");
      setCurrentEditStudent(null);
    } else {
      // Add mode
      // Double check if ID is unique
      const idExists = students.some((s) => s.id === studentData.id);
      if (idExists) {
        showToast("Error: Student ID already exists!", "error");
        return;
      }
      setStudents((prev) => [studentData, ...prev]);
      showToast(`Student ${studentData.name} registered successfully!`, "success");
    }
  };

  const handleEditSelect = (student) => {
    setCurrentEditStudent(student);
    // Auto switch to Directory tab if we are editing, so user sees the form
    if (activeTab !== "students") {
      setActiveTab("students");
    }
    // Scroll to form (on mobile, it helps a lot)
    const formElement = document.getElementById("student-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteStudent = (id) => {
    const studentToDelete = students.find((s) => s.id === id);
    if (window.confirm(`Are you sure you want to delete ${studentToDelete?.name || "this student"}?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showToast(`Student records removed.`, "warning");
      if (currentEditStudent && currentEditStudent.id === id) {
        setCurrentEditStudent(null);
      }
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  // Filtered Students computation
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse = filterCourse ? student.course === filterCourse : true;
    const matchesYear = filterYear ? student.year === filterYear : true;

    return matchesSearch && matchesCourse && matchesYear;
  });

  // Dynamic Metrics
  const courseCount = new Set(students.map((s) => s.course)).size;
  const activeCount = students.filter((s) => s.status === "Active").length;

  return (
    <div className="h-screen bg-base-100 flex flex-col text-base-content antialiased overflow-hidden">
      {/* Top Header Navbar */}
      <Navbar />

      {/* Main Grid: Sidebar + Active Section */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Mobile Nav / Tab Indicator for Small Screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 z-40 flex justify-around py-2 shadow-lg">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === "dashboard" ? "text-emerald-800" : "text-base-content/50"
            }`}
          >
            <span>📊</span> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === "students" ? "text-emerald-800" : "text-base-content/50"
            }`}
          >
            <span>👨‍🎓</span> Directory
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === "courses" ? "text-emerald-800" : "text-base-content/50"
            }`}
          >
            <span>📚</span> Courses
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              activeTab === "info" ? "text-emerald-800" : "text-base-content/50"
            }`}
          >
            <span>🏫</span> Vision
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 space-y-8 bg-base-200/40 pb-20 md:pb-8 overflow-y-auto h-[calc(100vh-64px)]">
          
          {/* Header section with page title */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-base-300 pb-5">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-base-content flex items-center gap-2">
                {activeTab === "dashboard" && "📊 Portal Dashboard Overview"}
                {activeTab === "students" && "👨‍🎓 Student Directory Registry"}
                {activeTab === "courses" && "📚 Institutional Course Catalog"}
                {activeTab === "info" && "🏫 CvSU Vision, Mission & Goals"}
              </h1>
              <p className="text-xs text-base-content/60 mt-1">
                {activeTab === "dashboard" && "Quick metrics, statistics breakdown, institutional highlights, and recent registry updates."}
                {activeTab === "students" && "Search, filter, view, add, or edit student details directly. Changes persist in local session storage."}
                {activeTab === "courses" && "Explore academic programs offered by the College of Engineering and Information Technology (CEIT)."}
                {activeTab === "info" && "Official Vision, Mission, Quality Policy, and Core Values of Cavite State University (CvSU)."}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="badge badge-lg bg-emerald-800 text-white font-bold px-4 py-3.5 shadow-xs border border-yellow-400">
                🏫 CvSU Tanza Campus
              </span>
            </div>
          </div>

          {/* DYNAMIC TAB RENDERING */}

          {/* 1. DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Dynamic Metric Cards */}
              <DashboardCards 
                studentsCount={students.length} 
                coursesCount={courseCount} 
                facultyCount={24} 
              />

              {/* Dashboard Layout Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Recent Students Directory Widget (Left) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="p-5 border-b border-base-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-sm text-emerald-800">Recent Student Admissions</h3>
                        <p className="text-[10px] text-base-content/50">List of last 4 registered students in the system.</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("students")}
                        className="btn btn-ghost btn-xs text-emerald-800 font-bold hover:bg-emerald-50 rounded-lg"
                      >
                        View Full Registry →
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra table-sm w-full text-xs">
                        <thead>
                          <tr className="bg-base-200/30 text-base-content/70">
                            <th className="font-bold pl-5 py-2.5 hidden sm:table-cell">ID</th>
                            <th className="font-bold py-2.5 pl-4 sm:pl-3">Name</th>
                            <th className="font-bold py-2.5 hidden sm:table-cell">Course</th>
                            <th className="font-bold py-2.5">Status</th>
                            <th className="font-bold pr-5 text-right py-2.5">Quick Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.slice(0, 4).map((student) => (
                            <tr key={student.id} className="hover:bg-base-200/20">
                              <td className="font-mono font-bold text-emerald-800 pl-5 hidden sm:table-cell">{student.id}</td>
                              <td className="font-semibold pl-4 sm:pl-3">
                                <div>{student.name}</div>
                                <div className="flex items-center gap-1 mt-0.5 sm:hidden">
                                  <span className="font-mono text-[9px] font-bold text-yellow-800 bg-yellow-500/10 border border-yellow-500/20 px-1 rounded">{student.id}</span>
                                  <span className="text-[9px] text-base-content/40 font-bold">
                                    {student.course === 'BS Computer Science' ? 'BSCS' :
                                     student.course === 'BS Information Technology' ? 'BSIT' :
                                     student.course === 'BS Software Engineering' ? 'BSSE' :
                                     student.course === 'BS Computer Engineering' ? 'BSCE' : student.course}
                                  </span>
                                </div>
                              </td>
                              <td className="hidden sm:table-cell">
                                <span className="badge badge-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                                  {student.course === 'BS Computer Science' ? 'BSCS' :
                                   student.course === 'BS Information Technology' ? 'BSIT' :
                                   student.course === 'BS Software Engineering' ? 'BSSE' :
                                   student.course === 'BS Computer Engineering' ? 'BSCE' : student.course}
                                </span>
                              </td>
                              <td>
                                <span className={`badge badge-[10px] py-1 border font-bold ${
                                  student.status === 'Active' ? 'badge-success bg-emerald-500/10 text-emerald-700 border-emerald-500/20' :
                                  student.status === 'On Leave' ? 'badge-warning bg-amber-500/10 text-amber-700 border-amber-500/20' :
                                  'badge-error bg-red-500/10 text-red-700 border-red-500/20'
                                }`}>
                                  {student.status}
                                </span>
                              </td>
                              <td className="pr-5 text-right">
                                <button
                                  onClick={() => handleViewStudent(student)}
                                  className="btn btn-ghost btn-xs text-emerald-800 hover:bg-emerald-50 hover:text-emerald-950 font-bold rounded-md px-2 cursor-pointer h-6 min-h-6 border border-emerald-100"
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Quick System Action Panel */}
                  <div className="card bg-base-100 shadow-sm border border-base-200 p-5 space-y-4">
                    <h3 className="font-bold text-sm text-emerald-800">System Utilities (Action Buttons Draft)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button 
                        onClick={() => showToast("Backup database initialized... (Mock Action)", "info")}
                        className="btn btn-outline border-base-300 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-600 rounded-xl text-[11px] font-bold h-11 cursor-pointer flex flex-col justify-center gap-0.5"
                      >
                        <span>💾</span>
                        <span>Backup DB</span>
                      </button>
                      <button 
                        onClick={() => {
                          const csvContent = "data:text/csv;charset=utf-8," 
                            + ["ID,Name,Email,Course,Year,Status"].join(",") + "\n"
                            + students.map(s => `"${s.id}","${s.name}","${s.email}","${s.course}","${s.year}","${s.status}"`).join("\n");
                          const encodedUri = encodeURI(csvContent);
                          const link = document.createElement("a");
                          link.setAttribute("href", encodedUri);
                          link.setAttribute("download", "cvsu_students_mock_report.csv");
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          showToast("Exporting registry as CSV report!", "success");
                        }}
                        className="btn btn-outline border-base-300 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-600 rounded-xl text-[11px] font-bold h-11 cursor-pointer flex flex-col justify-center gap-0.5"
                      >
                        <span>📊</span>
                        <span>Export CSV</span>
                      </button>
                      <button 
                        onClick={() => window.print()}
                        className="btn btn-outline border-base-300 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-600 rounded-xl text-[11px] font-bold h-11 cursor-pointer flex flex-col justify-center gap-0.5"
                      >
                        <span>🖨️</span>
                        <span>Print Page</span>
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm("Restore database to original default mock students?")) {
                            setStudents(initialStudents);
                            showToast("Database reset to defaults.", "info");
                          }
                        }}
                        className="btn btn-outline border-base-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300 rounded-xl text-[11px] font-bold h-11 cursor-pointer flex flex-col justify-center gap-0.5"
                      >
                        <span>🔄</span>
                        <span>Reset Data</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* CvSU Mission/Vision Mini-Widget (Right) */}
                <div className="space-y-6">
                  {/* Quick Vision Mission */}
                  <div className="card bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-md border-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 translate-y-[-20%] translate-x-[20%] text-9xl opacity-5 select-none">
                      🎓
                    </div>
                    <div className="card-body p-6 space-y-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-yellow-400 tracking-wider flex items-center gap-1.5">
                          🛡️ CvSU Vision
                        </h3>
                        <p className="text-[11px] text-emerald-100/90 leading-relaxed italic mt-1.5">
                          "The premier university in historic Cavite globally recognized for excellence in character development, academics, research, innovation and sustainable community engagement."
                        </p>
                      </div>

                      <div className="border-t border-emerald-700/60 pt-3">
                        <h3 className="text-sm font-extrabold text-yellow-400 tracking-wider flex items-center gap-1.5">
                          🎯 CvSU Mission
                        </h3>
                        <p className="text-[11px] text-emerald-100/90 leading-relaxed italic mt-1.5">
                          "Cavite State University shall provide excellent, equitable, and relevant educational opportunities in the arts, sciences, and technology through quality instruction and responsive research and development activities. It shall produce professional, skilled, and morally upright individuals for global competitiveness."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. STUDENT DIRECTORY TAB */}
          {activeTab === "students" && (
            <StudentDirectory
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterCourse={filterCourse}
              setFilterCourse={setFilterCourse}
              filterYear={filterYear}
              setFilterYear={setFilterYear}
              filteredStudents={filteredStudents}
              onViewStudent={handleViewStudent}
              onEditStudent={handleEditSelect}
              onDeleteStudent={handleDeleteStudent}
              onAddOrUpdateStudent={handleAddOrUpdateStudent}
              currentEditStudent={currentEditStudent}
              onCancelEdit={() => setCurrentEditStudent(null)}
            />
          )}

          {/* 3. COURSE CATALOG TAB */}
          {activeTab === "courses" && (
            <CourseCatalog students={students} />
          )}

          {/* 4. INSTITUTION INFO TAB */}
          {activeTab === "info" && (
            <CvsuInfo />
          )}

        </main>
      </div>

      {/* TOAST SYSTEM (Alert feedback) */}
      {toast && (
        <div className="toast toast-end toast-bottom z-50 p-4 mb-16 md:mb-0">
          <div className={`alert ${
            toast.type === 'success' ? 'alert-success' :
            toast.type === 'warning' ? 'alert-warning' :
            toast.type === 'error' ? 'alert-error' :
            'alert-info bg-emerald-800 text-white border-emerald-800'
          } shadow-lg rounded-xl text-xs flex items-center gap-2 py-3 px-4`}>
            <span>
              {toast.type === 'success' && '✅'}
              {toast.type === 'warning' && '⚠️'}
              {toast.type === 'error' && '❌'}
              {toast.type === 'info' && '💡'}
            </span>
            <span className="font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* STUDENT DETAIL POPUP MODAL */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;