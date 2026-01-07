import aboutfour from '../../../public/assests/about4.png'
import abouttwo from '../../../public/assests/about2.jpg'

import aboutthree from '../../../public/assests/aboutthree.jpg'

import { useEffect, useRef, useState } from 'react';


const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
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
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const FadeInImage = ({ src, alt, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
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
  }, [delay]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95'
      } ${className}`}
    />
  );
};

export const AboutPage = ({ journal }) => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  return (
    <>
      <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-12'>
        
        {/* Hero Section */}
        <div className='px-4 sm:px-6 md:px-8 lg:px-11 rounded-2xl sm:rounded-3xl lg:rounded-[40px] overflow-hidden w-full min-h-[600px] sm:h-[700px] lg:h-[824px] bg-gradient-to-b from-[#F5F9FF] via-[#C2D9FF] to-white relative pt-8 sm:pt-10 lg:pt-[45px]'>

          <div className='flex flex-col gap-8 sm:gap-10 lg:gap-12 z-40 relative items-center w-full'>
            <div className={`flex flex-col gap-2 sm:gap-3 lg:gap-2 items-center w-full max-w-[1062px] px-4 transition-all duration-1000 ease-out ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>
              <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight sm:leading-snug lg:leading-[72px] font-sans text-center'>
                About the Journal
              </h1>
              <p className='font-normal text-sm sm:text-base lg:text-[18px] leading-6 sm:leading-7 lg:leading-[28px] font-sans text-[#023584] text-center'>
                The International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI) is a peer-reviewed, open access journal dedicated to publishing cutting-edge research across pharmacology and pharmaceutical sciences. IJPPI serves as a platform for academicians, researchers, and industry professionals to share innovations, discoveries, and advancements in drug research, development, and therapeutic applications.
              </p>
            </div>

            {/* Image Grid */}
            <div className='w-full flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-2 items-center justify-center px-4'>
              <FadeInImage 
                src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767795791/c5b3c87b340ced9a493b4c56f897ce41104b2e49_uoc0wi.png'
                className='w-full sm:w-[32%] lg:w-[410px] h-[300px] sm:h-[350px] lg:h-[493px] rounded-2xl object-cover' 
                alt="About 1"
                delay={200}
              />
              <FadeInImage 
                src={abouttwo} 
                className='w-full sm:w-[32%] lg:w-[410px] h-[300px] sm:h-[350px] lg:h-[493px] rounded-2xl object-cover' 
                alt="About 2"
                delay={400}
              />
              <FadeInImage 
                src={aboutthree} 
                className='hidden sm:block w-[32%] lg:w-[410px] h-[300px] sm:h-[350px] lg:h-[493px] rounded-2xl object-cover' 
                alt="About 3"
                delay={600}
              />
            </div>
          </div>

          {/* SVG Decorations - Hidden on mobile */}
          <div className='absolute left-0 top-0 z-10 hidden lg:block'>
            <svg xmlns="http://www.w3.org/2000/svg" width="885" height="726" viewBox="0 0 885 726" fill="none" className='w-[500px] xl:w-[885px]'>
              <path opacity="0.7" d="M279.015 104.653C187.463 -22.5203 54.8584 -7.65673 0 15.6717V833H885C741.133 833 393.454 263.62 279.015 104.653Z" fill="url(#paint0_linear_35_705)"/>
              <defs>
                <linearGradient id="paint0_linear_35_705" x1="44.686" y1="-60.9872" x2="44.686" y2="832.825" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F0F6FF"/>
                  <stop offset="0.5" stopColor="#E6EFFE"/>
                  <stop offset="0.75" stopColor="#E6EFFE" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className='absolute right-0 top-0 z-10 hidden lg:block'>
            <svg xmlns="http://www.w3.org/2000/svg" width="885" height="726" viewBox="0 0 885 726" fill="none" className='w-[500px] xl:w-[885px]'>
              <path opacity="0.7" d="M605.985 104.675C697.537 -22.525 830.142 -7.65834 885 15.675V833.175H0C143.867 833.175 491.546 263.675 605.985 104.675Z" fill="url(#paint0_linear_35_706)"/>
              <defs>
                <linearGradient id="paint0_linear_35_706" x1="840.314" y1="-61" x2="840.314" y2="833" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F0F6FF"/>
                  <stop offset="0.5" stopColor="#E6EFFE"/>
                  <stop offset="0.75" stopColor="#E6EFFE" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Topics Section */}
        <AnimatedSection delay={0}>
          <div className='w-full px-4 sm:px-6 md:px-8 lg:px-11 py-8 sm:py-10 lg:py-11 flex flex-col lg:flex-row bg-[#F5F9FF] rounded-2xl sm:rounded-3xl lg:rounded-[40px] border border-[#E6EFFE] mt-8 sm:mt-10 lg:mt-7'>
            <div className='flex flex-col w-full lg:w-[50%] gap-6 sm:gap-8 lg:gap-10 mb-6 lg:mb-0'>
              <h3 className='font-sans font-bold text-xl sm:text-2xl lg:text-[24px] leading-7 sm:leading-8 lg:leading-[35px]'>
                The journal welcomes manuscripts covering a wide spectrum of topics, including but not limited to:
              </h3>
              <div className='pl-3 sm:pl-5'>
                <ul className='text-base sm:text-lg lg:text-[20px] font-normal leading-10 sm:leading-[50px] lg:leading-[63px] text-[#023584]'>
                  <li>• Formulation Science: Research on conventional dosage forms, pre-formulation studies, physical pharmacy, and the development and characterization of robust pharmaceutical systems.</li>
                  <li>• Advanced Drug Delivery: Innovations in controlled, sustained, and stimuli-responsive delivery systems, including the use of smart polymers and novel modes of administration.</li>
                  <li>• Nanomedicine: Design and evaluation of nanocarriers, nanotechnology-based delivery platforms, and the study of ligand-carrier interactions for targeted therapy.</li>
                  <li>• Biopharmaceutics & Pharmacokinetics</li>
                 
                  <p className='mt-4'>IJPPI publishes Original Research Articles, Review Articles, Short Communications, and Case Studies, ensuring comprehensive coverage of both fundamental and applied research.</p>
                </ul>
              </div>
            </div>
            <div className='w-full lg:w-[50%] h-[400px] sm:h-[500px] lg:h-[892px] lg:px-6'>
              <FadeInImage 
                src={aboutfour} 
                className='w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[24px] object-cover' 
                alt="About 4"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Publication Frequency & Open Access */}
        <AnimatedSection delay={100}>
          <div className='bg-[#F2FEF1] w-full flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl lg:rounded-[40px] border border-[#DAF8D8] px-4 sm:px-6 lg:px-[22px] py-8 sm:py-10 lg:py-11 gap-5 sm:gap-6 lg:gap-5 mt-6 sm:mt-8 lg:mt-7'>
            <div className='w-full lg:w-[564px] h-[400px] sm:h-[500px] lg:h-[846px] rounded-2xl sm:rounded-3xl lg:rounded-[24px] overflow-hidden mb-6 lg:mb-0'>
              <FadeInImage 
                src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767795838/f43bbf3b00d91aab63352c9df2a09e81d12b344d_zgtfgy.png'
                className='w-full h-full object-cover' 
                alt="About 5"
              />
            </div>
            <div className='flex flex-col gap-12 sm:gap-16 lg:gap-24 w-full lg:w-[639px]'>
              <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5 lg:p-6'>
                <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight sm:leading-snug lg:leading-[58px] font-sans'>
                  Publication Frequency
                </h1>
                <p className='font-medium text-base sm:text-lg lg:text-[20px] leading-8 sm:leading-10 lg:leading-[45px] font-sans text-[#092606]'>
                  IJPPI will be published quarterly (four issues per year: January, April, July, and October). Special issues may be announced for emerging themes or conference proceedings.
                </p>
              </div>
              <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5 lg:p-6'>
                <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight sm:leading-snug lg:leading-[58px] font-sans'>
                  Open Access Policy
                </h1>
                <p className='font-medium text-base sm:text-lg lg:text-[20px] leading-8 sm:leading-10 lg:leading-[45px] font-sans text-[#092606]'>
                  All content published in IJPPI is freely available online without subscription charges. The journal adheres to the principle that providing open access to research supports global knowledge exchange and accelerates scientific progress. Click here for more details
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Review Process */}
        <AnimatedSection delay={100}>
          <div className='bg-[#F9FAFB] w-full flex flex-col lg:flex-row-reverse rounded-2xl sm:rounded-3xl lg:rounded-[40px] border border-[#ECEFF3] px-4 sm:px-6 lg:px-[22px] py-8 sm:py-10 lg:py-11 gap-5 sm:gap-6 lg:gap-5 mt-6 sm:mt-8 lg:mt-7'>
            <div className='w-full lg:w-[564px] h-[400px] sm:h-[500px] lg:h-full rounded-2xl sm:rounded-3xl lg:rounded-[24px] overflow-hidden mb-6 lg:mb-0'>
              <FadeInImage 
                src='https://res.cloudinary.com/duhadnqmh/image/upload/v1767796404/3bd549bca6b60706198c86222edbddde01a2fcdc_laloxm.png'
                className='w-full h-full object-cover' 
                alt="About 6"
              />
            </div>
            <div className='flex flex-col gap-12 sm:gap-16 lg:gap-24 w-full lg:w-[639px]'>
              <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-5 lg:p-6'>
                <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight sm:leading-snug lg:leading-[58px] font-sans'>
                  Peer Review Process
                </h1>
                <p className='font-medium text-base sm:text-lg lg:text-[20px] leading-8 sm:leading-10 lg:leading-[45px] font-sans text-[#092606]'>
                  IJPPI follows a double-blind peer review process, where both authors and reviewers remain anonymous to ensure unbiased evaluation.
                </p>
                <ol className='flex flex-col gap-3 sm:gap-4 text-sm sm:text-base lg:text-[20px]'>
                  <li>1. Manuscript Submission by Author (via Online Submission System)</li>
                  <li>2. Initial Editorial Screening (Scope, Formatting, Plagiarism Check)</li>
                  <li>3. Assignment to Section Editor</li>
                  <li>4. Double-Blind Peer Review Process (Two or More Reviewers)</li>
                  {/* <li>5. Reviewer Reports Submitted</li>
                  <li>6. Editorial Decision (Accept / Minor Revision / Major Revision / Reject)</li>
                  <li>7. Author Revision (if required)</li>
                  <li>8. Final Acceptance by Editor-in-Chief</li>
                  <li>9. Copyediting and Typesetting</li>
                  <li>10. Proofs Sent to Author for Final Approval</li>
                  <li>11. Final Publication with DOI Assignment and Online Hosting</li> */}
                </ol>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Ethics & Policies */}
        {/* <AnimatedSection delay={100}>
          <div className='bg-[#F5F9FF] flex flex-col items-center w-full border border-[#E6EFFE] gap-6 sm:gap-7 rounded-2xl sm:rounded-3xl lg:rounded-[40px] mt-6 sm:mt-8 lg:mt-7 px-6 sm:px-12 md:px-20 lg:px-[165px] py-8 sm:py-10 lg:py-12'>

            <div className='flex flex-col gap-3 sm:gap-4 items-center text-[#022965] text-center'>
              <h3 className='text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#022965]'>Publication Ethics</h3>
              <p className='text-base sm:text-lg lg:text-[20px] font-medium leading-9 sm:leading-[50px] lg:leading-[58px]'>
                IJPPI strictly follows international ethical standards and COPE (Committee on Publication Ethics) guidelines. Plagiarism, duplicate publication, and unethical practices are not tolerated. Click here for more details
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4 items-center text-[#022965] text-center'>
              <h3 className='text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#022965]'>Archival Policy</h3>
              <p className='text-base sm:text-lg lg:text-[20px] font-medium leading-9 sm:leading-[50px] lg:leading-[58px]'>
                All published articles are preserved through digital archiving systems to ensure permanent accessibility.
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4 items-center text-[#022965] text-center'>
              <h3 className='text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#022965]'>Copyright & Licensing</h3>
              <p className='text-base sm:text-lg lg:text-[20px] font-medium leading-9 sm:leading-[50px] lg:leading-[58px]'>
                Authors retain copyright of their work. Articles are published under a Creative Commons Attribution License (CC BY), allowing sharing and reuse with proper citation.
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4 items-center text-[#022965] text-center'>
              <h3 className='text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#022965]'>Time Durations</h3>
              <ul className='text-base sm:text-lg lg:text-[20px] font-medium leading-9 sm:leading-[50px] lg:leading-[58px]'>
                <li>Editorial Screening: 5–7 days</li>
                <li>Peer Review: 3–4 weeks</li>
                <li>Final Decision 4–6 weeks from date of submission</li>
                <li>Publication: 1–2 weeks after acceptance</li>
              </ul>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4 items-center text-[#022965] text-center'>
              <h3 className='text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#022965]'>Acceptance Rate</h3>
              <p className='text-base sm:text-lg lg:text-[20px] font-medium leading-9 sm:leading-[50px] lg:leading-[58px]'>
                The journal aims to maintain high-quality standards, with an estimated acceptance rate of 20–25% in the initial years.
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:gap-4 items-center text-black text-center mt-6 sm:mt-8 lg:mt-9'>
              <h3 className='text-2xl sm:text-3xl lg:text-[36px] font-bold'>Owned & Published By</h3>
              <p className='text-base sm:text-lg lg:text-[20px] font-medium leading-9 sm:leading-[50px] lg:leading-[58px]'>
                The journal is owned and published by: Maxosmith Publications (A Subsidiary of Maxosmith (OPC) Pvt. Ltd., India)
              </p>
            </div>

          </div>
        </AnimatedSection> */}
      </div>
    </>
  );
};