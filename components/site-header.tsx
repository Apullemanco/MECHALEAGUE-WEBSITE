"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NotificationCenter } from "@/components/notification-center"
import { AuthButtons } from "@/components/auth-buttons"
import { useEffect, useState } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLoggedIn = localStorage.getItem("userLoggedIn")
      setIsLoggedIn(userLoggedIn === "true")
    }
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/teams", label: "Teams" },
    { href: "/tournaments", label: "Tournaments" },
    { href: "/hall-of-fame", label: "Hall of Fame" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 md:gap-6 lg:gap-10">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl whitespace-nowrap">
            <Image
              src="/images/mechaleague-logo-header.png"
              alt="MechaLeague"
              width={24}
              height={24}
              className="h-[1em] w-auto"
            />
            <span className="hidden sm:inline">MechaLeague</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <div className="hidden md:block">
              <NotificationCenter />
            </div>
          )}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <AuthButtons />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
