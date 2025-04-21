import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">PRIVACY</h1>
              <div className="prose max-w-none">
                <p>
                  At MechaLeague, we value and protect your privacy. We only collect the information necessary for
                  registration, participation, and the improvement of our events. We do not share personal data with
                  third parties unless required by law or with your consent. Cookies are used only to enhance your
                  experience on our site. If you have any questions about how we handle your data, feel free to contact
                  us.
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
