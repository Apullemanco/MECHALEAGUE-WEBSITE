"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Instagram, Star, Bell, Settings, User, Menu, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { NotificationCenter } from "@/components/notification-center"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [userAvatar, setUserAvatar] = useState("/placeholder.svg")
  const isMobile = useMobile()

  // Check login status
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn === "true") {
      setIsLoggedIn(true)
      setUserName(localStorage.getItem("userName") || "User")

      // Get user avatar
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      if (currentUser && currentUser.avatar) {
        setUserAvatar(currentUser.avatar)
      }

      // Count unread notifications
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const unread = notifications.filter((n) => !n.read).length
      setUnreadNotifications(unread)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("currentUser")
    setIsLoggedIn(false)
    window.location.href = "/"
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)

    // Mark notifications as read when opened
    if (!showNotifications) {
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      const updatedNotifications = notifications.map((n) => ({ ...n, read: true }))
      localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
      setUnreadNotifications(0)
    }
  }

  const NavLinks = ({ inMobileMenu = false, onItemClick = () => {} }) => (
    <>
      <Link
        href="/"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        Home
      </Link>
      {!isLoggedIn && (
        <Link
          href="/register"
          className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
          onClick={onItemClick}
        >
          <Star className={`h-3 w-3 mr-1 ${inMobileMenu ? "text-primary" : "text-white"}`} />
          Create Account
        </Link>
      )}
      <Link
        href="/teams"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        Teams
      </Link>
      <Link
        href="/rankings"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        Rankings
      </Link>
      <Link
        href="/hall-of-fame"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        Hall of Fame
      </Link>
      <Link
        href="/tournaments"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        Tournaments
      </Link>
      <Link
        href="/store"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        <ShoppingCart className={`h-3 w-3 mr-1 ${inMobileMenu ? "text-primary" : "text-white"}`} />
        Store
      </Link>
      <Link
        href="/insights"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        Insights
      </Link>
      <Link
        href="/about"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white/80 hover:text-white"} transition-colors`}
        onClick={onItemClick}
      >
        About
      </Link>
      <Link
        href="https://www.twitch.tv/apullemex"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center text-sm font-medium ${inMobileMenu ? "text-foreground hover:text-primary py-2" : "text-white hover:text-white/80"} transition-colors`}
        onClick={onItemClick}
      >
        Live Game
      </Link>
      {inMobileMenu && (
        <>
          <Link
            href="https://www.instagram.com/mechaleague/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-foreground hover:text-primary py-2 transition-colors"
            onClick={onItemClick}
          >
            <Instagram className="h-4 w-4 mr-2 text-primary" />
            Instagram
          </Link>
          {isLoggedIn && (
            <>
              <Link
                href="/profile"
                className="flex items-center text-sm font-medium text-foreground hover:text-primary py-2 transition-colors"
                onClick={onItemClick}
              >
                <User className="h-4 w-4 mr-2 text-primary" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center text-sm font-medium text-foreground hover:text-primary py-2 transition-colors"
                onClick={onItemClick}
              >
                <Settings className="h-4 w-4 mr-2 text-primary" />
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  onItemClick()
                }}
                className="flex items-center text-sm font-medium text-foreground hover:text-primary py-2 transition-colors w-full text-left"
              >
                Log out
              </button>
            </>
          )}
        </>
      )}
    </>
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[#2980b9] dark:bg-[#1a5580] text-white">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-4 md:px-8">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            <div className="relative w-8 h-8 flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20Project%20%2871%29-iYAEGRcAqGjJavgCxepRAjtkF22edt.png"
                alt="MechaLeague"
                width={32}
                height={32}
              />
            </div>
            <span className="inline-block font-bold">MechaLeague</span>
          </Link>

          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <SheetHeader className="mb-4">
                  <SheetTitle className="flex items-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20Project%20%2871%29-iYAEGRcAqGjJavgCxepRAjtkF22edt.png"
                      alt="MechaLeague"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    MechaLeague
                  </SheetTitle>
                </SheetHeader>
                {isLoggedIn && (
                  <div className="flex items-center mb-6 pb-4 border-b">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                      <Image src={userAvatar || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">Member</p>
                    </div>
                  </div>
                )}
                <nav className="flex flex-col gap-1">
                  <SheetClose asChild>
                    <NavLinks inMobileMenu={true} onItemClick={() => {}} />
                  </SheetClose>
                </nav>
                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                  <ThemeToggle />
                  <SheetClose asChild>
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Close Menu
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="hidden md:flex gap-6 ml-8">
              <NavLinks />
            </nav>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <ThemeToggle />

          {isLoggedIn && (
            <div className="relative order-last md:order-first">
              <Button variant="ghost" size="icon" className="mr-0 md:mr-2 relative" onClick={toggleNotifications}>
                <Bell className="h-5 w-5 text-white" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
            </div>
          )}

          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link href="https://www.instagram.com/mechaleague/" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 text-white" />
              <span className="sr-only">Instagram</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link href="/store">
              <ShoppingCart className="h-5 w-5 text-white" />
              <span className="sr-only">Store</span>
            </Link>
          </Button>

          <div className="relative w-32 md:w-40 order-first md:order-last">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full h-8 pl-8 pr-2 rounded-md bg-white/10 border-none text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = "/search"
                }
              }}
            />
          </div>

          {isLoggedIn && !isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image src={userAvatar || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>My Account</span>
                    <span className="text-xs text-muted-foreground">{userName}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
