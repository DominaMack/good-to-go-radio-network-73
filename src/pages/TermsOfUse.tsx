import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const TermsOfUse = () => {
  const effectiveDate = "April 28, 2026";

  return (
    <Layout>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="Terms governing use of Good To Go Radio website, streaming services, and Amazon Alexa skill."
      />

      <section className="py-16 bg-background">
        <div className="container-custom max-w-4xl space-y-10 text-foreground/90">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Effective Date: {effectiveDate}</p>
            <p className="mt-4 leading-relaxed">
              These Terms of Use ("Terms") govern your access to and use of Good To Go Radio content, website, and Alexa skill.
              By using our services, you agree to these Terms.
            </p>
          </div>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">1. Eligibility and Acceptable Use</h2>
            <p className="leading-relaxed">
              You agree to use our services only for lawful purposes. You may not interfere with service operation, misuse platform features,
              attempt unauthorized access, or violate intellectual property and applicable laws.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">2. Content and Intellectual Property</h2>
            <p className="leading-relaxed">
              All trademarks, logos, station branding, text, and media made available through our platform are owned by Good To Go Radio
              or our licensors. No content may be copied, redistributed, or commercially exploited without prior written permission.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">3. Streaming and Service Availability</h2>
            <p className="leading-relaxed">
              We strive for continuous service but do not guarantee uninterrupted availability. Features, streams, and content may change,
              be suspended, or discontinued at any time.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">4. Third-Party Services</h2>
            <p className="leading-relaxed">
              Our services may link to third-party platforms, including Amazon Alexa and social media services. We are not responsible for
              third-party content, terms, or privacy practices.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">5. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              Services are provided "as is" and "as available" without warranties of any kind, express or implied, including merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">6. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, Good To Go Radio shall not be liable for indirect, incidental, special, consequential,
              or punitive damages arising from use of or inability to use the services.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">7. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold harmless Good To Go Radio and affiliates from claims, losses, liabilities, and expenses arising
              from your misuse of services or violation of these Terms.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">8. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms are governed by applicable laws of the United States and the state/jurisdiction where Good To Go Radio operates,
              without regard to conflicts-of-law principles.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">9. Updates to Terms</h2>
            <p className="leading-relaxed">
              We may revise these Terms from time to time. Continued use of services after updates means you accept the revised Terms.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-display text-3xl text-primary">10. Contact</h2>
            <p className="leading-relaxed">
              Questions about these Terms can be sent to <a className="text-primary hover:underline" href="mailto:info@goodtogoradio.com">info@goodtogoradio.com</a>.
            </p>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfUse;
