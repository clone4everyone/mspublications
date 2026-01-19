import React from 'react';

const RolesAndResponsibility = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 md:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
            Editorial Roles & Responsibilities
          </h1>
        </div>

        {/* Editor-in-Chief Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Editor-in-Chief
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 mb-4">
            <p>
              The Editor-in-Chief is the principal academic authority of the journal and is responsible for maintaining its scientific integrity and editorial standards.
            </p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Roles & Responsibilities:
          </h3>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <li>Defines the journal's aims, scope, and editorial policies</li>
            <li>Oversees the peer-review process and ensures ethical publishing practices</li>
            <li>Makes final decisions on manuscript acceptance or rejection</li>
            <li>Appoints Associate Editors and Editorial Board Members</li>
            <li>Represents the journal in national and international indexing and accreditation processes</li>
            <li>Ensures compliance with COPE, ICMJE, and other ethical guidelines</li>
          </ul>
        </div>

        {/* Associate Editors Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Associate Editors
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 mb-4">
            <p>
              Associate Editors support the Editor-in-Chief by managing manuscripts within their subject expertise.
            </p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Roles & Responsibilities:
          </h3>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <li>Handle submitted manuscripts relevant to their specialization</li>
            <li>Select and assign qualified peer reviewers</li>
            <li>Evaluate reviewer reports and recommend editorial decisions</li>
            <li>Ensure timely and fair peer review</li>
            <li>Uphold ethical standards and manage conflicts of interest</li>
            <li>Assist in developing special issues and thematic sections</li>
          </ul>
        </div>

        {/* Assistant Editors Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Assistant Editors / Managing Editors
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 mb-4">
            <p>
              Assistant Editors are responsible for the operational and administrative management of the journal.
            </p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Roles & Responsibilities:
          </h3>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <li>Perform initial screening of manuscripts for completeness and format compliance</li>
            <li>Coordinate communication between authors, reviewers, and editors</li>
            <li>Track manuscript progress and review timelines</li>
            <li>Support plagiarism checking, copyediting, and proofing processes</li>
            <li>Assist in issue compilation, DOI assignment, and online publication</li>
            <li>Maintain editorial records and database management</li>
          </ul>
        </div>

        {/* Editorial Board Members Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Editorial Board Members
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 mb-4">
            <p>
              Editorial Board Members serve as academic advisors and contribute to the peer-review process.
            </p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Roles & Responsibilities:
          </h3>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <li>Review manuscripts within their area of expertise</li>
            <li>Provide constructive and unbiased peer-review reports</li>
            <li>Advise on journal policy, scope, and quality improvement</li>
            <li>Support the journal by promoting it within academic and research networks</li>
            <li>Participate in special issues, conferences, or editorial initiatives when required</li>
          </ul>
        </div>

        {/* Reviewers Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reviewers
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 mb-4">
            <p>
              Reviewers are independent experts who evaluate manuscripts to ensure scientific quality and originality.
            </p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Roles & Responsibilities:
          </h3>
          <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <li>Conduct objective, confidential, and timely peer review</li>
            <li>Assess manuscripts for originality, methodology, relevance, and ethical compliance</li>
            <li>Provide clear recommendations and improvement suggestions to authors</li>
            <li>Declare conflicts of interest and maintain confidentiality</li>
            <li>Support the journal's commitment to high academic standards</li>
          </ul>
        </div>

        {/* Ethical Commitment Section */}
        <div className="mb-8 sm:mb-10 bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ethical Commitment
          </h2>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            <p className="mb-3">
              All editors, board members, and reviewers are expected to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adhere to international publication ethics</li>
              <li>Maintain confidentiality of submitted manuscripts</li>
              <li>Avoid conflicts of interest</li>
              <li>Promote transparency, fairness, and academic integrity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesAndResponsibility;