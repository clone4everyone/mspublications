import React from 'react';

const Subscription = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 md:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
            Subscription
          </h1>
          
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-4">
            <p>
              IJPPI follows an <strong>Open Access publishing model</strong>, under which all published articles are freely available online without any subscription or access charges. Readers, researchers, academicians, and institutions can <strong>read, download, and share</strong> published articles without financial or legal barriers.
            </p>
            
            <p>
              However, <strong>optional subscription plans</strong> are available for <strong>print copies, institutional services, archival access, and publication support services</strong>, especially for libraries, colleges, universities, and research organizations that require physical issues or administrative support.
            </p>
            
            <p>
              Subscriptions are <strong>not mandatory for accessing online content</strong> and are offered purely as <strong>value-added services</strong>.
            </p>
          </div>
        </div>

        {/* Subscription Table */}
        <div className="mb-8 sm:mb-10 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900 text-sm sm:text-base md:text-lg">
                  Subscription Type
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900 text-sm sm:text-base md:text-lg">
                  Indian Subscribers (INR)
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900 text-sm sm:text-base md:text-lg">
                  International Subscribers (USD)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  Individual – Per Issue
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  ₹800
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  $60
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  Individual – Annual
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  ₹10000
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  $400
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  Institutional – Per Issue
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  ₹1050
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  $80
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  Institutional – Annual
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  ₹12000
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700 text-sm sm:text-base">
                  $500
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes Section */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notes
          </h2>
          <ol className="list-decimal pl-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-2">
            <li>
              <strong>Online access to articles should remain free</strong> for all users, as part of your <strong>Open Access Policy</strong>.
            </li>
            <li>
              <strong>Subscription applies only to printed copies</strong> or special packages (print + access) — optional, not required to read online.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Subscription;