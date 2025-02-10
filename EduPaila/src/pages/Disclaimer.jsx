import React from 'react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Disclaimer</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Please read the following disclaimer carefully before using our services.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">1. General Information</h2>
            <p className="text-lg mt-4">
              The content provided on <strong>EduPaila</strong> (edupaila.onrender.com) is for informational purposes only. We make no representations or warranties regarding the accuracy, completeness, or reliability of any content or services offered through this website.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">2. Refund Policy</h2>
            <p className="text-lg mt-4">
              In case of cancellation of services or orders, only <strong>30% of the amount</strong> paid will be refunded. The remaining 70% is non-refundable, as it covers the administrative and processing fees.
            </p>
            <p className="text-lg mt-4">
              Refunds will be processed within 7 business days from the date of the cancellation request. Refunds are made using the same payment method used for the original transaction.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">3. Limitation of Liability</h2>
            <p className="text-lg mt-4">
              <strong>EduPaila</strong> is not liable for any direct, indirect, incidental, or consequential damages arising from the use of this website, including but not limited to any errors in the content, loss of data, or interruptions in services.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">4. No Guarantee of Results</h2>
            <p className="text-lg mt-4">
              While we strive to provide high-quality content and services, we do not guarantee specific results from using the services or information available on <strong>EduPaila</strong>. The effectiveness of our services depends on various factors and may vary for each user.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">5. External Links</h2>
            <p className="text-lg mt-4">
              Our website may contain links to third-party websites that are not controlled or operated by us. We are not responsible for the content or practices of any third-party websites and encourage you to review their privacy policies and terms of use.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">6. Changes to the Disclaimer</h2>
            <p className="text-lg mt-4">
              We reserve the right to modify this disclaimer at any time. Any changes will be posted on this page, and the updated disclaimer will be effective immediately upon posting.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">7. Contact Us</h2>
            <p className="text-lg mt-4">
              If you have any questions or concerns regarding this disclaimer, please contact us at:
              <br />
              <a href="mailto:edupaila.np@gmail.com" className="text-blue-500 dark:text-blue-400 hover:underline">edupaila.np@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
