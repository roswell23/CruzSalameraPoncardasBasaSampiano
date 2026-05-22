import React from 'react';

function CvsuInfo() {
  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-emerald-800 text-white flex items-center p-6 sm:p-8 border-b border-yellow-400">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Cavite State University (CvSU)</h2>
            <p className="text-xs text-emerald-100 mt-1">Tanza Campus, Tanza, Cavite</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Vision and Mission Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-bold text-base text-success flex items-center gap-2 pb-1.5 border-b border-base-200">
                <span>🛡️</span> CvSU Vision
              </h3>
              <p className="text-xs text-base-content/70 italic leading-relaxed pl-2 border-l-2 border-emerald-600">
                "The premier university in historic Cavite globally recognized for excellence in character development, academics, research, innovation and sustainable community engagement."
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-base text-success flex items-center gap-2 pb-1.5 border-b border-base-200">
                <span>🎯</span> CvSU Mission
              </h3>
              <p className="text-xs text-base-content/70 italic leading-relaxed pl-2 border-l-2 border-emerald-600">
                "Cavite State University shall provide excellent, equitable, and relevant educational opportunities in the arts, sciences, and technology through quality instruction and responsive research and development activities."
              </p>
              <p className="text-xs text-base-content/70 italic leading-relaxed pl-2 border-l-2 border-emerald-600">
                "It shall produce professional, skilled, and morally upright individuals for global competitiveness."
              </p>
            </div>
          </div>

          {/* Quality Policy Statement */}
          <div className="space-y-3 bg-emerald-900/5 p-5 sm:p-6 rounded-2xl border border-emerald-900/10">
            <h3 className="font-bold text-base text-success flex items-center gap-2 pb-1.5 border-b border-emerald-900/10">
              <span>✨</span> CvSU Quality Policy Statement
            </h3>
            <p className="text-xs text-base-content/75 leading-relaxed">
              Cavite State University commits to provide quality, relevant, and equitable educational opportunities in the arts, sciences, and technology. It shall produce professional, skilled, and morally upright individuals for global competitiveness.
            </p>
            <p className="text-xs text-base-content/75 leading-relaxed">
              To commit to this, the University shall:
            </p>
            <ul className="text-xs text-base-content/65 list-disc pl-5 space-y-1 mt-1 leading-relaxed">
              <li>Deliver quality instruction, research, and extension services;</li>
              <li>Comply with statutory and regulatory requirements; and</li>
              <li>Continually improve the quality management system for stakeholder satisfaction.</li>
            </ul>
          </div>

          {/* University Core Values */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-success flex items-center gap-2 pb-1.5 border-b border-base-200">
              <span>💎</span> University Tenets / Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-2">
              <div className="p-4 rounded-xl border border-base-300 bg-base-50">
                <p className="text-base font-extrabold text-success">TRUTH</p>
                <p className="text-[10px] text-base-content/50 mt-0.5">Character & Integrity First</p>
              </div>
              <div className="p-4 rounded-xl border border-base-300 bg-base-50">
                <p className="text-base font-extrabold text-success">EXCELLENCE</p>
                <p className="text-[10px] text-base-content/50 mt-0.5">Quality Academics & Innovation</p>
              </div>
              <div className="p-4 rounded-xl border border-base-300 bg-base-50">
                <p className="text-base font-extrabold text-success">SERVICE</p>
                <p className="text-[10px] text-base-content/50 mt-0.5">Sustainable Community Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CvsuInfo;
