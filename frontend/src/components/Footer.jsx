import { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'
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

const Footer = ({onNavigate}) => {
  const [footerRef, footerVisible] = useScrollAnimation();
  const [bottomRef, bottomVisible] = useScrollAnimation();
const navigate=useNavigate();
const peerReview = () => {
    // 1. Change page
    onNavigate("about");

    // 2. Wait for page render, then scroll
    setTimeout(() => {
      const section = document.getElementById("peerReview");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  return (
    <>
      <div 
        ref={footerRef}
        className='w-full  bg-[#233B4E] relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[101px] pt-12 sm:pt-16 lg:pt-[50px] pb-12 sm:pb-16 lg:pb-10 flex flex-col lg:flex-row justify-between gap-8 lg:gap-12'

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
            
            {/* LinkedIn */}
            <div className='w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] md:w-[35px] md:h-[35px] cursor-pointer hover:scale-110 transition-transform duration-300' onClick={()=>{window.open('https://www.instagram.com/maxosmithpublications/','_blank')}}>
             <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
<path d="M17.5 0C7.83563 0 0 7.83563 0 17.5C0 27.1644 7.83563 35 17.5 35C27.1644 35 35 27.1644 35 17.5C35 7.83563 27.1644 0 17.5 0ZM28.6373 22.1521C28.5833 23.3581 28.3908 24.1821 28.1108 24.9025C27.8206 25.6477 27.4327 26.2806 26.8027 26.9106C26.1727 27.5406 25.5398 27.9285 24.796 28.2173C24.0756 28.4973 23.2502 28.6883 22.0442 28.7437C20.8352 28.7992 20.4488 28.8123 17.3702 28.8123C14.2917 28.8123 13.9067 28.7992 12.6977 28.7437C11.4917 28.6883 10.6677 28.4973 9.94583 28.2173C9.20063 27.9285 8.56917 27.5392 7.93771 26.9106C7.30771 26.2806 6.91979 25.6477 6.62958 24.9025C6.34958 24.1821 6.15854 23.3581 6.10313 22.1521C6.04771 20.9431 6.03458 20.5567 6.03458 17.4781C6.03458 14.3996 6.04771 14.0146 6.10313 12.8056C6.15854 11.5996 6.34958 10.7756 6.62958 10.0538C6.91979 9.30854 7.30771 8.67708 7.93771 8.04708C8.56771 7.41708 9.20063 7.02917 9.94583 6.73896C10.6663 6.45896 11.4917 6.26792 12.6977 6.2125C13.9067 6.15708 14.2931 6.14396 17.3702 6.14396C20.4473 6.14396 20.8352 6.15708 22.0442 6.2125C23.2502 6.26646 24.0742 6.45896 24.796 6.73896C25.5413 7.02771 26.1727 7.41708 26.8027 8.04708C27.4327 8.67708 27.8206 9.31 28.1108 10.0538C28.3908 10.7742 28.5819 11.5996 28.6373 12.8056C28.6927 14.0146 28.7058 14.3996 28.7058 17.4781C28.7058 20.5567 28.6927 20.9417 28.6373 22.1521ZM26.2077 10.7946C26.0021 10.2652 25.7571 9.8875 25.359 9.49083C24.9623 9.09417 24.5846 8.84771 24.0552 8.64208C23.6556 8.4875 23.0563 8.30229 21.9508 8.25271C20.755 8.19729 20.3963 8.18708 17.3702 8.18708C14.3442 8.18708 13.9854 8.19875 12.7896 8.25271C11.6856 8.30229 11.0848 8.4875 10.6852 8.64208C10.1558 8.84771 9.77813 9.09271 9.38146 9.49083C8.98479 9.8875 8.73833 10.2652 8.53271 10.7946C8.37813 11.1942 8.19292 11.7935 8.14333 12.899C8.08792 14.0933 8.07771 14.4521 8.07771 17.4796C8.07771 20.5071 8.08938 20.8644 8.14333 22.0602C8.19438 23.1642 8.37813 23.765 8.53271 24.1646C8.73833 24.694 8.98333 25.0717 9.38146 25.4683C9.77813 25.865 10.1558 26.11 10.6852 26.3156C11.0848 26.4717 11.6842 26.6554 12.7896 26.7065C13.984 26.7619 14.3427 26.7721 17.3702 26.7721C20.3977 26.7721 20.7565 26.7604 21.9508 26.7065C23.0563 26.6554 23.6556 26.4717 24.0552 26.3156C24.5846 26.11 24.9623 25.865 25.359 25.4683C25.7556 25.0717 26.0021 24.694 26.2077 24.1646C26.3623 23.765 26.5475 23.1656 26.5971 22.0602C26.6525 20.8644 26.6642 20.5056 26.6642 17.4796C26.6642 14.4535 26.6525 14.0948 26.5971 12.899C26.546 11.7935 26.3623 11.1942 26.2077 10.7946ZM17.3717 23.2983C14.1575 23.2983 11.5515 20.6923 11.5515 17.4781C11.5515 14.264 14.1575 11.6579 17.3717 11.6579C20.5858 11.6579 23.1919 14.264 23.1919 17.4781C23.1919 20.6923 20.5858 23.2983 17.3717 23.2983ZM23.4223 12.7881C22.6713 12.7881 22.0617 12.18 22.0617 11.429C22.0617 10.6779 22.6698 10.0683 23.4223 10.0683C24.1748 10.0683 24.7829 10.6779 24.7829 11.429C24.7829 12.18 24.1733 12.7881 23.4223 12.7881Z" fill="white"/>
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
            <li className='cursor-pointer hover:text-white transition-colors duration-300' onClick={()=>{window.open('https://mspublication.com/publicationethics.html','_blank')}}>
              Publication Ethics
            </li>
            <li className='cursor-pointer hover:text-white transition-colors duration-300' onClick={()=>{window.open('https://mspublication.com/archivalpolicy.html','_blank')}}>
              Archival Policy
            </li>
            <li className='cursor-pointer hover:text-white transition-colors duration-300' onClick={()=>{peerReview()}}>
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

        <a className='text-white text-[12px] sm:text-[13px] md:text-[14px] leading-[34px] text-center sm:text-right underline hover:cursor-pointer' onClick={()=>{window.open('https://beingdiplomatic.com/','_blank')}}>
          Developed by Being Diplomatic
        </a>
      </div>
    </>
  );
}

export default Footer;