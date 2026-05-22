import React, { useState, useEffect } from 'react';

function StudentForm({ onSubmit, currentEditStudent, onCancel }) {
  const initialFormState = {
    id: '',
    name: '',
    email: '',
    course: 'BS Computer Science',
    year: '1st Year',
    status: 'Active',
    gender: 'Male',
    gpa: '1.50',
    contact: '',
    address: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Sync form state when currentEditStudent prop changes
  useEffect(() => {
    if (currentEditStudent) {
      setFormData({
        id: currentEditStudent.id || '',
        name: currentEditStudent.name || '',
        email: currentEditStudent.email || '',
        course: currentEditStudent.course || 'BS Computer Science',
        year: currentEditStudent.year || '1st Year',
        status: currentEditStudent.status || 'Active',
        gender: currentEditStudent.gender || 'Male',
        gpa: currentEditStudent.gpa !== undefined ? String(currentEditStudent.gpa) : '1.50',
        contact: currentEditStudent.contact || '',
        address: currentEditStudent.address || ''
      });
      setErrors({});
    } else {
      // Set a random ID for new students
      const randomIdNum = Math.floor(10000 + Math.random() * 90000);
      const currentYear = new Date().getFullYear();
      setFormData({
        ...initialFormState,
        id: `${currentYear}-${randomIdNum}`
      });
      setErrors({});
    }
  }, [currentEditStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-generate email based on name
      if (name === 'name' && !currentEditStudent) {
        const cleanName = value.toLowerCase().trim().replace(/\s+/g, '.');
        updated.email = cleanName ? `${cleanName}@cvsu.edu.ph` : '';
      }
      return updated;
    });
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = 'Student ID is required';
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Institutional Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 1.0 || gpaNum > 5.0) {
      newErrors.gpa = 'GPA must be between 1.0 (highest) and 5.0 (lowest)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Convert GPA back to a float number
    const preparedData = {
      ...formData,
      gpa: parseFloat(formData.gpa)
    };

    onSubmit(preparedData);
    if (!currentEditStudent) {
      // Clear form for next entry
      const randomIdNum = Math.floor(10000 + Math.random() * 90000);
      const currentYear = new Date().getFullYear();
      setFormData({
        ...initialFormState,
        id: `${currentYear}-${randomIdNum}`
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-200">
      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-base-200">
          <h2 className="card-title text-base font-bold text-success flex items-center gap-2">
            <span>{currentEditStudent ? '📝' : '➕'}</span>
            {currentEditStudent ? 'Edit Student Details' : 'Add New Student'}
          </h2>
          {currentEditStudent && (
            <button
              onClick={onCancel}
              className="btn btn-ghost btn-xs text-base-content/40 hover:text-base-content rounded-lg"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student ID (Readonly if editing) */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-xs text-base-content/75">Student ID</span>
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              disabled={!!currentEditStudent}
              placeholder="e.g. 2023-10024"
              className={`input input-bordered w-full rounded-xl text-xs h-10 min-h-10 ${
                errors.id ? 'input-error' : ''
              } disabled:bg-base-200 disabled:text-base-content/50`}
            />
            {errors.id && <span className="text-[10px] text-error mt-1">{errors.id}</span>}
          </div>

          {/* Full Name */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-xs text-base-content/75">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="First Name, Middle, Last Name"
              className={`input input-bordered w-full rounded-xl text-xs h-10 min-h-10 ${
                errors.name ? 'input-error' : ''
              }`}
            />
            {errors.name && <span className="text-[10px] text-error mt-1">{errors.name}</span>}
          </div>

          {/* Institutional Email */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-xs text-base-content/75">CvSU Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="username@cvsu.edu.ph"
              className={`input input-bordered w-full rounded-xl text-xs h-10 min-h-10 ${
                errors.email ? 'input-error' : ''
              }`}
            />
            {errors.email && <span className="text-[10px] text-error mt-1">{errors.email}</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Course Selector */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content/75">Course</span>
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="select select-bordered w-full rounded-xl text-xs h-10 min-h-10"
              >
                <option value="BS Computer Science">BSCS</option>
                <option value="BS Information Technology">BSIT</option>
                <option value="BS Software Engineering">BSSE</option>
                <option value="BS Computer Engineering">BSCE</option>
              </select>
            </div>

            {/* Year Selector */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content/75">Year Level</span>
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="select select-bordered w-full rounded-xl text-xs h-10 min-h-10"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* GPA */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content/75">GPA (1.0 - 5.0)</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="1.50"
                className={`input input-bordered w-full rounded-xl text-xs h-10 min-h-10 ${
                  errors.gpa ? 'input-error' : ''
                }`}
              />
              {errors.gpa && <span className="text-[10px] text-error mt-1">{errors.gpa}</span>}
            </div>

            {/* Status Selector */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content/75">Status</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full rounded-xl text-xs h-10 min-h-10"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Gender Selection */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content/75">Gender</span>
              </label>
              <div className="flex gap-4 items-center h-10">
                <label className="label cursor-pointer gap-2 p-0">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="radio radio-primary radio-sm text-success"
                  />
                  <span className="label-text text-xs">Male</span>
                </label>
                <label className="label cursor-pointer gap-2 p-0">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="radio radio-primary radio-sm text-success"
                  />
                  <span className="label-text text-xs">Female</span>
                </label>
              </div>
            </div>

            {/* Contact Number */}
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content/75">Contact No.</span>
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+63 9xx xxx xxxx"
                className="input input-bordered w-full rounded-xl text-xs h-10 min-h-10"
              />
            </div>
          </div>

          {/* Address */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-xs text-base-content/75">Address</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Indang, Cavite"
              className="input input-bordered w-full rounded-xl text-xs h-10 min-h-10"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            {currentEditStudent && (
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-outline border-base-300 hover:bg-base-200 text-base-content/80 w-1/2 rounded-xl text-xs h-10 min-h-10 cursor-pointer font-semibold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className={`btn btn-primary ${
                currentEditStudent ? 'w-1/2 bg-amber-600 hover:bg-amber-700 border-amber-600' : 'w-full bg-emerald-800 hover:bg-emerald-900 border-emerald-800'
              } text-white rounded-xl text-xs h-10 min-h-10 cursor-pointer font-semibold`}
            >
              {currentEditStudent ? 'Update Details' : 'Register Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
