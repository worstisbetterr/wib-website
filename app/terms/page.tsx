"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import PageHero from "@/components/ui/PageHero";
import React from "react";

export default function TermsOfUsePage() {
  return (
    <div className="bg-ink text-paper min-h-screen relative overflow-hidden">
      {/* 🌟 Signature Master Page Hero */}
      <PageHero
        eyebrow="THE FINE PRINT (WE MEAN IT)"
        title="TERMS OF USE."
        description="The worst ads. The most serious terms. Governing your access and use of worstisbetterr.com."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col gap-10">
        <ScrollReveal className="font-mono text-xs text-muted border-l-2 border-red-bright pl-3 py-1">
          Last updated: November 6, 2026
        </ScrollReveal>

        <ScrollReveal className="flex flex-col gap-10 text-paper/90 text-sm md:text-base leading-relaxed font-body hairline-t pt-8">
          {/* Preamble */}
          <div className="bg-ink-raised border border-paper/10 p-6 rounded-sm flex flex-col gap-4 text-xs md:text-sm shadow-xl">
            <p>
              These Terms of Use ("Terms") govern your access to and use of worstisbetterr.com (the "Site"), operated by Worstisbetterr, a registered partnership firm operating the brand Worstisbetterr ("WIB", "we", "us", "our"). By accessing or using the Site, you agree to these Terms. If you do not agree, please do not use the Site.
            </p>
          </div>

          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              1. Who we are
            </h2>
            <p className="text-muted leading-relaxed">
              WIB is an AI-native creative studio producing AI commercials, campaigns, and creative assets. The Site is a portfolio and information platform. Nothing on the Site is an offer capable of acceptance, a guarantee of results, or professional advice.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              2. Use of the Site
            </h2>
            <p className="text-muted">
              You may view and use the Site for lawful, personal, and legitimate business purposes. You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted flex flex-col gap-1 text-xs md:text-sm pl-2">
              <li>copy, reproduce, scrape, republish, or redistribute Site content except as allowed in Section 3;</li>
              <li>use the Site to infringe any law or third-party right;</li>
              <li>attempt to gain unauthorised access to, disrupt, or interfere with the Site or its infrastructure;</li>
              <li>use automated systems to extract data from the Site without our written permission;</li>
              <li>misrepresent your identity or affiliation when contacting us.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              3. Intellectual property — the Site
            </h2>
            <p className="text-muted leading-relaxed">
              All content on the Site — including the Worstisbetterr name, logo, the chevron mark, wordmark, tagline "we make the worst ads," design, copy, layout, and showcased creative work — is owned by WIB or its licensors and is protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable licence to view the Site for its intended purpose. No other rights are granted. You may not use our name, marks, or work without our prior written consent.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              4. Project work and intellectual property
            </h2>
            <p className="text-muted leading-relaxed">
              Any engagement to produce creative work for a client is governed by a separate written agreement (proposal, statement of work, or master services agreement) signed between WIB and that client. Those signed agreements — not these Terms — determine the commercial and IP terms of a project. In the absence of, or unless expressly varied by, a signed agreement, the following default principles apply:
            </p>
            
            <div className="flex flex-col gap-3 pl-4 border-l border-paper/10">
              <h3 className="font-display text-sm font-bold uppercase text-paper">
                Deliverables
              </h3>
              <p className="text-muted text-xs md:text-sm">
                On full payment, the client receives full usage rights to the final delivered files. Worstisbetterr keeps everything else, including project files, raw generations, prompts, workflows and methods.
              </p>

              <h3 className="font-display text-sm font-bold uppercase text-paper pt-2">
                WIB's underlying materials
              </h3>
              <p className="text-muted text-xs md:text-sm">
                WIB retains all rights in its own pre-existing and independently developed materials, including its workflows, processes, prompts, prompt systems, models, methods, techniques, tools, software, and know-how used to produce the work. Transfer of a deliverable does not transfer these underlying materials, and WIB may continue to use and reuse them freely.
              </p>

              <h3 className="font-display text-sm font-bold uppercase text-paper pt-2">
                Third-party and AI-generated components
              </h3>
              <p className="text-muted text-xs md:text-sm">
                Some assets may be produced using third-party tools and AI systems and may be subject to those tools' terms and to limitations in the legal protectability of AI-generated outputs. WIB does not warrant exclusive ownership of components it does not solely control, and this will be addressed in the client agreement.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              5. Portfolio and showcase rights
            </h2>
            <p className="text-muted leading-relaxed">
              Worstisbetterr receives credit and portfolio rights on every project. Nothing is shown before the client's public release. A client may delay release by written agreement with a fixed end date.
            </p>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              6. Independent work
            </h2>
            <p className="text-muted leading-relaxed">
              Some work shown on the Site is independent work: films we made on our own initiative to demonstrate our craft. This work is not commissioned by, endorsed by, or affiliated with the brands shown. All brand names, logos and trademarks belong to their respective owners. If you represent a brand shown on the Site and would like the work removed, email{" "}
              <a href="mailto:projects@worstisbetterr.com" className="text-red-bright underline">
                projects@worstisbetterr.com
              </a>{" "}
              and we will act on it promptly.
            </p>
          </section>

          {/* Section 7 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              7. Inquiries and submissions
            </h2>
            <p className="text-muted leading-relaxed">
              Information you submit through the contact form or by email is handled under our Privacy Policy. Unless we have signed a non-disclosure agreement with you, any idea, brief, or material you send us is not treated as confidential, and submitting it does not create any partnership, engagement, or obligation on our part. Do not send us confidential or sensitive information before an NDA or agreement is in place.
            </p>
          </section>

          {/* Section 8 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              8. Third-party links and services
            </h2>
            <p className="text-muted leading-relaxed">
              The Site may link to or embed third-party websites, platforms, and content (including Instagram, YouTube, and scheduling tools). We do not control and are not responsible for third-party content, services, or practices. Your use of them is at your own risk and subject to their terms.
            </p>
          </section>

          {/* Section 9 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              9. Disclaimers
            </h2>
            <p className="text-muted leading-relaxed">
              The Site and its content are provided "as is" and "as available," without warranties of any kind, express or implied, including fitness for a particular purpose, accuracy, or non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or secure. Any reliance on Site content is at your own risk.
            </p>
          </section>

          {/* Section 10 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              10. Limitation of liability
            </h2>
            <p className="text-muted leading-relaxed">
              To the maximum extent permitted by law, WIB and its partners, employees, and contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising from your use of or inability to use the Site. Our total aggregate liability arising out of or relating to the Site shall not exceed INR 10,000 (Indian Rupees ten thousand) or the amount you paid us in connection with the Site, whichever is lower. Nothing in these Terms excludes liability that cannot be excluded under law.
            </p>
          </section>

          {/* Section 11 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              11. Indemnity
            </h2>
            <p className="text-muted leading-relaxed">
              You agree to indemnify and hold WIB harmless from any claims, losses, liabilities, and expenses (including reasonable legal fees) arising from your misuse of the Site or breach of these Terms.
            </p>
          </section>

          {/* Section 12 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              12. Privacy
            </h2>
            <p className="text-muted leading-relaxed">
              Your use of the Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          {/* Section 13 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              13. Changes to these Terms
            </h2>
            <p className="text-muted leading-relaxed">
              We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms. The "Last updated" date reflects the current version.
            </p>
          </section>

          {/* Section 14 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              14. Governing law and jurisdiction
            </h2>
            <p className="text-muted leading-relaxed">
              These Terms are governed by the laws of India. Subject to any applicable law, the courts at Mumbai, Maharashtra, India shall have exclusive jurisdiction over any dispute arising out of or in connection with the Site or these Terms.
            </p>
          </section>

          {/* Section 15 */}
          <section className="flex flex-col gap-3 border-t border-paper/10 pt-6">
            <h2 className="text-lg font-display font-bold uppercase text-paper tracking-wider text-red-bright">
              15. Contact
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
