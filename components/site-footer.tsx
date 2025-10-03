import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-[#2980b9]/10 dark:bg-[#1a5580]/20">
      <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div>
            <h3 className="text-lg font-medium mb-4">About MechaLeague</h3>
            <p className="text-sm text-muted-foreground mb-4">
              MechaLeague is a premier robotics competition league for students, fostering innovation, teamwork, and
              technological advancement.
            </p>
            <div className="flex gap-8">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:underline hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:underline hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link href="/contact" className="text-sm font-medium text-primary hover:underline transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex gap-4 mt-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.instagram.com/mechaleague/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
                <CardDescription>Share your thoughts about MechaLeague or our events</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button asChild size="lg" className="w-full">
                  <Link href="https://tally.so/r/nrqezM" target="_blank" rel="noopener noreferrer">
                    Submit Feedback
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="border-t py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">© 2025 MechaLeague. All rights reserved.</p>
          <Button asChild variant="outline" size="sm" className="mt-4 md:mt-0 bg-transparent">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
