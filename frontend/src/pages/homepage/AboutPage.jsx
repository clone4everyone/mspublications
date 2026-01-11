import { useEffect, useRef, useState } from 'react';

// SVG Icon Component (reusable)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" className="shrink-0 mt-[4px]">
    <path d="M9.16667 0C2.74167 0 0 2.74167 0 9.16667C0 15.5917 2.74167 18.3333 9.16667 18.3333C15.5917 18.3333 18.3333 15.5917 18.3333 9.16667C18.3333 2.74167 15.5917 0 9.16667 0ZM13.5875 7.11583C12.4942 8.82667 10.9375 10.9708 8.58667 12.3817C8.31667 12.5442 7.9775 12.54 7.71167 12.3708C6.445 11.5683 5.49417 10.7083 4.71667 9.66417C4.44167 9.295 4.51833 8.77333 4.8875 8.49833C5.25583 8.22333 5.77833 8.30083 6.0525 8.66917C6.61417 9.42333 7.2925 10.0683 8.16583 10.6733C9.96583 9.45667 11.2025 7.75083 12.1817 6.21833C12.4308 5.83 12.9458 5.71667 13.3325 5.965C13.7208 6.21333 13.835 6.72833 13.5875 7.11583Z" fill="#0257EE" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <g clipPath="url(#clip0_444_483)">
      <path d="M27.8297 27.0037L24.01 23.184C25.0437 21.9637 25.6678 20.3863 25.6678 18.6667C25.6678 14.8062 22.5283 11.6667 18.6678 11.6667C14.8073 11.6667 11.6678 14.8062 11.6678 18.6667C11.6678 22.5272 14.8073 25.6667 18.6678 25.6667C20.3887 25.6667 21.966 25.0425 23.1852 24.0088L27.0048 27.8285C27.1192 27.9428 27.2685 27.9988 27.4178 27.9988C27.5672 27.9988 27.7165 27.9417 27.8308 27.8285C28.0583 27.601 28.0572 27.2312 27.8297 27.0037ZM18.6667 24.5C15.4502 24.5 12.8333 21.8832 12.8333 18.6667C12.8333 15.4502 15.4502 12.8333 18.6667 12.8333C21.8832 12.8333 24.5 15.4502 24.5 18.6667C24.5 21.8832 21.8832 24.5 18.6667 24.5ZM13.4167 26.8333H5.25C2.99833 26.8333 1.16667 25.0017 1.16667 22.75V5.25C1.16667 2.99833 2.99833 1.16667 5.25 1.16667H11.6842C12.0738 1.16667 12.4588 1.20167 12.8333 1.26817V7.58333C12.8333 9.191 14.1423 10.5 15.75 10.5H22.5318C22.7115 10.5 22.8818 10.4172 22.9927 10.2748C23.1035 10.1325 23.1408 9.947 23.0965 9.772C22.7593 8.45367 22.0733 7.2485 21.1108 6.28717L17.045 2.22133C15.6123 0.788667 13.7083 0 11.683 0H5.24883C2.3555 0 0 2.3555 0 5.25V22.75C0 25.6445 2.3555 28 5.25 28H13.4167C13.7387 28 14 27.7387 14 27.4167C14 27.0947 13.7387 26.8333 13.4167 26.8333ZM14 1.596C14.8237 1.91333 15.5785 2.40333 16.2213 3.04617L20.2872 7.112C20.9195 7.74433 21.4118 8.50267 21.7338 9.33333H15.75C14.7852 9.33333 14 8.54817 14 7.58333V1.596ZM11.0833 12.8333H5.25C4.928 12.8333 4.66667 12.572 4.66667 12.25C4.66667 11.928 4.928 11.6667 5.25 11.6667H11.0833C11.4053 11.6667 11.6667 11.928 11.6667 12.25C11.6667 12.572 11.4053 12.8333 11.0833 12.8333ZM4.66667 16.9167C4.66667 16.5947 4.928 16.3333 5.25 16.3333H8.75C9.072 16.3333 9.33333 16.5947 9.33333 16.9167C9.33333 17.2387 9.072 17.5 8.75 17.5H5.25C4.928 17.5 4.66667 17.2387 4.66667 16.9167ZM4.66667 21.5833C4.66667 21.2613 4.928 21 5.25 21H9.33333C9.65533 21 9.91667 21.2613 9.91667 21.5833C9.91667 21.9053 9.65533 22.1667 9.33333 22.1667H5.25C4.928 22.1667 4.66667 21.9053 4.66667 21.5833ZM22.575 17.0835C22.799 17.3157 22.7932 17.6843 22.561 17.9083L19.4075 20.958C18.9875 21.3722 18.4333 21.581 17.878 21.581C17.3227 21.581 16.7708 21.3745 16.3473 20.9603L14.756 19.3912C14.5262 19.1648 14.5238 18.7962 14.7502 18.5663C14.9765 18.3365 15.3475 18.3353 15.575 18.5605L17.1652 20.1285C17.5583 20.5135 18.1977 20.5123 18.592 20.1238L21.749 17.0707C21.9812 16.8467 22.351 16.8537 22.5738 17.0847L22.575 17.0835Z" fill="#0257EE" />
    </g>
  </svg>
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
export  function AboutPage() {
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
        className={`relative w-full h-[300px] sm:h-[400px] lg:h-[532px] bg-cover bg-center overflow-hidden transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/duhadnqmh/image/upload/v1768038296/9e5ae40fed98f064454178afc62b2ddcd0a9e172_kg1ftq.jpg')",
        }}
      >
        <div className="absolute inset-0 z-0" style={{ background: "#233B4EB2" }}></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 gap-10">
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-[80px] lg:leading-[70px] text-center" style={{ fontFamily: "'Inria Serif', serif" }}>
            About Us
          </h1>
          <p className="text-gray-200 font-medium text-sm sm:text-base lg:text-[18px] mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Home / About Us
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-16 xl:px-[101px] py-8 sm:py-12 lg:py-16 xl:py-[101px] bg-[#f0f0ff]">
        
        {/* About Journal Section */}
        <div ref={journalRef} className='w-full bg-transparent flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 mb-8 lg:mb-[69px] px-4 lg:px-0'>
          <div className={`w-full lg:w-[694px] aspect-[694/463] rounded-tr-[30px] lg:rounded-tr-[60px] rounded-bl-[30px] lg:rounded-bl-[60px] overflow-hidden relative transition-all duration-1000 delay-100 ${
            journalVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <img 
              src='https://res.cloudinary.com/duhadnqmh/image/upload/v1768038296/9e5ae40fed98f064454178afc62b2ddcd0a9e172_kg1ftq.jpg' 
              className='w-full h-full object-cover'
              alt='Journal'
            />
            <div className='absolute top-0 left-0 rounded-br-[30px] lg:rounded-br-[60px] flex w-[55%] sm:w-[50%] lg:w-[308px] h-[45%] sm:h-[47%] lg:h-[218px] justify-center items-center bg-[#0257EED9] text-white font-[600] text-[20px] sm:text-[28px] lg:text-[42px] leading-[28px] sm:leading-[38px] lg:leading-[52px] px-4'>
              About the <br/> journal
            </div>
          </div>

          <div className={`flex flex-col items-start w-full lg:w-[925px]  justify-evenly lg:gap-0 transition-all duration-1000 delay-300 ${
            journalVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <p className='font-[600] text-[28px] sm:text-[36px] lg:text-[42px] leading-[40px] sm:leading-[56px] lg:leading-[72px] text-[#0257EE]'>
              Focus & Scope
            </p>
            <p className='font-[400] text-[16px] sm:text-[24px] lg:text-[24px] leading-[32px] lg:leading-[58px]'>
              The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) is a peer-reviewed, open access journal dedicated to publishing cutting-edge research across pharmacology and pharmaceutical sciences. IJPPI serves as a platform for academicians, researchers, and industry professionals to share innovations, discoveries, and advancements in drug research, development, and therapeutic applications.
            </p>
          </div>
        </div>

        {/* Scope Section */}
        <div ref={scopeRef} className="w-full bg-white rounded-[20px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 p-6 sm:p-8 lg:p-[49px] mb-8 lg:mb-[29px]">
          <div className={`flex flex-col gap-6 flex-1 transition-all duration-1000 delay-100 ${
            scopeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <h2 className="font-inter font-semibold text-2xl sm:text-3xl lg:text-[42px] lg:leading-[24px] tracking-[0.04em] text-[#1946DA]">
              Scope of the Journal
            </h2>
            <p className="font-inter font-medium text-lg sm:text-xl lg:text-[26px] lg:leading-[159%] tracking-[-0.02em] text-[#233B4E]">
              This journal focuses on the intersection of pharmaceutical sciences and advanced material engineering to enhance therapeutic efficacy.
            </p>

            <ul className="flex flex-col gap-4 font-inter text-sm sm:text-base lg:text-[18px] leading-[27px] text-[#233B4E]">
              {[
                { title: "Formulation Science:", desc: "Research on conventional dosage forms, pre-formulation studies, physical pharmacy, and characterization of robust pharmaceutical systems." },
                { title: "Advanced Drug Delivery:", desc: "Innovations in controlled, sustained, and stimuli-responsive delivery systems, including the use of smart polymers and novel modes of administration" },
                { title: "Nanomedicine:", desc: "Design and evaluation of nanocarriers, nanotechnology-based delivery platforms, and the study of ligand–carrier interactions for targeted therapy." },
                { title: "Biopharmaceutics & Pharmacokinetics:", desc: "Investigative studies on absorption, distribution, metabolism, and excretion (ADME) profiles of drug products." },
                { title: "Analytical & Regulatory Science:", desc: "Development and validation of novel analytical methods for drug quantification and stability testing." },
                { title: "Pharmacology & Toxicology:", desc: "In-depth evaluation of safety, biocompatibility, and therapeutic performance of active pharmaceutical ingredients (APIs)." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 lg:gap-6">
                  <CheckIcon />
                  <span>
                    <span className="font-bold">{item.title}</span>{" "}
                    <span className="font-normal">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-inter font-normal text-sm sm:text-base lg:text-[18px] leading-[27px] tracking-[-1px] text-[#233B4E]">
              IJPPI publishes Original Research Articles, Review Articles, Short Communications, and Case Studies, ensuring comprehensive coverage of both fundamental and applied research.
            </p>
          </div>

          <div className={`w-full lg:w-[673px] h-[300px] sm:h-[400px] lg:h-[673px] pt-[52px] transition-all duration-1000 delay-300 ${
            scopeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <img
              src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768043547/96726d23ebbcffc0141ad05746e0abbdd392b6fb_qcrotj.png"
              alt="Scope of Journal"
              className="w-full h-full object-fit rounded-[20px]"
            />
          </div>
        </div>

        {/* Policy Cards - First Row */}
        <div ref={policyRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-[36px] mb-6 lg:mb-[29px]">
          {/* Plagiarism Policy Card */}
          <div className={`w-full rounded-[20px] bg-white p-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 ${
            policyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <img
              src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/7f8c7926de516ca4ae237e9a5511bb6836c39856_uyvg5c.jpg"
              alt="Plagiarism Policy"
              className="w-full h-[200px] sm:h-[250px] lg:h-[328px] rounded-[20px] object-cover"
            />
            <div className="relative mt-8 lg:mt-12 px-1 flex flex-col">
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                  <DocumentIcon />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                  Plagiarism Policy
                </h3>
              </div>
              <p className="mt-4 text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                Originality and proper citation are paramount. The IJPPI maintains a strict zero-tolerance policy towards plagiarism and considers all forms of academic misconduct as grave ethical violations.
              </p>
              <button className="mt-6 lg:mt-8 self-end w-[160px] sm:w-[186px] h-[48px] rounded-[54px] border-[1.2px] border-[#233B4E] flex items-center justify-between px-4 sm:px-6 text-[#233B4E] font-inter text-base sm:text-[18px] font-normal hover:bg-[#233B4E] hover:text-white transition-colors">
                <span>Learn More</span>
                <div className="w-[30px] h-[30px] rounded-full border border-[#233B4E] flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </button>
            </div>
          </div>

          {/* Open Access Policy Card */}
          <div className={`w-full rounded-[20px] bg-white p-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-200 ${
            policyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <img
              src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/f0b1318fab74c7018c8de7e6ecb0f68ebd94458b_dx5ugo.jpg"
              alt="Open Access Policy"
              className="w-full h-[200px] sm:h-[250px] lg:h-[328px] rounded-[20px] object-cover"
            />
            <div className="relative mt-8 lg:mt-12 px-1 flex flex-col">
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                  <DocumentIcon />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                  Open Access Policy
                </h3>
              </div>
              <p className="mt-4 text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                All content published in IJPPI is freely available online without subscription charges. The journal adheres to the principle that providing open access to research supports global knowledge exchange and accelerates scientific progress.
              </p>
              <button className="mt-6 lg:mt-8 self-end w-[160px] sm:w-[186px] h-[48px] rounded-[54px] border-[1.2px] border-[#233B4E] flex items-center justify-between px-4 sm:px-6 text-[#233B4E] font-inter text-base sm:text-[18px] font-normal hover:bg-[#233B4E] hover:text-white transition-colors">
                <span>Learn More</span>
                <div className="w-[30px] h-[30px] rounded-full border border-[#233B4E] flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </button>
            </div>
          </div>

          {/* Publication Ethics Card */}
          <div className={`w-full rounded-[20px] bg-white p-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-400 ${
            policyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <img
              src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/7a02581290c0f05ef839240ba8f4d84b2c1e3aac_hcssbp.jpg"
              alt="Publication Ethics"
              className="w-full h-[200px] sm:h-[250px] lg:h-[328px] rounded-[20px] object-cover"
            />
            <div className="mt-8 lg:mt-12 px-1 flex flex-col relative">
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                  <DocumentIcon />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                  Publication Ethics
                </h3>
              </div>
              <p className="mt-4 text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                IJPPI strictly follows international ethical standards and COPE (Committee on Publication Ethics) guidelines. Plagiarism, duplicate publication, and unethical practices are not tolerated.
              </p>
              <button className="mt-6 lg:mt-8 self-end w-[160px] sm:w-[186px] h-[48px] rounded-[54px] border-[1.2px] border-[#233B4E] flex items-center justify-between px-4 sm:px-6 text-[#233B4E] font-inter text-base sm:text-[18px] font-normal hover:bg-[#233B4E] hover:text-white transition-colors">
                <span>Learn More</span>
                <div className="w-[30px] h-[30px] rounded-full border border-[#233B4E] flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards - Second Row */}
        <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-[36px] mb-6 lg:mb-[29px]">
          {/* Publication Frequency */}
          <div className={`w-full rounded-[20px] bg-white p-6 sm:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 ${
            infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                <DocumentIcon />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                Publication Frequency
              </h3>
            </div>
            <p className="mt-4 text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
              IJPPI will be published quarterly (four issues per year: January-March, April-June, July-September, and October-December). Special issues may be announced for emerging themes or conference proceedings.
            </p>
          </div>

          {/* Time Durations */}
          <div className={`w-full rounded-[20px] bg-white p-6 sm:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-200 ${
            infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                <DocumentIcon />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                Time Durations
              </h3>
            </div>
            <ul className="mt-6 flex flex-col gap-4 font-inter text-sm sm:text-base lg:text-[18px] leading-[27px] text-[#233B4E]">
              {[
                "Editorial Screening: 5–7 days",
                "Peer Review: 3–4 weeks",
                "Final Decision 4–6 weeks from date of submission",
                "Publication: 1–2 weeks after acceptance"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 lg:gap-6">
                  <CheckIcon />
                  <span className="font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright & Licensing */}
          <div className={`w-full rounded-[20px] bg-white p-6 sm:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-400 ${
            infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                <DocumentIcon />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                Copyright & Licensing
              </h3>
            </div>
            <p className="mt-4 text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
              Authors retain copyright of their work. Articles are published under a Creative Commons Attribution License (CC BY), allowing sharing and reuse with proper citation.
            </p>
          </div>
        </div>

        {/* Bottom Section - Peer Review Process */}
        <div ref={bottomRef} className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Peer Review Process - Large Card */}
          <div className={`xl:col-span-2 bg-white rounded-[20px] flex flex-col lg:flex-row gap-8 lg:gap-20 p-6 sm:p-8 lg:p-[49px] transition-all duration-1000 delay-100 ${
            bottomVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className="flex flex-col gap-6 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                  <DocumentIcon />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                  Peer Review Process
                </h3>
              </div>
              <p className="text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                IJPPI follows a double-blind peer review process, where both authors and reviewers remain anonymous to ensure unbiased evaluation.
              </p>
              <ul className="flex flex-col gap-4 lg:gap-5 font-inter text-sm sm:text-base lg:text-[18px] leading-[27px] text-[#233B4E]">
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
                  <li key={i} className="flex gap-4 lg:gap-6">
                    <CheckIcon />
                    <span className="font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-[410px] h-[300px] sm:h-[400px] lg:h-[683px]">
              <img
                src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768107093/f64b2fd9d26e53d876408dd1d0255ad6cff25119_sjwjih.jpg"
                alt="Peer Review Process"
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>

          {/* Right Column - Acceptance Rate & Archival Policy */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Acceptance Rate Card */}
            <div className={`w-full rounded-[20px] bg-white p-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-300 ${
              bottomVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}>
              <img
                src="https://res.cloudinary.com/duhadnqmh/image/upload/v1768107063/f0b1318fab74c7018c8de7e6ecb0f68ebd94458b_dx5ugo.jpg"
                alt="Acceptance Rate"
                className="w-full h-[200px] sm:h-[250px] lg:h-[328px] rounded-[20px] object-cover"
              />
              <div className="relative mt-8 lg:mt-12 px-1 flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                    <DocumentIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                    Acceptance Rate
                  </h3>
                </div>
                <p className="mt-4 text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                  The journal aims to maintain high-quality standards, with an estimated acceptance rate of 20–25% in the initial years.
                </p>
              </div>
            </div>

            {/* Archival Policy Card */}
            <div className={`w-full rounded-[20px] bg-white p-6 sm:p-8 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-1000 delay-500 ${
              bottomVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-[10px] border border-[#0257EE] bg-white flex items-center justify-center shrink-0">
                  <DocumentIcon />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold leading-[176%] tracking-[-0.02em] text-[#0257EE]">
                  Archival Policy
                </h3>
              </div>
              <p className="mt-4 text-sm sm:text-base lg:text-[18px] font-normal leading-[176%] tracking-[-0.02em] text-[#233B4E] text-justify">
                All published articles are preserved through digital archiving systems to ensure permanent accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}