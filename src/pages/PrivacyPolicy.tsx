import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const PrivacyPolicy = () => {
  const effectiveDate = "April 28, 2026";

  return (
    <Layout>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How Good To Go Radio collects, uses, stores, and protects personal information for our Amazon Alexa skill and website services."
      />

      <section className="py-16 bg-background">
        <div className="container-custom max-w-4xl space-y-10 text-foreground/90">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Effective Date: {effectiveDate}</p>
            <p className="mt-4 leading-relaxed">
              Good To Go Radio ("we," "our," "us") respects your privacy. This Privacy Policy explains how we collect,
              use, disclose, and protect information when you use our website and our Amazon Alexa skill (the "Skill").
            </p>
          </div>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li><strong>Alexa interaction data:</strong> Voice requests and intent data needed to deliver requested audio playback.</li>
              <li><strong>Account/contact data:</strong> Information you provide directly, such as email address for support or newsletters.</li>
              <li><strong>Technical data:</strong> Device type, approximate location (if provided by platform settings), timestamps, and usage analytics.</li>
              <li><strong>Payment/business data:</strong> If you purchase advertising or station services, we may collect billing and transaction details through our payment processors.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">2. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2 leading-relaxed">
              <li>Provide and improve streaming, station discovery, and Alexa Skill responses.</li>
              <li>Process support inquiries, subscriptions, and service requests.</li>
              <li>Maintain security, prevent abuse, and comply with legal obligations.</li>
              <li>Analyze aggregate usage trends to improve content and platform reliability.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">3. How We Share Information</h2>
            <p className="leading-relaxed">
              We do not sell personal information. We may share information with trusted service providers (such as hosting,
              analytics, payment, and communications vendors), when required by law, or during a business transfer.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">4. Data Retention</h2>
            <p className="leading-relaxed">
              We retain personal data only as long as needed for the purposes described in this policy, to satisfy legal obligations,
              resolve disputes, and enforce our agreements.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">5. Your Rights and Choices</h2>
            <p className="leading-relaxed">
              Depending on your location, you may have rights to request access, correction, deletion, or restriction of personal data.
              To make a request, contact us at <a className="text-primary hover:underline" href="mailto:info@goodtogoradio.com">info@goodtogoradio.com</a>.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">6. Children&apos;s Privacy</h2>
            <p className="leading-relaxed">
              Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">7. Security</h2>
            <p className="leading-relaxed">
              We use commercially reasonable administrative, technical, and organizational safeguards to protect personal information.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">8. Updates to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically. Changes become effective when posted on this page with a revised effective date.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">9. Contact Us</h2>
            <p className="leading-relaxed">
              Good To Go Radio<br />
              Email: <a className="text-primary hover:underline" href="mailto:info@goodtogoradio.com">info@goodtogoradio.com</a>
            </p>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
