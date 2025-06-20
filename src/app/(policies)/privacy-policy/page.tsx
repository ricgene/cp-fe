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

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Privacy Policy</h1>
        </div>

        <div className={styles.content}>
          <section>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.paragraph}>
              <span className={styles.paragraphHighlight}>CityPerks</span>{" "}
              (&quot;the App&quot;), operated by{" "}
              <span className={styles.paragraphHighlight}>
                Trinity Consumer Strategies Consultancy LLC
              </span>
              , is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your information when
              you use our application.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>2. Types of Data Collected</h2>
            <div className={styles.listContainer}>
              <div>
                <h3 className={styles.listTitle}>Personal Information</h3>
                <p className={styles.listText}>
                  Name, email address, phone number, and location data.
                </p>
              </div>
              <div>
                <h3 className={styles.listTitle}>Usage Data</h3>
                <p className={styles.listText}>
                  App activity, clicks, pages visited, and time spent.
                </p>
              </div>
              <div>
                <h3 className={styles.listTitle}>Device Information</h3>
                <p className={styles.listText}>
                  Device type, operating system, and IP address.
                </p>
              </div>
              <div>
                <h3 className={styles.listTitle}>Location Data</h3>
                <p className={styles.listText}>
                  GPS data used for geofencing, local deals, and city
                  information.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>3. How Data Is Collected</h2>
            <ul className={styles.list}>
              <li>
                <strong>Direct input:</strong> Through sign-up forms and user
                profiles
              </li>
              <li>
                <strong>Automatically:</strong> Via cookies, analytics tools,
                and location tracking
              </li>
              <li>
                <strong>Third parties:</strong> From integrated services like
                Google Maps or business listing APIs
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>4. How Data Is Used</h2>
            <ul className={styles.list}>
              <li>To provide and improve the app experience</li>
              <li>To personalize content (e.g., nearby offers and perks)</li>
              <li>For analytics and performance monitoring</li>
              <li>For marketing or promotional purposes (with user consent)</li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>
              5. Data Sharing and Disclosure
            </h2>
            <ul className={styles.list}>
              <li>
                With service providers (e.g., cloud hosting and analytics
                services)
              </li>
              <li>
                With municipal or business partners (using anonymized or
                aggregate data where applicable)
              </li>
              <li>
                When required by law (e.g., legal requests or fraud prevention)
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>6. User Controls and Rights</h2>
            <ul className={styles.list}>
              <li>Right to access, update, or delete personal data</li>
              <li>Option to opt-out of location sharing or marketing emails</li>
              <li>Data portability and account deactivation options</li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>7. Account Deletion</h2>
            <p className={styles.paragraph}>
              You can permanently delete your CityPerks account at any time
              through the Settings menu in the app. This action will remove your
              personal information from our active databases. Please note that
              some information may be retained in our backup systems for a
              limited period as required by law or for legitimate business
              purposes.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>8. Data Deletion</h2>
            <p className={styles.paragraph}>
              Within the app&apos;s Settings, you may delete specific data
              elements such as your profile information, saved preferences, or
              location history. Partial data deletion may affect app
              functionality and personalization features. Certain transactional
              data may be retained as required by financial regulations or
              business operations.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>9. Security Measures</h2>
            <p className={styles.paragraph}>
              We implement encryption, secure storage, and access controls to
              protect your data. Please note that while we employ robust
              security measures, no system can be 100% secure.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>10. Children&apos;s Privacy</h2>
            <p className={styles.paragraph}>
              We comply with the Children&apos;s Online Privacy Protection Act
              (COPPA). The app is not directed to children under 13, and we do
              not knowingly collect their personal information.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>
              11. Third-Party Links or Services
            </h2>
            <p className={styles.paragraph}>
              The app may contain links to external sites or use third-party
              services. These services operate under their own privacy policies,
              which we encourage you to review.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>
              12. Changes to the Privacy Policy
            </h2>
            <p className={styles.paragraph}>
              We may update this policy periodically. Users will be notified of
              significant changes through in-app alerts or email notifications.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
