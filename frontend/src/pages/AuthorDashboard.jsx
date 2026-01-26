import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMySubmissions } from '../redux/slices/submissionSlice';
import { logout } from '../redux/slices/authSlice';
import { getUnreadCount } from '../redux/slices/emailSlice';
import { toast } from 'react-toastify';
import logo from '../../public/ms-logo.png'
import { 
  Plus, LogOut, User, Mail, FileText, 
  Clock, CheckCircle, XCircle, Search,
  Filter, TrendingUp, Eye, Calendar,
  Edit, Trash2, Download, MoreVertical,
  Bell, Settings, ChevronRight, Sparkles,
  BookOpen, Award, Target, Zap, Home,
  Menu, X,
  CheckCheck
} from 'lucide-react';
import { format } from 'date-fns';

function AuthorDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { submissions, isLoading } = useSelector((state) => state.submissions);
  const { unreadCount } = useSelector((state) => state.emails);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    dispatch(getMySubmissions());
    dispatch(getUnreadCount());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/IJPPI/login');
    toast.success('Logged out successfully');
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

  // Updated function to map internal statuses to author-visible statuses
  const getAuthorVisibleStatus = (status) => {
    // Editor rejected -> show as Rejected
    if (status === 'rejected_by_editor') {
      return 'rejected';
    }
 
    // All other statuses (pending, with_reviewer, approved_by_editor, 
    // rejected_by_reviewer, approved_by_reviewer, scheduled, published) -> show as In Review
    return 'in_review';
  };

  const getStatusConfig = (status) => {
    const authorStatus = getAuthorVisibleStatus(status);
    
    const statusMap = {
      in_review: { 
        gradient: 'from-[#FDB913] to-[#F5A800]',
        bg: 'bg-yellow-50', 
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        icon: Clock,
        label: 'In Review' 
      },
      rejected: { 
        gradient: 'from-red-500 to-red-600',
        bg: 'bg-red-50', 
        text: 'text-red-700',
        border: 'border-red-200',
        icon: XCircle,
        label: 'Rejected' 
      },
            approved: { 
        gradient: 'from-green-500 to-green-600',
        bg: 'bg-green-50', 
        text: 'text-green-700',
        border: 'border-green-200',
        icon: CheckCheck,
        label: 'Approved' 
      },
    };
    
    return statusMap[authorStatus];
  };

  // Filter out drafts and approved_by_editor, then apply search and filter
  const filteredSubmissions = submissions
    .filter(sub => sub.status !== 'draft' && sub.status !== 'approved_by_editor')
    .filter(sub => {
      const matchesSearch = sub.metadata?.title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Map filter status to match author-visible statuses
      let matchesFilter = true;
      if (filterStatus !== 'all') {
        const authorVisibleStatus = getAuthorVisibleStatus(sub.status);
        matchesFilter = authorVisibleStatus === filterStatus;
      }
      
      return matchesSearch && matchesFilter;
    });

  const stats = [
    { 
      label: 'Total Submissions', 
      value: submissions.filter(s => s.status !== 'draft' && s.status !== 'approved_by_editor').length, 
      icon: FileText,
      gradient: 'from-[#1B7A9C] to-[#156680]',
      change: '+3 this month'
    },
    { 
      label: 'In Review', 
      value: submissions.filter(s => {
        const authorStatus = getAuthorVisibleStatus(s.status);
        return authorStatus === 'in_review' && s.status !== 'draft' && s.status !== 'approved_by_editor';
      }).length, 
      icon: Clock,
      gradient: 'from-[#FDB913] to-[#F5A800]',
      change: 'Active'
    },
    { 
      label: 'Rejected', 
      value: submissions.filter(s => getAuthorVisibleStatus(s.status) === 'rejected').length, 
      icon: XCircle,
      gradient: 'from-red-500 to-red-600',
      change: 'All time'
    },
    { 
      label: 'Acceptance Rate', 
      value: submissions.filter(s => s.status !== 'draft').length > 0 
        ? `${Math.round((submissions.filter(s => s.status === 'published' || s.status === 'scheduled').length / submissions.filter(s => s.status !== 'draft').length) * 100)}%`
        : '0%', 
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      change: 'All time'
    }
  ];

  const navigationItems = [
    { icon: FileText, label: 'My Submissions', active: true, count: submissions.filter(s => s.status !== 'draft' && s.status !== 'approved_by_editor').length, onClick: () => {} },
    { icon: Plus, label: 'New Submission', highlight: true, onClick: () => navigate('/IJPPI/author/new-submission') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-xl transition-all duration-300 z-50 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <button 
                onClick={() => navigate('/IJPPI')}
                className="flex items-center space-x-3 group flex-col"
              >
                <div className="bg-gradient-to-br rounded-xl flex items-center justify-center transition-all">
                  <img className="" src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767786487/mslogo_gqwxzo.png' alt="Logo" />
                </div>
                <div>
                  <div className="text-md font-[500] text-black">Author Dashboard</div>
                </div>
              </button>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#5394f6] to-[#0461F0] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-gray-900 truncate">
                  {user?.username}
                </div>
                <div className="text-md text-gray-500 truncate">{user?.email}</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                item.highlight
                  ? 'bg-gradient-to-r from-[#5394f6] to-[#0461F0] text-white hover:shadow-lg'
                  : item.active
                  ? 'bg-blue-50 text-[#0461F0] font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${item.highlight ? '' : ''}`} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left text-md">{item.label}</span>
                  {item.count !== undefined && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold">
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => setShowProfileModal(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-md">Settings</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-md font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 bg-gradient-to-r from-[#eef2fa] to-[#e6eefb] transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-gray-200 shadow-sm">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[34px] font-poppins font-black text-gray-900">
                  Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2676ef] to-[#0461F0]">{user?.firstName}</span>!
                </h1>
                <p className="text-sm text-gray-600">Manage your research submissions and track their progress</p>
              </div>
              
              <button
                onClick={() => navigate('/IJPPI/author/new-submission')}
                className="group flex items-center space-x-2 bg-[#0461F0] text-white px-5 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                <span>New Submission</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Submissions Section */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4689ec] to-[#0c67ee] px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 w-64"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                {[
                  { id: 'all', label: 'All', count: submissions.filter(sub => sub.status !== 'draft' && sub.status !== 'approved_by_editor').length },
                  { id: 'in_review', label: 'In Review', count: submissions.filter(s => {
                    const authorStatus = getAuthorVisibleStatus(s.status);
                    return authorStatus === 'in_review' && s.status !== 'draft' && s.status !== 'approved_by_editor';
                  }).length },
                  { id: 'rejected', label: 'Rejected', count: submissions.filter(s => getAuthorVisibleStatus(s.status) === 'rejected').length },
                  {id:'approved', label: 'Approved', count: 0}
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterStatus(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold text-md transition-all whitespace-nowrap ${
                      filterStatus === filter.id
                        ? 'bg-white text-[#0461F0] shadow-lg'
                        : 'bg-white/10 text-white hover:bg-[#0461F0]/20'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      filterStatus === filter.id ? 'bg-[#0461F0] text-white' : 'bg-[#0461F0]/20'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions List */}
            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-teal-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-[#1B7A9C] rounded-full animate-spin border-t-transparent absolute top-0"></div>
                  </div>
                  <p className="mt-4 text-gray-600 font-medium">Loading submissions...</p>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#3b86f6] to-[#0461F0] rounded-3xl flex items-center justify-center mb-6 animate-float">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No submissions found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm ? 'Try a different search term' : 'Start by creating your first submission'}
                  </p>
                  <button
                    onClick={() => navigate('/IJPPI/author/new-submission')}
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#3b86f6] to-[#0461F0] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create New Submission</span>
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredSubmissions.map((submission, index) => {
                    const statusConfig = getStatusConfig(submission.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <div
                        key={submission._id}
                        onClick={() => navigate(`/IJPPI/submission/${submission._id}`)}
                        className="group relative bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-in-left"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className={`inline-flex items-center space-x-2 px-4 py-2 ${statusConfig.bg} ${statusConfig.text} rounded-xl text-sm font-bold border-2 ${statusConfig.border}`}>
                                <StatusIcon className="w-4 h-4" />
                                <span>{statusConfig.label}</span>
                              </span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-[500] uppercase">
                                {submission.journal}
                              </span>
                              <p className='text-gray-400 font-semibold text-sm'>Serial No. : {submission?.serialNumber}</p>
                            </div>
                            
                            <h3 className="text-[30px] font-bold text-gray-900 mb-2 group-hover:text-[#0461F0] transition-colors line-clamp-2">
                              {submission.metadata?.title || 'Untitled Submission'}
                            </h3>
                            
                            <div className="text-gray-600 text-sm line-clamp-2 mb-4"  
                            dangerouslySetInnerHTML={{
                              __html: submission.metadata?.abstract || "",
                            }}/>
                       
                            <div className="flex items-center space-x-4 text-md text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {submission.submittedAt
                                    ? format(new Date(submission.submittedAt), 'MMM dd, yyyy')
                                    : format(new Date(submission.createdAt), 'MMM dd, yyyy')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{submission.section || 'General'}</span>
                              </div>
                            </div>
                          </div>

                          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#1B7A9C] group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Password Change Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-scale-in overflow-hidden">
            <div className="bg-gradient-to-r from-[#3b86f6] to-[#0461F0] px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
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

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default AuthorDashboard;