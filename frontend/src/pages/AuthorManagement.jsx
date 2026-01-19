import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthors, toggleAuthorStatus, reset } from '../redux/slices/editorSlice';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 import { logout } from '../redux/slices/authSlice';
const AuthorManagement = () => {
  const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
  const { authors, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.editor
  );
  const navigate=useNavigate();
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllAuthors());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Author status updated successfully');
      setShowModal(false);
      setNote('');
      setSelectedAuthor(null);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleToggleStatus = (author) => {
    setSelectedAuthor(author);
    if (author.isActive) {
      setShowModal(true);
    } else {
      // Reactivate without note
      dispatch(toggleAuthorStatus({
        authorId: author._id,
        isActive: true,
        note: ''
      }));
    }
  };

  const handleDeactivate = () => {
    if (!note.trim()) {
      toast.error('Please provide a reason for deactivation');
      return;
    }

    dispatch(toggleAuthorStatus({
      authorId: selectedAuthor._id,
      isActive: false,
      note: note.trim()
    }));
  };

  const filteredAuthors = authors?.filter(author =>
    author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.affiliation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
 const handleLogout = () => {
    dispatch(logout());
    navigate('/IJPPI/login');
  };
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
                            <div 
        className="w-[180px] h-[38px] sm:w-[200px] sm:h-[42px] md:w-[220px] md:h-[47px] lg:w-[240px] lg:h-[52px] xl:w-[267px] xl:h-[57px] font-bold cursor-pointer"
        onClick={() => navigate('/IJPPI')}
      >
      <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767786487/mslogo_gqwxzo.png' className='w-full h-full object-contain'/>
      </div>    
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
       <div className="container  py-8">
           <div>
                  <h3 className=" flex gap-1 text-gray-500 items-center hover:text-gray-600 cursor-pointer" onClick={()=>navigate('/IJPPI/editor/journal/pharma')}><FaArrowLeft/><span className="text-xl font-bold text-gray-500 tracking-tight flex gap-1 items-center hover:text-gray-600 cursor-pointer" >Back To Dashboard</span></h3>
                </div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Author Management</h1>
        <p className="text-gray-600">Manage verified authors and their access</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search authors by name, email, or affiliation..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Authors Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Affiliation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAuthors?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No authors found
                  </td>
                </tr>
              ) : (
                filteredAuthors?.map((author) => (
                  <tr key={author._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            {author.firstName[0]}{author.lastName[0]}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {author.prefix} {author.firstName} {author.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{author.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{author.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {author.affiliation || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          author.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {author.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(author.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleToggleStatus(author)}
                        className={`px-4 py-2 rounded-md ${
                          author.isActive
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        } transition-colors`}
                      >
                        {author.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deactivation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Deactivate Author
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You are about to deactivate{' '}
                <strong>
                  {selectedAuthor?.firstName} {selectedAuthor?.lastName}
                </strong>
                . Please provide a reason:
              </p>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="4"
                placeholder="Enter reason for deactivation..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNote('');
                    setSelectedAuthor(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeactivate}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
 
  );
};

export default AuthorManagement;