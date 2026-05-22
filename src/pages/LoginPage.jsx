import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate a brief authentication delay for realism
    setTimeout(() => {
      // Accept any credentials (UI prototype)
      onLogin({ email, name: 'Admin User' });
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950">
      
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-700/20 blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-500/10 blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{ animationDuration: '11s', animationDelay: '4s' }}></div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        ></div>

        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(255,255,255,0.1) 80px, rgba(255,255,255,0.1) 81px)'
          }}
        ></div>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-auto">

        {/* CvSU Branding Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-800/80 border-2 border-yellow-400/60 shadow-2xl shadow-emerald-900/50 backdrop-blur-sm mx-auto login-logo-float">
            <span className="text-4xl">🏫</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              CAVITE STATE UNIVERSITY
            </h1>
            <p className="text-yellow-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mt-1">
              Tanza Campus
            </p>
          </div>
          <p className="text-emerald-100/80 text-xs max-w-xs mx-auto font-medium">
            Student Management System Portal — Authorized personnel only
          </p>
        </div>

        {/* Glassmorphism Login Card */}
        <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/30 p-8 sm:p-10 space-y-6 login-card-enter">
          
          {/* Card Header */}
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-white">Welcome Back</h2>
            <p className="text-emerald-100/75 text-xs font-medium">Sign in to access the student portal</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center gap-2 login-error-shake">
              <span className="text-sm">⚠️</span>
              <span className="text-xs text-red-300 font-semibold">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-xs font-semibold text-emerald-100 pl-1 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <div className={`relative rounded-xl border transition-all duration-300 ${
                focusedField === 'email' 
                  ? 'border-yellow-400/60 bg-white/[0.08] shadow-lg shadow-yellow-400/5' 
                  : 'border-white/[0.1] bg-white/[0.04] hover:border-white/[0.2]'
              }`}>
                <input
                  id="login-email"
                  type="email"
                  placeholder="admin@cvsu.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent text-white text-sm px-4 py-3.5 rounded-xl outline-none placeholder:text-white/20 font-medium"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-xs font-semibold text-emerald-100 pl-1 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <div className={`relative rounded-xl border transition-all duration-300 ${
                focusedField === 'password' 
                  ? 'border-yellow-400/60 bg-white/[0.08] shadow-lg shadow-yellow-400/5' 
                  : 'border-white/[0.1] bg-white/[0.04] hover:border-white/[0.2]'
              }`}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent text-white text-sm px-4 py-3.5 rounded-xl outline-none placeholder:text-white/20 font-medium pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer p-1"
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.758 6.758M9.878 9.878l-3.12-3.12m7.364 7.364l3.12 3.12M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-0.5">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="checkbox checkbox-xs border-white/20 checked:border-yellow-400 [--chkbg:theme(colors.yellow.400)] [--chkfg:theme(colors.emerald.900)]" />
                <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors font-medium">Remember me</span>
              </label>
              <button type="button" className="text-xs text-yellow-400/60 hover:text-yellow-400 transition-colors font-semibold cursor-pointer">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer relative overflow-hidden group disabled:cursor-wait bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/40 active:scale-[0.98] border border-emerald-500/30"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to Portal
                </span>
              )}
            </button>
          </form>


        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-emerald-200/60 text-[10px] font-semibold">
            🔒 Secure connection · TLS 1.3 encrypted
          </p>
          <p className="text-emerald-200/50 text-[10px] font-medium">
            © {new Date().getFullYear()} Cavite State University – Tanza Campus. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
