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
      <AnimatedSection className="mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          INSTRUCTIONS TO AUTHORS
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-2">
          International Journal of Pharmacological and Pharmaceutical Innovations (IJPPI)
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          ISSN (Online): [To be updated] | ISSN (Print): [To be updated]
        </p>
      </AnimatedSection>

      {/* Section 1 */}
      <FadeInSection direction="left">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            1. About the Journal
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              <em>IJPPI</em> is an international, peer-reviewed, open-access journal dedicated to publishing innovative research in the fields of pharmacology, pharmaceutical sciences, drug development, formulation technology, pharmacokinetics, regulatory affairs, and related interdisciplinary topics. The journal accepts original research articles, review articles, short communications, and case studies.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Section 2 */}
      <FadeInSection direction="right">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            2. Scope of the Journal
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
            <p>
              This journal focuses on the intersection of pharmaceutical sciences and advanced material engineering to enhance therapeutic efficacy. Its scope encompasses:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Formulation Science:</strong> Research on conventional dosage forms, pre-formulation studies, physical pharmacy, and the development and characterization of robust pharmaceutical systems.</li>
              <li><strong>Advanced Drug Delivery:</strong> Innovations in controlled, sustained, and stimuli-responsive delivery systems, including the use of smart polymers and novel modes of administration.</li>
              <li><strong>Nanomedicine:</strong> Design and evaluation of nanocarriers, nanotechnology-based delivery platforms, and the study of ligand-carrier interactions for targeted therapy.</li>
              <li><strong>Biopharmaceutics & Pharmacokinetics:</strong> Investigative studies on the absorption, distribution, metabolism, and excretion (ADME) profiles of drug products, including molecular drug design and prodrug strategies.</li>
              <li><strong>Analytical & Regulatory Science:</strong> Development and validation of novel analytical methods for drug quantification and stability testing.</li>
              <li><strong>Pharmacology & Toxicology:</strong> In-depth evaluation of the safety, biocompatibility, and therapeutic performance of Active Pharmaceutical Ingredients (APIs) and their finished formulations.</li>
            </ul>
          </div>
        </section>
      </FadeInSection>

      {/* Section 3 */}
      <FadeInSection direction="left">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            3. Types of Manuscripts Accepted
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
            <li>Original Research Articles</li>
            <li>Review Articles</li>
            <li>Short Communications</li>
            <li>Case Reports (in pharmacology)</li>
            <li>Method Development or Validation Studies</li>
            <li>Book Reviews and Editorials (by invitation)</li>
          </ul>
        </section>
      </FadeInSection>

      {/* Section 4 */}
      <FadeInSection direction="right">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            4. Submission Guidelines
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <ul className="list-disc pl-6 space-y-2">
              <li>Submissions must be in English.</li>
              <li>Manuscripts must be original, unpublished, and not under consideration elsewhere.</li>
              <li>Authors must submit their manuscripts via email to: <span className="text-blue-600">editor.ijppi@mspublication.com</span> or via the online journal system at <span className="text-blue-600">www.ijppi.mspublication.com</span></li>
            </ul>
          </div>
        </section>
      </FadeInSection>

      {/* Section 5 */}
      <FadeInSection direction="left">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            5. Manuscript Format
          </h2>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Title Page</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Title of the manuscript</li>
              <li>Author(s) name, affiliation, ORCID iD</li>
              <li>Corresponding author with contact details (email, phone)</li>
              <li>Conflict of Interest declaration</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Abstract</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>200–300 words summarizing background, objectives, methods, results, and conclusions.</li>
              <li>keywords: 6–8 words.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Main Manuscript</h3>
            <ol className="list-decimal pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Introduction</li>
              <li>Materials and Methods</li>
              <li>Results and Discussion</li>
              <li>Conclusion</li>
              <li>Acknowledgments (if any)</li>
              <li>Conflict of Interest Statement</li>
              <li>Funding Source (if applicable)</li>
              <li>References – as per Vancouver.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Formatting Requirements</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Font: Times New Roman, 12 pt</li>
              <li>Line spacing: 1.5</li>
              <li>Page Size: A4, 1-inch margins on all sides</li>
              <li>Use headings consistently (bold, sentence case)</li>
            </ul>
          </div>
        </section>
      </FadeInSection>

      {/* Section 6 */}
      <FadeInSection direction="right">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            6. Ethical Considerations
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
            <li>Manuscripts involving human/animal research must have approval from relevant ethics committees.</li>
            <li>Plagiarism will lead to immediate rejection. Use of plagiarism-detection software is mandatory before submission.</li>
            <li>Authors must declare any conflict of interest.</li>
          </ul>
        </section>
      </FadeInSection>

      {/* Section 7 */}
      <FadeInSection direction="left">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            7. Instructions for Authors: Manuscript Preparation
          </h2>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">a. General Guidelines</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Authors are requested to prepare manuscripts in clear, concise English, following these guidelines. All manuscripts must be submitted electronically through the journal submission system. The manuscript should be typed in 12-point Times New Roman font, double-spaced, with 1-inch margins on all sides. Number all pages consecutively.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">b. Title Page</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-2">The title page should include the following information:</p>
            <div className="text-gray-700 text-sm sm:text-base space-y-1">
              <p>- Title of the manuscript (concise and informative). (UPPERCASE, BOLD, TIMES NEW ROMAN).</p>
              <p>- Full names of all authors (first name, middle initial, last name)</p>
              <p>- Institutional affiliations of each author</p>
              <p>- Corresponding author details (name, address, phone, email)</p>
              <p>- Running title (maximum 50 characters)</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">c. Abstract and Keywords</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
              The abstract should not exceed 200-300 words. It must briefly state the purpose of the study, methods, key results, and major conclusions. Avoid citations in the abstract.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Provide 6–8 keywords that are specific, accurate, and useful for indexing.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">d. Manuscript Sections</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-2">
              Research articles should be divided into the following sections (Heading should be uppercase, bold & Times New Roman):
            </p>
            <div className="text-gray-700 text-sm sm:text-base space-y-1">
              <p>- Introduction: State the background and objectives of the work.</p>
              <p>- Materials and Methods: Provide sufficient detail for reproducibility.</p>
              <p>- Results: Present findings clearly, supported by tables/figures.</p>
              <p>- Discussion: Interpret results and their significance.</p>
              <p>- Conclusion: Summarize key findings.</p>
              <p>- Acknowledgments: Acknowledge contributors and funding sources.</p>
            </div>
            <p className="text-gray-700 text-sm sm:text-base mt-2">
              Subheading should be as sentence case, bold & Times New Roman.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">e. Tables and Figures</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Tables should be numbered consecutively with Arabic numerals and placed at the end of the manuscript. Each table must have a descriptive title and be cited in the text (sentence case, bold & Times New Roman). Figures should be high-resolution (300 dpi minimum), submitted as separate files (JPEG/TIFF), and numbered consecutively. Provide legends for all figures.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">f. References</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              References should follow the Vancouver style. Number references consecutively in the order they appear in the text. In-text citations should be in superscript. Include all authors when fewer than six; if more, list the first six followed by 'et al.'
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">g. Ethical Considerations</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Manuscripts reporting studies involving human participants or animals must include a statement of approval by the appropriate ethics committee. Informed consent must be obtained for human studies.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">h. Conflict of Interest</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              All authors must disclose any financial or non-financial conflicts of interest that may influence the work.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">i. Article Types</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-2">The journal accepts the following article types:</p>
            <div className="text-gray-700 text-sm sm:text-base space-y-1">
              <p>- Original Research Articles (up to 6000 words)</p>
              <p>- Review Articles (up to 8000 words)</p>
              <p>- Short Communications (up to 3000 words)</p>
              <p>- Case Reports (up to 2000 words)</p>
              <p>- Letters to the Editor (up to 1000 words)</p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Section 8 */}
      <FadeInSection direction="right">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            8. Submission Procedure for Authors
          </h2>
          
          <p className="text-gray-700 text-sm sm:text-base mb-6">
            To ensure smooth handling and fast processing of manuscripts, authors are requested to carefully follow the submission procedure outlined below:
          </p>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 1: Manuscript Preparation</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Prepare your manuscript strictly according to the <strong>Instruction to Author</strong> given.</li>
              <li>Ensure that the manuscript includes:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Title Page (with author names, affiliations, ORCID IDs, corresponding author details)</li>
                  <li>Abstract and Keywords</li>
                  <li>Main Text (Introduction, Materials & Methods, Results, Discussion, Conclusion)</li>
                  <li>References (as per journal format)</li>
                  <li>Tables, Figures, Graphical Abstract (if applicable)</li>
                </ul>
              </li>
              <li>Manuscript should be in <strong>PDF</strong> format.</li>
              <li>File size should not exceed <strong>10 MB</strong>.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 2: Plagiarism Check</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Authors are responsible for ensuring originality.</li>
              <li>Manuscripts must be accompanied by a <strong>plagiarism report</strong> generated from Turnitin/iThenticate/URKUND.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 3: Online Submission</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Submit your manuscript online through the <strong>Journal's Submission Portal</strong>.</li>
              <li>Alternatively, manuscripts may be sent via email to the editorial office:
                <ul className="list-disc pl-6 mt-2">
                  <li className="text-blue-600"><strong>editor.ijppi@mspublication.com</strong></li>
                </ul>
              </li>
              <li>Ensure that the <strong>cover letter</strong> is attached, mentioning:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Type of manuscript (Research/Review/Case Report etc.)</li>
                  <li>Statement of originality</li>
                  <li>Conflicts of interest</li>
                  <li>Approval from all co-authors</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 4: Initial Screening</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>The editorial office will verify:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Manuscript completeness</li>
                  <li>Compliance with journal format</li>
                  <li>Plagiarism check result</li>
                  <li>Ethical approval (if applicable)</li>
                </ul>
              </li>
              <li>Manuscripts not following guidelines will be <strong>returned for correction</strong> before peer review.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 5: Peer Review</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Eligible manuscripts are sent to <strong>two or more independent reviewers</strong>.</li>
              <li>The process is <strong>double-blind</strong> (reviewers and authors remain anonymous).</li>
              <li>Review time: <strong>2–3 weeks</strong> on average.</li>
              <li>Decision may be: <strong>Accept / Minor Revision / Major Revision / Reject</strong>.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 6: Revision & Resubmission</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Authors must submit revised manuscripts within the deadline provided.</li>
              <li>All changes must be highlighted or accompanied by a <strong>response letter</strong>.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 7: Acceptance & Proofs</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Once accepted, the editorial office sends a <strong>formal acceptance letter</strong>.</li>
              <li>Authors will receive <strong>galley proofs (PDF)</strong> for final corrections.</li>
              <li>Proof corrections must be returned within <strong>3 working days</strong>.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 8: Publication</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Final versions are published online in the respective <strong>Volume & Issue</strong>.</li>
              <li>Each article is assigned a <strong>DOI</strong> (Digital Object Identifier).</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Step 9: Post-Publication</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-2">
              <li>Published articles are indexed in <strong>Google Scholar</strong>, <strong>CrossRef</strong>, and other databases as applicable.</li>
              <li>Authors are encouraged to promote their article through institutional repositories, social media, and academic platforms (e.g., ResearchGate, Academia.edu).</li>
            </ul>
          </div>
        </section>
      </FadeInSection>

      {/* Section 8 (from DOCX - Review and Publication Process) */}
      <FadeInSection direction="left">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            8. Review and Publication Process
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
            <li>All manuscripts undergo double-blind peer review.</li>
            <li>Average review period: 3–4 weeks</li>
            <li>Accepted manuscripts will be copyedited and typeset before publication.</li>
            <li>Authors will receive proofs for final corrections prior to publication.</li>
          </ul>
        </section>
      </FadeInSection>

      {/* Section 9 */}
      <FadeInSection direction="right">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            9. Article Processing Charges (APC)
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
            <li>For Indian Authors: ₹1500 (INR) per article</li>
            <li>For International Authors: $25 (USD)</li>
            <li>Charges cover peer review, DOI assignment, indexing, and online hosting</li>
          </ul>
        </section>
      </FadeInSection>

      {/* Section 10 */}
      <FadeInSection direction="left">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            10. Copyright and Licensing
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
            <li>All content is published under Creative Commons Attribution License (CC BY 4.0).</li>
            <li>Authors retain copyright.</li>
          </ul>
        </section>
      </FadeInSection>

      {/* Section 11 */}
      <FadeInSection direction="right">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            11. Withdrawal Policy
          </h2>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg space-y-2">
            <li>Authors must formally request withdrawal before final acceptance.</li>
            <li>Once peer review begins, unjustified withdrawal may lead to blacklisting.</li>
          </ul>
        </section>
      </FadeInSection>

      {/* Section 12 */}
      <FadeInSection direction="left">
        <section className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            12. Contact Us
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <p>Publisher: <strong>Maxosmith Publications.</strong></p>
            <p>Email: <span className="text-blue-600">support@mspublication.com</span></p>
            <p>WhatsApp/Phone: <span className="text-blue-600">+91-82730-66581</span></p>
            <p>Website: <a href="http://www.mspublication.com" className="text-blue-600 hover:underline">www.mspublication.com</a></p>
            
            <div className="mt-4">
              <p className="font-semibold mb-2">Account Details:</p>
              <p>MAXOSMITH (OPC) PRIVATE LIMITED</p>
              <p>AXIS BANK A/C NO- 920020056567710,</p>
              <p>IFSC CODE- UTIB0000358</p>
            </div>
            
            <p className="italic mt-4">*The fee paid once is not refundable.</p>
              <h3 className=" mt-4">Updated On : 14/01/2026</h3>
          </div>
        </section>
      </FadeInSection>
    </div>
  </div>
);
}