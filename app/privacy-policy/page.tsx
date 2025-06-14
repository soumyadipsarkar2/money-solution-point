import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 md:px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none">
        <p>
          At Money Solution Point, we value your privacy and are committed to protecting the personal data you share
          with us. This Privacy Policy outlines how we collect, use, and protect your information when you visit our
          website or use our services. By using our services, you agree to the practices described in this policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect the following types of information to provide you with the best services:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> This includes your name, address, phone number, email address, date
            of birth, and financial details.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect information about how you interact with our website, such as your IP
            address, browser type, pages visited, and time spent on our site. This helps us improve our services and
            enhance your experience.
          </li>
          <li>
            <strong>Cookies:</strong> We use cookies to enhance user experience, track usage, and offer personalized
            services. Cookies are small data files stored on your device, which you can manage through your browser
            settings.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>To Provide Services:</strong> To process loan applications, offer financial products, and provide
            customer support.
          </li>
          <li>
            <strong>For Communication:</strong> To send you relevant information, such as loan offers, updates, and
            reminders via email, phone, or SMS.
          </li>
          <li>
            <strong>For Security and Compliance:</strong> To ensure the security of our website, detect fraud, and
            comply with applicable laws and regulations.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing Your Information</h2>
        <p>
          We will not sell or rent your personal data to third parties. However, we may share your information under the
          following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>With Service Providers:</strong> We may share your information with trusted third-party service
            providers who help us process loans, offer customer support, and manage our website.
          </li>
          <li>
            <strong>With Legal Authorities:</strong> If required by law, we may share your information to comply with
            legal obligations or protect our rights.
          </li>
          <li>
            <strong>With Business Partners:</strong> If we enter into a partnership or merger, your data may be
            transferred to the new entity in accordance with this Privacy Policy.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Retention</h2>
        <p>
          We retain your personal data only as long as necessary to fulfill the purposes outlined in this Privacy Policy
          or as required by law. Once your information is no longer needed, we will securely delete or anonymize it.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Access:</strong> You can request a copy of the personal data we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> You can request corrections to any inaccurate or incomplete information.
          </li>
          <li>
            <strong>Deletion:</strong> You can request the deletion of your personal data, subject to legal and
            contractual obligations.
          </li>
          <li>
            <strong>Opt-out:</strong> You can opt out of receiving marketing communications at any time.
          </li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided below.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Security of Your Information</h2>
        <p>
          We use industry-standard security measures to protect your personal data from unauthorized access, loss, or
          misuse. However, no method of online transmission or electronic storage is 100% secure, and we cannot
          guarantee absolute security.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites that are not under our control. We are not responsible
          for the privacy practices or content of these external websites. Please review their privacy policies before
          sharing any personal data.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update or modify this Privacy Policy at any time. Any changes will be reflected on
          this page with an updated revision date. Please review this policy periodically to stay informed about how we
          are protecting your data.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please
          contact us at:
        </p>
        <div className="mt-4">
          <p>
            <strong>Money Solution Point</strong>
          </p>
          <p>
            Email:{" "}
            <Link href="mailto:moneysolutionpoint2004@gmail.com" className="text-primary hover:underline">
              moneysolutionpoint2004@gmail.com
            </Link>
          </p>
          <p>
            Phone:{" "}
            <Link href="tel:+918057348348" className="text-primary hover:underline">
              +91-8057348348
            </Link>
          </p>
          <p>Address: 664/2, Mangal Pandey Nagar, Near Sapna Hospital, Meerut-250003</p>
        </div>

        <p className="mt-8">
          By using our website and services, you consent to the collection and use of your data as described in this
          Privacy Policy.
        </p>
      </div>
    </div>
  )
}
