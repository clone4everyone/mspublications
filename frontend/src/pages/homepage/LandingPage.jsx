import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaGreaterThan, FaCheckCircle, FaShieldAlt, FaRocket, FaUsers, FaGlobe } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../utils/api';
const benefits = [
  { icon: FaCheckCircle, text: "Rigorous peer-review process ensuring quality" },
  { icon: FaShieldAlt, text: "Fast publication with transparent editorial handling" },
  { icon: FaRocket, text: "Global visibility and indexing" },
  { icon: FaUsers, text: "Open access to maximize readership" },
  { icon: FaGlobe, text: "No article processing charges (APC) for authors" }
];

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

const AnimatedSection = ({ children, className = "", direction = "left" }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  const animationClass = direction === "left" 
    ? "translate-x-[-100px] opacity-0" 
    : "translate-x-[100px] opacity-0";
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : animationClass
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden font-inria">
        <img
          src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767785108/hero-section_mc81n7.png'
          alt="Cloud background"
          className="absolute inset-0 w-full h-full object-cover z-0 blur-[2px]"
        />
        <div className="absolute inset-0 bg-[#00000099] z-0" />
        
        <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[90px] pt-12 sm:pt-16 md:pt-20 lg:pt-[80px] pb-20 md:pb-24 lg:pb-[125px] flex items-center justify-between min-h-[calc(100vh-80px)]">
          <div className="max-w-full lg:max-w-[650px] xl:max-w-[916px] text-white z-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight sm:leading-[50px] md:leading-[60px] lg:leading-[90px]">
              A Trusted Journal Partner
            </h3>
            <h1 className='font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-tight sm:leading-[60px] md:leading-[70px]'>
              International
            </h1>
            <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight sm:leading-[50px] md:leading-[65px] lg:leading-[85px] mt-4 sm:mt-5 md:mt-6">
              Journal of Pharmacological &
              <br/>
              Pharmaceutical Innovations.
            </h3>
          </div>
        </section>
      </div>

      {/* Welcome Section */}
      <div className='w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[90px] pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12 bg-[#F0F0FF]'>
        <div className='w-full rounded-3xl sm:rounded-[40px] lg:rounded-[50px] bg-gradient-to-br from-[#0257EE] to-[#013288] min-h-[600px] lg:h-screen flex flex-col lg:flex-row gap-4 sm:gap-5 py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 items-center'>
          <AnimatedSection direction="left" className='w-full lg:w-[50%] h-64 sm:h-80 md:h-96 lg:h-full'>
            <img 
              src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767788229/d98ca4e0083302c4d3897496f60e2101121dbbc7_sf3sv3.jpg' 
              className='w-full h-full rounded-3xl sm:rounded-[40px] lg:rounded-[50px] object-cover'
              alt="IJPPI"
            />
          </AnimatedSection>
          
          <AnimatedSection direction="right" className='flex flex-col gap-3 sm:gap-4 md:gap-5 text-white w-full lg:w-[50%] px-2 sm:px-4'>
            <p className='font-semibold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-tight'>
              Everything you need
            </p>
            <h2 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight sm:leading-[50px] md:leading-[65px] lg:leading-[85px]'>
              Welcome to IJPPI
            </h2>
            <p className='font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed sm:leading-[36px] md:leading-[42px] lg:leading-[48px]'>
              The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) is a peer-reviewed, open-access journal dedicated to advancing excellence and innovation in the fields of pharmacology and pharmaceutics.
            </p>
            <button className='border-2 rounded-xl sm:rounded-2xl flex items-center gap-1 w-40 sm:w-[186px] justify-between px-2 py-2 mt-3 sm:mt-4 md:mt-5 hover:bg-white hover:text-[#0257EE] transition-all duration-300'>
              <span className='font-normal text-base sm:text-[18px]'>Learn More</span>
              <span className='bg-white text-black rounded-full w-7 h-7 sm:w-[30px] sm:h-[30px] flex items-center justify-center'>
                <FaGreaterThan className="text-xs sm:text-sm" />
              </span>
            </button>
          </AnimatedSection>
        </div>

        {/* Features Section */}
        <div className='flex flex-col items-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 gap-6 sm:gap-8 md:gap-10 w-full'>
          <AnimatedSection direction="left">
            <h2 className='font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight text-center'>
              Features
            </h2>
          </AnimatedSection>
          
          <AnimatedSection direction="right">
            <p className='font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed sm:leading-[38px] md:leading-[44px] lg:leading-[49px] text-center px-4 max-w-4xl'>
              Pharmacological and toxicological investigations of active pharmaceutical ingredients (APIs), novel compounds, and their formulations are welcomed.
            </p>
          </AnimatedSection>
          
          <div className='w-full flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10'>
            <AnimatedSection direction="left" className='w-full lg:w-[549px] p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-3xl sm:rounded-[40px] flex flex-col gap-6 sm:gap-8 md:gap-10 mx-auto lg:mx-0'>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="76" viewBox="0 0 116 110" fill="none" className="sm:w-[100px] sm:h-[95px] md:w-[116px] md:h-[110px]">
                <g clipPath="url(#clip0_188_191)">
                  <path d="M83.3128 16.2791H85.1838C85.1838 15.6057 84.8153 14.9854 84.2215 14.6584L83.3128 16.2791ZM58.2323 2.4721L59.1408 0.851472C58.5758 0.540398 57.8886 0.540394 57.3236 0.851464L58.2323 2.4721ZM83.3128 43.8929L84.2215 45.5135C84.8153 45.1866 85.1838 44.5662 85.1838 43.8929H83.3128ZM58.2323 57.6999L57.3236 59.3205C57.8886 59.6316 58.5758 59.6316 59.1408 59.3205L58.2323 57.6999ZM33.1511 43.8929H31.2801C31.2801 44.5662 31.6485 45.1866 32.2425 45.5136L33.1511 43.8929ZM33.1511 16.2791L32.2425 14.6584C31.6485 14.9854 31.2801 15.6057 31.2801 16.2791H33.1511ZM52.6563 65.9841H54.5272C54.5272 65.3109 54.1588 64.6906 53.5648 64.3635L52.6563 65.9841ZM27.5756 52.1773L28.4842 50.5566C27.9192 50.2455 27.2321 50.2455 26.667 50.5566L27.5756 52.1773ZM52.6563 93.5981L53.5648 95.2187C54.1588 94.8916 54.5272 94.2713 54.5272 93.5981H52.6563ZM27.5756 107.405L26.667 109.026C27.2321 109.337 27.9192 109.337 28.4842 109.026L27.5756 107.405ZM2.4945 93.5981H0.623535C0.623535 94.2713 0.991916 94.8917 1.58589 95.2187L2.4945 93.5981ZM2.4945 65.9841L1.58589 64.3635C0.991918 64.6904 0.623535 65.3109 0.623535 65.9841H2.4945ZM88.8837 52.1774L89.7922 50.5567C89.2272 50.2456 88.5401 50.2456 87.975 50.5567L88.8837 52.1774ZM113.964 65.9842H115.835C115.835 65.311 115.467 64.6907 114.873 64.3637L113.964 65.9842ZM63.8025 65.9842L62.894 64.3637C62.3 64.6907 61.9315 65.311 61.9315 65.9842H63.8025ZM63.8025 93.5982H61.9315C61.9315 94.2714 62.3 94.8919 62.894 95.2188L63.8025 93.5982ZM88.8837 107.405L87.975 109.026C88.5401 109.337 89.2272 109.337 89.7922 109.026L88.8837 107.405ZM113.964 93.5982L114.873 95.2188C115.467 94.8919 115.835 94.2714 115.835 93.5982H113.964ZM84.2215 14.6584L59.1408 0.851472L57.3236 4.09272L82.4042 17.8997L84.2215 14.6584ZM85.1838 43.8929V16.2791H81.4419V43.8929H85.1838ZM59.1408 59.3205L84.2215 45.5135L82.4042 42.2723L57.3236 56.0793L59.1408 59.3205ZM32.2425 45.5136L57.3236 59.3205L59.1408 56.0793L34.0597 42.2723L32.2425 45.5136ZM31.2801 16.2791V43.8929H35.022V16.2791H31.2801ZM57.3236 0.851464L32.2425 14.6584L34.0597 17.8997L59.1408 4.09273L57.3236 0.851464ZM53.5648 64.3635L28.4842 50.5566L26.667 53.7978L51.7476 67.6048L53.5648 64.3635ZM54.5272 93.5981V65.9841H50.7853V93.5981H54.5272ZM28.4842 109.026L53.5648 95.2187L51.7476 91.9774L26.667 105.784L28.4842 109.026ZM1.58589 95.2187L26.667 109.026L28.4842 105.784L3.40312 91.9774L1.58589 95.2187ZM0.623535 65.9841V93.5981H4.36547V65.9841H0.623535ZM26.667 50.5566L1.58589 64.3635L3.40312 67.6048L28.4842 53.7978L26.667 50.5566ZM87.975 53.798L113.056 67.6049L114.873 64.3637L89.7922 50.5567L87.975 53.798ZM64.7112 67.6049L89.7922 53.798L87.975 50.5567L62.894 64.3637L64.7112 67.6049ZM65.6735 93.5982V65.9842H61.9315V93.5982H65.6735ZM89.7922 105.784L64.7112 91.9775L62.894 95.2188L87.975 109.026L89.7922 105.784ZM113.056 91.9775L87.975 105.784L89.7922 109.026L114.873 95.2188L113.056 91.9775ZM112.093 65.9842V93.5982H115.835V65.9842H112.093Z" fill="#020F19" fillOpacity="0.7"/>
                </g>
                <defs>
                  <clipPath id="clip0_188_191">
                    <rect width="116" height="110" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <h2 className='font-semibold text-xl sm:text-2xl md:text-[30px] leading-tight'>
                IJPPI is dedicated to
              </h2>
              {[
                "Publishing original research articles, review papers, case studies, and short communications.",
                "Encouraging interdisciplinary collaboration in pharmaceutical sciences",
                "Promoting ethical research and adherence to international standards.",
                "Providing free access to knowledge through our open-access policy."
              ].map((text, idx) => (
                <p key={idx} className='flex gap-2 sm:gap-3 items-start'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-1">
                    <g clipPath="url(#clip0_188_182)">
                      <path d="M10.0002 0.833496C3.57516 0.833496 0.833496 3.57516 0.833496 10.0002C0.833496 16.4252 3.57516 19.1668 10.0002 19.1668C16.4252 19.1668 19.1668 16.4252 19.1668 10.0002C19.1668 3.57516 16.4252 0.833496 10.0002 0.833496ZM14.421 7.94933C13.3277 9.66016 11.771 11.8043 9.42016 13.2152C9.15016 13.3777 8.811 13.3735 8.54516 13.2043C7.2785 12.4018 6.32766 11.5418 5.55016 10.4977C5.27516 10.1285 5.35183 9.60683 5.721 9.33183C6.08933 9.05683 6.61183 9.13433 6.886 9.50266C7.44766 10.2568 8.126 10.9018 8.99933 11.5068C10.7993 10.2902 12.036 8.58433 13.0152 7.05183C13.2643 6.6635 13.7793 6.55016 14.166 6.7985C14.5543 7.04683 14.6685 7.56183 14.421 7.94933Z" fill="#0257EE"/>
                    </g>
                  </svg>
                  <span className='font-normal text-sm sm:text-base md:text-[18px] leading-relaxed'>{text}</span>
                </p>
              ))}
              <button className='border-2 border-black rounded-xl sm:rounded-2xl flex items-center gap-1 w-40 sm:w-[186px] justify-between px-2 py-2 mt-3 sm:mt-4 md:mt-5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300'>
                <span className='font-normal text-base sm:text-[18px]'>Learn More</span>
                <span className='bg-blue-500 text-white rounded-full w-7 h-7 sm:w-[30px] sm:h-[30px] flex items-center justify-center'>
                  <FaGreaterThan className="text-xs sm:text-sm" />
                </span>
              </button>
            </AnimatedSection>

            <AnimatedSection direction="right" className='w-full lg:w-[549px] p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-3xl sm:rounded-[40px] flex flex-col gap-6 sm:gap-8 md:gap-10 mx-auto lg:mx-0'>
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 103 103" fill="none" className="sm:w-[90px] sm:h-[90px] md:w-[103px] md:h-[103px]">
                <g clipPath="url(#clip0_188_136)">
                  <path d="M51.5 51.5H66.6796L99.4894 18.3168C103.674 14.1325 103.674 7.32587 99.4894 3.14579C95.451 -0.905542 88.3912 -0.918417 84.3098 3.15437L51.5 36.3375V51.5ZM55.7917 38.0971L87.3526 6.17571C89.7817 3.74662 94.0261 3.74662 96.4552 6.17571C98.9658 8.68633 98.9658 12.7677 96.4466 15.2869L64.8857 47.2083H55.7917V38.0971ZM85.8333 77.25V44.3329L81.5417 48.6761V77.25H42.9167V90.125C42.9167 94.8587 39.067 98.7083 34.3333 98.7083C29.5996 98.7083 25.75 94.8587 25.75 90.125V12.875C25.75 9.56612 24.4582 6.57483 22.4025 4.29167H71.1129L75.1385 0.218875C74.4261 0.0944167 73.7051 0 72.9583 0H12.875C5.77658 0 0 5.77658 0 12.875V25.75H21.4583V90.125C21.4583 97.2234 27.2349 103 34.3333 103H90.125C97.2234 103 103 97.2234 103 90.125V77.25H85.8333ZM21.4583 21.4583H4.29167V12.875C4.29167 8.14129 8.14129 4.29167 12.875 4.29167C17.6087 4.29167 21.4583 8.14129 21.4583 12.875V21.4583ZM98.7083 90.125C98.7083 94.8587 94.8587 98.7083 90.125 98.7083H43.9209C45.9637 96.4295 47.2083 93.421 47.2083 90.125V81.5417H98.7083V90.125Z" fill="#020F19" fillOpacity="0.7"/>
                </g>
                <defs>
                  <clipPath id="clip0_188_136">
                    <rect width="103" height="103" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <h2 className='font-semibold text-xl sm:text-2xl md:text-[30px] leading-tight'>
                IJPPI welcomes manuscripts
              </h2>
              {[
                "Publishing original research articles, review papers, case studies, and short communications.",
                "Encouraging interdisciplinary collaboration in pharmaceutical sciences",
                "Promoting ethical research and adherence to international standards.",
                "Providing free access to knowledge through our open-access policy."
              ].map((text, idx) => (
                <p key={idx} className='flex gap-2 sm:gap-3 items-start'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-1">
                    <g clipPath="url(#clip0_188_182)">
                      <path d="M10.0002 0.833496C3.57516 0.833496 0.833496 3.57516 0.833496 10.0002C0.833496 16.4252 3.57516 19.1668 10.0002 19.1668C16.4252 19.1668 19.1668 16.4252 19.1668 10.0002C19.1668 3.57516 16.4252 0.833496 10.0002 0.833496ZM14.421 7.94933C13.3277 9.66016 11.771 11.8043 9.42016 13.2152C9.15016 13.3777 8.811 13.3735 8.54516 13.2043C7.2785 12.4018 6.32766 11.5418 5.55016 10.4977C5.27516 10.1285 5.35183 9.60683 5.721 9.33183C6.08933 9.05683 6.61183 9.13433 6.886 9.50266C7.44766 10.2568 8.126 10.9018 8.99933 11.5068C10.7993 10.2902 12.036 8.58433 13.0152 7.05183C13.2643 6.6635 13.7793 6.55016 14.166 6.7985C14.5543 7.04683 14.6685 7.56183 14.421 7.94933Z" fill="#0257EE"/>
                    </g>
                  </svg>
                  <span className='font-normal text-sm sm:text-base md:text-[18px] leading-relaxed'>{text}</span>
                </p>
              ))}
              <button className='bg-blue-600 rounded-xl sm:rounded-2xl flex items-center gap-1 w-40 sm:w-[186px] justify-between px-2 py-2 mt-3 sm:mt-4 md:mt-5 hover:bg-blue-700 transition-all duration-300'>
                <span className='font-normal text-base sm:text-[18px] text-white'>Learn More</span>
                <span className='bg-white text-black rounded-full w-7 h-7 sm:w-[30px] sm:h-[30px] flex items-center justify-center'>
                  <FaGreaterThan className="text-xs sm:text-sm" />
                </span>
              </button>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Why Publish Section */}
      <div className="bg-white flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="w-full bg-white rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-0">
            <AnimatedSection direction="left" className="relative flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[90px]">
              <div className="relative w-full">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
                  alt="Professional working"
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-6 sm:border-t-8 border-t-transparent border-l-8 sm:border-l-12 border-l-gray-800 border-b-6 sm:border-b-8 border-b-transparent ml-1"></div>
                  </button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
                Why Publish with IJPPI?
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-[#0257EE] to-[#013288] text-white rounded-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex-shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-xs sm:text-sm md:text-sm font-medium leading-snug">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}