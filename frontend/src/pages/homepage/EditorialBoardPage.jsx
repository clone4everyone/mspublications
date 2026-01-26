import { useEffect, useRef, useState } from 'react';

export const EditorialBoardPage = ({ journal, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
fetchReviewers();
    // Intersection Observer for lazy loading animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);
const fetchReviewers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/author/reviewers`);
      const data = await response.json();
      if (data.success) {
        setReviewers(data.data.reviewers);
      }
    } catch (error) {
      console.error('Error fetching reviewers:', error);
      toast.error('Failed to load editorial board members');
    } finally {
      setLoading(false);
    }
  };
  const groupedReviewers = {
    Associate: reviewers.filter(r => r.reviewerRole === 'Associate'),
    Assistant: reviewers.filter(r => r.reviewerRole === 'Assistant'),
    Editorial: reviewers.filter(r => r.reviewerRole === 'Editorial')
  };

  const roleLabels = {
    Associate: 'Associate Editors',
    Assistant: 'Assistant Editors',
    Editorial: 'Editorial Members'
  };

   return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .lazy-element {
          opacity: 0;
          transition: opacity 0.6s ease-in, transform 0.6s ease-in;
        }

        .lazy-element.visible {
          opacity: 1;
        }

        .lazy-image {
          opacity: 0;
          transform: translateX(-80px);
        }

        .lazy-image.visible {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .lazy-content {
          opacity: 0;
          transform: translateX(80px);
        }

        .lazy-content.visible {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .card-shadow {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 768px) {
          .lazy-image {
            transform: translateY(-50px);
          }
          
          .lazy-image.visible {
            animation: fadeInDown 0.8s ease-out forwards;
          }

          .lazy-content {
            transform: translateY(50px);
          }

          .lazy-content.visible {
            animation: fadeInDown 0.8s ease-out 0.3s forwards;
          }
        }
      `}</style>

      <div className='w-full min-h-screen bg-[#fefdfd] flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10'>
        {/* Header Section with Animation */}
        <h1 
          className={`font-poppins font-[700] text-[28px] xs:text-[32px] sm:text-[36px] md:text-[38px] lg:text-[40px] xl:text-[44px] text-[#0461F0] text-center leading-tight ${isVisible ? 'animate-fade-down' : 'opacity-0'}`}
        >
          Editorial Board
        </h1>

        {/* Editor-in-Chief Card */}
        <div className='w-full max-w-[1400px] bg-white flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 lg:p-10 xl:p-18 items-center justify-center lg:justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 card-shadow rounded-lg'>
          <div 
            ref={contentRef}
            className='lazy-element lazy-content w-full flex flex-col gap-3 sm:gap-4 md:gap-5'
          >
            <div>
              <ul className='font-[600] font-sans text-[16px] xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[140%] sm:leading-[150%] md:leading-[50px] space-y-1 sm:space-y-2'>
                <li className='text-[#0461F0]'>Editor-in-Chief</li>
              </ul>
              <div className='font-[600] font-sans text-[16px] xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] sm:leading-[150%]'>
                <a href='https://orcid.org/0009-0004-4660-5504' className='underline hover:text-[#0461F0] transition-colors'>
                  Dr. Robindra Kumar Pandit
                </a>
                <p className='text-[14px] xs:text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-700 font-normal'>
                  PhD, Department of Chemistry, Lovely Professional University, Jalandhar, Punjab, India.
                </p>
                <p className='text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-[#0461F0] break-all font-normal'>
                  Email: editor.ijppi@mspublication.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviewers Section */}
        {loading ? (
          <div className="w-full max-w-[1400px] bg-white p-8 card-shadow rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0461F0]"></div>
          </div>
        ) : (
          <div className='w-full max-w-[1400px] flex flex-col gap-6 sm:gap-8'>
            {/* Associate Editors */}
            {groupedReviewers.Associate.length > 0 && (
              <div className='bg-white p-4 sm:p-6 md:p-8 lg:p-10 card-shadow rounded-lg'>
                <h2 className='font-poppins font-[700] text-[20px] xs:text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] text-[#0461F0] mb-4 sm:mb-6'>
                  {roleLabels.Associate}
                </h2>
                <div className='flex flex-col gap-4 sm:gap-5'>
                  {groupedReviewers.Associate.map((reviewer, index) => (
                    <div key={reviewer._id} className='border-b border-gray-200 last:border-0 pb-4 last:pb-0'>
                      <div className='font-[600] text-[15px] xs:text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px]'>
                        {reviewer.orcid ? (
                          <a 
                            href={`https://orcid.org/${reviewer.orcid}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='underline hover:text-[#0461F0] transition-colors'
                          >
                            {reviewer.prefix && `${reviewer.prefix} `}{reviewer.firstName} {reviewer.lastName}
                          </a>
                        ) : (
                          <span>{reviewer.prefix && `${reviewer.prefix} `}{reviewer.firstName} {reviewer.lastName}</span>
                        )}
                      </div>
                      {reviewer.affiliation && (
                        <p className='text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] text-gray-700 mt-1'>
                         {reviewer.post},{reviewer.department}, {reviewer.affiliation}
                        </p>
                      )}
                      <p className='text-[12px] xs:text-[13px] sm:text-[14px] md:text-[15px] text-[#0461F0] mt-1 break-all'>
                        Email: {reviewer.email}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assistant Editors */}
            {groupedReviewers.Assistant.length > 0 && (
              <div className='bg-white p-4 sm:p-6 md:p-8 lg:p-10 card-shadow rounded-lg'>
                <h2 className='font-poppins font-[700] text-[20px] xs:text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] text-[#0461F0] mb-4 sm:mb-6'>
                  {roleLabels.Assistant}
                </h2>
                <div className='flex flex-col gap-4 sm:gap-5'>
                  {groupedReviewers.Assistant.map((reviewer, index) => (
                    <div key={reviewer._id} className='border-b border-gray-200 last:border-0 pb-4 last:pb-0'>
                      <div className='font-[600] text-[15px] xs:text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px]'>
                        {reviewer.orcid ? (
                          <a 
                            href={`https://orcid.org/${reviewer.orcid}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='underline hover:text-[#0461F0] transition-colors'
                          >
                            {reviewer.prefix && `${reviewer.prefix} `}{reviewer.firstName} {reviewer.lastName}
                          </a>
                        ) : (
                          <span>{reviewer.prefix && `${reviewer.prefix} `}{reviewer.firstName} {reviewer.lastName}</span>
                        )}
                      </div>
                      {reviewer.affiliation && (
                        <p className='text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] text-gray-700 mt-1'>
                         {reviewer.post},{reviewer.department}, {reviewer.affiliation}
                        </p>
                      )}
                      <p className='text-[12px] xs:text-[13px] sm:text-[14px] md:text-[15px] text-[#0461F0] mt-1 break-all'>
                        Email: {reviewer.email}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Editorial Members */}
            {groupedReviewers.Editorial.length > 0 && (
              <div className='bg-white p-4 sm:p-6 md:p-8 lg:p-10 card-shadow rounded-lg'>
                <h2 className='font-poppins font-[700] text-[20px] xs:text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] text-[#0461F0] mb-4 sm:mb-6'>
                  {roleLabels.Editorial}
                </h2>
                <div className='flex flex-col gap-4 sm:gap-5'>
                  {groupedReviewers.Editorial.map((reviewer, index) => (
                    <div key={reviewer._id} className='border-b border-gray-200 last:border-0 pb-4 last:pb-0'>
                      <div className='font-[600] text-[15px] xs:text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px]'>
                        {reviewer.orcid ? (
                          <a 
                            href={`https://orcid.org/${reviewer.orcid}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='underline hover:text-[#0461F0] transition-colors'
                          >
                            {reviewer.prefix && `${reviewer.prefix} `}{reviewer.firstName} {reviewer.lastName}
                          </a>
                        ) : (
                          <span>{reviewer.prefix && `${reviewer.prefix} `}{reviewer.firstName} {reviewer.lastName}</span>
                        )}
                      </div>
                      {reviewer.affiliation && (
                        <p className='text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] text-gray-700 mt-1'>
                         {reviewer.post},{reviewer.department}, {reviewer.affiliation}
                        </p>
                      )}
                      <p className='text-[12px] xs:text-[13px] sm:text-[14px] md:text-[15px] text-[#0461F0] mt-1 break-all'>
                        Email: {reviewer.email}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No reviewers message */}
            {reviewers.length === 0 && (
              <div className='bg-white p-8 card-shadow rounded-lg text-center'>
                <p className='text-gray-600 text-[16px]'>No editorial board members found.</p>
              </div>
            )}
          </div>
        )}
        <button className='bg-gray-800 text-white p-5 rounded-md' onClick={()=>{onNavigate('RolesAndResponsibility'); window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
}}>Roles And Responsibility</button>
      </div>
    </>
  );

};