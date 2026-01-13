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
const FeatureItem = ({ text, delay = 0, svg }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`flex gap-4 md:gap-5 items-center transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex-shrink-0 flex items-center justify-center rounded-[10px] border border-[#1946DA] bg-white'>
       {svg}
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
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-tight sm:leading-relaxed md:leading-[50px] lg:leading-[60px] xl:leading-[90px]">
              A Trusted Journal Partner
            </h3>
            <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[120px] leading-tight sm:leading-snug md:leading-[60px] lg:leading-[80px] xl:leading-[100px]'>
              International
            </h1>
            <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[46px] leading-snug sm:leading-relaxed md:leading-[35px] lg:leading-[45px] xl:leading-[55px] 2xl:leading-[70px] mt-3 sm:mt-4 md:mt-5 lg:mt-6">
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
            className={`overflow-hidden rounded-3xl sm:rounded-[40px] lg:rounded-[46px] w-full lg:w-[45%] xl:w-[724px] h-[250px] sm:h-[300px] lg:h-[360.26px] transition-all duration-1000 ease-out ${
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
            <p className='text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[42px] leading-tight md:leading-relaxed lg:leading-[65px] xl:leading-[85px] font-sans font-[600] text-[#1946DA]'>Welcome to IJPPI</p>
            <p className='font-[400] text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] leading-relaxed md:leading-[32px] lg:leading-[40px] xl:leading-[48px] text-justify text-[#233B4E]'>
              The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) are a premier platform dedicated to the dissemination of high-impact research in the pharmaceutical sciences, with a 2026 focus on bridging the gap between conventional pharmaceutical technologies and next-generation delivery systems.
            </p>
          </div>
        </div>

        {/* Dedication Section */}
        <div className='w-full min-h-[400px] lg:h-[441px] relative overflow-hidden rounded-2xl lg:rounded-none max-[1880px]:bg-[#FAFAFA]'>
          <div className='relative z-50 px-6 sm:px-8 md:px-10 lg:px-[50px] py-8 sm:py-10 md:py-12 lg:py-[50px] bg-transparent w-full flex flex-col items-start gap-6 md:gap-8'>
            <p className='text-[#1946DA] text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] leading-tight md:leading-relaxed lg:leading-[159%] font-[600] font-sans'>IJPPI is dedicated to</p>
            <div className='flex flex-col gap-3 md:gap-4'>
              <FeatureItem 
                text="Encouraging interdisciplinary collaboration in pharmaceutical sciences." 
                delay={0}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5.99996 7C8.07496 7 8.99996 6.075 8.99996 4C8.99996 1.925 8.07496 1 5.99996 1C3.92496 1 2.99996 1.925 2.99996 4C2.99996 6.075 3.92496 7 5.99996 7ZM5.99996 2C7.51396 2 7.99996 2.486 7.99996 4C7.99996 5.514 7.51396 6 5.99996 6C4.48596 6 3.99996 5.514 3.99996 4C3.99996 2.486 4.48596 2 5.99996 2ZM16 7C18.075 7 19 6.075 19 4C19 1.925 18.075 1 16 1C13.925 1 13 1.925 13 4C13 6.075 13.925 7 16 7ZM16 2C17.514 2 18 2.486 18 4C18 5.514 17.514 6 16 6C14.486 6 14 5.514 14 4C14 2.486 14.486 2 16 2ZM7.99996 11C7.99996 13.075 8.92496 14 11 14C13.075 14 14 13.075 14 11C14 8.925 13.075 8 11 8C8.92496 8 7.99996 8.925 7.99996 11ZM11 9C12.514 9 13 9.486 13 11C13 12.514 12.514 13 11 13C9.48596 13 8.99996 12.514 8.99996 11C8.99996 9.486 9.48596 9 11 9ZM23 17.499C23 17.774 22.777 17.999 22.501 18L18 18.011V22.5C18 22.776 17.776 23 17.5 23C17.224 23 17 22.776 17 22.5V18.014L12.501 18.025H12.5C12.225 18.025 12 17.802 12 17.526C12 17.251 12.223 17.026 12.499 17.025L17 17.014V12.5C17 12.224 17.224 12 17.5 12C17.776 12 18 12.224 18 12.5V17.011L22.499 17C22.774 17 23 17.223 23 17.499ZM6.47896 9.011C6.32496 9.004 6.16496 9 5.99996 9C3.21096 9 2.12896 9.955 2.01096 12.523C1.99896 12.798 1.76196 13.013 1.48896 12.999C1.21296 12.986 0.999958 12.753 1.01196 12.477C1.15596 9.381 2.69396 8 5.99996 8C6.17996 8 6.35296 8.004 6.52096 8.011C6.79696 8.023 7.01096 8.256 6.99996 8.532C6.98896 8.808 6.73896 9.022 6.47896 9.011ZM16 8C19.307 8 20.845 9.381 20.988 12.477C21.001 12.753 20.787 12.987 20.511 12.999C20.238 13.014 20 12.799 19.989 12.523C19.87 9.955 18.789 9 16 9C15.835 9 15.675 9.004 15.521 9.011C15.268 9.021 15.012 8.809 15 8.532C14.988 8.255 15.203 8.022 15.479 8.011C15.647 8.004 15.82 8 16 8ZM12 15.532C11.988 15.808 11.734 16.022 11.479 16.011C11.325 16.004 11.165 16 11 16C8.21096 16 7.12896 16.955 7.01096 19.523C6.99896 19.791 6.77796 20 6.51196 20C6.22796 20 5.99796 19.762 6.01196 19.477C6.15596 16.381 7.69396 15 11 15C11.18 15 11.353 15.004 11.521 15.011C11.797 15.023 12.011 15.256 12 15.532Z" fill="#0257EE"/>
</svg>}
              />
              <FeatureItem 
                text="Promoting ethical research and adherence to international standards." 
                delay={100}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_17_170)">
<path d="M9 12C12.309 12 15 9.309 15 6C15 2.691 12.309 0 9 0C5.691 0 3 2.691 3 6C3 9.309 5.691 12 9 12ZM9 1C11.757 1 14 3.243 14 6C14 8.757 11.757 11 9 11C6.243 11 4 8.757 4 6C4 3.243 6.243 1 9 1ZM12.834 15.248L10.508 18.291C10.128 18.747 9.59 19 9.017 19C8.444 19 7.906 18.748 7.539 18.309L5.174 15.218C4.979 14.984 4.614 14.926 4.34 15.1C3.999 15.316 3.665 15.575 3.346 15.869C1.856 17.248 1 19.326 1 21.572V23.501C1 23.777 0.776 24.001 0.5 24.001C0.224 24.001 0 23.777 0 23.501V21.572C0 19.049 0.973 16.702 2.667 15.134C3.03 14.799 3.413 14.503 3.805 14.255C4.501 13.812 5.427 13.96 5.955 14.594L8.32 17.685C8.482 17.879 8.741 18 9.016 18C9.291 18 9.549 17.879 9.726 17.667L12.052 14.624C12.596 13.97 13.522 13.827 14.22 14.27C14.421 14.399 14.617 14.538 14.807 14.685C15.025 14.855 15.064 15.169 14.894 15.387C14.723 15.604 14.411 15.643 14.192 15.474C14.028 15.346 13.857 15.225 13.682 15.113C13.407 14.938 13.043 14.996 12.834 15.248ZM23.461 20.585L20 16.995V13H20.5C20.776 13 21 12.776 21 12.5C21 12.224 20.776 12 20.5 12H16.5C16.224 12 16 12.224 16 12.5C16 12.776 16.224 13 16.5 13H17V16.996L13.466 20.669C12.961 21.284 12.859 22.114 13.198 22.834C13.539 23.553 14.244 24 15.04 24H21.96C22.776 24 23.489 23.536 23.821 22.791C24.153 22.044 24.019 21.203 23.461 20.585ZM22.907 22.385C22.736 22.77 22.382 23 21.96 23H15.04C14.629 23 14.278 22.778 14.102 22.406C13.926 22.034 13.977 21.622 14.212 21.333L17.859 17.544C17.949 17.451 17.999 17.326 17.999 17.197V13H18.999V17.197C18.999 17.327 19.049 17.451 19.139 17.544L22.729 21.267C23.012 21.58 23.079 21.998 22.907 22.385Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_17_170">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
              />
              <FeatureItem 
                text="Providing free access to knowledge through our open-access policy." 
                delay={200}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_18_172)">
<path d="M2.501 3.98402C2.767 4.05302 3.041 3.89202 3.11 3.62402C3.507 2.07902 4.902 0.999023 6.5 0.999023H12.015C12.35 0.999023 12.678 1.03702 13 1.09502V6.49902C13 7.87702 14.121 8.99902 15.5 8.99902H20.965C20.983 9.16302 21 9.32802 21 9.49902C21 9.77502 21.224 9.99902 21.5 9.99902C21.776 9.99902 22 9.77502 22 9.49902C22 8.40602 21.692 7.39502 21.109 6.57402C20.829 6.17802 20.487 5.77902 20.095 5.38802L16.611 1.90302C15.382 0.675023 13.75 -0.000976562 12.014 -0.000976562H6.499C4.444 -0.000976562 2.652 1.38702 2.141 3.37402C2.072 3.64202 2.233 3.91502 2.501 3.98402ZM14 1.38002C14.704 1.65302 15.354 2.06202 15.904 2.61102L19.388 6.09702C19.741 6.44902 20.045 6.80502 20.294 7.15502C20.476 7.41202 20.614 7.69902 20.727 8.00102H15.5C14.673 8.00102 14 7.32802 14 6.50102V1.38002ZM16.5 12C16.776 12 17 12.224 17 12.5C17 12.776 16.776 13 16.5 13H11.5C11.224 13 11 12.776 11 12.5C11 12.224 11.224 12 11.5 12H16.5ZM23.268 12.732C22.293 11.757 20.707 11.757 19.733 12.732L13.026 19.439C12.365 20.1 12.001 20.979 12.001 21.914V23.5C12.001 23.776 12.225 24 12.501 24H14.087C15.023 24 15.901 23.636 16.562 22.975L23.269 16.268C24.239 15.339 24.239 13.662 23.269 12.733L23.268 12.732ZM22.561 15.561L15.854 22.268C15.382 22.74 14.754 23 14.086 23H13V21.914C13 21.246 13.26 20.619 13.732 20.146L20.439 13.439C21.023 12.854 21.976 12.854 22.56 13.439C23.142 13.997 23.142 15.002 22.56 15.56L22.561 15.561ZM4.691 16.932C7.503 15.774 8.952 13.984 9 11.6V8.46602C9 7.86702 8.618 7.33902 8.049 7.15002L4.657 6.02502C4.555 5.99102 4.444 5.99102 4.343 6.02502L0.951 7.15002C0.382 7.33802 0 7.86702 0 8.46602V11.611C0.046 13.707 1.484 15.491 4.274 16.915C4.404 16.982 4.557 16.987 4.691 16.932ZM1 11.6V8.46602C1 8.29902 1.107 8.15202 1.266 8.09902L4.5 7.02702L7.734 8.09902C7.893 8.15202 8 8.29902 8 8.46602V11.59C7.962 13.498 6.824 14.916 4.523 15.917C2.221 14.695 1.036 13.24 1 11.6ZM13.5 16H10.5C10.224 16 10 15.776 10 15.5C10 15.224 10.224 15 10.5 15H13.5C13.776 15 14 15.224 14 15.5C14 15.776 13.776 16 13.5 16ZM10 23.5C10 23.776 9.776 24 9.5 24H6.5C4.019 24 2 21.981 2 19.5V18.5C2 18.224 2.224 18 2.5 18C2.776 18 3 18.224 3 18.5V19.5C3 21.43 4.57 23 6.5 23H9.5C9.776 23 10 23.224 10 23.5Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_18_172">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
              />
              <FeatureItem 
                text="Publishing original research articles, review papers, case studies, and short communications." 
                delay={300}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_19_174)">
<path d="M23.854 23.146L20.854 20.146C21.559 19.284 22 18.198 22 17C22 14.243 19.757 12 17 12C14.243 12 12 14.243 12 17C12 19.757 14.243 22 17 22C18.198 22 19.284 21.559 20.146 20.854L23.146 23.854C23.598 24.32 24.318 23.599 23.853 23.147L23.854 23.146ZM17 21C14.794 21 13 19.206 13 17C13 14.794 14.794 13 17 13C19.206 13 21 14.794 21 17C21 19.206 19.206 21 17 21ZM10.5 14.5C10.5 14.776 10.276 15 10 15H9C8.867 15 8.74 14.947 8.646 14.854L7.792 14H2.5C1.673 14 1 14.673 1 15.5C1 16.327 1.673 17 2.5 17H9.5C9.776 17 10 17.224 10 17.5C10 17.776 9.776 18 9.5 18H2.5C1.122 18 0 16.878 0 15.5C0 14.293 0.86 13.283 2 13.051V4.5C2 2.019 4.019 0 6.5 0H17.5C19.981 0 22 2.019 22 4.5V11.5C22 11.776 21.776 12 21.5 12C21.224 12 21 11.776 21 11.5V4.5C21 2.57 19.43 1 17.5 1H6.5C4.57 1 3 2.57 3 4.5V13H8C8.133 13 8.26 13.053 8.354 13.146L9.208 14H10.001C10.277 14 10.501 14.224 10.501 14.5H10.5Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_19_174">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
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
              className={`w-full lg:w-[548px] lg:flex-shrink-0 flex flex-col gap-6 lg:gap-10 bg-[#FAFAFAAF] rounded-[20px] lg:rounded-none overflow-hidden lg:h-[726px] transition-all duration-1000 ease-out shadow-[#0000000D] ${
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
                <p className='w-full font-semibold text-xl sm:text-2xl md:text-[28px] lg:text-[32px] leading-tight lg:leading-[40px] xl:leading-[48px] text-[#1946DAE5] mb-4'>
                  Double-Blind Peer Review Process – IJPPI
                </p>
                <p className='w-full font-normal text-sm sm:text-base md:text-lg leading-relaxed lg:leading-[30px] xl:leading-[36px] text-[#020F19]'>
                  The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) follows a structured double-blind peer review process to ensure fairness, quality, and transparency in manuscript handling.
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div 
              ref={reviewRightRef}
              className={`relative bg-[#FAFAFAAF] p-6 sm:p-8 lg:p-10 w-full flex flex-col gap-6 lg:gap-8 rounded-[20px] lg:rounded-none transition-all duration-1000 ease-out shadow-[#0000000D] ${
                reviewRightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <p className='font-semibold text-2xl sm:text-3xl md:text-[36px] lg:text-[42px] leading-tight lg:leading-[24px] text-[#1946DA]'>
                Scope of the Journal
              </p>
              
              <p className='w-full font-medium text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] leading-relaxed lg:leading-[140%] xl:leading-[159%] text-[#233B4E]'>
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
            className={`w-full lg:w-[50%] xl:w-[689px] h-[300px] sm:h-[400px] lg:h-[529px] rounded-[50px] lg:rounded-[100px] overflow-hidden transition-all duration-1000 ease-out cursor-pointer relative group z-50 ${
              whyPublishLeftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
           
          >
            <img 
              className='w-full h-full object-cover'
              src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768334964/Mask_group_sw03ob.png'
            />
            
            {/* Play button overlay */}
          
          </div>
          
          <div 
            ref={whyPublishRightRef}
            className={`flex flex-col justify-start gap-8 lg:gap-16 w-full lg:w-[48%] transition-all duration-1000 ease-out ${
              whyPublishRightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <p className='text-xl sm:text-2xl md:text-[28px] lg:text-[32px] text-[#1946DA] font-[600] leading-tight lg:leading-[24px]'>Why Publish with IJPPI?</p>
            <div className='flex flex-col gap-3 md:gap-4'>
              <FeatureItem 
                text="Double-Blind Peer Review for fair evaluation." 
                delay={0}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_20_178)">
<path d="M10 9.5V12H9V9.5C9 8.673 8.327 8 7.5 8H2.5C1.673 8 1 8.673 1 9.5V12H0V9.5C0 8.121 1.122 7 2.5 7H7.5C8.878 7 10 8.121 10 9.5ZM2 3C2 1.346 3.346 0 5 0C6.654 0 8 1.346 8 3C8 4.654 6.654 6 5 6C3.346 6 2 4.654 2 3ZM3 3C3 4.103 3.897 5 5 5C6.103 5 7 4.103 7 3C7 1.897 6.103 1 5 1C3.897 1 3 1.897 3 3ZM21.5 18H13.5C12.122 18 11 19.121 11 20.5V24H12V20.5C12 19.673 12.673 19 13.5 19H21.5C22.327 19 23 19.673 23 20.5V24H24V20.5C24 19.121 22.879 18 21.5 18ZM13 11.5C13 9.019 15.019 7 17.5 7C19.981 7 22 9.019 22 11.5C22 13.981 19.981 16 17.5 16C15.019 16 13 13.981 13 11.5ZM14 11.5C14 13.43 15.57 15 17.5 15C19.43 15 21 13.43 21 11.5C21 9.57 19.43 8 17.5 8C15.57 8 14 9.57 14 11.5ZM8.565 19.447C9.144 20.028 9.144 20.971 8.565 21.552L6.058 24.058L5.351 23.351L7.703 20.999H2.5C1.122 20.999 0 19.878 0 18.499V13.999H1V18.499C1 19.326 1.673 19.999 2.5 19.999H7.704L5.352 17.647L6.059 16.94L8.565 19.446V19.447Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_20_178">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
              />
              <FeatureItem 
                text="Open Access Policy ensuring global visibility." 
                delay={100}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_20_180)">
<path d="M2.501 3.98402C2.767 4.05302 3.041 3.89202 3.11 3.62402C3.507 2.07902 4.902 0.999023 6.5 0.999023H12.015C12.35 0.999023 12.678 1.03702 13 1.09502V6.49902C13 7.87702 14.121 8.99902 15.5 8.99902H20.965C20.983 9.16302 21 9.32802 21 9.49902C21 9.77502 21.224 9.99902 21.5 9.99902C21.776 9.99902 22 9.77502 22 9.49902C22 8.40602 21.692 7.39502 21.109 6.57402C20.829 6.17802 20.487 5.77902 20.095 5.38802L16.611 1.90302C15.382 0.675023 13.75 -0.000976562 12.014 -0.000976562H6.499C4.444 -0.000976562 2.652 1.38702 2.141 3.37402C2.072 3.64202 2.233 3.91502 2.501 3.98402ZM14 1.38002C14.704 1.65302 15.354 2.06202 15.904 2.61102L19.388 6.09702C19.741 6.44902 20.045 6.80502 20.294 7.15502C20.476 7.41202 20.614 7.69902 20.727 8.00102H15.5C14.673 8.00102 14 7.32802 14 6.50102V1.38002ZM16.5 12C16.776 12 17 12.224 17 12.5C17 12.776 16.776 13 16.5 13H11.5C11.224 13 11 12.776 11 12.5C11 12.224 11.224 12 11.5 12H16.5ZM23.268 12.732C22.293 11.757 20.707 11.757 19.733 12.732L13.026 19.439C12.365 20.1 12.001 20.979 12.001 21.914V23.5C12.001 23.776 12.225 24 12.501 24H14.087C15.023 24 15.901 23.636 16.562 22.975L23.269 16.268C24.239 15.339 24.239 13.662 23.269 12.733L23.268 12.732ZM22.561 15.561L15.854 22.268C15.382 22.74 14.754 23 14.086 23H13V21.914C13 21.246 13.26 20.619 13.732 20.146L20.439 13.439C21.023 12.854 21.976 12.854 22.56 13.439C23.142 13.997 23.142 15.002 22.56 15.56L22.561 15.561ZM4.691 16.932C7.503 15.774 8.952 13.984 9 11.6V8.46602C9 7.86702 8.618 7.33902 8.049 7.15002L4.657 6.02502C4.555 5.99102 4.444 5.99102 4.343 6.02502L0.951 7.15002C0.382 7.33802 0 7.86702 0 8.46602V11.611C0.046 13.707 1.484 15.491 4.274 16.915C4.404 16.982 4.557 16.987 4.691 16.932ZM1 11.6V8.46602C1 8.29902 1.107 8.15202 1.266 8.09902L4.5 7.02702L7.734 8.09902C7.893 8.15202 8 8.29902 8 8.46602V11.59C7.962 13.498 6.824 14.916 4.523 15.917C2.221 14.695 1.036 13.24 1 11.6ZM13.5 16H10.5C10.224 16 10 15.776 10 15.5C10 15.224 10.224 15 10.5 15H13.5C13.776 15 14 15.224 14 15.5C14 15.776 13.776 16 13.5 16ZM10 23.5C10 23.776 9.776 24 9.5 24H6.5C4.019 24 2 21.981 2 19.5V18.5C2 18.224 2.224 18 2.5 18C2.776 18 3 18.224 3 18.5V19.5C3 21.43 4.57 23 6.5 23H9.5C9.776 23 10 23.224 10 23.5Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_20_180">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
              />
              <FeatureItem 
                text="Rapid Processing with timely publication." 
                delay={200}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_20_185)">
<path d="M4.098 19.652C4.633 20.204 5.215 20.69 5.835 21.112L5.119 21.828C4.502 21.393 3.917 20.902 3.379 20.347C1.2 18.098 0 15.133 0 12C0 5.383 5.383 0 12 0C17.415 0 22.18 3.647 23.587 8.87C23.804 9.671 23.91 10.499 23.956 11.332C23.638 11.185 23.298 11.084 22.937 11.039C22.881 10.393 22.79 9.752 22.622 9.13C21.332 4.343 16.964 1 12 1C5.935 1 1 5.935 1 12C1 14.872 2.1 17.59 4.098 19.652ZM11.5 11.595L7.331 14.145L7.852 14.999L12.499 12.156V6H11.499V11.596L11.5 11.595ZM22.5 12.999H18V13.999H22.275L15.875 20.398L12.625 17.148L6.638 23.136L7.345 23.843L12.625 18.562L15.875 21.812L23 14.688V18.999H24V14.499C24 13.672 23.327 12.999 22.5 12.999Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_20_185">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
              />
              <FeatureItem 
                text="Indexing and Abstracting opportunities in major databases." 
                delay={300}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_20_190)">
<path d="M23.995 12.7839C23.895 15.4749 22.258 17.9239 19.722 19.1759C19.475 19.2989 19.174 19.1969 19.053 18.9489C18.93 18.7009 19.032 18.4019 19.28 18.2799C21.486 17.1909 22.91 15.0709 22.997 12.7469C23.113 9.61591 20.982 6.84691 17.931 6.16291C17.196 5.99791 16.585 5.52691 16.255 4.86791C14.842 2.04891 11.785 0.543913 8.65702 1.12491C5.91702 1.63291 3.70402 3.81591 3.14702 6.55891C2.98002 7.37791 2.95602 8.20291 3.07302 9.01091C3.20302 9.90291 2.95402 10.7249 2.38802 11.2649C1.49402 12.1189 1.00102 13.2669 1.00002 14.4959C1.00002 16.7329 2.44402 18.5079 4.59202 18.9119C4.86302 18.9629 5.04202 19.2239 4.99102 19.4949C4.94602 19.7349 4.73602 19.9029 4.50002 19.9029C4.46902 19.9029 4.43802 19.8999 4.40702 19.8939C1.77102 19.3989 -0.000976562 17.2289 -0.000976562 14.4949C2.34375e-05 12.9899 0.603024 11.5859 1.69702 10.5419C2.02502 10.2279 2.16602 9.72291 2.08302 9.15491C1.94802 8.23191 1.97602 7.29191 2.16602 6.35891C2.80402 3.22191 5.33802 0.723913 8.47302 0.141913C12.047 -0.522087 15.533 1.19791 17.148 4.42091C17.343 4.80991 17.707 5.08891 18.148 5.18791C21.669 5.97791 24.128 9.17091 23.995 12.7839ZM17 12.4999V22.0929C17 23.0419 15.454 23.9999 12 23.9999C8.54602 23.9999 7.00002 23.0419 7.00002 22.0929V12.4999C7.00002 11.0049 9.00902 9.99991 12 9.99991C14.991 9.99991 17 11.0049 17 12.4999ZM16.001 17.2909C15.195 17.7079 13.893 17.9999 12 17.9999C10.107 17.9999 8.80602 17.7079 8.00002 17.2919V19.0939C8.08002 19.3189 9.18302 20.0009 12 20.0009C14.817 20.0009 15.916 19.3209 16.002 19.0719V17.2919L16.001 17.2909ZM15.999 14.0759C15.126 14.6529 13.736 14.9999 11.999 14.9999C10.262 14.9999 8.87202 14.6529 7.99902 14.0759V16.0929C8.07902 16.3179 9.18202 16.9999 11.999 16.9999C14.816 16.9999 15.911 16.3219 16 16.0719V14.0749L15.999 14.0759ZM7.99802 12.4999C7.99802 13.2369 9.49402 13.9999 11.998 13.9999C14.502 13.9999 15.998 13.2369 15.998 12.4999C15.998 11.7629 14.502 10.9999 11.998 10.9999C9.49402 10.9999 7.99802 11.7629 7.99802 12.4999ZM16.001 22.0699V20.2909C15.194 20.7079 13.893 21.0009 11.998 21.0009C10.103 21.0009 8.80402 20.7089 7.99802 20.2929V22.0949C8.07802 22.3199 9.18102 23.0019 11.998 23.0019C14.815 23.0019 15.918 22.3199 16.001 22.0719V22.0699Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_20_190">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
              />
              <FeatureItem 
                text="DOI assignment for each published article." 
                delay={400}
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_20_195)">
<path d="M12 4C13.103 4 14 3.103 14 2C14 0.897 13.103 0 12 0C10.897 0 10 0.897 10 2C10 3.103 10.897 4 12 4ZM12 1C12.552 1 13 1.448 13 2C13 2.552 12.552 3 12 3C11.448 3 11 2.552 11 2C11 1.448 11.448 1 12 1ZM21 6C22.103 6 23 5.103 23 4C23 2.897 22.103 2 21 2C19.897 2 19 2.897 19 4C19 5.103 19.897 6 21 6ZM21 3C21.552 3 22 3.448 22 4C22 4.552 21.552 5 21 5C20.448 5 20 4.552 20 4C20 3.448 20.448 3 21 3ZM23.602 9.989C23.371 9.989 23.06 9.838 23.011 9.601C22.819 8.673 21.973 7.999 21 7.999C20.027 7.999 19.182 8.673 18.989 9.601C18.933 9.872 18.665 10.051 18.398 9.989C18.127 9.933 17.954 9.669 18.01 9.398C18.298 8.008 19.555 7 20.999 7C22.443 7 23.7 8.009 23.988 9.398C24.045 9.669 23.871 9.933 23.6 9.989H23.602ZM9.01103 7.398C9.29904 6.008 10.556 5 12 5C13.444 5 14.701 6.009 14.989 7.398C15.046 7.669 14.872 7.933 14.601 7.989C14.37 7.989 14.059 7.838 14.01 7.601C13.818 6.673 12.972 5.999 11.999 5.999C11.026 5.999 10.181 6.673 9.98804 7.601C9.93104 7.872 9.66304 8.051 9.39704 7.989C9.12604 7.933 8.95304 7.669 9.00904 7.398H9.01103ZM3.00004 8C2.02704 8 1.18204 8.674 0.989035 9.602C0.933035 9.873 0.664035 10.052 0.398035 9.99C0.127035 9.934 -0.0459646 9.67 0.0100354 9.399C0.298035 8.009 1.55504 7.001 2.99904 7.001C4.44304 7.001 5.70004 8.01 5.98804 9.399C6.04504 9.67 5.87104 9.934 5.60004 9.99C5.36904 9.99 5.05803 9.839 5.00904 9.602C4.81704 8.674 3.97104 8 2.99804 8H3.00004ZM22.982 23.456C23.006 23.731 22.802 23.974 22.528 23.998C22.513 23.998 22.498 24 22.483 24C22.227 24 22.008 23.804 21.986 23.544C21.855 22.054 20.791 20.812 19.337 20.453L13.381 18.985C13.157 18.93 13 18.73 13 18.5V11.607C13 10.818 12.465 10.136 11.756 10.02C11.304 9.948 10.87 10.066 10.529 10.356C10.192 10.642 10 11.059 10 11.5V21.138C10 21.33 9.89004 21.505 9.71704 21.588C9.54504 21.671 9.33904 21.648 9.18904 21.529L6.55104 19.429C6.23004 19.13 5.86204 19.001 5.44804 19C5.04904 19.014 4.67804 19.182 4.40504 19.475C3.84004 20.079 3.87104 21.031 4.47404 21.596L6.09204 23.137C6.29204 23.327 6.30004 23.644 6.11004 23.844C5.91904 24.045 5.60204 24.051 5.40304 23.862L3.78804 22.324C2.78504 21.385 2.73304 19.799 3.67504 18.792C4.61504 17.786 6.19604 17.731 7.20404 18.673L9.00004 20.102V11.5C9.00004 10.766 9.32103 10.071 9.88103 9.595C10.441 9.119 11.187 8.915 11.916 9.034C13.104 9.227 14 10.334 14 11.607V18.108L19.576 19.482C21.445 19.943 22.814 21.54 22.982 23.456ZM3.00004 6C4.10304 6 5.00004 5.103 5.00004 4C5.00004 2.897 4.10304 2 3.00004 2C1.89704 2 1.00004 2.897 1.00004 4C1.00004 5.103 1.89704 6 3.00004 6ZM3.00004 3C3.55204 3 4.00004 3.448 4.00004 4C4.00004 4.552 3.55204 5 3.00004 5C2.44804 5 2.00004 4.552 2.00004 4C2.00004 3.448 2.44804 3 3.00004 3Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_20_195">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}
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
          <p className='font-[600] text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[42px] leading-tight lg:leading-[50px] xl:leading-[57.6px] text-[#1946DA] text-center px-4'>
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