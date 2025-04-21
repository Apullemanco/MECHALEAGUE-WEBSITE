"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Check, Camera, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Auth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    bio: "",
    avatar: "/placeholder.svg",
    location: "",
    interests: [],
    socialLinks: {
      instagram: "",
      twitter: "",
      github: "",
    },
    theme: "default",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn !== "true") {
      localStorage.setItem("redirectAfterLogin", "/profile/edit")
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
      bio: currentUser.bio || "",
      avatar: currentUser.avatar || "/placeholder.svg",
      location: currentUser.location || "",
      interests: currentUser.interests || [],
      socialLinks: currentUser.socialLinks || {
        instagram: "",
        twitter: "",
        github: "",
      },
      theme: currentUser.theme || "default",
    })

    setIsLoading(false)
  }, [router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate image dimensions
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      if (img.width > 1080 || img.height > 1080) {
        setImageError("Image dimensions must be 1080x1080 or smaller")
        URL.revokeObjectURL(objectUrl)
        return
      }

      setImageError(null)

      // For this demo, we'll use a FileReader to convert it to a data URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }

    img.src = objectUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (imageError) {
      toast({
        title: "Error",
        description: imageError,
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // Update user profile
      Auth.updateProfile(userData.id, {
        name: userData.name,
        bio: userData.bio,
        avatar: previewAvatar || userData.avatar,
        location: userData.location,
        interests: userData.interests,
        socialLinks: userData.socialLinks,
        theme: userData.theme,
      })

      // Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: "profile_updated",
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })

      // Redirect back to profile
      router.push("/profile")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Edit Your Profile</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Update your personal information and preferences
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-8">
              {imageError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{imageError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your basic profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden group">
                          <Image
                            src={previewAvatar || userData.avatar || "/placeholder.svg"}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <Camera className="h-8 w-8 text-white" />
                            <span className="sr-only">Upload avatar</span>
                          </label>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleAvatarChange}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click to upload a new avatar (1080x1080 or smaller)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={userData.name} onChange={handleChange} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={userData.bio}
                          onChange={handleChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={userData.location}
                          onChange={handleChange}
                          placeholder="City, Country"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Social Links</CardTitle>
                      <CardDescription>Connect your social media accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          name="instagram"
                          value={userData.socialLinks.instagram}
                          onChange={handleSocialLinkChange}
                          placeholder="@username"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          name="twitter"
                          value={userData.socialLinks.twitter}
                          onChange={handleSocialLinkChange}
                          placeholder="@username"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          name="github"
                          value={userData.socialLinks.github}
                          onChange={handleSocialLinkChange}
                          placeholder="username"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardFooter className="flex justify-end pt-6">
                      <Button type="submit" className="w-full md:w-auto" disabled={isSaving || !!imageError}>
                        {isSaving ? (
                          <>Saving changes...</>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Save changes
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
