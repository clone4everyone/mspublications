import { FaArrowLeft, FaSignOutAlt, FaUser, FaBook, FaFileAlt } from 'react-icons/fa';

function SubmissionHeader({ user, onBack, onLogout }) {
  return (
    <div className="bg-white border-b-2 border-[#0461F0] shadow-sm">
      {/* Top bar with gradient accent */}
      <div className="h-1 bg-gradient-to-r from-[#0461F0] via-[#2d7df5] to-[#0461F0]"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-6">
            <button
              onClick={onBack}
              className="group flex items-center space-x-2 text-gray-600 hover:text-[#0461F0] transition-colors duration-200"
              aria-label="Go back"
            >
              <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium text-sm">Back</span>
            </button>
            
            <div className="h-8 w-px bg-gray-300"></div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0461F0] rounded-lg flex items-center justify-center shadow-md">
                <FaFileAlt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                  Submission Details
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Journal Manuscript Review
                </p>
              </div>
            </div>
          </div>

          {/* Right section - User info */}
          {/* <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0461F0] to-[#2d7df5] rounded-full flex items-center justify-center shadow-sm">
                <FaUser className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
                  {user?.role || 'User'}
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </div>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
              aria-label="Logout"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SubmissionHeader;