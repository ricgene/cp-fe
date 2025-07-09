import React from "react";

const styles = {
  container: "min-h-screen bg-element p-4 md:p-8",
  card: "max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden",
  header: "[background:var(--gradient-button)] p-6",
  headerTitle: "text-3xl md:text-4xl font-bold text-white",
  content: "p-6 md:p-8 space-y-8",
  sectionTitle: "text-2xl font-semibold mb-4 text-gray-800 border-b pb-2",
  paragraph: "text-gray-700 leading-relaxed",
  list: "list-disc list-inside text-gray-700 space-y-2 pl-4",
};

const CookiePolicyPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Cookie Policy</h1>
        </div>

        <div className={styles.content}>
          <section>
            <h2 className={styles.sectionTitle}>1. What Are Cookies?</h2>
            <p className={styles.paragraph}>
              Cookies are small text files stored on your device by your web
              browser when you visit websites. They are used to help websites
              function efficiently and provide information to the site owner.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>2. How We Use Cookies</h2>
            <ul className={styles.list}>
              <li>To remember your login or session preferences</li>
              <li>
                To understand how users interact with the site (analytics)
              </li>
              <li>To enhance performance and improve user experience</li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>3. Types of Cookies Used</h2>
            <ul className={styles.list}>
              <li>
                <strong>Essential Cookies:</strong> Necessary for site operation
                and security.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand usage
                patterns and improve performance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>4. Data Privacy</h2>
            <p className={styles.paragraph}>
              We do not share personal data with any third party through the use
              of cookies. All data collected via cookies is anonymized or used
              internally for product improvements.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>5. Managing Cookies</h2>
            <p className={styles.paragraph}>
              You can modify your browser settings to disable or delete cookies
              at any time. Please note that disabling cookies may impact the
              functionality of the website.
            </p>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>6. Contact Us</h2>
            <p className={styles.paragraph}>
              If you have questions regarding our cookie usage, contact us at:{" "}
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

export default CookiePolicyPage;
