import { FaEdit, FaUndo, FaCheck, FaBan, FaForward, FaCalendar, FaUser,FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';
import { getStatusBadge } from './utils';
import { useState,useMemo } from 'react';

function SubmissionStatusCard({
  submission,
  user,
  canEdit,
  canShowActions,
  onEdit,
  onApprove,
  onReject,
  onSendBack,
  onMoveToReviewer,
  onSchedule
}) {
  const [showReviewerModal, setShowReviewerModal] = useState(false);
  const [availableReviewers, setAvailableReviewers] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [loadingReviewers, setLoadingReviewers] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
  const fetchAvailableReviewers = async () => {
    setLoadingReviewers(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/editor/reviewers/available/${submission.journal}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      if (data.success) {
        setAvailableReviewers(data.data.reviewers);
      }
    } catch (error) {
      console.error('Error fetching reviewers:', error);
    } finally {
      setLoadingReviewers(false);
    }
  };
const filteredReviewers = useMemo(() => {
  if (!searchQuery.trim()) return availableReviewers;
  
  const query = searchQuery.toLowerCase();
  return availableReviewers.filter(reviewer => {
    const fullName = `${reviewer.firstName} ${reviewer.lastName}`.toLowerCase();
    return fullName.includes(query);
  });
}, [availableReviewers, searchQuery]);
  const badge = getStatusBadge(submission.status);
  const StatusIcon = badge.icon;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 animate-fade-in-up">
      {/* Status Header */}
      <div className="flex items-center justify-between flex-wrap gap-6 pb-6 border-b-2 border-gray-100">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-lg ${badge.class.split(' ')[0]} flex items-center justify-center shadow-md`}>
            <StatusIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1.5">
              Current Status
            </div>
            <span className={`text-white inline-flex items-center space-x-2 ${badge.class} px-4 py-1.5 rounded-lg text-sm font-bold`}>
              {/* <StatusIcon className="w-4 h-4" /> */}
              <span className=''>{user.role==='author' ? badge.text === 'with editor'?'with editor':'Under Review': badge.text}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Edit Button for Author */}
          {user.role === 'author' && canEdit && (
            <button
              onClick={onEdit}
              className="group flex items-center space-x-2 bg-[#0461F0] hover:bg-[#0350d1] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FaEdit className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Edit Submission</span>
            </button>
          )}

          {/* Editor Actions */}
          {canShowActions && user.role === 'editor' && submission.status !== 'approved_by_editor' && (
            <>
              <button
                onClick={onApprove}
                className="group flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaCheck className="w-4 h-4 group-hover:scale-125 transition-transform" />
                <span>Approve</span>
              </button>
              <button
                onClick={onReject}
                className="group flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaBan className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                <span>Reject</span>
              </button>
              <button
                onClick={onSendBack}
                className="group flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaUndo className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-300" />
                <span>Send Back</span>
              </button>
            </>
          )}

          {/* Move to Reviewer */}
          {canShowActions && user.role === 'editor' && submission.status !== 'with_reviewer' && submission.status !== 'approved_by_editor' && (
            <button
              onClick={() => {
                setShowReviewerModal(true);
                fetchAvailableReviewers();
              }}
              className="group flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FaForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>Assign Reviewer</span>
            </button>
          )}

          {/* Schedule Publication */}
          {/* {canShowActions && user.role === 'editor' && submission.status === 'approved_by_editor' && (
            <>
              <button
                onClick={onSchedule}
                className="group flex items-center space-x-2 bg-[#0461F0] hover:bg-[#0350d1] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaCalendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Schedule Publication</span>
              </button>
              <button
                onClick={onSendBack}
                className="group flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaUndo className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-300" />
                <span>Send Back</span>
              </button>
            </>
          )} */}

          {/* Reviewer Actions */}
          {canShowActions && user.role === 'reviewer' && submission.status === 'with_reviewer' && (
            <>
              <button
                onClick={onApprove}
                className="group flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaCheck className="w-4 h-4 group-hover:scale-125 transition-transform" />
                <span>Approve</span>
              </button>
              <button
                onClick={onReject}
                className="group flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaBan className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                <span>Reject</span>
              </button>
              <button
                onClick={onSendBack}
                className="group flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FaUndo className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-300" />
                <span>Send Back</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Rejection Notice */}
      {user.role === 'author' && canEdit && submission.status.includes('rejected') && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
              <FaBan className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">Submission Rejected</p>
              <p className="text-sm text-gray-700">
                You can edit and resubmit your submission using the Edit button above.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submission Information Grid */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center">
          <div className="w-40 text-sm font-bold text-gray-500 uppercase tracking-wide">Journal</div>
          <div className="flex-1 font-semibold text-gray-900 capitalize">{submission.journal}</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-40 text-sm font-bold text-gray-500 uppercase tracking-wide">Section</div>
          <div className="flex-1 font-semibold text-gray-900 capitalize">{submission.section}</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-40 text-sm font-bold text-gray-500 uppercase tracking-wide">Author</div>
          <div className="flex-1 font-semibold text-gray-900">
            {submission.author?.firstName} {submission.author?.lastName}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-40 text-sm font-bold text-gray-500 uppercase tracking-wide">Submitted</div>
          <div className="flex-1 font-semibold text-gray-900">
            {submission.submittedAt
              ? format(new Date(submission.submittedAt), 'MMM dd, yyyy')
              : 'Not submitted'}
          </div>
        </div>
        
        {submission.publicationDate && (
          <div className="flex items-center">
            <div className="w-40 text-sm font-bold text-gray-500 uppercase tracking-wide">Publication Date</div>
            <div className="flex-1 font-semibold text-gray-900">
              {format(new Date(submission.publicationDate), 'MMM dd, yyyy')}
            </div>
          </div>
        )}
      </div>

      {/* Reviewer Assignment Modal */}
      {showReviewerModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-[#0461F0] text-white">
              <h3 className="text-xl font-bold">Assign Reviewer to Manuscript</h3>
              <p className="text-sm text-blue-100 mt-1">Select a qualified reviewer for this submission</p>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                  Select Reviewer *
                </label>
                {/* Search Input */}
<div className="relative mb-4">
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
    <FaSearch className="h-4 w-4 text-gray-400" />
  </div>
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search by reviewer name..."
    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0461F0] focus:outline-none text-sm"
  />
  {searchQuery && (
    <button
      onClick={() => setSearchQuery('')}
      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
    >
      ×
    </button>
  )}
</div>
                {loadingReviewers ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0461F0] border-t-transparent"></div>
                  </div>
                ) : filteredReviewers.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FaUser className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No reviewers available for this journal</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {filteredReviewers.map((reviewer) => (
                      <div
                        key={reviewer._id}
                        onClick={() => setSelectedReviewer(reviewer)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedReviewer?._id === reviewer._id
                            ? 'border-[#0461F0] bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-[#0461F0] hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              selectedReviewer?._id === reviewer._id 
                                ? 'bg-[#0461F0]' 
                                : 'bg-gray-200'
                            }`}>
                              <FaUser className={`w-5 h-5 ${
                                selectedReviewer?._id === reviewer._id 
                                  ? 'text-white' 
                                  : 'text-gray-500'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-gray-900">
                                {reviewer.firstName} {reviewer.lastName}
                              </div>
                              <div className="text-sm text-gray-600">{reviewer.email}</div>
                              {reviewer.specialization && reviewer.specialization.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {reviewer.specialization.map((spec, idx) => (
                                    <span 
                                      key={idx} 
                                      className="px-2 py-0.5 bg-blue-100 text-[#0461F0] rounded text-xs font-semibold capitalize"
                                    >
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                              Active
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {reviewer.activeReviews || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                  Notes for Reviewer (Optional)
                </label>
                <textarea
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0461F0] focus:outline-none resize-none text-sm"
                  placeholder="Any specific instructions or comments for the reviewer..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowReviewerModal(false);
                  setSelectedReviewer(null);
                  setReviewerNotes('');
                }}
                className="px-6 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-semibold text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedReviewer) {
                    onMoveToReviewer(selectedReviewer._id, reviewerNotes);
                    setShowReviewerModal(false);
                    setSelectedReviewer(null);
                    setReviewerNotes('');
                  }
                }}
                disabled={!selectedReviewer}
                className="px-6 py-2.5 bg-[#0461F0] hover:bg-[#0350d1] text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105"
              >
                Assign Reviewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmissionStatusCard;