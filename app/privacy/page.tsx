"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import PageHero from "@/components/ui/PageHero";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ink text-paper min-h-screen relative overflow-hidden">
      {/* 🌟 Signature Master Page Hero */}
      <PageHero
        eyebrow="WHAT WE DO WITH YOUR DATA"
        title="PRIVACY POLICY."
        description="We make the worst ads. We take your data seriously anyway. Designed to comply with India's DPDP Act 2023 and the GDPR."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col gap-10">
        <ScrollReveal className="font-mono text-xs text-muted border-l-2 border-red-bright pl-3 py-1">
          Last updated: November 6, 2026
        </ScrollReveal>

        <ScrollReveal className="flex flex-col gap-10 text-paper/90 text-sm md:text-base leading-relaxed font-body hairline-t pt-8">
          {/* Intro */}
          <div className="bg-ink-raised border border-paper/10 p-6 rounded-sm flex flex-col gap-4 text-xs md:text-sm shadow-xl">
            <p>
              This Privacy Policy explains how Worstisbetterr, a registered partnership firm, Mumbai, Maharashtra, India ("WIB", "we", "us", "our") — collects, uses, shares, and protects personal data when you visit worstisbetterr.com (the "Site") or contact us.
            </p>
            <p>
              For the purposes of India's Digital Personal Data Protection Act, 2023 ("DPDP Act") and the GDPR, the Data Controller is Worstisbetterr, a registered partnership firm, Mumbai, Maharashtra, India. Under the DPDP Act, WIB is the Data Fiduciary and you are the Data Principal. We also honour the rights of visitors located in the EU/UK under the GDPR/UK GDPR where applicable.
            </p>
            <p className="font-mono text-xs text-muted border-l-2 border-red-bright pl-3 py-1">
              Registered office: Mumbai, Maharashtra, India <br />
              Contact for privacy matters:{" "}
              <a href="mailto:projects@worstisbetterr.com" className="text-paper underline">
                projects@worstisbetterr.com
              </a>
            </p>
          </div>

          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              1. Scope
            </h2>
            <p className="text-muted leading-relaxed">
              This policy covers personal data we process through the Site and through direct interactions with you (email, project inquiries, scheduling calls). It does not cover the internal handling of a client's project materials, which is governed by the separate agreement we sign with that client.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              2. What we collect
            </h2>
            
            <div className="flex flex-col gap-2 pl-4 border-l border-paper/10">
              <h3 className="font-display text-sm font-bold uppercase text-paper">
                a. Information you give us directly
              </h3>
              <ul className="list-disc list-inside text-muted flex flex-col gap-1 text-xs md:text-sm">
                <li><strong>Project inquiries (contact form):</strong> your name, email address, brand/company name, indicative budget range, timeline, and any details you include in your message.</li>
                <li><strong>Scheduling:</strong> if you book a call via an embedded scheduling tool (e.g. Calendly), your name, email, and any details you provide to that tool.</li>
                <li><strong>Email correspondence:</strong> anything you send us when you email us directly.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 pl-4 border-l border-paper/10">
              <h3 className="font-display text-sm font-bold uppercase text-paper">
                b. Business contact information for outreach
              </h3>
              <p className="text-muted text-xs md:text-sm leading-relaxed">
                We may collect business contact details (name, role, work email, company and public professional profile) from public sources such as company websites, press coverage and professional networks, in order to contact businesses about our services. We use this only for business-to-business outreach, keep it to the minimum needed, and delete it on request. Every outreach email we send includes a simple way to opt out.
              </p>
            </div>

            <div className="flex flex-col gap-2 pl-4 border-l border-paper/10">
              <h3 className="font-display text-sm font-bold uppercase text-paper">
                c. Information collected automatically
              </h3>
              <p className="text-muted text-xs md:text-sm">
                <strong>Usage & device data:</strong> IP address, browser type, device, pages viewed, referring URLs, and similar analytics data, collected via cookies and analytics tools. (See Section 5).
              </p>
            </div>

            <div className="flex flex-col gap-2 pl-4 border-l border-paper/10">
              <h3 className="font-display text-sm font-bold uppercase text-paper">
                d. Information from embedded third-party content
              </h3>
              <p className="text-muted text-xs md:text-sm">
                The Site embeds content and pixels from third parties including Instagram/Meta and YouTube. These providers may set their own cookies and collect data about your interaction with that content, subject to their own privacy policies.
              </p>
            </div>

            <p className="text-xs font-mono text-paper/80 bg-ink p-3 rounded-sm border border-paper/10">
              We do not intentionally collect sensitive personal data (such as financial account details, health, or biometric data) through the Site. Please do not submit such information via the contact form.
            </p>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              3. How we use your data (purposes & lawful basis)
            </h2>
            <p className="text-muted">We process your data to:</p>
            <ul className="list-disc list-inside text-muted flex flex-col gap-1 text-xs md:text-sm pl-2">
              <li>respond to your inquiry, prepare proposals, and communicate about potential or ongoing projects;</li>
              <li>schedule and conduct calls or meetings;</li>
              <li>operate, secure, and improve the Site and understand how it is used;</li>
              <li>send you updates or marketing about WIB only where you have consented, and you can withdraw consent at any time (see Section 7);</li>
              <li>comply with legal obligations and enforce our Terms.</li>
            </ul>
            <p className="text-muted text-xs md:text-sm pt-2">
              Our lawful bases are your consent, and the legitimate uses / legitimate interests of operating and growing our business (such as responding to a request you initiated and keeping the Site secure), as permitted under the DPDP Act and, where relevant, the GDPR.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              4. Where your data is stored and who processes it
            </h2>
            <p className="text-muted">
              Form submissions and inquiry data are received and managed through our internal studio system (hosted on Supabase and Vercel) and stored using Google Drive / Google Workspace. We use a limited set of trusted third-party processors to run our business, which may include:
            </p>

            <div className="overflow-x-auto bg-ink-raised border border-paper/10 rounded-sm">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-paper/10 font-display uppercase text-paper/90 bg-ink">
                    <th className="p-3">Processor</th>
                    <th className="p-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-paper/10 text-muted">
                  <tr>
                    <td className="p-3 font-mono font-bold text-paper">Notion</td>
                    <td className="p-3">Managing inquiries, prospects and project tracking</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-paper">Google (Drive / Workspace)</td>
                    <td className="p-3">File storage, email, document handling</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-paper">Our internal studio system (hosted on Supabase and Vercel)</td>
                    <td className="p-3">Managing and tracking inquiries and leads</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-paper">Scheduling tool (e.g. Calendly)</td>
                    <td className="p-3">Booking calls (if used)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-paper">Analytics provider</td>
                    <td className="p-3">Understanding Site usage</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-paper">Meta / Instagram, YouTube</td>
                    <td className="p-3">Embedded content and advertising pixels</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-paper">Email / hosting providers</td>
                    <td className="p-3">Delivering the Site and our communications</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted text-xs md:text-sm">
              Some of these providers are located outside India and may process your data on servers in other countries. Where data is transferred internationally, we rely on the recipient's own safeguards and applicable contractual protections. We do not sell your personal data.
            </p>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              5. Cookies and tracking
            </h2>
            <p className="text-muted">The Site uses:</p>
            <ul className="list-disc list-inside text-muted flex flex-col gap-1 text-xs md:text-sm pl-2">
              <li><strong>Essential cookies</strong> — required for the Site to function.</li>
              <li><strong>Analytics cookies</strong> — to measure and improve Site performance.</li>
              <li><strong>Third-party / marketing cookies</strong> — set by embedded content and pixels from Meta/Instagram and YouTube, and used for measurement and advertising.</li>
            </ul>
            <p className="text-muted text-xs md:text-sm">
              Where required by law (including for visitors in the EU/UK), we will request your consent for non-essential cookies via a cookie banner, and you can change or withdraw your choices at any time. You can also control cookies through your browser settings; disabling some cookies may affect how the Site works.
            </p>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              6. How long we keep your data
            </h2>
            <p className="text-muted">
              We keep inquiry and correspondence data for as long as needed to respond to you and, if we work together, for the duration of our relationship plus a reasonable period afterwards for legal, accounting, and record-keeping purposes. Marketing data is kept until you unsubscribe or withdraw consent. Analytics data is retained per the retention settings of our analytics provider.
            </p>
          </section>

          {/* Section 7 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              7. Your rights
            </h2>
            <p className="text-muted">Subject to applicable law, you may:</p>
            <ul className="list-disc list-inside text-muted flex flex-col gap-1 text-xs md:text-sm pl-2">
              <li>access the personal data we hold about you;</li>
              <li>request correction or updating of inaccurate or incomplete data;</li>
              <li>request erasure of your data;</li>
              <li>withdraw consent at any time (including unsubscribing from marketing via the link in any marketing email);</li>
              <li>nominate another person to exercise your rights in the event of death or incapacity (as provided under the DPDP Act);</li>
              <li>raise a grievance about how we handle your data.</li>
            </ul>
            <p className="text-muted text-xs md:text-sm">
              Visitors in the EU/UK also have rights to restrict or object to processing and to data portability under the GDPR. To exercise any of these rights, email{" "}
              <a href="mailto:projects@worstisbetterr.com" className="text-red-bright font-mono underline">
                projects@worstisbetterr.com
              </a>. We will respond within the timelines required by applicable law.
            </p>
          </section>

          {/* Section 8 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              8. Grievance redressal
            </h2>
            <p className="text-muted">
              If you have any concern or complaint about our handling of your personal data, contact our grievance point of contact at{" "}
              <a href="mailto:projects@worstisbetterr.com" className="text-red-bright font-mono underline">
                projects@worstisbetterr.com
              </a>{" "}
              with the subject line "Data Grievance." We will acknowledge and work to resolve your concern in accordance with the DPDP Act. If you are unsatisfied, you may escalate to the Data Protection Board of India.
            </p>
          </section>

          {/* Section 9 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              9. Security
            </h2>
            <p className="text-muted">
              We apply reasonable technical and organisational measures to protect personal data against unauthorised access, loss, or misuse. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 10 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              10. Children
            </h2>
            <p className="text-muted">
              The Site and our services are intended for businesses and professionals and are not directed at children. We do not knowingly collect personal data from anyone under 18. Under the DPDP Act, processing a child's data requires verifiable parental consent, which we do not seek because the Site is not meant for children.
            </p>
          </section>

          {/* Section 11 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              11. Third-party links
            </h2>
            <p className="text-muted">
              The Site may link to third-party websites and platforms (including our social media). We are not responsible for their content or privacy practices. Review their policies before providing any information.
            </p>
          </section>

          {/* Section 12 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              12. Changes to this policy
            </h2>
            <p className="text-muted">
              We may update this policy from time to time. The "Last updated" date reflects the latest version. Material changes will be reflected on this page.
            </p>
          </section>

          {/* Section 13 */}
          <section className="flex flex-col gap-3 border-t border-paper/10 pt-6">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              13. Contact
            </h2>
            <p className="text-paper font-mono text-xs md:text-sm">
              Worstisbetterr (registered partnership firm) <br />
              Mumbai, Maharashtra, India <br />
              Email:{" "}
              <a href="mailto:projects@worstisbetterr.com" className="text-red-bright underline">
                projects@worstisbetterr.com
              </a>
            </p>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
