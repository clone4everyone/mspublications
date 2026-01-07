import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaUserPlus, FaEdit, FaToggleOn, FaToggleOff, FaSearch, FaUsers, FaCheckCircle, FaTimes, FaArrowLeft, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
 import { logout } from '../redux/slices/authSlice';

function ReviewerManagement() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReviewer, setEditingReviewer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    affiliation: '',
    specialization: ['pharma']
  });

  const specializations = ['pharma', 'history', 'chemistry', 'science', 'ayurvedic', 'technology'];

  useEffect(() => {
    fetchReviewers();
  }, []);

  const fetchReviewers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/editor/reviewers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setReviewers(data.data.reviewers);
      }
    } catch (error) {
      toast.error('Error fetching reviewers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReviewer = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill all required fields');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/editor/reviewers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Reviewer created successfully. Credentials sent to their email.');
        setShowCreateModal(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          affiliation: '',
          specialization: []
        });
        fetchReviewers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error creating reviewer');
    }
  };

  const handleUpdateReviewer = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/editor/reviewers/${editingReviewer._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          affiliation: formData.affiliation,
          specialization: formData.specialization,
          isActive: formData.isActive
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Reviewer updated successfully');
        setEditingReviewer(null);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          affiliation: '',
          specialization: []
        });
        fetchReviewers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error updating reviewer');
    }
  };

  const handleToggleActive = async (reviewer) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/editor/reviewers/${reviewer._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !reviewer.isActive })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Reviewer ${reviewer.isActive ? 'deactivated' : 'activated'}`);
        fetchReviewers();
      }
    } catch (error) {
      toast.error('Error updating reviewer status');
    }
  };

  const handleSpecializationChange = (spec) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
    }));
  };

  const filteredReviewers = reviewers.filter(r =>
    `${r.firstName} ${r.lastName} ${r.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: reviewers.length,
    active: reviewers.filter(r => r.isActive).length,
    inactive: reviewers.filter(r => !r.isActive).length,
    withActiveReviews: reviewers.filter(r => r.activeReviews > 0).length
  };
 const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-3 border-[#0461F0] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading reviewers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`h-16 ${user.role === 'editor' ? 'bg-[#0461F0]' : 'bg-purple-600'} flex items-center justify-between px-8 text-white shadow-lg`}>
                  <div className="flex items-center space-x-6">
                    {/* <button
                      onClick={handleBack}
                      className="hover:bg-white/20 p-2.5 rounded-lg transition-all duration-200"
                    >
                      <FaArrowLeft className="w-4 h-4" />
                    </button> */}
                    <div className="border-l border-white/30 h-8"></div>
                    <div>
                      <h1 className="text-xl font-semibold tracking-tight capitalize">
                        Dashboard
                      </h1>
                      <p className="text-xs text-white/80 mt-0.5">
                        {user.role === 'editor' ? 'Editorial Management' : 'Reviewer Dashboard'}
                      </p>
                    </div>
                   
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-lg">
                      <FaUser className="w-4 h-4" />
                      <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
          <h3 className=" flex gap-1 text-gray-500 items-center hover:text-gray-600 cursor-pointer" onClick={()=>navigate('/editor/journal/pharma')}><FaArrowLeft/><span className="text-xl font-bold text-gray-500 tracking-tight flex gap-1 items-center hover:text-gray-600 cursor-pointer" >Back To Dashboard</span></h3>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Reviewer Management</h2>
          <p className="text-sm text-gray-600 mt-1 font-medium">Manage reviewer accounts and assignments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-[#0461F0] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#0451D0] transition-all shadow-md hover:shadow-lg"
        >
          <FaUserPlus className="w-4 h-4" />
          <span>Add Reviewer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Reviewers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaUsers className="w-6 h-6 text-[#0461F0]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Active</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.active}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <FaCheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Inactive</p>
              <p className="text-2xl font-bold text-gray-400 mt-1">{stats.inactive}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <FaTimes className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">With Reviews</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.withActiveReviews}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <FaEdit className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search reviewers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0461F0] focus:border-transparent text-sm font-medium"
          />
        </div>
      </div>

      {/* Reviewers List */}
      <div className="grid gap-4">
        {filteredReviewers.length === 0 ? (
          <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
            <FaUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">No reviewers found</p>
            <p className="text-sm text-gray-500 mt-1">
              {searchTerm ? 'Try a different search term' : 'Create your first reviewer to get started'}
            </p>
          </div>
        ) : (
          filteredReviewers.map((reviewer) => (
            <div 
              key={reviewer._id} 
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-[#0461F0] hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0461F0] to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {reviewer.firstName[0]}{reviewer.lastName[0]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {reviewer.firstName} {reviewer.lastName}
                        </h3>
                        {reviewer.isActive ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold border border-gray-300">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            <span>Inactive</span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-medium mt-0.5">{reviewer.email}</p>
                    </div>
                  </div>
                  
                  {reviewer.affiliation && (
                    <p className="text-sm text-gray-600 mb-3 ml-12 font-medium">
                      <span className="text-gray-400">Affiliation:</span> {reviewer.affiliation}
                    </p>
                  )}
                  
                  {reviewer.specialization && reviewer.specialization.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 ml-12">
                      {reviewer.specialization.map((spec, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center px-3 py-1 bg-blue-50 text-[#0461F0] rounded-full text-xs font-semibold border border-blue-100 capitalize"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="ml-12 inline-flex items-center space-x-2 text-sm">
                    <span className="text-gray-500 font-medium">Active Reviews:</span>
                    <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded">
                      {reviewer.activeReviews || 0}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingReviewer(reviewer);
                      setFormData({
                        firstName: reviewer.firstName,
                        lastName: reviewer.lastName,
                        email: reviewer.email,
                        password: '',
                        affiliation: reviewer.affiliation || '',
                        specialization: reviewer.specialization || [],
                        isActive: reviewer.isActive
                      });
                    }}
                    className="p-2.5 text-[#0461F0] hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                    title="Edit reviewer"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleActive(reviewer)}
                    className={`p-2.5 rounded-lg transition-colors border ${
                      reviewer.isActive 
                        ? 'text-emerald-600 hover:bg-emerald-50 border-transparent hover:border-emerald-200' 
                        : 'text-gray-400 hover:bg-gray-50 border-transparent hover:border-gray-200'
                    }`}
                    title={reviewer.isActive ? 'Deactivate reviewer' : 'Activate reviewer'}
                  >
                    {reviewer.isActive ? (
                      <FaToggleOn className="w-6 h-6" />
                    ) : (
                      <FaToggleOff className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingReviewer) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 bg-gradient-to-r from-[#0461F0] to-blue-600 text-white">
              <h3 className="text-xl font-bold">
                {editingReviewer ? 'Edit Reviewer' : 'Create New Reviewer'}
              </h3>
              <p className="text-sm text-white/80 mt-1">
                {editingReviewer ? 'Update reviewer information' : 'Add a new reviewer to the system'}
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0461F0] focus:border-transparent text-sm font-medium"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0461F0] focus:border-transparent text-sm font-medium"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  disabled={!!editingReviewer}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0461F0] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-sm font-medium"
                  placeholder="reviewer@example.com"
                />
                {editingReviewer && (
                  <p className="text-xs text-gray-500 mt-1.5 font-medium">Email cannot be changed</p>
                )}
              </div>

              {!editingReviewer && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0461F0] focus:border-transparent text-sm font-medium"
                    placeholder="Enter secure password"
                  />
                  <p className="text-xs text-gray-500 mt-1.5 font-medium">
                    This password will be sent to the reviewer's email address
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Affiliation
                </label>
                <input
                  type="text"
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0461F0] focus:border-transparent text-sm font-medium"
                  placeholder="University or Organization"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Specialization Areas
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specializations.map((spec) => (
                    <label 
                      key={spec} 
                      className={`flex items-center space-x-2.5 cursor-pointer px-3 py-2.5 rounded-lg border-2 transition-all ${
                        formData.specialization.includes(spec)
                          ? 'bg-blue-50 border-[#0461F0] text-[#0461F0]'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.specialization.includes(spec)}
                        onChange={() => handleSpecializationChange(spec)}
                        className="w-4 h-4 text-[#0461F0] rounded focus:ring-[#0461F0] border-gray-300"
                      />
                      <span className="text-sm font-medium capitalize">{spec}</span>
                    </label>
                  ))}
                </div>
              </div> */}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingReviewer(null);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      password: '',
                      affiliation: '',
                      specialization: []
                    });
                  }}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={editingReviewer ? handleUpdateReviewer : handleCreateReviewer}
                  className="px-5 py-2.5 bg-[#0461F0] text-white rounded-lg font-semibold hover:bg-[#0451D0] transition-all shadow-md hover:shadow-lg text-sm"
                >
                  {editingReviewer ? 'Update Reviewer' : 'Create Reviewer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
}

export default ReviewerManagement;