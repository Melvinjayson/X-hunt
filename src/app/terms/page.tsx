'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('terms');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="sticky top-4 space-y-1">
                <button
                  onClick={() => setActiveSection('terms')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'terms' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setActiveSection('privacy')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'privacy' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveSection('cookies')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'cookies' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Cookie Policy
                </button>
                <button
                  onClick={() => setActiveSection('community')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'community' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Community Guidelines
                </button>
                <button
                  onClick={() => setActiveSection('rewards')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'rewards' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Rewards Program Terms
                </button>
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeSection === 'terms' && 'Terms of Service'}
                  {activeSection === 'privacy' && 'Privacy Policy'}
                  {activeSection === 'cookies' && 'Cookie Policy'}
                  {activeSection === 'community' && 'Community Guidelines'}
                  {activeSection === 'rewards' && 'Rewards Program Terms'}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Last updated: June 1, 2023
                </p>
              </div>

              <div className="px-4 py-5 sm:p-6 prose max-w-none">
                {activeSection === 'terms' && <TermsOfService />}
                {activeSection === 'privacy' && <PrivacyPolicy />}
                {activeSection === 'cookies' && <CookiePolicy />}
                {activeSection === 'community' && <CommunityGuidelines />}
                {activeSection === 'rewards' && <RewardsTerms />}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TermsOfService() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
        <p>
          Welcome to X-hunt, an AI-native experience marketplace platform. These Terms of Service ("Terms") govern your access to and use of the X-hunt website, mobile application, and services (collectively, the "Service").
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">2. Definitions</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>"User"</strong> refers to individuals who register an account on X-hunt.</li>
          <li><strong>"Host"</strong> refers to Users who create and offer Experiences on the platform.</li>
          <li><strong>"Guest"</strong> refers to Users who book and participate in Experiences.</li>
          <li><strong>"Experience"</strong> refers to activities, events, tours, or services offered by Hosts on the platform.</li>
          <li><strong>"Content"</strong> refers to text, graphics, images, music, software, audio, video, information or other materials.</li>
          <li><strong>"Rewards"</strong> refers to points, tokens, or other incentives earned through participation in the X-hunt ecosystem.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">3. Account Registration and Requirements</h2>
        <p>
          To access certain features of the Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information about yourself.
        </p>
        <p>
          You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify X-hunt immediately of any unauthorized use of your account.
        </p>
        <p>
          You must be at least 18 years old to create an account. By creating an account, you represent and warrant that you are at least 18 years of age.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">4. Host Terms</h2>
        <p>
          As a Host, you are responsible for creating accurate listings for your Experiences, including descriptions, availability, pricing, and any rules or requirements for participation.
        </p>
        <p>
          You must comply with all applicable laws and regulations, including obtaining any necessary permits, licenses, or insurance for your Experiences.
        </p>
        <p>
          X-hunt reserves the right to remove any Experience listing that violates these Terms or that X-hunt determines, in its sole discretion, is harmful to the X-hunt community.
        </p>
        <p>
          Hosts agree to pay X-hunt a service fee for each booking, as outlined in the Host Agreement.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">5. Guest Terms</h2>
        <p>
          As a Guest, you are responsible for choosing Experiences that meet your interests, abilities, and requirements.
        </p>
        <p>
          You agree to follow all rules and requirements specified by the Host for participation in an Experience.
        </p>
        <p>
          You acknowledge that participation in Experiences may involve risks, and you assume full responsibility for those risks.
        </p>
        <p>
          Guests agree to pay the full amount for booked Experiences, including any applicable service fees, taxes, or other charges.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">6. Booking and Cancellation</h2>
        <p>
          Bookings are subject to availability and acceptance by the Host. A booking is not confirmed until payment is processed and you receive a confirmation from X-hunt.
        </p>
        <p>
          Cancellation policies vary by Experience and are set by the Host. You agree to review and abide by the cancellation policy for each Experience you book.
        </p>
        <p>
          X-hunt reserves the right to cancel any booking in case of emergency, safety concerns, or violation of these Terms, with or without notice.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">7. Rewards Program</h2>
        <p>
          X-hunt offers a Rewards Program that allows Users to earn and redeem rewards for various activities on the platform.
        </p>
        <p>
          Rewards have no cash value and cannot be transferred, sold, or exchanged except as expressly permitted by X-hunt.
        </p>
        <p>
          X-hunt reserves the right to modify, suspend, or terminate the Rewards Program at any time. Refer to the Rewards Program Terms for more details.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">8. Content and Intellectual Property</h2>
        <p>
          By submitting Content to X-hunt, you grant X-hunt a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such Content in connection with the Service.
        </p>
        <p>
          You represent and warrant that you own or have the necessary rights to the Content you submit, and that such Content does not violate the rights of any third party.
        </p>
        <p>
          X-hunt and its licensors own all right, title, and interest in and to the Service, including all intellectual property rights therein.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">9. Prohibited Activities</h2>
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Violating any laws or regulations</li>
          <li>Impersonating another person or entity</li>
          <li>Harassing, threatening, or intimidating other Users</li>
          <li>Posting false, misleading, or deceptive Content</li>
          <li>Attempting to access, tamper with, or use non-public areas of the Service</li>
          <li>Using the Service for any illegal or unauthorized purpose</li>
          <li>Interfering with or disrupting the Service or servers or networks connected to the Service</li>
          <li>Collecting or harvesting any information from the Service</li>
          <li>Creating multiple accounts for abusive purposes</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, X-hunt and its officers, employees, agents, partners, and suppliers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your access to or use of or inability to access or use the Service</li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">11. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless X-hunt and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">12. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
        </p>
        <p>
          Any dispute arising from or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of [Arbitration Association]. The arbitration shall be conducted in [City, State/Country].
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">13. Changes to Terms</h2>
        <p>
          X-hunt reserves the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
        </p>
        <p>
          By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">14. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at legal@xhunt.com.
        </p>
      </section>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
        <p>
          At X-hunt, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
        </p>
        <p>
          By using the Service, you consent to the data practices described in this Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">2. Information We Collect</h2>
        <h3 className="text-lg font-medium text-gray-900 mt-4">2.1 Personal Information</h3>
        <p>
          We may collect personal information that you voluntarily provide when using our Service, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Contact information (name, email address, phone number)</li>
          <li>Account credentials (username, password)</li>
          <li>Profile information (profile picture, bio, location)</li>
          <li>Payment information (credit card details, billing address)</li>
          <li>Identity verification information (government ID, date of birth)</li>
          <li>Communication with X-hunt and other users</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4">2.2 Automatically Collected Information</h3>
        <p>
          When you access our Service, we may automatically collect certain information, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Device information (device type, operating system, browser type)</li>
          <li>Log data (IP address, access times, pages viewed)</li>
          <li>Location data (with your permission)</li>
          <li>Usage information (interactions with the Service, search queries)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">3. How We Use Your Information</h2>
        <p>
          We may use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Providing, maintaining, and improving our Service</li>
          <li>Processing transactions and sending related information</li>
          <li>Verifying your identity and preventing fraud</li>
          <li>Personalizing your experience and delivering content</li>
          <li>Communicating with you about the Service, updates, and promotions</li>
          <li>Responding to your inquiries and providing customer support</li>
          <li>Monitoring and analyzing usage patterns and trends</li>
          <li>Enforcing our Terms of Service and other policies</li>
          <li>Complying with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">4. How We Share Your Information</h2>
        <p>
          We may share your information with third parties in the following circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>With Hosts and Guests:</strong> To facilitate bookings and communications between users.</li>
          <li><strong>Service Providers:</strong> With third-party vendors who provide services on our behalf.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
          <li><strong>With Your Consent:</strong> In other cases with your explicit consent.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">5. Data Retention</h2>
        <p>
          We will retain your information for as long as your account is active or as needed to provide you with our Service. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">6. Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Accessing, correcting, or deleting your personal information</li>
          <li>Withdrawing your consent to our processing of your information</li>
          <li>Requesting a copy of your personal information</li>
          <li>Objecting to or restricting certain processing activities</li>
          <li>Data portability rights</li>
        </ul>
        <p>
          To exercise these rights, please contact us at privacy@xhunt.com.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">7. Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">8. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
        </p>
        <p>
          By using our Service, you consent to the transfer of your information to countries outside your country of residence, including the United States.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">9. Children's Privacy</h2>
        <p>
          Our Service is not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">10. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">11. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@xhunt.com.
        </p>
      </section>
    </div>
  );
}

function CookiePolicy() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
        <p>
          This Cookie Policy explains how X-hunt uses cookies and similar technologies to recognize you when you visit our website or use our mobile application. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">2. What Are Cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>
        <p>
          Cookies set by the website owner (in this case, X-hunt) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">3. Types of Cookies We Use</h2>
        <h3 className="text-lg font-medium text-gray-900 mt-4">3.1 Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4">3.2 Performance Cookies</h3>
        <p>
          These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4">3.3 Functionality Cookies</h3>
        <p>
          These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4">3.4 Targeting Cookies</h3>
        <p>
          These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4">3.5 Social Media Cookies</h3>
        <p>
          These cookies are set by social media services that we have added to the site to enable you to share our content with your friends and networks. They are capable of tracking your browser across other sites and building up a profile of your interests.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">4. How to Control Cookies</h2>
        <p>
          You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
        </p>
        <p>
          Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-primary-600 hover:text-primary-500">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-primary-600 hover:text-primary-500">www.allaboutcookies.org</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">5. Other Tracking Technologies</h2>
        <p>
          In addition to cookies, we may use other similar technologies, such as web beacons (sometimes called "tracking pixels" or "clear gifs"), to track user behavior and collect data about how you use our website. Web beacons are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our website or opened an email that we have sent them.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">6. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">7. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or other technologies, please contact us at privacy@xhunt.com.
        </p>
      </section>
    </div>
  );
}

function CommunityGuidelines() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
        <p>
          At X-hunt, we're building a global community where people can create, share, and participate in unique experiences. These Community Guidelines outline the values and behaviors we expect from all members of our community to ensure X-hunt remains a safe, inclusive, and positive platform for everyone.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">2. Our Core Values</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Respect:</strong> Treat all community members with dignity and courtesy.</li>
          <li><strong>Inclusion:</strong> Welcome people of all backgrounds and identities.</li>
          <li><strong>Safety:</strong> Prioritize the physical and emotional well-being of all users.</li>
          <li><strong>Authenticity:</strong> Be genuine in your interactions and offerings.</li>
          <li><strong>Responsibility:</strong> Take ownership of your actions and their impact.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">3. Expected Behavior</h2>
        <h3 className="text-lg font-medium text-gray-900 mt-4">3.1 For All Users</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Communicate respectfully and constructively</li>
          <li>Provide accurate information in your profile and communications</li>
          <li>Respect the privacy and personal boundaries of others</li>
          <li>Report any concerning behavior or content to X-hunt</li>
          <li>Follow all applicable laws and regulations</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4">3.2 For Hosts</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Accurately describe your experiences, including any risks or requirements</li>
          <li>Maintain clean, safe, and accessible environments for your experiences</li>
          <li>Be responsive to guest inquiries and concerns</li>
          <li>Honor all bookings and commitments</li>
          <li>Obtain necessary permits, licenses, and insurance</li>
          <li>Provide the experience as described</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4">3.3 For Guests</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Respect the host's property, rules, and guidelines</li>
          <li>Arrive on time and prepared for the experience</li>
          <li>Communicate any special needs or concerns in advance</li>
          <li>Leave honest and constructive reviews</li>
          <li>Honor your bookings and commitments</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">4. Prohibited Behavior</h2>
        <p>
          The following behaviors are prohibited on X-hunt and may result in account suspension or termination:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Harassment, discrimination, or hate speech based on race, ethnicity, national origin, religion, gender, gender identity, disability, sexual orientation, or other protected characteristics</li>
          <li>Threats, violence, or intimidation</li>
          <li>Sexual harassment or unwelcome sexual advances</li>
          <li>Sharing explicit or pornographic content</li>
          <li>Promoting illegal activities or substances</li>
          <li>Spam, scams, or deceptive practices</li>
          <li>Impersonating others or creating fake accounts</li>
          <li>Infringing on intellectual property rights</li>
          <li>Sharing personal information of others without consent</li>
          <li>Creating experiences that pose unreasonable safety risks</li>
          <li>Manipulating reviews or ratings</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">5. Content Guidelines</h2>
        <p>
          All content posted on X-hunt, including experience descriptions, photos, reviews, and messages, should:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Be accurate and not misleading</li>
          <li>Respect the privacy and dignity of others</li>
          <li>Not contain hate speech, profanity, or offensive material</li>
          <li>Not infringe on copyrights, trademarks, or other intellectual property rights</li>
          <li>Not promote illegal activities or services</li>
          <li>Not include spam or irrelevant commercial content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">6. Safety Guidelines</h2>
        <h3 className="text-lg font-medium text-gray-900 mt-4">6.1 For Hosts</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Clearly communicate any risks associated with your experience</li>
          <li>Provide appropriate safety equipment and instructions</li>
          <li>Have emergency procedures in place</li>
          <li>Maintain appropriate insurance coverage</li>
          <li>Verify that participants meet any age, health, or skill requirements</li>
          <li>Never pressure guests to participate in activities they're uncomfortable with</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4">6.2 For Guests</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Research experiences thoroughly before booking</li>
          <li>Disclose any relevant health conditions or limitations to the host</li>
          <li>Follow all safety instructions provided by the host</li>
          <li>Do not participate in activities beyond your comfort or skill level</li>
          <li>Report any safety concerns to X-hunt immediately</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">7. Reporting and Enforcement</h2>
        <p>
          If you encounter content or behavior that violates these guidelines, please report it to X-hunt immediately. We review all reports and take appropriate action, which may include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Removing content</li>
          <li>Issuing warnings</li>
          <li>Temporarily suspending accounts</li>
          <li>Permanently banning users</li>
          <li>Reporting to law enforcement when necessary</li>
        </ul>
        <p>
          X-hunt reserves the right to make the final decision on whether content or behavior violates our Community Guidelines.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">8. Changes to These Guidelines</h2>
        <p>
          X-hunt may update these Community Guidelines from time to time. We will notify users of any significant changes through our website or email.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">9. Contact Us</h2>
        <p>
          If you have any questions about these Community Guidelines, please contact us at community@xhunt.com.
        </p>
      </section>
    </div>
  );
}

function RewardsTerms() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
        <p>
          The X-hunt Rewards Program ("Program") allows users to earn and redeem rewards for various activities on the X-hunt platform. These Rewards Program Terms ("Rewards Terms") govern your participation in the Program.
        </p>
        <p>
          By participating in the Program, you agree to these Rewards Terms. If you do not agree, you may not participate in the Program.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">2. Eligibility</h2>
        <p>
          To participate in the Program, you must:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Have a registered X-hunt account in good standing</li>
          <li>Be at least 18 years of age</li>
          <li>Comply with these Rewards Terms and the X-hunt Terms of Service</li>
        </ul>
        <p>
          X-hunt reserves the right to determine eligibility for the Program at its sole discretion.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">3. Earning Rewards</h2>
        <p>
          You can earn rewards through various activities on the X-hunt platform, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Completing experiences</li>
          <li>Participating in challenges</li>
          <li>Writing reviews</li>
          <li>Referring new users</li>
          <li>Creating and hosting experiences</li>
          <li>Engaging with the X-hunt community</li>
          <li>Special promotions and events</li>
        </ul>
        <p>
          The number of rewards earned for each activity may vary and is determined by X-hunt at its sole discretion. X-hunt may change the rewards structure at any time with or without notice.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">4. Types of Rewards</h2>
        <p>
          The Program may include various types of rewards, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>XP (Experience Points):</strong> Measures your level and status in the X-hunt community</li>
          <li><strong>Points:</strong> Can be redeemed for discounts, experiences, or merchandise</li>
          <li><strong>Tokens:</strong> Digital assets that may have value within the X-hunt ecosystem or on supported platforms</li>
          <li><strong>Badges:</strong> Recognition for achievements and milestones</li>
          <li><strong>Levels:</strong> Status tiers that may provide additional benefits and privileges</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">5. Redeeming Rewards</h2>
        <p>
          Rewards may be redeemed for various benefits, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Discounts on experiences</li>
          <li>Free experiences</li>
          <li>Merchandise</li>
          <li>Exclusive access to premium experiences</li>
          <li>Conversion to cryptocurrency tokens (where available)</li>
        </ul>
        <p>
          The availability of redemption options may vary based on your location, level, and the type of rewards you have earned. X-hunt reserves the right to modify, add, or remove redemption options at any time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">6. Expiration and Forfeiture</h2>
        <p>
          Unless otherwise specified:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>XP does not expire</li>
          <li>Points expire 12 months after the date they were earned if there is no account activity</li>
          <li>Tokens do not expire but may be subject to specific terms based on the token type</li>
          <li>Badges do not expire</li>
        </ul>
        <p>
          Rewards may be forfeited in the following circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Violation of these Rewards Terms or the X-hunt Terms of Service</li>
          <li>Fraudulent or abusive activity related to earning or redeeming rewards</li>
          <li>Account closure or termination</li>
          <li>Inactivity for a period of 24 months or more</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">7. Limitations and Restrictions</h2>
        <p>
          The following limitations and restrictions apply to the Program:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Rewards have no cash value and cannot be exchanged for cash</li>
          <li>Rewards cannot be transferred, sold, or assigned to other users unless explicitly permitted by X-hunt</li>
          <li>Rewards cannot be earned for canceled or refunded experiences</li>
          <li>X-hunt may impose limits on the number of rewards that can be earned or redeemed within a specific time period</li>
          <li>Redemption of rewards may be subject to availability and other restrictions</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">8. Program Modifications and Termination</h2>
        <p>
          X-hunt reserves the right to modify or terminate the Program, in whole or in part, at any time with or without notice. Modifications may include, but are not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Changing the number of rewards earned for specific activities</li>
          <li>Adding or removing ways to earn or redeem rewards</li>
          <li>Changing the types of rewards offered</li>
          <li>Adjusting expiration policies</li>
          <li>Implementing new program rules or restrictions</li>
        </ul>
        <p>
          In the event of Program termination, X-hunt will provide at least 30 days' notice and may, at its discretion, provide a method for users to redeem existing rewards before the termination date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">9. Taxes</h2>
        <p>
          You are responsible for any tax consequences that may result from your participation in the Program, including earning or redeeming rewards. X-hunt does not provide tax advice, and you should consult with a tax professional regarding any tax implications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">10. Disputes</h2>
        <p>
          Any disputes regarding the Program, including but not limited to the earning, redemption, or expiration of rewards, will be resolved by X-hunt in its sole discretion.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">11. Contact Us</h2>
        <p>
          If you have any questions about the Rewards Program, please contact us at rewards@xhunt.com.
        </p>
      </section>
    </div>
  );
}