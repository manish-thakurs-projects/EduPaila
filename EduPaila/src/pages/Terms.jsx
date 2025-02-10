import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Please read these terms and conditions carefully before using our
            website.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="text-lg mt-4">
              By accessing and using <strong>EduPaila</strong>{" "}
              (edupaila.onrender.com), you agree to comply with these Terms and
              Conditions. If you do not agree to these terms, please do not use
              the website.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              2. Changes to Terms
            </h2>
            <p className="text-lg mt-4">
              We reserve the right to update these Terms at any time. Changes
              will be posted on this page, and they will become effective
              immediately upon posting. Please review these Terms periodically.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              3. Use of the Website
            </h2>
            <p className="text-lg mt-4">
              You agree to use the website only for lawful purposes. You must
              not use the website to engage in any illegal activities or to
              infringe on the rights of others.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              4. Account Registration
            </h2>
            <p className="text-lg mt-4">
              Some features may require you to create an account. You are
              responsible for maintaining the confidentiality of your account
              and password. Please ensure your account information is accurate.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              5. Privacy Policy
            </h2>
            <p className="text-lg mt-4">
              Your use of the website is also governed by our{" "}
              <a
                href="/privacypolicy"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
              , which outlines how we collect and use your personal information.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              6. Content and Intellectual Property
            </h2>
            <p className="text-lg mt-4">
              All content provided on <strong>EduPaila</strong> is the property
              of the website or its licensors and is protected by intellectual
              property laws. You may not use, copy, or distribute the content
              without our permission.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              7. User-Generated Content
            </h2>
            <p className="text-lg mt-4">
              You may submit content to the website, such as reviews or
              comments. You grant <strong>EduPaila</strong> a non-exclusive
              license to use, display, and modify such content. You are
              responsible for ensuring that your content does not infringe on
              the rights of others.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              8. Third-Party Links
            </h2>
            <p className="text-lg mt-4">
              The website may contain links to third-party websites. We are not
              responsible for the content or practices of these external sites.
              You access third-party websites at your own risk.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              9. Disclaimers and Limitation of Liability
            </h2>
            <p className="text-lg mt-4">
              <strong>EduPaila</strong> provides the website "as is" and makes
              no warranties regarding its accuracy or availability. We will not
              be liable for any damages resulting from your use of the website.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              10. Termination
            </h2>
            <p className="text-lg mt-4">
              We reserve the right to suspend or terminate your access to the
              website if you violate these Terms.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              11. Governing Law
            </h2>
            <p className="text-lg mt-4">
              These Terms are governed by the laws of Nepal. Any disputes will
              be subject to the jurisdiction of the courts in Nepal.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              12. Contact Us
            </h2>
            <p className="text-lg mt-4">
              If you have any questions about these Terms, please contact us at:
              <br />
              <a
                href="mailto:edupaila.np@gmail.com"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                edupaila.np@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
