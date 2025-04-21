import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">TERMS</h1>
              <div className="prose max-w-none">
                <p>
                  By using this site and participating in MechaLeague activities, you agree to follow our rules, respect
                  other participants, and comply with the instructions of the organizing team. We reserve the right to
                  update these terms at any time. Participation in our events implies acceptance of possible recordings
                  or photographs for educational and promotional purposes. Failure to comply with the rules may result
                  in exclusion from the event.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">TERMS AND CONDITIONS</h2>
                <p>
                  By accessing this website and participating in MechaLeague activities, you agree to the following
                  terms and conditions:
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2">Participation</h3>
                <p>
                  All participants must complete proper registration and follow the rules established for each event.
                  MechaLeague reserves the right to accept or deny registrations.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2">Conduct</h3>
                <p>
                  Respectful and collaborative behavior is expected. Any act of discrimination, harassment, or
                  misconduct may result in removal from the event without a refund.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2">Intellectual Property</h3>
                <p>
                  All original content created by MechaLeague (including logos, educational materials, and
                  documentation) is protected by copyright and may not be reproduced without permission.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2">Participant Content</h3>
                <p>
                  By participating, you authorize MechaLeague to use photographs, videos, or content generated during
                  the event for educational and promotional purposes.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2">Modifications</h3>
                <p>
                  MechaLeague may update these terms at any time. It is the user's responsibility to review this section
                  periodically.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2">Liability</h3>
                <p>
                  MechaLeague is not responsible for personal injuries, lost belongings, or any inconveniences resulting
                  from participation in its events.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
