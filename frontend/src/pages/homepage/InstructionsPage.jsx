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
                The International Journal of Pharmaceutical and Phytopharmacological Research (IJPPR) is a peer-reviewed, open-access journal dedicated to publishing high-quality research in the fields of pharmaceutical sciences, drug development, phytochemistry, pharmacology, and related disciplines. The journal aims to provide a platform for researchers, academicians, and industry professionals to disseminate their findings and contribute to the advancement of pharmaceutical knowledge.
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
                IJPPR welcomes submissions in all areas of pharmaceutical and phytopharmacological research, including but not limited to:
              </p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>Pharmaceutical Chemistry and Drug Design</li>
                <li>Pharmacology and Toxicology</li>
                <li>Pharmaceutical Analysis and Quality Assurance</li>
                <li>Drug Delivery Systems and Pharmaceutical Technology</li>
                <li>Phytochemistry and Herbal Drug Development</li>
                <li>Clinical Pharmacy and Pharmacy Practice</li>
                <li>Pharmaceutical Biotechnology and Biopharmaceutics</li>
                <li>Regulatory Affairs and Pharmaceutical Legislation</li>
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
              <li>Letters to the Editor</li>
            </ul>
          </section>
        </FadeInSection>

        {/* Section 4 */}
        <FadeInSection direction="right">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              4. Submission Guidelines
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>Authors are requested to adhere to the following guidelines while preparing their manuscripts:</p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>Manuscripts must be original and not under consideration elsewhere.</li>
                <li>Submissions should be made online through the journal's submission portal.</li>
                <li>All authors must agree to the submission and approve the final version.</li>
                <li>Conflicts of interest, if any, must be disclosed.</li>
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* Section 5 */}
        <FadeInSection direction="left">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              5. Manuscript Format
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>Manuscripts should be prepared in the following format:</p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>File Format: Microsoft Word (.doc or .docx)</li>
                <li>Font: Times New Roman, 12-point</li>
                <li>Line Spacing: Double-spaced throughout</li>
                <li>Margins: 1 inch (2.54 cm) on all sides</li>
                <li>Page Numbering: Consecutive numbering at the bottom center</li>
                <li>Word Limit: Research articles (5000-7000 words), Reviews (7000-10000 words), Short communications (2000-3000 words)</li>
              </ul>
              <p className="font-semibold mt-4">Manuscript Structure:</p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>Title Page</li>
                <li>Abstract and Keywords</li>
                <li>Introduction</li>
                <li>Materials and Methods</li>
                <li>Results</li>
                <li>Discussion</li>
                <li>Conclusion</li>
                <li>Acknowledgments (if any)</li>
                <li>References</li>
                <li>Tables and Figures</li>
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* Section 6 - Ethical Considerations */}
        <FadeInSection direction="up">
          <section className="mb-8 sm:mb-10">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                6. Ethical Considerations
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  Authors must ensure that their research complies with ethical standards. The following guidelines must be followed:
                </p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                  <li>Human Studies: Research involving human participants must be approved by an institutional ethics committee. Informed consent must be obtained from all participants.</li>
                  <li>Animal Studies: Studies involving animals must comply with institutional and national guidelines for the care and use of laboratory animals.</li>
                  <li>Plagiarism: All submissions are screened for plagiarism. Manuscripts with significant overlap with previously published work will be rejected.</li>
                  <li>Data Fabrication: Authors must ensure the authenticity of their data. Fabrication or falsification of data is strictly prohibited.</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Section 7 */}
        <FadeInSection direction="right">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              7. Instructions for Authors: Manuscript Preparation
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 sm:space-y-5">
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Title Page</h3>
                <p>The title page should include:</p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1 mt-2">
                  <li>A concise and informative title</li>
                  <li>Full names of all authors with their affiliations and email addresses</li>
                  <li>Corresponding author's contact details (email and phone number)</li>
                  <li>A short running title (not exceeding 50 characters)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Abstract</h3>
                <p>The abstract should be structured and not exceed 250 words. It should include:</p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1 mt-2">
                  <li>Background/Objective</li>
                  <li>Methods</li>
                  <li>Results</li>
                  <li>Conclusion</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Keywords</h3>
                <p>Provide 4-6 keywords that represent the main content of the manuscript.</p>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Introduction</h3>
                <p>The introduction should provide the background, rationale, and objectives of the study. It should clearly state the research question and its significance.</p>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Materials and Methods</h3>
                <p>This section should provide sufficient detail to allow replication of the study. Include:</p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1 mt-2">
                  <li>Study design and setting</li>
                  <li>Materials, reagents, and equipment used</li>
                  <li>Detailed methodology</li>
                  <li>Statistical analysis methods</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Results</h3>
                <p>Present the findings in a logical sequence. Use tables and figures to illustrate key results. Avoid duplication of data in text and tables/figures.</p>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Discussion</h3>
                <p>Interpret the results in the context of existing literature. Discuss the implications, limitations, and potential applications of the findings.</p>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Conclusion</h3>
                <p>Summarize the main findings and their significance. Avoid repeating information from the abstract or results section.</p>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">References</h3>
                <p>References should be cited in the text by numbers in square brackets [1, 2, 3] and listed at the end of the manuscript in the order of citation. Follow the Vancouver style for referencing.</p>
                <p className="mt-2 font-semibold">Examples:</p>
                <div className="pl-2 sm:pl-4 space-y-2 mt-2 text-sm sm:text-base">
                  <p><span className="font-semibold">Journal Article:</span><br/>
                  Author(s). Title of the article. Journal Name. Year;Volume(Issue):Page numbers.</p>
                  <p><span className="font-semibold">Book:</span><br/>
                  Author(s). Title of the book. Edition. Place of publication: Publisher; Year.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Section 8 */}
        <FadeInSection direction="left">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              8. Submission Procedure for Authors
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>Authors should follow the steps below to submit their manuscripts:</p>
              <ol className="list-decimal pl-4 sm:pl-6 space-y-2">
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-default">Register on the journal's online submission portal.</li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-default">Log in using your credentials.</li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-default">Navigate to the "Submit Manuscript" section.</li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-default">Upload the manuscript file along with supplementary materials (if any).</li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-default">Fill in the required metadata, including title, authors, abstract, and keywords.</li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-default">Review the submission and confirm.</li>
                <li className="hover:text-blue-600 transition-colors duration-300 cursor-default">An acknowledgment email will be sent upon successful submission.</li>
              </ol>
            </div>
          </section>
        </FadeInSection>

        {/* Section 9 */}
        <FadeInSection direction="right">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              9. Review Process
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>All submitted manuscripts undergo a rigorous peer-review process:</p>
              <ul className="list-disc pl-4 sm:pl-6 space-y-2">
                <li>Initial Screening: The editorial team conducts an initial review to assess the manuscript's suitability.</li>
                <li>Peer Review: Manuscripts are sent to at least two independent reviewers for evaluation.</li>
                <li>Decision: Based on reviewers' feedback, the editor makes one of the following decisions:
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1 mt-2">
                    <li>Accept</li>
                    <li>Minor Revisions</li>
                    <li>Major Revisions</li>
                    <li>Reject</li>
                  </ul>
                </li>
                <li>Revision: Authors are given an opportunity to revise their manuscripts based on reviewers' comments.</li>
                <li>Final Decision: Revised manuscripts are re-evaluated before final acceptance.</li>
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* Section 10 */}
        <FadeInSection direction="left">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              10. Publication Charges
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>
                IJPPR follows an open-access model. Authors are required to pay an Article Processing Charge (APC) upon acceptance of their manuscript. The APC covers the costs of peer review, editing, formatting, and online hosting.
              </p>
              <p>For detailed information on publication charges, please visit our website or contact the editorial office.</p>
            </div>
          </section>
        </FadeInSection>

        {/* Section 11 */}
        <FadeInSection direction="right">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              11. Copyright and Licensing
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3">
              <p>
                Authors retain copyright of their work while granting the journal the right to first publication. All articles are published under a Creative Commons Attribution License (CC BY), which allows others to share and adapt the work with proper attribution.
              </p>
            </div>
          </section>
        </FadeInSection>

        {/* Section 12 */}
        <FadeInSection direction="left">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-gray-900 mb-3 sm:mb-4">
              12. Contact Information
            </h2>
            <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-3 bg-blue-50 p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl">
              <p>For any queries regarding manuscript submission or publication, please contact:</p>
              <p className="mt-4">
                <span className="font-semibold text-lg sm:text-xl">Editorial Office</span><br/>
                International Journal of Pharmaceutical and Phytopharmacological Research<br/>
                Email: <a href="mailto:editor@ijppr.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">editor@ijppr.com</a><br/>
                Website: <a href="http://www.ijppr.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">www.ijppr.com</a>
              </p>
            </div>
          </section>
        </FadeInSection>

        {/* Footer */}
        <AnimatedSection className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 text-center text-gray-600 text-sm sm:text-base md:text-lg">
          <p className="font-medium">We look forward to receiving your valuable contributions!</p>
        </AnimatedSection>
      </div>
    </div>
  );
}