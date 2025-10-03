"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/mechaleague-logo-header.png"
            alt="MechaLeague"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span className="font-bold text-xl">MechaLeague</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") && pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/tournaments"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/tournaments") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Tournaments
          </Link>
          <Link
            href="/teams"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/teams") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Teams
          </Link>
          <Link
            href="/hall-of-fame"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/hall-of-fame") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Hall of Fame
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/about") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  isActive("/") && pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="/tournaments"
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  isActive("/tournaments") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Tournaments
              </Link>
              <Link
                href="/teams"
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  isActive("/teams") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Teams
              </Link>
              <Link
                href="/hall-of-fame"
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  isActive("/hall-of-fame") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Hall of Fame
              </Link>
              <Link
                href="/about"
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  isActive("/about") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="w-20 md:block hidden"></div>
      </div>
    </header>
  )
}
