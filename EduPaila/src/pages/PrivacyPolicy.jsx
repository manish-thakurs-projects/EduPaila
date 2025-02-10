import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-slate-300">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Learn how we collect, use, and protect your data.
          </p>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">1. Information We Collect</h2>
            <p className="text-lg mt-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg mt-2">
              <li><strong>Personal Information:</strong> Name, email, phone number, or other details you provide.</li>
              <li><strong>Non-Personal Information:</strong> IP address, browser type, and device data collected automatically.</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">2. How We Use Your Information</h2>
            <p className="text-lg mt-4">
              Your information is used for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg mt-2">
              <li>Providing and improving our services.</li>
              <li>Responding to inquiries and support requests.</li>
              <li>Sending updates, newsletters, and promotions.</li>
              <li>Website analytics and enhancements.</li>
              <li>Complying with legal obligations.</li>
            </ul>
          </div>

          {/* Cookies and Tracking */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">3. Cookies and Tracking</h2>
            <p className="text-lg mt-4">
              We use cookies to enhance user experience and track website analytics.
            </p>
            <p className="text-lg mt-2">
              You can disable cookies in your browser settings, but some features may not work properly.
            </p>
          </div>

          {/* Data Security */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">4. Data Security</h2>
            <p className="text-lg mt-4">
              We use industry-standard security measures to protect your information. However, no method is 100% secure.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">5. Third-Party Services</h2>
            <p className="text-lg mt-4">
              We may use third-party services for analytics, payments, and customer support. These services have their own privacy policies.
            </p>
          </div>

          {/* Sharing Your Information */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">6. Sharing Your Information</h2>
            <p className="text-lg mt-4">
              We do not sell or rent your information. However, we may share data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg mt-2">
              <li>With service providers assisting our operations.</li>
              <li>For legal reasons or compliance with regulations.</li>
              <li>If the company undergoes a merger or acquisition.</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">7. Your Rights</h2>
            <p className="text-lg mt-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg mt-2">
              <li>Access, update, or delete your personal data.</li>
              <li>Request a copy of the information we hold.</li>
              <li>Opt-out of marketing communications.</li>
            </ul>
          </div>

          {/* Privacy Policy Changes */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">8. Changes to This Privacy Policy</h2>
            <p className="text-lg mt-4">
              We may update this Privacy Policy periodically. Changes will be posted on this page.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">9. Contact Us</h2>
            <p className="text-lg mt-4">
              If you have questions, contact us at:
            </p>
            <ul className="list-none pl-6 text-lg mt-2">
              <li>Email: <a href="mailto:edupaila.np@gmail.com" className="text-blue-500 dark:text-blue-400 hover:underline">edupaila.np@gmail.com</a></li>
              <li>Website: <a href="https://edupaila.onrender.com" className="text-blue-500 dark:text-blue-400 hover:underline">edupaila.onrender.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
