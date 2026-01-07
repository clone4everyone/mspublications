import { useDispatch } from 'react-redux';
import { FaEnvelope, FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import { sendEmail, getSubmissionEmails } from '../../redux/slices/emailSlice';
import { toast } from 'react-toastify';

function EmailPanel({
  submissionId,
  emails,
  user,
  showComposer,
  onToggleComposer,
  emailSubject,
  setEmailSubject,
  emailBody,
  setEmailBody,
  emailImages,
  setEmailImages,
  onClose,
}) {
  const dispatch = useDispatch();

  const handleSendEmail = async () => {
    if (!emailSubject || !emailBody) {
      toast.error('Please fill in subject and body');
      return;
    }

    const result = await dispatch(sendEmail({
      submissionId,
      subject: emailSubject,
      body: emailBody,
      images: emailImages
    }));

    if (result.type === 'emails/send/fulfilled') {
      toast.success('Email sent successfully');
      onToggleComposer();
      setEmailSubject('');
      setEmailBody('');
      setEmailImages([]);
      dispatch(getSubmissionEmails(submissionId));
    }
  };

  return (
    <div className="w-[420px] border-l border-gray-200 flex flex-col bg-white shadow-xl">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-[#0461F0]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <FaEnvelope className="w-5 h-5 text-[#0461F0]" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Communication</h3>
              <p className="text-xs text-blue-100">Manuscript Discussion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            title="Close panel"
          >
            <FaTimes className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <button
          onClick={onToggleComposer}
          className="w-full bg-white hover:bg-blue-50 text-[#0461F0] px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {showComposer ? 'Cancel' : '+ New Message'}
        </button>
      </div>

      {/* Email Composer */}
      {showComposer && (
        <div className="p-5 border-b border-gray-200 bg-gray-50 animate-scale-in">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-[#0461F0] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                Message
              </label>
              <textarea
                placeholder="Type your message..."
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={5}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-[#0461F0] focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <label className="cursor-pointer text-sm text-gray-600 hover:text-[#0461F0] font-semibold flex items-center space-x-2 transition-colors">
                <FaImage className="w-4 h-4" />
                <span>Attach Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setEmailImages(Array.from(e.target.files))}
                  className="hidden"
                />
              </label>
              {emailImages.length > 0 && (
                <span className="text-xs bg-blue-100 text-[#0461F0] px-3 py-1 rounded-md font-bold border border-blue-200">
                  {emailImages.length} file{emailImages.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            <button
              onClick={handleSendEmail}
              className="w-full flex items-center justify-center space-x-2 bg-[#0461F0] hover:bg-[#0350d1] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
            >
              <FaPaperPlane className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      )}

      {/* Email Thread */}
      <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
        {emails.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="w-8 h-8 text-[#0461F0]" />
            </div>
            <p className="text-gray-900 font-semibold mb-1">No messages yet</p>
            <p className="text-sm text-gray-500">Start a conversation about this manuscript</p>
          </div>
        ) : (
          <div className="space-y-4">
            {emails.map((email, idx) => {
              const isFromMe = email.sender._id === user.id;
              return (
                <div
                  key={email._id}
                  className={`animate-fade-in-up ${isFromMe ? 'ml-8' : 'mr-8'}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wide ${
                        isFromMe ? 'text-[#0461F0]' : 'text-gray-600'
                      }`}>
                        {isFromMe ? 'You' : `${email.sender.firstName} ${email.sender.lastName}`}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(email.sentAt), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                  </div>
                  
                  <div
                    className={`p-4 rounded-lg shadow-sm ${
                      isFromMe
                        ? 'bg-[#0461F0] text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className={`text-sm font-bold mb-2 ${
                      isFromMe ? 'text-blue-100' : 'text-gray-900'
                    }`}>
                      {email.subject}
                    </div>
                    <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      isFromMe ? 'text-white' : 'text-gray-700'
                    }`}>
                      {email.body}
                    </div>
                    
                    {email.attachments && email.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {email.attachments.map((att, attIdx) => (
                          <img
                            key={attIdx}
                            src={att.url}
                            alt={att.filename}
                            className="max-w-full rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailPanel;