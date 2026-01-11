import { useEffect, useRef, useState } from 'react';

// Reusable CheckIcon Component
const CheckIcon = ({ className = "w-7 h-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 28 28" fill="none">
    <path d="M27.8297 27.0037L24.01 23.184C25.0437 21.9637 25.6678 20.3863 25.6678 18.6667C25.6678 14.8062 22.5283 11.6667 18.6678 11.6667C14.8073 11.6667 11.6678 14.8062 11.6678 18.6667C11.6678 22.5272 14.8073 25.6667 18.6678 25.6667C20.3887 25.6667 21.966 25.0425 23.1852 24.0088L27.0048 27.8285C27.1192 27.9428 27.2685 27.9988 27.4178 27.9988C27.5672 27.9988 27.7165 27.9417 27.8308 27.8285C28.0583 27.601 28.0572 27.2312 27.8297 27.0037ZM18.6667 24.5C15.4502 24.5 12.8333 21.8832 12.8333 18.6667C12.8333 15.4502 15.4502 12.8333 18.6667 12.8333C21.8832 12.8333 24.5 15.4502 24.5 18.6667C24.5 21.8832 21.8832 24.5 18.6667 24.5ZM13.4167 26.8333H5.25C2.99833 26.8333 1.16667 25.0017 1.16667 22.75V5.25C1.16667 2.99833 2.99833 1.16667 5.25 1.16667H11.6842C12.0738 1.16667 12.4588 1.20167 12.8333 1.26817V7.58333C12.8333 9.191 14.1423 10.5 15.75 10.5H22.5318C22.7115 10.5 22.8818 10.4172 22.9927 10.2748C23.1035 10.1325 23.1408 9.947 23.0965 9.772C22.7593 8.45367 22.0733 7.2485 21.1108 6.28717L17.045 2.22133C15.6123 0.788667 13.7083 0 11.683 0H5.24883C2.3555 0 0 2.3555 0 5.25V22.75C0 25.6445 2.3555 28 5.25 28H13.4167C13.7387 28 14 27.7387 14 27.4167C14 27.0947 13.7387 26.8333 13.4167 26.8333ZM14 1.596C14.8237 1.91333 15.5785 2.40333 16.2213 3.04617L20.2872 7.112C20.9195 7.74433 21.4118 8.50267 21.7338 9.33333H15.75C14.7852 9.33333 14 8.54817 14 7.58333V1.596ZM11.0833 12.8333H5.25C4.928 12.8333 4.66667 12.572 4.66667 12.25C4.66667 11.928 4.928 11.6667 5.25 11.6667H11.0833C11.4053 11.6667 11.6667 11.928 11.6667 12.25C11.6667 12.572 11.4053 12.8333 11.0833 12.8333ZM4.66667 16.9167C4.66667 16.5947 4.928 16.3333 5.25 16.3333H8.75C9.072 16.3333 9.33333 16.5947 9.33333 16.9167C9.33333 17.2387 9.072 17.5 8.75 17.5H5.25C4.928 17.5 4.66667 17.2387 4.66667 16.9167ZM4.66667 21.5833C4.66667 21.2613 4.928 21 5.25 21H9.33333C9.65533 21 9.91667 21.2613 9.91667 21.5833C9.91667 21.9053 9.65533 22.1667 9.33333 22.1667H5.25C4.928 22.1667 4.66667 21.9053 4.66667 21.5833ZM22.575 17.0835C22.799 17.3157 22.7932 17.6843 22.561 17.9083L19.4075 20.958C18.9875 21.3722 18.4333 21.581 17.878 21.581C17.3227 21.581 16.7708 21.3745 16.3473 20.9603L14.756 19.3912C14.5262 19.1648 14.5238 18.7962 14.7502 18.5663C14.9765 18.3365 15.3475 18.3353 15.575 18.5605L17.1652 20.1285C17.5583 20.5135 18.1977 20.5123 18.592 20.1238L21.749 17.0707C21.9812 16.8467 22.351 16.8537 22.5738 17.0847L22.575 17.0835Z" fill="#0257EE"/>
  </svg>
);

// Reusable CircleCheckIcon Component
const CircleCheckIcon = ({ className = "w-7 h-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 19 19" fill="none">
    <path d="M9.16667 0C2.74167 0 0 2.74167 0 9.16667C0 15.5917 2.74167 18.3333 9.16667 18.3333C15.5917 18.3333 18.3333 15.5917 18.3333 9.16667C18.3333 2.74167 15.5917 0 9.16667 0ZM13.5875 7.11583C12.4942 8.82667 10.9375 10.9708 8.58667 12.3817C8.31667 12.5442 7.9775 12.54 7.71167 12.3708C6.445 11.5683 5.49417 10.7083 4.71667 9.66417C4.44167 9.295 4.51833 8.77333 4.8875 8.49833C5.25583 8.22333 5.77833 8.30083 6.0525 8.66917C6.61417 9.42333 7.2925 10.0683 8.16583 10.6733C9.96583 9.45667 11.2025 7.75083 12.1817 6.21833C12.4308 5.83 12.9458 5.71667 13.3325 5.965C13.7208 6.21333 13.835 6.72833 13.5875 7.11583Z" fill="#0257EE"/>
  </svg>
);

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

// Feature Item Component with Icon
const FeatureItem = ({ text, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`flex gap-4 md:gap-5 items-start transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex-shrink-0 flex items-center justify-center rounded-[10px] border border-[#1946DA] bg-white'>
        <CheckIcon />
      </div>
      <p className='font-[400] text-base sm:text-lg md:text-[20px] leading-relaxed md:leading-[176%] text-[#233B4E]'>
        {text}
      </p>
    </div>
  );
};

// Scope Item Component
const ScopeItem = ({ title, description, delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`flex gap-3 sm:gap-4 items-start transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CircleCheckIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px] flex-shrink-0 mt-0.5" />
      <p className='font-medium text-base sm:text-lg leading-relaxed lg:leading-[27px] text-[#233B4E] flex-1'>
        <span className='font-bold text-black'>{title}</span> {description}
      </p>
    </div>
  );
};


export default function LandingPage() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [welcomeLeftRef, welcomeLeftVisible] = useScrollAnimation();
  const [welcomeRightRef, welcomeRightVisible] = useScrollAnimation();
  const [reviewLeftRef, reviewLeftVisible] = useScrollAnimation();
  const [reviewRightRef, reviewRightVisible] = useScrollAnimation();
  const [whyPublishLeftRef, whyPublishLeftVisible] = useScrollAnimation();
  const [whyPublishRightRef, whyPublishRightVisible] = useScrollAnimation();
const videoRef = useRef(null);
  const fullscreenVideoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
 const handleVideoClick = () => {
    setIsFullscreen(true);
    setTimeout(() => {
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.play();
      }
    }, 100);
  };

  const handleCloseFullscreen = () => {
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
    setIsFullscreen(false);
  };
  const scopeItems = [
    {
      title: 'Formulation Science:',
      description: 'Research on conventional dosage forms, pre-formulation studies, physical pharmacy, and the development and characterization of robust pharmaceutical systems'
    },
    {
      title: 'Advanced Drug Delivery:',
      description: 'Innovations in controlled, sustained, and stimuli-responsive delivery systems, including the use of smart polymers and novel modes of administration.'
    },
    {
      title: 'Nanomedicine:',
      description: 'Design and evaluation of nanocarriers, nanotechnology-based delivery platforms, and the study of ligand-carrier interactions for targeted therapy.'
    },
    {
      title: 'Biopharmaceutics & Pharmacokinetics:',
      description: 'Investigative studies on the absorption, distribution, metabolism, and excretion (ADME) profiles of drug products, including molecular drug design and prodrug strategies.'
    },
    {
      title: 'Analytical & Regulatory Science:',
      description: 'Development and validation of novel analytical methods for drug quantification and stability testing.'
    },
    {
      title: 'Pharmacology & Toxicology:',
      description: 'In-depth evaluation of the safety, biocompatibility, and therapeutic performance of Active Pharmaceutical Ingredients (APIs) and their finished formulations.'
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] md:min-h-screen overflow-hidden font-inria">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 blur-[5px]"
        >
          <source src='https://res.cloudinary.com/duhadnqmh/video/upload/v1768106710/2340-157269921_small_uqfw6w.mp4' type="video/mp4" />
          <img
            src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767785108/hero-section_mc81n7.png'
            alt="Cloud background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-[#233B4EB2] z-0" />
        
        <section 
          ref={heroRef}
          className={`relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-[90px] pt-12 sm:pt-16 md:pt-20 lg:pt-[80px] pb-20 md:pb-24 lg:pb-[125px] flex items-center justify-between min-h-[calc(100vh-80px)] transition-all duration-1000 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="max-w-full lg:max-w-[650px] xl:max-w-[916px] text-white z-20">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] leading-tight sm:leading-[50px] md:leading-[60px] lg:leading-[90px]">
              A Trusted Journal Partner
            </h3>
            <h1 className='font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[120px] leading-tight sm:leading-[60px] md:leading-[80px] lg:leading-[100px]'>
              International
            </h1>
            <h3 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-[42px] xl:text-[46px] leading-tight sm:leading-[40px] md:leading-[50px] lg:leading-[65px] xl:leading-[85px] mt-4 sm:mt-5 md:mt-6">
              Journal of Pharmacological &
              <br/>
              Pharmaceutical Innovations.
            </h3>
          </div>
        </section>
      </div>
     
      <div className='px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-[101px] w-full py-10 sm:py-16 md:py-20 lg:py-[101px] flex flex-col gap-12 md:gap-16 lg:gap-20'>
        {/* Welcome Section */}
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12'>
          <div 
            ref={welcomeLeftRef}
            className={`overflow-hidden rounded-3xl sm:rounded-[40px] lg:rounded-[66px] w-full lg:w-[45%] xl:w-[724px] h-[250px] sm:h-[300px] lg:h-[360.26px] transition-all duration-1000 ease-out ${
              welcomeLeftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767788229/d98ca4e0083302c4d3897496f60e2101121dbbc7_sf3sv3.jpg' className='w-full h-full object-cover'/>
          </div>

          <div 
            ref={welcomeRightRef}
            className={`flex flex-col gap-4 md:gap-6 w-full lg:w-[52%] xl:w-[890px] justify-center transition-all duration-1000 ease-out ${
              welcomeRightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <p className='text-2xl sm:text-3xl md:text-[42px] leading-tight md:leading-[85px] font-sans font-[600] text-[#1946DA]'>Welcome to IJPPI</p>
            <p className='font-[400] text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed md:leading-[48px] text-justify text-[#233B4E]'>
              The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) are a premier platform dedicated to the dissemination of high-impact research in the pharmaceutical sciences, with a 2026 focus on bridging the gap between conventional pharmaceutical technologies and next-generation delivery systems.
            </p>
          </div>
        </div>

        {/* Dedication Section */}
    <div className='w-full min-h-[400px] lg:h-[441px] relative overflow-hidden rounded-2xl lg:rounded-none max-[1880px]:bg-[#FAFAFA]'>
          <div className='relative z-50 px-6 sm:px-8 md:px-10 lg:px-[50px] py-8 sm:py-10 md:py-12 lg:py-[50px] bg-transparent w-full flex flex-col items-start gap-6 md:gap-8'>
            <p className='text-[#1946DA] text-xl sm:text-2xl md:text-[32px] leading-tight md:leading-[159%] font-[600] font-sans'>IJPPI is dedicated to</p>
            <div className='flex flex-col gap-3 md:gap-4'>
              <FeatureItem 
                text="Encouraging interdisciplinary collaboration in pharmaceutical sciences." 
                delay={0}
              />
              <FeatureItem 
                text="Promoting ethical research and adherence to international standards." 
                delay={100}
              />
              <FeatureItem 
                text="Providing free access to knowledge through our open-access policy." 
                delay={200}
              />
              <FeatureItem 
                text="Publishing original research articles, review papers, case studies, and short communications." 
                delay={300}
              />
            </div>
          </div>

          <div className='hidden min-[1880px]:block absolute left-0 top-0 bottom-0 z-0'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-[1070px] h-[442px]' viewBox="0 0 1070 442" fill="none">
              <path d="M814.724 235V25.5C814.724 11.6929 803.531 0.5 789.724 0.5H25.5C11.6929 0.5 0.5 11.6929 0.5 25.5V416.5C0.5 430.307 11.6929 441.5 25.5 441.5H1044.5C1058.31 441.5 1069.5 430.307 1069.5 416.5V285C1069.5 271.193 1058.31 260 1044.5 260H839.724C825.917 260 814.724 248.807 814.724 235Z" fill="#FAFAFA" stroke="#F1F1F1"/>
            </svg>
          </div>
          <div className='hidden min-[1880px]:block absolute right-0 top-0 bottom-0'>
            <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768033225/64c778ac569656c5151244cb_Union_1_1_rangxs.png' className="h-full w-auto"/>
          </div>
        </div>

        {/* Scope of Journal */}
        <div className='w-full overflow-hidden'>
          <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-9'>
            {/* Left Card */}
            <div 
              ref={reviewLeftRef}
              className={`w-full lg:w-[548px] lg:flex-shrink-0 flex flex-col gap-6 lg:gap-10 bg-[#FAFAFAAF] rounded-[20px] lg:rounded-none overflow-hidden lg:h-[726px] transition-all duration-1000 ease-out ${
                reviewLeftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className='w-full h-[250px] sm:h-[300px] lg:h-[379px] rounded-t-[20px] overflow-hidden'>
                <img 
                  src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767793334/157a3d9c3cec49425f58c05aba19fac0e28d59e1_aowyzg.jpg' 
                  className='w-full h-full object-cover' 
                  alt='Peer Review Process'
                />
              </div>
              <div className='w-full px-6 sm:px-8 lg:px-[30px] pb-6 lg:pb-0'>
                <p className='w-full font-semibold text-2xl sm:text-3xl lg:text-[32px] leading-tight lg:leading-[48px] text-[#1946DAE5] mb-4'>
                  Double-Blind Peer Review Process – IJPPI
                </p>
                <p className='w-full font-normal text-base sm:text-lg leading-relaxed lg:leading-[36px] text-[#020F19]'>
                  The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) follows a structured double-blind peer review process to ensure fairness, quality, and transparency in manuscript handling.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div 
              ref={reviewRightRef}
              className={`relative bg-[#FAFAFAAF] p-6 sm:p-8 lg:p-10 w-full flex flex-col gap-6 lg:gap-8 rounded-[20px] lg:rounded-none transition-all duration-1000 ease-out ${
                reviewRightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <p className='font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight lg:leading-[24px] text-[#1946DA]'>
                Scope of the Journal
              </p>
              
              <p className='w-full font-medium text-xl sm:text-2xl lg:text-[26px] leading-relaxed lg:leading-[159%] text-[#233B4E]'>
                This journal focuses on the intersection of pharmaceutical sciences and advanced material engineering to enhance therapeutic efficacy.
              </p>
              
              <div className='pl-0 sm:pl-3 flex flex-col gap-4 lg:gap-6'>
                {scopeItems.map((item, index) => (
                  <ScopeItem 
                    key={index}
                    title={item.title}
                    description={item.description}
                    delay={index * 100}
                  />
                ))}
              </div>

 <div className='w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[222px] lg:h-[201px] bg-[#D9D9D94D] absolute -top-[20px] sm:-top-[30px] lg:-top-[40px] -right-[30px] sm:-right-[45px] lg:-right-[60px] rounded-full'></div>
          
          <div className='w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[193px] lg:h-[193px] bg-[#D9D9D94D] absolute top-[30px] sm:top-[45px] lg:top-[60px] right-[30px] sm:right-[45px] lg:right-[60px] rounded-full'></div>
          
          <div className='w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] lg:w-[146px] lg:h-[146px] bg-[#D9D9D94D] absolute top-[10px] sm:top-[15px] lg:top-[20px] right-[35%] sm:right-[40%] lg:right-[45%] rounded-full'></div>
            </div>
          </div>
        </div>
      </div>
   
      {/* Why Publish Section */}
      <div className='w-full bg-[#FAFAFA80] flex justify-center items-center py-12 sm:py-16 lg:py-20 xl:h-[669px] relative overflow-hidden'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-14 items-center px-4 sm:px-6 md:px-10 max-w-7xl'>
          <div 
            ref={whyPublishLeftRef}
            className={`w-full lg:w-[50%] xl:w-[689px] h-[300px] sm:h-[400px] lg:h-[529px] rounded-[50px] lg:rounded-[100px] overflow-hidden transition-all duration-1000 ease-out cursor-pointer relative group  z-50 ${
              whyPublishLeftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            onClick={handleVideoClick}
          >
            <video 
              ref={videoRef}
              className='w-full h-full object-cover'
              src='https://res.cloudinary.com/duhadnqmh/video/upload/v1768106710/2340-157269921_small_uqfw6w.mp4'
            />
            
            {/* Play button overlay */}
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#1946DA] ml-1' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z' />
                </svg>
              </div>
            </div>
          </div>
          
          <div 
            ref={whyPublishRightRef}
            className={`flex flex-col justify-start gap-8 lg:gap-16 w-full lg:w-[48%] transition-all duration-1000 ease-out ${
              whyPublishRightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <p className='text-2xl sm:text-3xl lg:text-[32px] text-[#1946DA] font-[600] leading-tight lg:leading-[24px]'>Why Publish with IJPPI?</p>
            <div className='flex flex-col gap-3 md:gap-4'>
              <FeatureItem 
                text="Double-Blind Peer Review for fair evaluation." 
                delay={0}
              />
              <FeatureItem 
                text="Open Access Policy ensuring global visibility." 
                delay={100}
              />
              <FeatureItem 
                text="Rapid Processing with timely publication." 
                delay={200}
              />
              <FeatureItem 
                text="Indexing and Abstracting opportunities in major databases." 
                delay={300}
              />
              <FeatureItem 
                text="DOI assignment for each published article." 
                delay={400}
              />
            </div>
          </div>
        </div>
        
        <div className='hidden lg:block absolute top-0 right-0 w-[200px] xl:w-auto'>
          <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768041008/466295069177_2_lo3mkv.png' className='w-full h-auto'/>
        </div>
        <div className='hidden lg:block absolute bottom-0 left-0 w-[300px] xl:w-[624px] h-auto xl:h-[613px]'>
          <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768041326/466295069177_1_csqtk7.png' className='w-full h-full object-contain'/>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className='fixed inset-0 z-50 bg-black flex items-center justify-center'>
          <button
            onClick={handleCloseFullscreen}
            className='absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300'
            aria-label='Close video'
          >
            <svg className='w-6 h-6 sm:w-8 sm:h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          
          <video
            ref={fullscreenVideoRef}
            className='w-full h-full object-contain'
            src='https://res.cloudinary.com/duhadnqmh/video/upload/v1768106710/2340-157269921_small_uqfw6w.mp4'
            controls
            autoPlay
          />
        </div>
      )}

      {/* Flow Chart Section */}
      <div className='w-full relative overflow-hidden py-12 sm:py-16 lg:py-20 flex justify-center items-center px-4 sm:px-6'>
        <div className='flex flex-col gap-6 sm:gap-8 lg:gap-10 items-center max-w-7xl'>
          <p className='font-[600] text-2xl sm:text-3xl lg:text-[42px] leading-tight lg:leading-[57.6px] text-[#1946DA] text-center px-4'>
            Flow Chart Representation of Peer Review
          </p>
          <div className='w-full max-w-[1282px]'>
            <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768043197/6f12501d76b5a33c4017cf8a8443eaf4cfb3eb74_tjguk1.png' className='w-full h-auto object-contain'/>
          </div>
        </div>
        
        <div className='w-full h-full opacity-[5%] absolute inset-0 pointer-events-none'>
          <img src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768041462/c6dcccc418c105b6d4e23dbb24a7a3cd6217d0a0_fryux6.png' className='object-cover w-full h-full'/>
        </div>
      </div>
    </div>
  );
}