import { FaBan, FaFileAlt, FaUser } from 'react-icons/fa';

function ArticleDetailsCard({ submission, user, onOpenPdf }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 animate-fade-in-up animate-delay-100">
      {/* Manuscript Title Section */}
      <div className="mb-8 pb-6 border-b-2 border-gray-100">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-1 h-auto min-h-[2rem] bg-gradient-to-b from-[#0461F0] to-[#2d7df5] rounded-full"></div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Manuscript Title
            </div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              {submission.metadata?.title}
            </h2>
          </div>
        </div>

        {submission.metadata?.subtitle && (
          <p className="text-base text-gray-600 mt-4 ml-4 font-medium leading-relaxed">
            {submission.metadata.subtitle}
          </p>
        )}
      </div>

      {/* Abstract Section */}
      <div className="mb-8 bg-gray-50 rounded-lg p-6 border-l-4 border-[#0461F0]">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-[#0461F0] rounded flex items-center justify-center">
            <FaFileAlt className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
            Abstract
          </h3>
        </div>
        <div
          className="text-gray-700 text-[15px] leading-relaxed prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{
            __html: submission.metadata?.abstract || "",
          }}
        />
      </div>

      {/* Keywords Section */}
      {submission.metadata?.keywords && submission.metadata.keywords.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {submission.metadata.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-white border-2 border-[#0461F0] text-[#0461F0] px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#0461F0] hover:text-white transition-all duration-200 cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Document Section */}
      {submission.documentFile && (
        <div className="mb-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-[#0461F0] rounded flex items-center justify-center">
              <FaFileAlt className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Manuscript Document
            </h3>
          </div>
          <div className="flex items-center justify-between bg-white px-5 py-4 rounded-lg border-2 border-[#0461F0] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                <FaFileAlt className="w-5 h-5 text-[#0461F0]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  PDF Document
                </div>
                <div className="font-semibold text-gray-900 text-sm">
                  {submission.documentFile.filename}
                </div>
              </div>
            </div>
            <button
              onClick={onOpenPdf}
              className="flex items-center space-x-2 bg-[#0461F0] hover:bg-[#0350d1] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FaFileAlt className="w-4 h-4" />
              <span>Open Document</span>
            </button>
          </div>
        </div>
      )}

      {/* Assigned Reviewer Section */}
      {submission.reviewerAssigned && user.role==='editor' && (
        <div className="mb-8 bg-purple-50 rounded-lg p-6 border border-purple-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <FaUser className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Assigned Reviewer
            </h3>
          </div>
          <div className="bg-white rounded-lg p-5 border border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <FaUser className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 text-lg mb-1">
                  {submission.reviewerAssigned.firstName} {submission.reviewerAssigned.lastName}
                </div>
                <div className="text-sm text-gray-600 mb-3">{submission.reviewerAssigned.email}</div>
                
                {submission.reviewerAssigned.specialization && submission.reviewerAssigned.specialization.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Specializations
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {submission.reviewerAssigned.specialization.map((spec, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold capitalize border border-purple-200">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">Active Reviews:</span>
                  <span className="font-bold text-gray-900 bg-purple-100 px-2 py-0.5 rounded">
                    {submission.reviewerAssigned.activeReviews || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Section */}
      {submission.rejectionReason && (
        <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500 animate-scale-in">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <FaBan className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Rejection Notice
            </h3>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <p className="text-gray-700 leading-relaxed text-[15px]">{submission.rejectionReason}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetailsCard;