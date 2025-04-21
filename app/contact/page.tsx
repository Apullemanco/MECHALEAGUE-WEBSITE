import Link from "next/link"
import { Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact MechaLeague</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Get in touch with the MechaLeague team
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-4 mt-8">
                <div className="grid grid-cols-1 gap-4">
                  <Button asChild size="lg" className="flex items-center gap-2">
                    <Link href="https://www.instagram.com/mechaleague/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4 mr-2" />
                      Follow us on Instagram
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
