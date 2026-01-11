import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

const Footer = () => {
  const [footerRef, footerVisible] = useScrollAnimation();
  const [bottomRef, bottomVisible] = useScrollAnimation();

  return (
    <>
      <div 
        ref={footerRef}
        className='w-full min-h-[442px] bg-[#233B4E] relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[101px] pt-12 sm:pt-16 lg:pt-[70px] pb-12 sm:pb-16 lg:pb-20 flex flex-col lg:flex-row justify-between gap-8 lg:gap-12'
      >
        {/* Background Pattern */}
        <div className='w-full max-w-[910px] h-full absolute top-0 bottom-0 left-1/2 -translate-x-1/2 opacity-30 lg:opacity-100 pointer-events-none'>
          <img 
            src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768060140/footer-pattern_1_veaozm.png' 
            className='w-full h-full object-cover'
            alt='Footer Pattern'
          />
        </div>

        {/* Left Section - Logo and Description */}
        <div 
          className={`flex flex-col gap-6 sm:gap-8 relative z-10 transition-all duration-1000 ${
            footerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
        >
          <div className='w-[160px] sm:w-[180px] md:w-[219px] h-auto'>
            <img 
              src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768060140/1ee25ae99b34cc82eeb167d999a924a2db568996_ts2h6a.png' 
              className='w-full h-full object-contain'
              alt='Logo'
            />
          </div>
          
          <p className='font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[28px] sm:leading-[32px] md:leading-[34px] w-full max-w-[797px] text-white'>
            We publish a range of peer-reviewed journals covering fields such as pharmaceutical sciences, medical sciences, health sciences, engineering, and more. Our platform supports researchers in disseminating their findings effectively.
          </p>
          
          <p className='font-[600] text-[18px] sm:text-[19px] md:text-[20px] leading-[100%] text-white'>
            Follow Up
          </p>
          
          <div className='flex gap-4 sm:gap-5 md:gap-6'>
            {/* Facebook Icon */}
            <div className='w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px] cursor-pointer hover:scale-110 transition-transform duration-300' onClick={()=>{window.open('https://www.facebook.com/people/Maxosmith-Publications/pfbid0mNgtqVa9JEj4RforeUkqvAvW4pVxo3jqSThS6rSDMkNdLfNb7GXSCwCMa7Mv3Srxl/','_blank')}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 35 35" fill="none">
                <path d="M35 17.5C35 26.234 28.5921 33.4746 20.2271 34.7885V22.5925H24.2944L25.0688 17.5467H20.2271V14.2727C20.2271 12.8917 20.9037 11.5471 23.0708 11.5471H25.2715V7.25083C25.2715 7.25083 23.2735 6.90958 21.3646 6.90958C17.3775 6.90958 14.7729 9.32604 14.7729 13.6996V17.5452H10.341V22.591H14.7729V34.7871C6.40938 33.4717 0 26.2325 0 17.5C0 7.83563 7.83563 0 17.5 0C27.1644 0 35 7.83417 35 17.5Z" fill="white"/>
              </svg>
            </div>
            
            {/* LinkedIn Icon */}
            <div className='w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px] cursor-pointer hover:scale-110 transition-transform duration-300' onClick={()=>{window.open('https://www.linkedin.com/in/maxosmith-publications-ba0a133a4/','_blank')}}>
              <img 
                src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768063065/linkedin_1_jsfeyi.png' 
                className='w-full h-full object-cover'
                alt='LinkedIn'
              />
            </div>
            
            {/* Twitter/X Icon */}
            <div className='w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px] cursor-pointer hover:scale-110 transition-transform duration-300'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 35 35" fill="none">
                <path d="M17.5 0C7.83563 0 0 7.83563 0 17.5C0 27.1644 7.83563 35 17.5 35C27.1644 35 35 27.1644 35 17.5C35 7.83563 27.1644 0 17.5 0ZM21.9669 28.0467L16.3231 20.6748L9.87438 28.0467H6.28979L14.6504 18.4888L5.83333 6.95333H13.2154L18.3108 13.6923L24.2069 6.95333H27.7871L19.969 15.8871L29.1667 28.0452L21.9669 28.0467Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div 
          className={`flex flex-col gap-6 sm:gap-7 md:gap-9 w-full lg:w-[225px] text-white relative z-10 transition-all duration-1000 delay-200 ${
            footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <p className='font-[600] text-[18px] sm:text-[19px] md:text-[20px] leading-[100%]'>
            Quick Links
          </p>
          <ul className='list-disc pl-4 sm:pl-5 text-[#FFFFFFCC] font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[40px] sm:leading-[45px] md:leading-[50px]'>
            <li className='cursor-pointer hover:text-white transition-colors duration-300'>
              Publication Ethics
            </li>
            <li className='cursor-pointer hover:text-white transition-colors duration-300'>
              Archival Policy
            </li>
            <li className='cursor-pointer hover:text-white transition-colors duration-300'>
              Peer Review Process
            </li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div 
          className={`flex flex-col gap-6 sm:gap-7 md:gap-9 text-white relative z-10 transition-all duration-1000 delay-400 ${
            footerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
        >
          <p className='font-[600] text-[18px] sm:text-[19px] md:text-[20px] leading-[100%]'>
            Get in Touch
          </p>
          <div className='flex flex-col gap-3 sm:gap-4 text-[#FFFFFFCC] font-[400] text-[14px] sm:text-[15px] md:text-[16px] leading-[40px] sm:leading-[45px] md:leading-[50px]'>
            <p className='hover:text-white transition-colors duration-300'>
              Contact : +91 8273066581
            </p>
            <p className='hover:text-white transition-colors duration-300 break-all sm:break-normal'>
              Email : editor.ijppi@mspublication.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div 
        ref={bottomRef}
        className={`bg-[#112632] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[101px] h-auto sm:h-[56px] flex flex-col sm:flex-row justify-between items-center py-4 sm:py-0 gap-2 sm:gap-0 transition-all duration-1000 ${
          bottomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className='text-white text-[12px] sm:text-[13px] md:text-[14px] leading-[34px] text-center sm:text-left'>
          © 2025 All Rights Reserved
        </p>

        <p className='text-white text-[12px] sm:text-[13px] md:text-[14px] leading-[34px] text-center sm:text-right'>
          Designed & Developed by MS Publication
        </p>
      </div>
    </>
  );
}

export default Footer;