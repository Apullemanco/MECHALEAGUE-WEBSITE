"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, Shield, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Auth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
  })
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      teamUpdates: true,
      tournamentUpdates: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: "30",
    },
    password: {
      current: "",
      new: "",
      confirm: "",
    },
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn !== "true") {
      localStorage.setItem("redirectAfterLogin", "/settings")
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
      name: currentUser.name,
      email: currentUser.email,
    })

    // Load settings from localStorage
    const savedSettings = localStorage.getItem(`settings_${currentUser.id}`)
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    setIsLoading(false)
  }, [router])

  const handleNotificationChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }))
  }

  const handleSecurityChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: typeof value === "boolean" ? value : value,
      },
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        [name]: value,
      },
    }))
  }

  const saveSettings = () => {
    setIsSaving(true)

    try {
      // Save settings to localStorage
      localStorage.setItem(`settings_${userData.id}`, JSON.stringify(settings))

      // Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: "settings_updated",
        title: "Settings Updated",
        description: "Your account settings have been updated successfully",
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))

      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const changePassword = (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Validate passwords
      if (settings.password.new !== settings.password.confirm) {
        throw new Error("New passwords do not match")
      }

      // In a real app, you would verify the current password
      // For this demo, we'll just update the password

      // Update user password
      Auth.updateProfile(userData.id, {
        password: settings.password.new,
      })

      // Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: "password_updated",
        title: "Password Updated",
        description: "Your password has been updated successfully",
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      })

      // Clear password fields
      setSettings((prev) => ({
        ...prev,
        password: {
          current: "",
          new: "",
          confirm: "",
        },
      }))
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to change password. Please try again.",
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
          <p>Loading settings...</p>
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Account Settings</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Manage your account preferences and security
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-8">
              <Tabs defaultValue="notifications" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>

                <TabsContent value="notifications" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="mr-2 h-5 w-5" />
                        Notification Settings
                      </CardTitle>
                      <CardDescription>Manage how you receive notifications from MechaLeague</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={settings.notifications.email}
                          onCheckedChange={() => handleNotificationChange("email")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                        </div>
                        <Switch
                          checked={settings.notifications.push}
                          onCheckedChange={() => handleNotificationChange("push")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Team Updates</h3>
                          <p className="text-sm text-muted-foreground">Get notified about teams you follow</p>
                        </div>
                        <Switch
                          checked={settings.notifications.teamUpdates}
                          onCheckedChange={() => handleNotificationChange("teamUpdates")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Tournament Updates</h3>
                          <p className="text-sm text-muted-foreground">Get notified about tournaments you follow</p>
                        </div>
                        <Switch
                          checked={settings.notifications.tournamentUpdates}
                          onCheckedChange={() => handleNotificationChange("tournamentUpdates")}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={saveSettings} disabled={isSaving} className="ml-auto">
                        {isSaving ? "Saving..." : "Save changes"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="mr-2 h-5 w-5" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>Manage your account security preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={settings.security.twoFactor}
                          onCheckedChange={(checked) => handleSecurityChange("twoFactor", checked)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                          min="5"
                          max="120"
                        />
                        <p className="text-xs text-muted-foreground">
                          Your session will expire after this period of inactivity
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={saveSettings} disabled={isSaving} className="ml-auto">
                        {isSaving ? "Saving..." : "Save changes"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="password" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your password to keep your account secure</CardDescription>
                    </CardHeader>
                    <form onSubmit={changePassword}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current">Current Password</Label>
                          <Input
                            id="current"
                            name="current"
                            type="password"
                            value={settings.password.current}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new">New Password</Label>
                          <div className="relative">
                            <Input
                              id="new"
                              name="new"
                              type={showPassword ? "text" : "password"}
                              value={settings.password.new}
                              onChange={handlePasswordChange}
                              required
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm">Confirm New Password</Label>
                          <Input
                            id="confirm"
                            name="confirm"
                            type={showPassword ? "text" : "password"}
                            value={settings.password.confirm}
                            onChange={handlePasswordChange}
                            required
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" disabled={isSaving} className="ml-auto">
                          {isSaving ? "Updating..." : "Update password"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
