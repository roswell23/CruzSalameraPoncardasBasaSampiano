import React from 'react';

function CourseCatalog({ students }) {
  const courses = [
    {
      code: "BSCS",
      name: "BS Computer Science",
      dur: "4 Years",
      desc: "Focuses on study of algorithms, theory of computation, software design, and database systems. Prepares students for careers in software engineering, data science, and core computer research.",
      dept: "Department of Information Technology",
      studentsCount: students.filter(s => s.course === "BS Computer Science").length
    },
    {
      code: "BSIT",
      name: "BS Information Technology",
      dur: "4 Years",
      desc: "Focuses on the practical application of computing technology, including system administration, web applications, computer networks, cyber security, and database administration.",
      dept: "Department of Information Technology",
      studentsCount: students.filter(s => s.course === "BS Information Technology").length
    },
    {
      code: "BSSE",
      name: "BS Software Engineering",
      dur: "4 Years",
      desc: "Focuses on rigorous engineering practices in designing, developing, maintaining, and scaling large-scale software solutions. Integrates devOps, software design patterns, and agile workflows.",
      dept: "Department of Information Technology",
      studentsCount: students.filter(s => s.course === "BS Software Engineering").length
    },
    {
      code: "BSCE",
      name: "BS Computer Engineering",
      dur: "4 Years",
      desc: "Integrates electrical engineering and computer science. Focuses on hardware-software co-design, microprocessors, embedded systems, Internet of Things (IoT), and digital electronics.",
      dept: "Department of Computer & Electronics Engineering",
      studentsCount: students.filter(s => s.course === "BS Computer Engineering").length
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <div key={course.code} className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden hover:border-emerald-600">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="badge badge-sm badge-outline font-bold text-emerald-800">
                  {course.code}
                </span>
                <h3 className="font-extrabold text-base text-base-content/90 mt-1">
                  {course.name}
                </h3>
              </div>
              <span className="badge bg-emerald-800 text-white font-semibold text-[10px] py-2 px-2.5">
                {course.dur}
              </span>
            </div>

            <p className="text-xs text-base-content/60 leading-relaxed">
              {course.desc}
            </p>

            <div className="divider my-1"></div>

            <div className="flex justify-between items-center text-[10px] font-bold text-base-content/40 uppercase">
              <span>🏛️ {course.dept}</span>
              <span className="text-emerald-800 font-bold">👥 {course.studentsCount} Enrolled</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseCatalog;
