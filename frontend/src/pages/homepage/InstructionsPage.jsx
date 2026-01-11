import React, { useEffect, useRef, useState } from 'react';

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

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FadeInSection = ({ children, className = "", direction = "up" }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  const getTransform = () => {
    if (!isVisible) {
      switch(direction) {
        case 'left': return 'translate-x-[-50px] opacity-0';
        case 'right': return 'translate-x-[50px] opacity-0';
        case 'up': return 'translate-y-[30px] opacity-0';
        default: return 'translate-y-[30px] opacity-0';
      }
    }
    return 'translate-x-0 translate-y-0 opacity-100';
  };
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

export  function InstructionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 md:py-12">
        {/* Header */}
        <AnimatedSection className="mb-8 sm:mb-10 md:mb-32">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px] font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            INSTRUCTIONS TO AUTHORS
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-[36px] leading-relaxed">
            International Journal of Pharmaceutical and Phytopharmacological Research (IJPPR)
          </p>
        </AnimatedSection>

        {/* Section 1 */}
        <FadeInSection direction="left">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              1. About the Journal
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>
                IJPPI is an international, peer-reviewed, open-access journal dedicated to publishing innovative research in the fields of pharmacology, pharmaceutical sciences, drug development, formulation technology, pharmacokinetics, regulatory affairs, and related interdisciplinary topics. The journal accepts original research articles, review articles, short communications, and case studies.
              </p>
            </div>
          </section>
        </FadeInSection>

        {/* Section 2 */}
        <FadeInSection direction="right">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              2. Scope of the Journal
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>
                This journal focuses on the intersection of pharmaceutical sciences and advanced material engineering to enhance therapeutic efficacy. Its scope encompasses:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>Formulation Science: Research on conventional dosage forms, pre-formulation studies, physical pharmacy, and the development and characterization of robust pharmaceutical systems.</li>
                <li>Advanced Drug Delivery: Innovations in controlled, sustained, and stimuli-responsive delivery systems, including the use of smart polymers and novel modes of administration.</li>
                <li>Nanomedicine: Design and evaluation of nanocarriers, nanotechnology-based delivery platforms, and the study of ligand-carrier interactions for targeted therapy.</li>
                <li>Biopharmaceutics & Pharmacokinetics: Investigative studies on the absorption, distribution, metabolism, and excretion (ADME) profiles of drug products, including molecular drug design and prodrug strategies.</li>
                <li>Analytical & Regulatory Science: Development and validation of novel analytical methods for drug quantification and stability testing.</li>
                <li>Pharmacology & Toxicology: In-depth evaluation of the safety, biocompatibility, and therapeutic performance of Active Pharmaceutical Ingredients (APIs) and their finished formulations.</li>
             
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* Section 3 */}
        <FadeInSection direction="left">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              3. Types of Manuscripts Accepted
            </h2>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
              <li>Original Research Articles</li>
              <li>Review Articles</li>
              <li>Short Communications</li>
              <li>Case Reports</li>
              <li>Method Development or Validation Studies</li>
              <li>Book Reviews and Editorials (by invitation)</li>
            </ul>
          </section>
        </FadeInSection>

        {/* Section 4 */}
        <FadeInSection direction="right">
          <section className="mb-8 sm:mb-10">
          
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>Submissions must be in English.</p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>Manuscripts must be original, unpublished, and not under consideration elsewhere.</li>
                <li>Authors must submit their manuscripts via email to: editor.ijppi@mspublication.com or via the online journal system at www.ijppi.mspublication.com</li>
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* Section 5 */}
        <FadeInSection direction="left">
      <div className="w-full mx-auto bg-white rounded-2xl mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          5. Manuscript Format
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Title Page</h2>
          <ul className="space-y-2 ml-6">
            <li className="text-gray-700 list-disc">Title of the manuscript</li>
            <li className="text-gray-700 list-disc">Author(s) name, affiliation, ORCID iD</li>
            <li className="text-gray-700 list-disc">Corresponding author with contact details (email, phone)</li>
            <li className="text-gray-700 list-disc">Conflict of Interest declaration</li>
            <li className="text-gray-700 list-disc">Abstract200–300 words summarizing background, objectives, methods, results, and conclusions.</li>
            <li className="text-gray-700 list-disc">keywords: 6–8 words.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Manuscript</h2>
          <ol className="space-y-2 ml-6 list-decimal">
            <li className="text-gray-700">Introduction</li>
            <li className="text-gray-700">Materials and Methods</li>
            <li className="text-gray-700">Results and Discussion</li>
            <li className="text-gray-700">Conclusion</li>
            <li className="text-gray-700">Acknowledgments (if any)</li>
            <li className="text-gray-700">Conflict of Interest Statement</li>
            <li className="text-gray-700">Funding Source (if applicable)</li>
            <li className="text-gray-700">References – as per Vancouver.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Formatting Requirements</h2>
          <ul className="space-y-2 ml-6">
            <li className="text-gray-700 list-disc">Font: Times New Roman, 12 pt</li>
            <li className="text-gray-700 list-disc">Line spacing: 1.5</li>
            <li className="text-gray-700 list-disc">Page Size: A4, 1-inch margins on all sides</li>
            <li className="text-gray-700 list-disc">Use headings consistently (bold, sentence case)</li>
          </ul>
        </section>
      
    </div>
        </FadeInSection>

        {/* Section 6 - Ethical Considerations */}
        <FadeInSection direction="up">
          <section className="mb-8 sm:mb-10">
            <div className="bg-gradient-to-r   rounded-lg  transition-shadow duration-300">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                6. Ethical Considerations
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
              
                <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                  <li>Manuscripts involving human/animal research must have approval from relevant ethics committees.</li>
                  <li>Plagiarism will lead to immediate rejection. Use of plagiarism-detection software is mandatory before submission.</li>
                  <li>Authors must declare any conflict of interest.</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Section 7 */}
        <FadeInSection direction="right">
        
      <div className="w-full mx-auto bg-white rounded-2xl  ">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          7. Instructions for Authors: Manuscript Preparation
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">a. General Guidelines</h2>
          <p className="text-gray-700 mb-4">
            Authors are requested to prepare manuscripts in clear, concise English, following these guidelines. All manuscripts must be submitted electronically through the journal submission system. The manuscriptshould be typed in 12-point Times New Roman font, double-spaced, with 1-inch margins on all sides. Number all pages consecutively.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">a. Title Page</h2>
          <p className="text-gray-700 mb-2">The title page should include the following information:</p>
          <div className="ml-4 space-y-1 text-gray-700">
            <p>- Title of the manuscript (concise and informative). (UPPERCASE, BOLD, TIMES NEW ROMAN).</p>
            <p>- Full names of all authors (first name, middle initial, last name)</p>
            <p>- Institutional affiliations of each author</p>
            <p>- Corresponding author details (name, address, phone, email)</p>
            <p>- Running title (maximum 50 characters)</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">b. Abstract and Keywords</h2>
          <p className="text-gray-700 mb-2">
            The abstract should not exceed 200-300 words. It must briefly state the purpose of the study, methods, key results, and major conclusions. Avoid citations in the abstract.
          </p>
          <p className="text-gray-700">
            Provide 6–8 keywords that are specific, accurate, and useful for indexing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">c. Manuscript Sections</h2>
          <p className="text-gray-700 mb-2">
            Research articles should be divided into the following sections (Heading should be uppercase, bold & Times New Roman):
          </p>
          <div className="ml-4 space-y-1 text-gray-700">
            <p>- Introduction: State the background and objectives of the work.</p>
            <p>- Materials and Methods: Provide sufficient detail for reproducibility.</p>
            <p>- Results: Present findings clearly, supported by tables/figures.</p>
            <p>- Discussion: Interpret results and their significance.</p>
            <p>- Conclusion: Summarize key findings.</p>
            <p>- Acknowledgments: Acknowledge contributors and funding sources.</p>
          </div>
          <p className="text-gray-700 mt-2">
            Subheading should be as sentence case, bold & Times New Roman.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">d. Tables and Figures</h2>
          <p className="text-gray-700">
            Tables should be numbered consecutively with Arabic numerals and placed at the end of the manuscript. Each table must have a descriptive title and be cited in the text (sentence case, bold & Times New Roman). Figures should be high-resolution (300 dpi minimum), submitted as separate files (JPEG/TIFF), and numbered consecutively. Provide legends for all figures.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">e. References</h2>
          <p className="text-gray-700">
            References should follow the Vancouver style. Number references consecutively in the order they appear in the text. In-text citations should be in superscript. Include all authors when fewer than six; if more, list the first six followed by 'et al.'
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">a. Ethical Considerations</h2>
          <p className="text-gray-700">
            Manuscripts reporting studies involving human participants or animals must include a statement of approval by the appropriate ethics committee. Informed consent must be obtained for human studies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">b. Conflict of Interest</h2>
          <p className="text-gray-700">
            All authors must disclose any financial or non-financial conflicts of interest that may influence the work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">c. Article Types</h2>
          <p className="text-gray-700 mb-2">The journal accepts the following article types:</p>
          <div className="ml-4 space-y-1 text-gray-700">
            <p>- Original Research Articles (up to 6000 words)</p>
            <p>- Review Articles (up to 8000 words)</p>
            <p>- Short Communications (up to 3000 words)</p>
            <p>- Case Reports (up to 2000 words)</p>
            <p>- Letters to the Editor (up to 1000 words)</p>
          </div>
        </section>
      </div>
   
        </FadeInSection>

        {/* Section 8 */}
        <FadeInSection direction="left">
       <div className="w-full bg-white rounded-2xl mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          8. Submission Procedure for Authors
        </h1>
        
        <p className="text-gray-700 mb-8">
          To ensure smooth handling and fast processing of manuscripts, authors are requested to carefully follow the submission procedure outlined below:
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 1: Manuscript Preparation</h2>
          <p className="text-gray-700 mb-2">
            Prepare your manuscript strictly according to the Instruction to Author given.
          </p>
          <p className="text-gray-700 mb-2">Ensure that the manuscript includes:</p>
          <div className="ml-4 space-y-1 text-gray-700 mb-2">
            <p>Title Page (with author names, affiliations, ORCID IDs, corresponding author details)</p>
            <p>Abstract and Keywords</p>
            <p>Main Text (Introduction, Materials & Methods, Results, Discussion, Conclusion)</p>
            <p>References (as per journal format)</p>
            <p>Tables, Figures, Graphical Abstract (if applicable)</p>
          </div>
          <p className="text-gray-700">Manuscript should be in Microsoft Word (.doc/.docx) format.</p>
          <p className="text-gray-700">File size should not exceed 10 MB.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 2: Plagiarism Check</h2>
          <p className="text-gray-700 mb-2">Authors are responsible for ensuring originality.</p>
          <p className="text-gray-700">
            Manuscripts must be accompanied by a plagiarism report generated from Turnitin/iThenticate/URKUND.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 3: Online Submission</h2>
          <p className="text-gray-700 mb-2">
            Submit your manuscript online through the Journal's Submission Portal.
          </p>
          <p className="text-gray-700 mb-2">
            Alternatively, manuscripts may be sent via email to the editorial office:
          </p>
          <p className="text-blue-600 font-semibold mb-3">editor.ijppi@mspublication.com</p>
          <p className="text-gray-700 mb-2">Ensure that the cover letter is attached, mentioning:</p>
          <div className="ml-4 space-y-1 text-gray-700">
            <p>Type of manuscript (Research/Review/Case Report etc.)</p>
            <p>Statement of originality</p>
            <p>Conflicts of interest</p>
            <p>Approval from all co-authors</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 4: Initial Screening</h2>
          <p className="text-gray-700 mb-2">The editorial office will verify:</p>
          <div className="ml-4 space-y-1 text-gray-700 mb-2">
            <p>Manuscript completeness</p>
            <p>Compliance with journal format</p>
            <p>Plagiarism check result</p>
            <p>Ethical approval (if applicable)</p>
          </div>
          <p className="text-gray-700">
            Manuscripts not following guidelines will be returned for correction before peer review.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 5: Peer Review</h2>
          <p className="text-gray-700">Eligible manuscripts are sent to two or more independent reviewers.</p>
          <p className="text-gray-700">The process is double-blind (reviewers and authors remain anonymous).</p>
          <p className="text-gray-700">Review time: 2–3 weeks on average.</p>
          <p className="text-gray-700">Decision may be: Accept / Minor Revision / Major Revision / Reject.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 6: Revision & Resubmission</h2>
          <p className="text-gray-700">
            Authors must submit revised manuscripts within the deadline provided.
          </p>
          <p className="text-gray-700">
            All changes must be highlighted or accompanied by a response letter.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 7: Acceptance & Proofs</h2>
          <p className="text-gray-700">Once accepted, the editorial office sends a formal acceptance letter.</p>
          <p className="text-gray-700">Authors will receive galley proofs (PDF) for final corrections.</p>
          <p className="text-gray-700">Proof corrections must be returned within 3 working days.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 8: Publication</h2>
          <p className="text-gray-700">
            Final versions are published online in the respective Volume & Issue.
          </p>
          <p className="text-gray-700">Each article is assigned a DOI (Digital Object Identifier).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Step 9: Post-Publication</h2>
          <p className="text-gray-700 mb-2">
            Published articles are indexed in Google Scholar, CrossRef, and other databases as applicable.
          </p>
          <p className="text-gray-700">
            Authors are encouraged to promote their article through institutional repositories, social media, and academic platforms (e.g., ResearchGate, Academia.edu).
          </p>
        </section>
      </div>
        </FadeInSection>

        {/* Section 9 */}
        <FadeInSection direction="right">
           <div className="w-full bg-white rounded-2xl mt-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          9. Instructions for Authors: Manuscript Preparation
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">a. General Guidelines</h2>
          <p className="text-gray-700 mb-4">
            Authors are requested to prepare manuscripts in clear, concise English, following these guidelines. All manuscripts must be submitted electronically through the journal submission system. The manuscriptshould be typed in 12-point Times New Roman font, double-spaced, with 1-inch margins on all sides. Number all pages consecutively.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">a. Title Page</h2>
          <p className="text-gray-700 mb-2">The title page should include the following information:</p>
          <div className="ml-4 space-y-1 text-gray-700">
            <p>- Title of the manuscript (concise and informative). (UPPERCASE, BOLD, TIMES NEW ROMAN).</p>
            <p>- Full names of all authors (first name, middle initial, last name)</p>
            <p>- Institutional affiliations of each author</p>
            <p>- Corresponding author details (name, address, phone, email)</p>
            <p>- Running title (maximum 50 characters)</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">b. Abstract and Keywords</h2>
          <p className="text-gray-700 mb-2">
            The abstract should not exceed 200-300 words. It must briefly state the purpose of the study, methods, key results, and major conclusions. Avoid citations in the abstract.
          </p>
          <p className="text-gray-700">
            Provide 6–8 keywords that are specific, accurate, and useful for indexing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">c. Manuscript Sections</h2>
          <p className="text-gray-700 mb-2">
            Research articles should be divided into the following sections (Heading should be uppercase, bold & Times New Roman):
          </p>
          <div className="ml-4 space-y-1 text-gray-700">
            <p>- Introduction: State the background and objectives of the work.</p>
            <p>- Materials and Methods: Provide sufficient detail for reproducibility.</p>
            <p>- Results: Present findings clearly, supported by tables/figures.</p>
            <p>- Discussion: Interpret results and their significance.</p>
            <p>- Conclusion: Summarize key findings.</p>
            <p>- Acknowledgments: Acknowledge contributors and funding sources.</p>
          </div>
          <p className="text-gray-700 mt-2">
            Subheading should be as sentence case, bold & Times New Roman.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">d. Tables and Figures</h2>
          <p className="text-gray-700">
            Tables should be numbered consecutively with Arabic numerals and placed at the end of the manuscript. Each table must have a descriptive title and be cited in the text (sentence case, bold & Times New Roman). Figures should be high-resolution (300 dpi minimum), submitted as separate files (JPEG/TIFF), and numbered consecutively. Provide legends for all figures.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">e. References</h2>
          <p className="text-gray-700">
            References should follow the Vancouver style. Number references consecutively in the order they appear in the text. In-text citations should be in superscript. Include all authors when fewer than six; if more, list the first six followed by 'et al.'
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">a. Ethical Considerations</h2>
          <p className="text-gray-700">
            Manuscripts reporting studies involving human participants or animals must include a statement of approval by the appropriate ethics committee. Informed consent must be obtained for human studies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">b. Conflict of Interest</h2>
          <p className="text-gray-700">
            All authors must disclose any financial or non-financial conflicts of interest that may influence the work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">c. Article Types</h2>
          <p className="text-gray-700 mb-2">The journal accepts the following article types:</p>
          <div className="ml-4 space-y-1 text-gray-700">
            <p>- Original Research Articles (up to 6000 words)</p>
            <p>- Review Articles (up to 8000 words)</p>
            <p>- Short Communications (up to 3000 words)</p>
            <p>- Case Reports (up to 2000 words)</p>
            <p>- Letters to the Editor (up to 1000 words)</p>
          </div>
        </section>
      </div>
        </FadeInSection>

      

        {/* Footer */}
        <AnimatedSection className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 text-center text-gray-600 text-sm sm:text-base md:text-lg">
          <p className="font-medium">We look forward to receiving your valuable contributions!</p>
        </AnimatedSection>
      </div>
    </div>
  );
}