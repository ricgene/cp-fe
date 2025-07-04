import React from "react";

const styles = {
  container: "min-h-screen bg-element p-4 md:p-8",
  card: "max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden",
  header: "[background:var(--gradient-button)] p-6",
  headerTitle: "text-3xl md:text-4xl font-bold text-white",
  content: "p-6 md:p-8 space-y-8",
  sectionTitle: "text-2xl font-semibold mb-4 text-gray-800 border-b pb-2",
  paragraph: "text-gray-700 leading-relaxed",
  paragraphHighlight: "font-medium",
  listContainer: "space-y-4",
  listTitle: "text-lg font-medium text-gray-800 mb-2",
  listText: "text-gray-700 ml-4",
  list: "list-disc list-inside text-gray-700 space-y-2 pl-4",
};

const TermsAndConditionsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Terms & Conditions</h1>
        </div>

        <div className={styles.content}>
          <section>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.paragraph}>
              <span className={styles.paragraphHighlight}>CityPerks</span>{" "}
              (&quot;the App&quot;) is operated by{" "}
              <span className={styles.paragraphHighlight}>
                Trinity Consumer Strategies Consultancy LLC
              </span>
              . By accessing or using the App, you agree to be bound by these
              Terms & Conditions. Please read them carefully before using our
              services.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>2. Eligibility</h2>
            <p className={styles.paragraph}>
              You must be at least 18 years old or have reached the age of
              majority in your jurisdiction to use the App. By using the App,
              you confirm that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>3. User Obligations</h2>
            <ul className={styles.list}>
              <li>You agree to provide accurate and complete information.</li>
              <li>
                You will not use the App for any unlawful or unauthorized
                purpose.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>4. App Usage Guidelines</h2>
            <ul className={styles.list}>
              <li>Do not misuse, abuse, or attempt to exploit the App.</li>
              <li>Respect the rights and experiences of other users.</li>
              <li>
                Do not attempt to reverse engineer or interfere with the App’s
                functionality.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>5. Intellectual Property</h2>
            <p className={styles.paragraph}>
              All content, logos, features, and functionality on the App are the
              exclusive property of{" "}
              <span className={styles.paragraphHighlight}>
                Trinity Consumer Strategies Consultancy LLC
              </span>
              , unless otherwise stated. You may not use or reproduce them
              without written permission.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>6. Termination</h2>
            <p className={styles.paragraph}>
              We reserve the right to suspend or terminate your access to the
              App at our discretion, with or without notice, for behavior that
              violates these terms or is otherwise harmful to the App or its
              users.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>7. Account Deletion</h2>
            <p className={styles.paragraph}>
              You may delete your account at any time through the Settings
              section of the App. Deletion is permanent and will remove your
              access and data subject to any legal or regulatory requirements.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>
              8. Rewards and Points System
            </h2>
            <p className={styles.paragraph}>
              CityPerks includes a loyalty program that allows users to earn and
              redeem points based on their interactions with the platform and
              participating partners. By using CityPerks, you agree to the
              following terms regarding the points and rewards system:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>a. Eligibility:</strong> All registered users of the
                CityPerks mobile app are eligible to participate in the rewards
                program, unless restricted by local laws or app-specific rules.
              </li>
              <li>
                <strong>b. Earning Points:</strong> Points are awarded manually
                by CityPerks administrators based on user actions or
                participation in verified activities. These actions may include
                visiting partner locations, attending events, completing
                promotions, or other engagement activities as determined by
                CityPerks. Not all user actions are guaranteed to earn points,
                and the criteria may change without notice.
              </li>
              <li>
                <strong>c. Redeeming Points:</strong> Users can redeem earned
                points within the app for available perks, offers, or rewards.
                Points are non-transferable, have no cash value, and cannot be
                exchanged for money unless explicitly stated.
              </li>
              <li>
                <strong>d. Expiration and Changes:</strong> Points may expire
                after a certain period of inactivity or at the discretion of
                CityPerks. We reserve the right to modify the rules, available
                rewards, or the structure of the program at any time.
              </li>
              <li>
                <strong>e. Abuse or Misuse:</strong> Any fraudulent, abusive, or
                manipulative behavior (including attempting to falsely trigger
                rewards) may result in the revocation of points and account
                suspension or termination.
              </li>
              <li>
                <strong>f. Policy Updates:</strong> We may update these terms
                periodically. Continued use of the app implies your acceptance
                of the latest version of this policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>9. Modifications to the App</h2>
            <p className={styles.paragraph}>
              We reserve the right to modify, suspend, or discontinue the App
              (or any part of it) at any time without notice. We will not be
              liable to you or any third party for any such changes.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>10. Disclaimers</h2>
            <p className={styles.paragraph}>
              The App is provided &quot;as is&quot; without warranties of any
              kind. We do not guarantee that the App will be secure, error-free,
              or continuously available.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>11. Limitation of Liability</h2>
            <p className={styles.paragraph}>
              To the maximum extent permitted by law, we shall not be liable for
              any indirect, incidental, special, or consequential damages
              arising from your use of the App.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>
              12. Third-Party Services and Links
            </h2>
            <p className={styles.paragraph}>
              The App may contain links or integrations with third-party
              services. We are not responsible for their content, terms, or
              practices. Use them at your own risk.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>13. Changes to These Terms</h2>
            <p className={styles.paragraph}>
              We may update these Terms & Conditions from time to time. Any
              changes will be posted on this page with an updated revision date.
              Continued use of the App signifies acceptance of the changes.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>14. Contact Information</h2>
            <p className={styles.paragraph}>
              If you have questions or concerns about these Terms & Conditions,
              feel free to contact us at:{" "}
              <a
                href="mailto:help.cityperks@gmail.com"
                className="text-blue-600 underline font-medium"
              >
                help.cityperks@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
