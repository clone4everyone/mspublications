import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { getSubmissionsByJournal } from '../redux/slices/submissionSlice';
import { logout } from '../redux/slices/authSlice';
import { 
  FaArrowLeft, FaSignOutAlt, FaUser, FaSearch, 
  FaFilter, FaFile, FaClock, FaCheckCircle, FaFileAlt,
  FaMandalorian,
  FaSalesforce,
  FaUserAlt,

} from 'react-icons/fa';
import { XCircle, Settings2} from 'lucide-react'
import { format } from 'date-fns';

const journalColors = {
  pharma: 'bg-blue-600',
  history: 'bg-amber-600',
  chemistry: 'bg-green-600',
  science: 'bg-purple-600',
  ayurvedic: 'bg-emerald-600',
  technology: 'bg-red-600'
};

function JournalView() {
  const { journal } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
 const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { user } = useSelector((state) => state.auth);
  const { submissions, isLoading } = useSelector((state) => state.submissions);
const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(statusParam || 'all');
  const [queries, setQueries] = useState([]);
  const [showQueries, setShowQueries] = useState(false);

  useEffect(() => {
    if (user.role === 'editor') {
      fetchQueries();
    }
  }, [user.role]);

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/editor/queries/allQueries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.data) {
        setQueries(data.data);
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  // useEffect(() => {
  //   if (filterStatus === 'all') {
  //     dispatch(getSubmissionsByJournal({ journal }));
  //   } else {
  //     dispatch(getSubmissionsByJournal({ journal, status: filterStatus }));
  //   }
  // }, [dispatch, journal, filterStatus]);
  useEffect(() => {
  dispatch(getSubmissionsByJournal({ journal }));
}, [dispatch, journal]);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/IJPPI/login');
  };

  const handleBack = () => {
    if (user.role === 'editor') {
      navigate('/IJPPI/editor/dashboard');
    } else {
      navigate('/IJPPI/reviewer/dashboard');
    }
  };
  const handleChangePassword = async () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/change-password`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
          })
        });
        
        const data = await response.json();
        if (data.success) {
          toast.success('Password changed successfully');
          setShowProfileModal(false);
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error changing password');
      }
    };

  const getStatusBadge = (status) => {
    const statusMap = {
      draft: { class: 'bg-gray-100 text-gray-700 border border-gray-300', text: 'Draft', icon: '📝' },
      pending: { class: 'bg-amber-50 text-amber-700 border border-amber-200', text: 'With Editor', icon: '⏳' },
      approved_by_editor: { class: 'bg-blue-50 text-blue-700 border border-blue-200', text: 'Editor Approved', icon: '✓' },
      rejected_by_editor: { class: 'bg-red-50 text-red-700 border border-red-200', text: 'Editor Rejected', icon: '✗' },
      with_reviewer: { class: 'bg-purple-50 text-purple-700 border border-purple-200', text: 'Under Review', icon: '👁' },
      approved_by_reviewer: { class: 'bg-emerald-50 text-emerald-700 border border-emerald-200', text: 'Reviewer Approved', icon: '✓' },
      rejected_by_reviewer: { class: 'bg-red-50 text-red-700 border border-red-200', text: 'Reviewer Rejected', icon: '✗' },
      scheduled: { class: 'bg-indigo-50 text-indigo-700 border border-indigo-200', text: 'Scheduled', icon: '📅' },
      published: { class: 'bg-green-50 text-green-700 border border-green-200', text: 'Published', icon: '🌐' },
    };
    return statusMap[status] || { class: 'bg-gray-100 text-gray-700 border border-gray-300', text: status, icon: '📄' };
  };

  // const filteredSubmissions = submissions.filter(sub =>
  //   sub.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  // );
 submissions
  .filter(sub => filterStatus === 'all' ? true : sub.status === filterStatus)
  .filter(sub =>
    sub.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )
let filteredSubmissions=null;
if(user.role === 'reviewer'){
  filteredSubmissions=submissions
  .filter(sub => filterStatus === 'all' ? true : sub.status === filterStatus)
  .filter(sub =>
    sub.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(sub=> sub.status!='pending')
}else{
    filteredSubmissions=submissions
  .filter(sub => filterStatus === 'all' ? true : sub.status === filterStatus)
  .filter(sub =>
    sub.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
const getStatusCounts = () => {
  // Use the original submissions array, not the filtered one
  const allSubmissions = submissions;
  
  return {
    all:user.role==='reviewer' ? allSubmissions.filter(s => (s.status !== 'draft' && s.status!=='pending')).length : allSubmissions.filter(s=> s.status!=='draft').length,
    pending: allSubmissions.filter(s => s.status === 'pending').length,
    with_reviewer: allSubmissions.filter(s => s.status === 'with_reviewer').length,
    approved_by_editor: allSubmissions.filter(s => s.status === 'approved_by_editor').length,
    approved_by_reviewer: allSubmissions.filter(s => s.status === 'approved_by_reviewer').length,
    rejected_by_editor: allSubmissions.filter(s => s.status === 'rejected_by_editor').length,
    rejected_by_reviewer: allSubmissions.filter(s => s.status === 'rejected_by_reviewer').length,
  };
};

  const counts = getStatusCounts();
 const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  return (
       <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Header Bar */}
      <div className={`h-20 ${user.role === 'editor' ? 'bg-[#0461F0]' : 'bg-purple-600'} flex items-center justify-between px-8 text-white shadow-lg`}>
        <div className="flex items-center space-x-6">
          <div 
        className="w-[180px] h-[38px] sm:w-[200px] sm:h-[42px] md:w-[220px] md:h-[47px] lg:w-[240px] lg:h-[52px] xl:w-[267px] xl:h-[57px] font-bold cursor-pointer"
        onClick={() => navigate('/IJPPI')}
      >
      <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767786487/mslogo_gqwxzo.png' className='w-full h-full object-contain'/>
      </div>
          <div className="border-l border-white/30 h-8"></div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight capitalize">
              Dashboard
            </h1>
            <p className="text-sm text-white/80 mt-0.5">
              {user.role === 'editor' ? 'Editorial Management' : 'Reviewer Dashboard'}
            </p>
          </div>
          {user.role === 'editor' && (
            <button
              onClick={() => setShowQueries(!showQueries)}
              className="ml-6 flex items-center space-x-2 bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <FaFileAlt className="w-5 h-5" />
              <span className="text-base font-medium">Queries</span>
              {queries.length > 0 && (
                <span className="bg-white text-[#0461F0] text-sm font-semibold px-2.5 py-0.5 rounded-full">
                  {queries.length}
                </span>
              )}
            </button>
          )}
        </div>
    
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-3 bg-white/10 px-5 py-2.5 rounded-lg">
            <FaUser className="w-5 h-5" />
            <span className="text-base font-medium">{user?.firstName} {user?.lastName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:bg-white/20 px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="text-base font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Filters */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm overflow-y-auto">
          <div className="p-6">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <FaFilter className="w-4 h-4 mr-2" />
              Filter Submissions
            </h2>
            
            <button
              onClick={() => setFilterStatus('all')}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 ${
                filterStatus === 'all' 
                  ? 'bg-[#0461F0] text-white shadow-md' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaFile className="w-5 h-5" />
                <span className="text-base font-semibold">All Submissions</span>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                filterStatus === 'all' ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                {counts.all}
              </span>
            </button>

            {user.role === 'editor' && (
              <button
                onClick={() => setFilterStatus('pending')}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 ${
                  filterStatus === 'pending' 
                    ? 'bg-[#0461F0] text-white shadow-md' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FaClock className="w-5 h-5" />
                  <span className="text-base font-semibold">With Editor</span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  filterStatus === 'pending' ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'
                }`}>
                  {counts.pending}
                </span>
              </button>
            )}

            {user.role === 'editor' && (
              <button
                onClick={() => setFilterStatus('approved_by_editor')}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 ${
                  filterStatus === 'approved_by_editor' 
                    ? 'bg-[#0461F0] text-white shadow-md' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="w-5 h-5" />
                  <span className="text-base font-semibold">Approved by Editor</span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  filterStatus === 'approved_by_editor' ? 'bg-white/25 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {counts.approved_by_editor}
                </span>
              </button>
            )}

            <button
              onClick={() => setFilterStatus('with_reviewer')}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 ${
                filterStatus === 'with_reviewer' 
                  ? 'bg-[#0461F0] text-white shadow-md' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaClock className="w-5 h-5" />
                <span className="text-base font-semibold">With Reviewer</span>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                filterStatus === 'with_reviewer' ? 'bg-white/25 text-white' : 'bg-purple-100 text-purple-700'
              }`}>
                {counts.with_reviewer}
              </span>
            </button>

            <button
              onClick={() => setFilterStatus('approved_by_reviewer')}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 ${
                filterStatus === 'approved_by_reviewer' 
                  ? 'bg-[#0461F0] text-white shadow-md' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaCheckCircle className="w-5 h-5" />
                <span className="text-base font-semibold">Approved by Reviewer</span>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                filterStatus === 'approved_by_reviewer' ? 'bg-white/25 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {counts.approved_by_reviewer}
              </span>
            </button>

            {counts.rejected > 0 && (
              <button
                onClick={() => setFilterStatus('rejected_by_editor')}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 ${
                  filterStatus === 'rejected_by_editor' 
                    ? 'bg-[#0461F0] text-white shadow-md' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FaFile className="w-5 h-5" />
                  <span className="text-base font-semibold">Rejected by Editor</span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  filterStatus === 'rejected_by_editor' ? 'bg-white/25 text-white' : 'bg-red-100 text-red-700'
                }`}>
                  {counts.rejected_by_editor}
                </span>
              </button>
            )}

            <button
              onClick={() => setFilterStatus('rejected_by_reviewer')}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 ${
                filterStatus === 'rejected_by_reviewer' 
                  ? 'bg-[#0461F0] text-white shadow-md' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaFile className="w-5 h-5" />
                <span className="text-base font-semibold">Rejected by Reviewer</span>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                filterStatus === 'rejected_by_reviewer' ? 'bg-white/25 text-white' : 'bg-red-100 text-red-700'
              }`}>
                {counts.rejected_by_reviewer}
              </span>
            </button>

            {user.role === 'editor' && (
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center mt-6">
                  <FaUser className="w-4 h-4 mr-2" />
                  Reviewer Management
                </h2>
                <button 
                  className='w-full flex items-center gap-3 px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 text-base font-semibold hover:bg-gray-200' 
                  onClick={() => navigate('/IJPPI/editor/reviewers')}
                >
                  <FaUserAlt className="w-5 h-5" />
                  All Reviewers
                </button>
              </div>
            )}

            {
              user.role === 'editor' && (
                <div>
                  <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center mt-6">
                  <FaUser className="w-4 h-4 mr-2" />
                  Author Management
                </h2>
                <button 
                  className='w-full flex items-center gap-3 px-5 py-3.5 rounded-lg transition-all duration-200 mb-2 text-base font-semibold hover:bg-gray-200' 
                  onClick={() => navigate('/IJPPI/editor/authors')}
                >
                  <FaUserAlt className="w-5 h-5" />
                  All Authors
                </button>
                  </div>
              )
            }
              <div>
                  <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center mt-6">
                  <FaUser className="w-4 h-4 mr-2" />
                  Change Password
                </h2>
                 <button
            onClick={() => setShowProfileModal(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Settings2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-md">Settings</span>
          </button>
                  </div>
                
          </div>
        </div>

        {/* Center Panel - List */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="relative max-w-2xl">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search submissions by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0461F0] focus:border-transparent text-base font-medium"
              />
            </div>
          </div>

          {/* Submissions List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-[#0461F0] mx-auto"></div>
                  <p className="mt-5 text-gray-600 font-medium text-lg">Loading submissions...</p>
                </div>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center px-4">
                  <FaFile className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-700 font-semibold text-xl">No submissions found</p>
                  <p className="text-base text-gray-500 mt-2">
                    {searchTerm ? 'Try a different search term' : 'No submissions match the selected filter'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredSubmissions.map((submission) => {
                  const badge = getStatusBadge(submission.status);
                  return (
                    <div
                      key={submission._id}
                      onClick={() => navigate(`/IJPPI/submission/${submission._id}`)}
                      className="p-6 hover:bg-blue-50/50 cursor-pointer transition-all duration-200 border-l-4 border-transparent hover:border-[#0461F0]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-xl text-gray-900 flex-1 pr-4 leading-tight tracking-tight">
                          {submission.metadata?.title || 'Untitled Submission'}<p className='text-gray-400 font-semibold text-sm'>Serial No. : {submission?.serialNumber}</p>
                        </h3>
                        <span className={`inline-flex items-center space-x-1.5 text-sm font-semibold px-4 py-2 rounded-md whitespace-nowrap ${badge.class}`}>
                          <span>{badge.icon}</span>
                          <span>{badge.text}</span>
                          
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3 font-medium">
                        <span className="flex items-center space-x-1.5">
                          <FaUser className="w-4 h-4 text-gray-400" />
                          <span>
                            {submission.author?.firstName} {submission.author?.lastName}
                          </span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="bg-gray-100 px-3 py-1.5 rounded text-gray-700">
                          {submission.section}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>
                          {formatDate(submission.submittedAt || submission.createdAt)}
                        </span>
                      </div>

                      <div 
                        className="text-gray-600 text-base line-clamp-2 mb-4 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: submission.metadata?.abstract || "No abstract provided",
                        }}
                      />

                      {submission.metadata?.keywords && submission.metadata.keywords.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {submission.metadata.keywords.slice(0, 5).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-sm bg-blue-50 text-[#0461F0] px-3 py-1.5 rounded-full font-medium border border-blue-100"
                            >
                              {keyword}
                            </span>
                          ))}
                          {submission.metadata.keywords.length > 5 && (
                            <span className="text-sm text-gray-500 px-3 py-1.5 font-medium">
                              +{submission.metadata.keywords.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Queries Modal */}
      {showQueries && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">Author Queries</h2>
              <button
                onClick={() => setShowQueries(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {queries.length === 0 ? (
                <div className="text-center py-12">
                  <FaFileAlt className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium text-lg">No queries received yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {queries.map((query) => (
                    <div key={query._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg">{query.subject}</h3>
                        <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded">
                          {formatDate(query.createdAt)}
                        </span>
                      </div>
                      <p className="text-base text-gray-700 mb-3 leading-relaxed">{query.message}</p>
                      <p className="text-sm text-gray-500 font-medium">
                        <span className="text-gray-400">From:</span> {query.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

       {showProfileModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-scale-in overflow-hidden">
                  <div className="bg-gradient-to-r from-[#3b86f6] to-[#0461F0] px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                          <Settings2 className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Change Password</h3>
                      </div>
                      <button 
                        onClick={() => setShowProfileModal(false)}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <XCircle className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1B7A9C] focus:border-transparent transition-all"
                        placeholder="Enter current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1B7A9C] focus:border-transparent transition-all"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1B7A9C] focus:border-transparent transition-all"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 px-6 pb-6">
                    <button
                      onClick={() => setShowProfileModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-bold text-gray-700 transition-all hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleChangePassword}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-[#3b86f6] to-[#0461F0] text-white rounded-xl hover:shadow-xl font-bold transition-all hover:scale-105"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
}

export default JournalView;