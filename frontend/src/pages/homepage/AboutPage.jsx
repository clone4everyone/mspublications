import { useEffect, useRef, useState } from 'react';

// SVG Icon Component (reusable)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" className="shrink-0 mt-[4px]">
    <path d="M9.16667 0C2.74167 0 0 2.74167 0 9.16667C0 15.5917 2.74167 18.3333 9.16667 18.3333C15.5917 18.3333 18.3333 15.5917 18.3333 9.16667C18.3333 2.74167 15.5917 0 9.16667 0ZM13.5875 7.11583C12.4942 8.82667 10.9375 10.9708 8.58667 12.3817C8.31667 12.5442 7.9775 12.54 7.71167 12.3708C6.445 11.5683 5.49417 10.7083 4.71667 9.66417C4.44167 9.295 4.51833 8.77333 4.8875 8.49833C5.25583 8.22333 5.77833 8.30083 6.0525 8.66917C6.61417 9.42333 7.2925 10.0683 8.16583 10.6733C9.96583 9.45667 11.2025 7.75083 12.1817 6.21833C12.4308 5.83 12.9458 5.71667 13.3325 5.965C13.7208 6.21333 13.835 6.72833 13.5875 7.11583Z" fill="#0257EE" />
  </svg>
);

const DocumentIcon = ({svg}) => (
  svg
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M0.883751 15.855L0 14.9713L6.60125 8.37C6.71875 8.25125 6.78375 8.095 6.78375 7.9275C6.78375 7.76 6.71875 7.60375 6.60125 7.485L0 0.88375L0.883751 0L7.485 6.60125C7.83875 6.955 8.03375 7.42625 8.03375 7.9275C8.03375 8.42875 7.83875 8.89875 7.485 9.25375L0.883751 15.855Z" fill="#233B4E" />
  </svg>
);
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
export  function AboutPage({onNavigate}) {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [journalRef, journalVisible] = useScrollAnimation();
  const [scopeRef, scopeVisible] = useScrollAnimation();
  const [policyRef, policyVisible] = useScrollAnimation();
  const [infoRef, infoVisible] = useScrollAnimation();
  const [bottomRef, bottomVisible] = useScrollAnimation();

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`relative w-full h-[250px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[532px] bg-cover bg-center overflow-hidden transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/duhadnqmh/image/upload/v1768038296/9e5ae40fed98f064454178afc62b2ddcd0a9e172_kg1ftq.jpg')",
        }}
      >
        <div className="absolute inset-0 z-0" style={{ background: "#233B4EB2" }}></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 gap-6 sm:gap-8 lg:gap-10">
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[80px] lg:leading-[60px] xl:leading-[70px] text-center" style={{ fontFamily: "'Inria Serif', serif" }}>
            About Us
          </h1>
          <p className="text-gray-200 font-medium text-xs sm:text-sm md:text-base lg:text-[18px] mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
           <span onClick={()=>onNavigate('home')} className='cursor-pointer'>Home</span>  / About Us
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[101px] py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-[101px] bg-[#f0f0ff]">
        
        {/* About Journal Section */}
        <div ref={journalRef} className='w-full bg-transparent flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-[69px] px-0'>
          <div className={`w-full lg:w-[55%] xl:w-[694px] aspect-[694/463] rounded-tr-[20px] sm:rounded-tr-[30px] lg:rounded-tr-[40px] xl:rounded-tr-[60px] rounded-bl-[20px] sm:rounded-bl-[30px] lg:rounded-bl-[40px] xl:rounded-bl-[60px] overflow-hidden relative transition-all duration-1000 delay-100 ${
            journalVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <img 
              src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768038296/9e5ae40fed98f064454178afc62b2ddcd0a9e172_kg1ftq.jpg' 
              className='w-full h-full object-cover'
              alt='Journal'
            />
            <div className='absolute top-0 left-0 rounded-br-[20px] sm:rounded-br-[30px] lg:rounded-br-[40px] xl:rounded-br-[60px] flex w-[58%] sm:w-[52%] lg:w-[45%] xl:w-[308px] h-[42%] sm:h-[45%] lg:h-[47%] xl:h-[218px] justify-center items-center bg-[#0257EED9] text-white font-[600] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[32px] xl:text-[42px] leading-[22px] sm:leading-[28px] md:leading-[34px] lg:leading-[42px] xl:leading-[52px] px-3 sm:px-4'>
              About the <br/> journal
            </div>
          </div>

          <div className={`flex flex-col items-start w-full lg:w-[43%] xl:w-[925px] gap-4 sm:gap-5 md:gap-6 lg:gap-0 justify-evenly transition-all duration-1000 delay-300 ${
            journalVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <p className='font-[600] text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[42px] leading-[32px] sm:leading-[40px] md:leading-[48px] lg:leading-[56px] xl:leading-[72px] text-[#0257EE]'>
              Focus & Scope
            </p>
            <p className='font-[400] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] leading-[24px] sm:leading-[28px] md:leading-[32px] lg:leading-[40px] xl:leading-[58px]'>
              The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) is a peer-reviewed, open access journal dedicated to publishing cutting-edge research across pharmacology and pharmaceutical sciences. IJPPI serves as a platform for academicians, researchers, and industry professionals to share innovations, discoveries, and advancements in drug research, development, and therapeutic applications.
            </p>
          </div>
        </div>

        {/* Scope Section */}
        <div ref={scopeRef} className="w-full bg-white rounded-[16px] lg:rounded-[20px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-[49px] mb-6 sm:mb-8 lg:mb-[29px]">
          <div className={`flex flex-col gap-4 sm:gap-5 md:gap-6 flex-1 transition-all duration-1000 delay-100 ${
            scopeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <h2 className="font-inter font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[42px] lg:leading-[24px] tracking-[0.04em] text-[#1946DA]">
              Scope of the Journal
            </h2>
            <p className="font-inter font-medium text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] lg:leading-[140%] xl:leading-[159%] tracking-[-0.02em] text-[#233B4E]">
              This journal focuses on the intersection of pharmaceutical sciences and advanced material engineering to enhance therapeutic efficacy.
            </p>

            <ul className="flex flex-col gap-3 sm:gap-4 font-inter text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[27px] text-[#233B4E]">
              {[
                { title: "Formulation Science:", desc: "Research on conventional dosage forms, pre-formulation studies, physical pharmacy, and characterization of robust pharmaceutical systems." },
                { title: "Advanced Drug Delivery:", desc: "Innovations in controlled, sustained, and stimuli-responsive delivery systems, including the use of smart polymers and novel modes of administration" },
                { title: "Nanomedicine:", desc: "Design and evaluation of nanocarriers, nanotechnology-based delivery platforms, and the study of ligand–carrier interactions for targeted therapy." },
                { title: "Biopharmaceutics & Pharmacokinetics:", desc: "Investigative studies on absorption, distribution, metabolism, and excretion (ADME) profiles of drug products." },
                { title: "Analytical & Regulatory Science:", desc: "Development and validation of novel analytical methods for drug quantification and stability testing." },
                { title: "Pharmacology & Toxicology:", desc: "In-depth evaluation of safety, biocompatibility, and therapeutic performance of active pharmaceutical ingredients (APIs)." }
              ].map((item, i) => (
                <li key={i} className="flex gap-3 sm:gap-4 lg:gap-6">
                  <CheckIcon />
                  <span>
                    <span className="font-bold">{item.title}</span>{" "}
                    <span className="font-normal">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-inter font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[27px] tracking-[-1px] text-[#233B4E]">
              IJPPI publishes Original Research Articles, Review Articles, Short Communications, and Case Studies, ensuring comprehensive coverage of both fundamental and applied research.
            </p>
          </div>

          <div className={`w-full lg:w-[45%] xl:w-[673px] h-[250px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[673px] pt-0 lg:pt-[52px] transition-all duration-1000 delay-300 ${
            scopeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <img
              src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768043547/96726d23ebbcffc0141ad05746e0abbdd392b6fb_qcrotj.png"
              alt="Scope of Journal"
              className="w-full h-full object-cover rounded-[16px] lg:rounded-[20px]"
            />
          </div>
        </div>

     {/* ==================== POLICY CARDS SECTION ==================== */}
<div ref={policyRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-10 mb-10 sm:mb-12 lg:mb-16 xl:mb-20">
  {[
    {
      title: "Plagiarism Policy",
      img: "https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/7f8c7926de516ca4ae237e9a5511bb6836c39856_uyvg5c.jpg",
      description:
        "Originality and proper citation are paramount. The IJPPI maintains a strict zero-tolerance policy towards plagiarism and considers all forms of academic misconduct as grave ethical violations.",
      link: "https://mspublication.com/plagiarismpolicy.html",
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_21_147)">
<path d="M11.026 23C11.332 23.36 11.667 23.695 12.029 24H0V2.5C0 1.122 1.122 0 2.5 0H15.5C16.878 0 18 1.122 18 2.5V9.025C17.834 9.015 17.669 9 17.5 9C17.331 9 17.166 9.016 17 9.025V2.5C17 1.673 16.327 1 15.5 1H2.5C1.673 1 1 1.673 1 2.5V23H11.026ZM4 16H8V15H4V16ZM14 5H4V6H14V5ZM13.502 10H4V11H12.028C12.482 10.618 12.975 10.282 13.502 10ZM17 21H18V17H17V21ZM24 17.5C24 21.084 21.084 24 17.5 24C13.916 24 11 21.084 11 17.5C11 13.916 13.916 11 17.5 11C21.084 11 24 13.916 24 17.5ZM23 17.5C23 14.467 20.533 12 17.5 12C14.467 12 12 14.467 12 17.5C12 20.533 14.467 23 17.5 23C20.533 23 23 20.533 23 17.5ZM17.5 14C16.948 14 16.5 14.448 16.5 15C16.5 15.552 16.948 16 17.5 16C18.052 16 18.5 15.552 18.5 15C18.5 14.448 18.052 14 17.5 14Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_21_147">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
    },
    {
      title: "Open Access Policy",
      img: "https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/f0b1318fab74c7018c8de7e6ecb0f68ebd94458b_dx5ugo.jpg",
      description:
        "All content published in IJPPI is freely available online without subscription charges. The journal adheres to the principle that providing open access to research supports global knowledge exchange and accelerates scientific progress.",
      link: "https://mspublication.com/openaccesspolicy.html",
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_21_151)">
<path d="M17.5 11C13.916 11 11 13.916 11 17.5C11 21.084 13.916 24 17.5 24C21.084 24 24 21.084 24 17.5C24 13.916 21.084 11 17.5 11ZM17.5 23C14.468 23 12 20.532 12 17.5C12 14.468 14.468 12 17.5 12C20.532 12 23 14.468 23 17.5C23 20.532 20.532 23 17.5 23ZM20.439 15.549L21.14 16.262L17.684 19.661C17.467 19.879 17.174 20 16.862 20C16.55 20 16.258 19.879 16.037 19.657L14.187 17.864L14.882 17.145L16.738 18.945C16.837 19.044 16.895 19.034 16.978 18.952L20.439 15.549ZM12.023 11H4V10H13.497C12.97 10.282 12.476 10.618 12.023 11ZM12.023 24H0V2.5C0 1.121 1.121 0 2.5 0H15.5C16.879 0 18 1.121 18 2.5V9.015C17.834 9.005 17.668 9 17.5 9C17.332 9 17.166 9.005 17 9.015V2.5C17 1.673 16.327 1 15.5 1H2.5C1.673 1 1 1.673 1 2.5V23H11.02C11.326 23.36 11.662 23.695 12.024 24H12.023ZM14 6H4V5H14V6ZM4 15H9V16H4V15Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_21_151">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
    },
    {
      title: "Publication Ethics",
      img: "https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/7a02581290c0f05ef839240ba8f4d84b2c1e3aac_hcssbp.jpg",
      description:
        "IJPPI strictly follows international ethical standards and COPE (Committee on Publication Ethics) guidelines. Plagiarism, duplicate publication, and unethical practices are not tolerated.",
      link: "https://mspublication.com/publicationethics.html",
      svg:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_21_155)">
<path d="M14 7.5C14 7.776 13.776 8 13.5 8H4.5C4.224 8 4 7.776 4 7.5C4 7.224 4.224 7 4.5 7H13.5C13.776 7 14 7.224 14 7.5ZM14 10.5C14 10.224 13.776 10 13.5 10H4.5C4.224 10 4 10.224 4 10.5C4 10.776 4.224 11 4.5 11H13.5C13.776 11 14 10.776 14 10.5ZM4.5 16C4.224 16 4 16.224 4 16.5C4 16.776 4.224 17 4.5 17H10.5C10.776 17 11 16.776 11 16.5C11 16.224 10.776 16 10.5 16H4.5ZM20.5 18C20.5 19.103 19.603 20 18.5 20C17.397 20 16.5 19.103 16.5 18C16.5 16.897 17.397 16 18.5 16C19.603 16 20.5 16.897 20.5 18ZM19.5 18C19.5 17.448 19.051 17 18.5 17C17.949 17 17.5 17.448 17.5 18C17.5 18.552 17.949 19 18.5 19C19.051 19 19.5 18.552 19.5 18ZM23.832 19.903C24.05 20.68 23.542 21.545 22.756 21.732C22.369 21.835 21.964 21.776 21.619 21.573L21.396 21.442C20.988 21.782 20.515 22.048 20 22.228V22.499C20 23.326 19.327 23.999 18.5 23.999C17.673 23.999 17 23.326 17 22.499V22.228C16.485 22.048 16.012 21.782 15.604 21.442L15.381 21.573C15.036 21.776 14.632 21.835 14.244 21.732C13.459 21.545 12.95 20.68 13.168 19.903C13.269 19.515 13.514 19.19 13.859 18.987L14.093 18.849C14.029 18.55 13.999 18.274 13.999 17.999C13.999 17.724 14.029 17.448 14.093 17.148L13.859 17.01C13.514 16.808 13.268 16.483 13.167 16.094C12.949 15.318 13.458 14.452 14.243 14.266C14.631 14.164 15.035 14.222 15.38 14.425L15.603 14.556C16.011 14.216 16.484 13.95 16.999 13.77V13.499C16.999 12.672 17.672 11.999 18.499 11.999C19.326 11.999 19.999 12.672 19.999 13.499V13.77C20.514 13.95 20.987 14.216 21.395 14.556L21.618 14.425C21.963 14.222 22.368 14.164 22.755 14.266C23.539 14.452 24.049 15.318 23.831 16.094C23.73 16.483 23.484 16.808 23.139 17.011L22.906 17.148C22.97 17.448 23 17.724 23 17.999C23 18.274 22.97 18.55 22.906 18.849L23.139 18.986C23.485 19.19 23.731 19.515 23.831 19.903H23.832ZM22.077 16.477L22.633 16.15C23.197 15.829 22.679 14.951 22.126 15.288L21.585 15.606C21.389 15.722 21.139 15.69 20.978 15.529C20.548 15.097 19.994 14.786 19.375 14.626C19.154 14.568 19 14.369 19 14.142V13.5C19 13.225 18.776 13 18.5 13C18.224 13 18 13.225 18 13.5V14.142C18 14.37 17.846 14.569 17.625 14.626C17.006 14.786 16.452 15.098 16.022 15.529C15.861 15.69 15.61 15.722 15.415 15.606L14.874 15.288C14.322 14.952 13.803 15.83 14.367 16.149L14.924 16.477C15.12 16.592 15.214 16.826 15.152 17.044C15.049 17.405 15.001 17.709 15.001 17.999C15.001 18.289 15.049 18.593 15.152 18.954C15.214 19.173 15.121 19.407 14.924 19.522L14.368 19.848C13.804 20.168 14.323 21.048 14.875 20.71L15.416 20.392C15.611 20.276 15.862 20.307 16.023 20.469C16.453 20.901 17.007 21.212 17.626 21.372C17.847 21.43 18.001 21.629 18.001 21.856V22.498C18.001 22.773 18.225 22.998 18.501 22.998C18.777 22.998 19.001 22.773 19.001 22.498V21.856C19.001 21.628 19.155 21.429 19.376 21.372C19.995 21.212 20.549 20.9 20.979 20.469C21.14 20.308 21.39 20.276 21.586 20.392L22.127 20.71C22.682 21.048 23.197 20.167 22.634 19.847L22.078 19.522C21.881 19.407 21.787 19.172 21.85 18.954C21.953 18.593 22.001 18.289 22.001 17.999C22.001 17.709 21.953 17.405 21.85 17.044C21.788 16.825 21.88 16.592 22.077 16.477ZM12.5 22.999H4.5C2.57 22.999 1 21.429 1 19.499V6.5C1 4.57 2.57 3 4.5 3H5.5C5.776 3 6 2.776 6 2.5C6 1.673 6.673 1 7.5 1H10.5C11.327 1 12 1.673 12 2.5C12 2.776 12.224 3 12.5 3H13.5C15.43 3 17 4.57 17 6.5V9.5C17 9.776 17.224 10 17.5 10C17.776 10 18 9.776 18 9.5V6.5C18 4.019 15.981 2 13.5 2H12.95C12.718 0.86 11.708 0 10.5 0H7.5C6.292 0 5.283 0.86 5.05 2H4.5C2.019 2 0 4.019 0 6.5V19.5C0 21.981 2.019 24 4.5 24H12.5C12.776 24 13 23.776 13 23.5C13 23.224 12.776 22.999 12.5 22.999ZM12 13.499C12 13.223 11.776 12.999 11.5 12.999H4.5C4.224 12.999 4 13.223 4 13.499C4 13.775 4.224 13.999 4.5 13.999H11.5C11.776 13.999 12 13.775 12 13.499Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_21_155">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
    }
  ].map((policy, index) => (
    <div
      key={policy.title}
      className={`group bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-[#0000000D] transition-all duration-300 flex flex-col h-full ${
        policyVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={policy.img}
          alt={policy.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 sm:p-6 lg:p-7 xl:p-8">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl border-2 border-[#0257EE]/30 bg-[#0257EE]/5 flex items-center justify-center shrink-0 transition-colors group-hover:border-[#0257EE]/60">
            <DocumentIcon svg={policy.svg}/>
          </div>
          <h3 className="text-lg sm:text-xl lg:text-[20px] xl:text-[22px] font-semibold text-[#0257EE] leading-tight">
            {policy.title}
          </h3>
        </div>

        {/* Description - grows to push button down */}
        <p className="text-[#233B4E] text-[14px] sm:text-[15px] md:text-base lg:text-[17px] xl:text-[18px] leading-relaxed flex-grow mb-6 sm:mb-7 lg:mb-8">
          {policy.description}
        </p>

        {/* Learn More Button - always at bottom */}
       <button
  className="
    self-end w-full max-w-[180px] sm:max-w-[200px] h-10 sm:h-11 lg:h-12 rounded-full 
    border-2 border-[#233B4E] 
    flex items-center justify-between pl-4 sm:pl-5 lg:pl-6 pr-1 
    text-[#233B4E] font-medium text-[13px] sm:text-[14px] lg:text-[15px]
    hover:bg-[#233B4E] hover:text-white 
    transition-all duration-300
    group/btn
  "
  onClick={()=>{window.open(policy.link,'_blank')}}
>
  <span>Learn More</span>
  
  <div className="
    w-7 h-7 sm:w-8 sm:h-8 rounded-full 
    border border-[#233B4E] 
    flex items-center justify-center
    transition-colors duration-300
    group-hover/btn:bg-white
  ">
    <ArrowIcon className="text-[#233B4E] group-hover/btn:text-[#233B4E]/90 bg-white" />
  </div>
</button>
      </div>
    </div>
  ))}
</div>

        {/* Info Cards - Second Row */}
        <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-[36px] mb-5 sm:mb-6 lg:mb-8 xl:mb-[29px]">
          {/* Publication Frequency */}
          <div className={`w-full rounded-[16px] lg:rounded-[20px] bg-white p-5 sm:p-6 lg:p-7 xl:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 ${
            infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-[44px] h-[44px] sm:w-[47px] sm:h-[47px] lg:w-[50px] lg:h-[50px] rounded-[8px] lg:rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                <DocumentIcon svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_22_149)">
<path d="M19.5 2H18V0.5C18 0.224 17.776 0 17.5 0C17.224 0 17 0.224 17 0.5V2H7V0.5C7 0.224 6.776 0 6.5 0C6.224 0 6 0.224 6 0.5V2H4.5C2.019 2 0 4.019 0 6.5V19.5C0 21.981 2.019 24 4.5 24H19.5C21.981 24 24 21.981 24 19.5V6.5C24 4.019 21.981 2 19.5 2ZM8.5 15V8H15.5V15H8.5ZM15.5 16V23H8.5V16H15.5ZM1 8H7.5V15H1V8ZM16.5 8H23V15H16.5V8ZM4.5 3H19.5C21.43 3 23 4.57 23 6.5V7H1V6.5C1 4.57 2.57 3 4.5 3ZM1 19.5V16H7.5V23H4.5C2.57 23 1 21.43 1 19.5ZM19.5 23H16.5V16H23V19.5C23 21.43 21.43 23 19.5 23ZM14.104 12.896C14.299 13.091 14.299 13.408 14.104 13.603C13.909 13.798 13.592 13.798 13.397 13.603L12.001 12.207L10.605 13.603C10.41 13.798 10.093 13.798 9.898 13.603C9.703 13.408 9.703 13.091 9.898 12.896L11.294 11.5L9.898 10.104C9.703 9.909 9.703 9.592 9.898 9.397C10.093 9.202 10.41 9.202 10.605 9.397L12.001 10.793L13.397 9.397C13.592 9.202 13.909 9.202 14.104 9.397C14.299 9.592 14.299 9.909 14.104 10.104L12.708 11.5L14.104 12.896ZM22.152 18.117C22.345 18.314 22.343 18.631 22.146 18.824L20.371 20.57C20.083 20.855 19.704 20.998 19.324 20.998C18.946 20.998 18.567 20.856 18.279 20.572L17.512 19.825C17.314 19.632 17.31 19.315 17.502 19.118C17.696 18.92 18.013 18.917 18.209 19.108L18.978 19.857C19.171 20.046 19.479 20.046 19.668 19.857L21.444 18.11C21.64 17.917 21.957 17.919 22.151 18.116L22.152 18.117ZM6.684 18.824L4.91 20.57C4.622 20.854 4.242 20.997 3.863 20.997C3.484 20.997 3.106 20.855 2.817 20.572L2.05 19.825C1.852 19.632 1.848 19.315 2.04 19.118C2.234 18.92 2.551 18.917 2.747 19.108L3.516 19.857C3.709 20.046 4.018 20.045 4.207 19.857L5.982 18.11C6.178 17.917 6.495 17.919 6.689 18.116C6.882 18.312 6.88 18.63 6.683 18.823L6.684 18.824Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_22_149">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}/>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] font-semibold leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                Publication Frequency
              </h3>
            </div>
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-normal leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify"> Quarterly (4 issues per year)</p>
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-normal leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
            First Issue: Volume 1, Issue 1 (March 2026)
The first issue of IJPPI is scheduled for publication in the last week of March 2026.
            </p>
          </div>

          {/* Time Durations */}
          <div className={`w-full rounded-[16px] lg:rounded-[20px] bg-white p-5 sm:p-6 lg:p-7 xl:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-200 ${
            infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-[44px] h-[44px] sm:w-[47px] sm:h-[47px] lg:w-[50px] lg:h-[50px] rounded-[8px] lg:rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                <DocumentIcon svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_21_176)">
<path d="M17.94 21.133C17.631 22.794 16.182 24 14.494 24H3.50602C2.49702 24 1.53602 23.563 0.871017 22.803C0.203017 22.04 -0.102983 21.027 0.0320166 20.022C0.521017 16.366 3.29002 13.942 5.70102 12.001C3.29002 10.058 0.521017 7.635 0.0320166 3.979C-0.102983 2.972 0.203017 1.957 0.871017 1.194C1.53402 0.435 2.49302 0 3.50002 0H14.501C16.189 0 17.635 1.206 17.941 2.867C17.992 3.138 17.812 3.399 17.541 3.45C17.274 3.501 17.009 3.321 16.959 3.049C16.739 1.862 15.706 1 14.501 1H3.50002C2.78102 1 2.09802 1.311 1.62302 1.852C1.14502 2.398 0.927016 3.125 1.02202 3.846C1.49202 7.354 4.44202 9.714 6.81202 11.61C6.93002 11.705 7.00002 11.849 7.00002 12.001C7.00002 12.153 6.93102 12.296 6.81202 12.392C4.44202 14.288 1.49202 16.648 1.02202 20.156C0.926017 20.875 1.14502 21.6 1.62302 22.146C2.09902 22.689 2.78502 23.001 3.50602 23.001H14.494C15.7 23.001 16.736 22.14 16.958 20.952C17.008 20.679 17.273 20.503 17.541 20.552C17.812 20.603 17.991 20.864 17.94 21.135V21.133ZM18 11.793V8.5C18 8.224 17.776 8 17.5 8C17.224 8 17 8.224 17 8.5V12C17 12.133 17.053 12.26 17.146 12.354L19.146 14.354C19.244 14.452 19.372 14.5 19.5 14.5C19.628 14.5 19.756 14.451 19.854 14.354C20.049 14.159 20.049 13.842 19.854 13.647L18 11.793ZM9.03102 14.449C9.15502 14.449 9.27102 14.5 9.36202 14.583C9.35902 14.579 9.36302 14.581 9.38902 14.601C11.327 16.15 13.788 18.147 14.402 20.367C14.444 20.517 14.413 20.679 14.318 20.803C14.224 20.928 14.077 21 13.921 21H4.13902C3.98302 21 3.83602 20.926 3.74202 20.803C3.64702 20.679 3.61602 20.518 3.65702 20.368C4.25902 18.16 6.63602 16.23 8.67402 14.599C8.70002 14.578 8.70302 14.577 8.69902 14.582C8.79102 14.499 8.90602 14.449 9.03102 14.449ZM9.03102 15.624C7.33302 16.982 5.58502 18.38 4.85102 20H13.205C12.45 18.359 10.645 16.916 9.03102 15.625V15.624ZM24 12C24 15.584 21.084 18.5 17.5 18.5C13.916 18.5 11 15.584 11 12C11 8.416 13.916 5.5 17.5 5.5C21.084 5.5 24 8.416 24 12ZM23 12C23 8.967 20.532 6.5 17.5 6.5C14.468 6.5 12 8.967 12 12C12 15.033 14.468 17.5 17.5 17.5C20.532 17.5 23 15.033 23 12Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_21_176">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}/>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] font-semibold leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                Time Durations
              </h3>
            </div>
            <ul className="mt-4 sm:mt-5 lg:mt-6 flex flex-col gap-3 sm:gap-4 font-inter text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[27px] text-[#233B4E]">
              {[
                "Editorial Screening: 5–7 days",
                "Peer Review: 3–4 weeks",
                "Final Decision 4–6 weeks from date of submission",
                "Publication: 1–2 weeks after acceptance"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 sm:gap-4 lg:gap-6">
                  <CheckIcon />
                  <span className="font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright & Licensing */}
          <div className={`w-full rounded-[16px] lg:rounded-[20px] bg-white p-5 sm:p-6 lg:p-7 xl:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-400 ${
            infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-[44px] h-[44px] sm:w-[47px] sm:h-[47px] lg:w-[50px] lg:h-[50px] rounded-[8px] lg:rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                <DocumentIcon svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_21_181)">
<path d="M24 2.5V24H13V23H23V2.5C23 1.673 22.327 1 21.5 1H8.5C7.673 1 7 1.673 7 2.5V10.283C6.682 10.17 6.348 10.089 6 10.05V2.5C6 1.121 7.121 0 8.5 0H21.5C22.879 0 24 1.121 24 2.5ZM20 4H10V5H20V4ZM10 9H20V8H10V9ZM10 13H18V12H10V13ZM17 15C18.654 15 20 16.346 20 18C20 19.654 18.654 21 17 21C15.346 21 14 19.654 14 18C14 16.346 15.346 15 17 15ZM17 16C15.897 16 15 16.897 15 18C15 19.103 15.897 20 17 20C18.103 20 19 19.103 19 18C19 16.897 18.103 16 17 16ZM10 23H11V24H0V23H1V21C1 19.897 1.897 19 3 19H4.38C3.468 16.596 3 15.063 3 14.46C3 13.08 4.098 12 5.5 12C6.902 12 8 13.08 8 14.46C8 15.063 7.532 16.596 6.62 19H8C9.103 19 10 19.897 10 21V23ZM5.448 19H5.552C6.894 15.507 7 14.644 7 14.46C7 13.642 6.341 13 5.5 13C4.659 13 4 13.642 4 14.46C4 14.644 4.106 15.507 5.448 19ZM2 23H9V21C9 20.448 8.552 20 8 20H3C2.448 20 2 20.448 2 21V23Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_21_181">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}/>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] font-semibold leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                Copyright & Licensing Policy
              </h3>
            </div>
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-normal leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
              Authors retain copyright of their work. Articles are published under a Creative Commons Attribution License (CC BY), allowing sharing and reuse with proper citation.
            </p>
             <button
  className="
    self-end w-full max-w-[180px] sm:max-w-[200px] h-10 sm:h-11 lg:h-12 rounded-full 
    border-2 border-[#233B4E] 
    flex items-center justify-between pl-4 sm:pl-5 lg:pl-6 pr-1 
    text-[#233B4E] font-medium text-[13px] sm:text-[14px] lg:text-[15px]
    hover:bg-[#233B4E] hover:text-white 
    transition-all duration-300
    group/btn
  "
  onClick={()=>{window.open('https://mspublication.com/copyrightpolicy.html','_blank')}}
>
  <span>Learn More</span>
  
  <div className="
    w-7 h-7 sm:w-8 sm:h-8 rounded-full 
    border border-[#233B4E] 
    flex items-center justify-center
    transition-colors duration-300
    group-hover/btn:bg-white
  ">
    <ArrowIcon className="text-[#233B4E] group-hover/btn:text-[#233B4E]/90 bg-white" />
  </div>
</button>
          </div>
        </div>

        {/* Bottom Section - Peer Review Process */}
        <section id='#peerReview'>
             <div ref={bottomRef} className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Peer Review Process - Large Card */}
          <div className={`xl:col-span-2 bg-white rounded-[16px] lg:rounded-[20px] flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-20 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-[49px] transition-all duration-1000 delay-100 ${
            bottomVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 flex-1">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-[44px] h-[44px] sm:w-[47px] sm:h-[47px] lg:w-[50px] lg:h-[50px] rounded-[8px] lg:rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                  <DocumentIcon svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_22_157)">
<path d="M10 9.5V12H9V9.5C9 8.673 8.327 8 7.5 8H2.5C1.673 8 1 8.673 1 9.5V12H0V9.5C0 8.121 1.122 7 2.5 7H7.5C8.878 7 10 8.121 10 9.5ZM2 3C2 1.346 3.346 0 5 0C6.654 0 8 1.346 8 3C8 4.654 6.654 6 5 6C3.346 6 2 4.654 2 3ZM3 3C3 4.103 3.897 5 5 5C6.103 5 7 4.103 7 3C7 1.897 6.103 1 5 1C3.897 1 3 1.897 3 3ZM21.5 18H13.5C12.122 18 11 19.121 11 20.5V24H12V20.5C12 19.673 12.673 19 13.5 19H21.5C22.327 19 23 19.673 23 20.5V24H24V20.5C24 19.121 22.879 18 21.5 18ZM13 11.5C13 9.019 15.019 7 17.5 7C19.981 7 22 9.019 22 11.5C22 13.981 19.981 16 17.5 16C15.019 16 13 13.981 13 11.5ZM14 11.5C14 13.43 15.57 15 17.5 15C19.43 15 21 13.43 21 11.5C21 9.57 19.43 8 17.5 8C15.57 8 14 9.57 14 11.5ZM8.565 19.447C9.144 20.028 9.144 20.971 8.565 21.552L6.058 24.058L5.351 23.351L7.703 20.999H2.5C1.122 20.999 0 19.878 0 18.499V13.999H1V18.499C1 19.326 1.673 19.999 2.5 19.999H7.704L5.352 17.647L6.059 16.94L8.565 19.446V19.447Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_22_157">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}/>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] font-semibold leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                  Peer Review Process & Policy
                </h3>
              </div>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-normal leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                IJPPI follows a double-blind peer review process, where both authors and reviewers remain anonymous to ensure unbiased evaluation.
              </p>
              <ul className="flex flex-col gap-3 sm:gap-4 lg:gap-5 font-inter text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[27px] text-[#233B4E]">
                {[
                  "Manuscript Submission by Author (via Online Submission System)",
                  "Initial Editorial Screening (Scope, Formatting, Plagiarism Check)",
                  "Assignment to Section Editor",
                  "Double-Blind Peer Review Process (Two or More Reviewers)",
                  "Reviewer Reports Submitted",
                  "Editorial Decision (Accept / Minor Revision / Major Revision / Reject)",
                  "Author Revision (if required)",
                  "Final Acceptance by Editor-in-Chief",
                  "Copyediting and Typesetting",
                  "Proofs Sent to Author for Final Approval",
                  "Final Publication with DOI Assignment and Online Hosting"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 sm:gap-4 lg:gap-6">
                    <CheckIcon />
                    <span className="font-normal">{item}</span>
                  </li>
                ))}
              </ul>
             
           
            </div>
<div className=' h-full'>
  <div className="w-full h-full lg:w-[380px] xl:w-[410px] gap-4 flex flex-col justify-between  ">
              <img
                src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768107093/f64b2fd9d26e53d876408dd1d0255ad6cff25119_sjwjih.jpg"
                alt="Peer Review Process"
                className="w-full h-full object-cover rounded-[16px] lg:rounded-[20px]"
              />
               <div className=''>
         <button
  className="
    self-end w-full max-w-[180px] sm:max-w-[200px] h-10 sm:h-11 lg:h-12 rounded-full 
    border-2 border-[#233B4E] 
    flex items-center justify-between pl-4 sm:pl-5 lg:pl-6 pr-1 
    text-[#233B4E] font-medium text-[13px] sm:text-[14px] lg:text-[15px]
    hover:bg-[#233B4E] hover:text-white 
    transition-all duration-300
    group/btn
  "
  onClick={()=>{window.open('https://mspublication.com/peerreviewpolicy.html','_blank')}}
>
  <span>Learn More</span>
  
  <div className="
    w-7 h-7 sm:w-8 sm:h-8 rounded-full 
    border border-[#233B4E] 
    flex items-center justify-center
    transition-colors duration-300
    group-hover/btn:bg-white
  ">
    <ArrowIcon className="text-[#233B4E] group-hover/btn:text-[#233B4E]/90 bg-white" />
  </div>
</button>
              </div>
            </div>
</div>
          
          </div>

          {/* Right Column - Acceptance Rate & Archival Policy */}
          <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
            {/* Acceptance Rate Card */}
            <div className={`w-full rounded-[16px] lg:rounded-[20px] bg-white p-5 sm:p-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-300 ${
              bottomVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}>
              <img
                src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/f0b1318fab74c7018c8de7e6ecb0f68ebd94458b_dx5ugo.jpg"
                alt="Acceptance Rate"
                className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[280px] xl:h-[328px] rounded-[16px] lg:rounded-[20px] object-cover"
              />
              <div className="relative mt-6 sm:mt-8 lg:mt-10 xl:mt-12 px-1 flex flex-col">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-[44px] h-[44px] sm:w-[47px] sm:h-[47px] lg:w-[50px] lg:h-[50px] rounded-[8px] lg:rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                    <DocumentIcon svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_22_162)">
<path d="M4 6.5C4 6.224 4.224 6 4.5 6H9.5C9.776 6 10 6.224 10 6.5C10 6.776 9.776 7 9.5 7H4.5C4.224 7 4 6.776 4 6.5ZM11.5 10H4.5C4.224 10 4 10.224 4 10.5C4 10.776 4.224 11 4.5 11H11.5C11.776 11 12 10.776 12 10.5C12 10.224 11.776 10 11.5 10ZM11.5 14H4.5C4.224 14 4 14.224 4 14.5C4 14.776 4.224 15 4.5 15H11.5C11.776 15 12 14.776 12 14.5C12 14.224 11.776 14 11.5 14ZM23.509 6.501L21.606 8.051L22.387 10.279C22.579 10.858 22.387 11.488 21.909 11.854C21.432 12.221 20.774 12.247 20.272 11.918L18.024 10.454L15.816 11.933C15.583 12.089 15.31 12.172 15.028 12.172C14.719 12.172 14.425 12.074 14.178 11.888C13.699 11.531 13.497 10.905 13.677 10.33L14.433 8.059L12.522 6.503C12.063 6.112 11.897 5.482 12.101 4.928C12.305 4.373 12.839 4 13.431 4H15.829L16.684 1.601C16.892 1.043 17.425 0.672 18.014 0.672C18.603 0.672 19.137 1.043 19.342 1.595L20.199 4H22.597C23.19 4 23.724 4.374 23.928 4.932C24.132 5.488 23.963 6.119 23.509 6.501ZM22.988 5.274C22.928 5.11 22.771 5 22.597 5H19.846C19.635 5 19.446 4.867 19.375 4.668L18.401 1.937C18.286 1.626 17.743 1.621 17.623 1.943L16.652 4.669C16.581 4.868 16.392 5.001 16.181 5.001H13.431C13.257 5.001 13.1 5.11 13.04 5.273C12.98 5.437 13.029 5.622 13.162 5.735L15.333 7.502C15.495 7.633 15.558 7.851 15.492 8.048L14.63 10.639C14.58 10.799 14.638 10.984 14.779 11.089C14.921 11.193 15.116 11.198 15.261 11.103L17.744 9.441C17.91 9.331 18.127 9.33 18.295 9.438L20.819 11.082C20.967 11.178 21.161 11.17 21.301 11.062C21.441 10.955 21.498 10.77 21.442 10.602L20.548 8.051C20.478 7.853 20.541 7.631 20.704 7.498L22.872 5.731C22.999 5.624 23.049 5.438 22.989 5.275L22.988 5.274ZM21.001 21C21.001 22.654 19.655 24 18.001 24H3C1.346 24 0 22.654 0 21V4.5C0 2.019 2.019 0 4.5 0H14.5C14.776 0 15 0.224 15 0.5C15 0.776 14.776 1 14.5 1H4.5C2.57 1 1 2.57 1 4.5V21C1 22.103 1.897 23 3 23C4.103 23 5 22.103 5 21C5 19.346 6.346 18 8 18H17V13.5C17 13.224 17.224 13 17.5 13C17.776 13 18 13.224 18 13.5V18C19.654 18 21.001 19.346 21.001 21ZM20.001 21C20.001 19.897 19.104 19 18.001 19H8.001C6.898 19 6.001 19.897 6.001 21C6.001 21.768 5.711 22.469 5.235 23H18.001C19.104 23 20.001 22.103 20.001 21Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_22_162">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}/>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] font-semibold leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                    Acceptance Rate
                  </h3>
                </div>
                <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-normal leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                  The journal aims to maintain high-quality standards, with an estimated acceptance rate of 20–25% in the initial years.
                </p>
              </div>
            </div>

            {/* Archival Policy Card */}
            <div className={`w-full rounded-[16px] lg:rounded-[20px] bg-white p-5 sm:p-6 lg:p-7 xl:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-500 ${
              bottomVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-[44px] h-[44px] sm:w-[47px] sm:h-[47px] lg:w-[50px] lg:h-[50px] rounded-[8px] lg:rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                  <DocumentIcon svg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_22_167)">
<path d="M21.708 0H2.272L0 13L0.005 21.493C0.003 22.162 0.262 22.791 0.735 23.264C1.207 23.738 1.836 23.999 2.505 23.999H21.5C22.878 23.999 24 22.877 24 21.499V12.999L21.708 0ZM3.112 1H20.869L22.992 13H16V15C16 16.103 15.103 17 14 17H10C8.897 17 8 16.103 8 15V13H1.008L3.112 1ZM21.5 23H2.505C2.104 23 1.726 22.843 1.443 22.559C1.159 22.275 1.004 21.897 1.005 21.495L0.994 14H7V15C7 16.654 8.346 18 10 18H14C15.654 18 17 16.654 17 15V14H23V21.5C23 22.327 22.327 23 21.5 23ZM19.415 10H4.58L4.755 9H19.238L19.415 10ZM18.884 7H5.106L5.281 6H18.707L18.884 7ZM18.353 4H5.632L5.807 3H18.176L18.353 4Z" fill="#0257EE"/>
</g>
<defs>
<clipPath id="clip0_22_167">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>}/>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-[20px] xl:text-[22px] font-semibold leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                  Archival Policy
                </h3>
              </div>
              <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-normal leading-[150%] lg:leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                All published articles are preserved through digital archiving systems to ensure permanent accessibility.
              </p>
                  <button
  className="
    self-end w-full max-w-[180px] sm:max-w-[200px] h-10 sm:h-11 lg:h-12 rounded-full 
    border-2 border-[#233B4E] 
    flex items-center justify-between pl-4 sm:pl-5 lg:pl-6 pr-1 
    text-[#233B4E] font-medium text-[13px] sm:text-[14px] lg:text-[15px]
    hover:bg-[#233B4E] hover:text-white 
    transition-all duration-300
    group/btn
  "
  onClick={()=>{window.open('https://mspublication.com/archivalpolicy.html','_blank')}}
>
  <span>Learn More</span>
  
  <div className="
    w-7 h-7 sm:w-8 sm:h-8 rounded-full 
    border border-[#233B4E] 
    flex items-center justify-center
    transition-colors duration-300
    group-hover/btn:bg-white
  ">
    <ArrowIcon className="text-[#233B4E] group-hover/btn:text-[#233B4E]/90 bg-white" />
  </div>
</button>
            </div>
          </div>
        </div>
        </section>
  </div>
</div>
);
}