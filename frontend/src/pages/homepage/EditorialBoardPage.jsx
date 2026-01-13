import { useEffect, useRef, useState } from 'react';

export const EditorialBoardPage = ({ journal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

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

        {/* Main Content Card */}
        <div className='w-full max-w-[1400px] bg-white flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 items-center justify-center lg:justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 card-shadow rounded-lg'>
          
          {/* Image Section with Lazy Loading */}
          {/* <div 
            ref={imageRef}
            className='lazy-element lazy-image w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[324px] h-[320px] sm:h-[340px] md:h-[360px] lg:h-[368px] bg-[#F0F1F3] rounded-[10px] overflow-hidden flex-shrink-0'
          >
            <img 
              src="https://via.placeholder.com/324x368/F0F1F3/666666?text=Editor" 
              alt="Editor"
              className='w-full h-full object-cover'
            />
          </div> */}

          {/* Content Section with Lazy Loading */}
          <div 
            ref={contentRef}
            className='lazy-element lazy-content w-full lg:max-w-[536px] xl:max-w-[600px] flex flex-col gap-3 sm:gap-4 md:gap-5'
          >
            {/* Editor Info */}
            <div>
              <ul className='font-[600] font-sans text-[16px] xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-[140%] sm:leading-[150%] md:leading-[50px] space-y-1 sm:space-y-2'>
                <li className='text-[#0461F0]'>Editor-in-Chief</li>
                
              </ul>
              <div className='font-[600] font-sans text-[16px] xs:text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]  sm:leading-[150%] '>
                <a href='https://orcid.org/0009-0004-4660-5504' className='underline'>Dr. Robindra Kumar Pandit</a>
                <p className='text-[14px] xs:text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-gray-700'>
                  Lovely Professional University, Jalandhar, Punjab, India.
                </p>
                <p className='text-[13px] xs:text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-[#0461F0] break-all'>
                  Email: editor.ijppi@mspublication.com
                </p>
              </div>
            </div>

            {/* Description Text */}
           
          </div>
        </div>
      </div>
    </>
  );
};