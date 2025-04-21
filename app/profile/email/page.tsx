"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Auth } from "@/lib/auth"
import { Database } from "@/lib/db"
import { useToast } from "@/hooks/use-toast"

export default function UpdateEmailPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    newEmail: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn !== "true") {
      localStorage.setItem("redirectAfterLogin", "/profile/email")
      router.push("/register")
      return
    }

    // Load user data
    const currentUser = Auth.getCurrentUser()
    if (!currentUser) {
      localStorage.removeItem("userLoggedIn")
      router.push("/register")
      return
    }

    setUserData({
      id: currentUser.id,
      email: currentUser.email,
      newEmail: "",
      password: "",
    })

    setIsLoading(false)
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // In a real app, you would verify the password before updating the email
      // For this demo, we'll just update the email

      // Check if the new email is already in use
      const existingUser = Database.getUserByEmail(userData.newEmail)
      if (existingUser) {
        throw new Error("This email is already in use")
      }

      // Update user email
      Auth.updateProfile(userData.id, {
        email: userData.newEmail,
      })

      // Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: "email_updated",
        title: "Email Updated",
        description: "Your email has been updated successfully",
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))

      toast({
        title: "Email updated",
        description: "Your email has been updated successfully",
      })

      // Redirect back to profile
      router.push("/profile")
    } catch (error) {
      console.error("Error updating email:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
        <SiteHeader />
        <main className="flex-1 w-full flex items-center justify-center">
          <p>Loading profile...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <a href="/profile">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to profile
              </a>
            </Button>

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Update Your Email</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Change the email address associated with your account
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-md mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Email Address</CardTitle>
                  <CardDescription>Update your email address</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Current Email</Label>
                      <Input id="email" value={userData.email} disabled className="bg-muted" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newEmail">New Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newEmail"
                          name="newEmail"
                          type="email"
                          className="pl-9"
                          value={userData.newEmail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password to confirm"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSaving}>
                      {isSaving ? (
                        <>Updating email...</>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Update email
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
