"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { User, Mail, Settings, LogOut, Heart, Trophy, Send, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Auth } from "@/lib/auth"
import { useMobile } from "@/hooks/use-mobile"

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "/placeholder.svg",
    followedTeams: [],
    followedTournaments: [],
    bio: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [followedTeams, setFollowedTeams] = useState([])
  const [followedTournaments, setFollowedTournaments] = useState([])
  const [selectedTeam, setSelectedTeam] = useState("")
  const [joinMessage, setJoinMessage] = useState("")
  const [claimMessage, setClaimMessage] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const isMobile = useMobile()

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn !== "true") {
      localStorage.setItem("redirectAfterLogin", "/profile")
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
      avatar: currentUser.avatar || "/placeholder.svg",
      followedTeams: currentUser.followedTeams || [],
      followedTournaments: currentUser.followedTournaments || [],
      bio: currentUser.bio || "",
    })

    // Load followed teams data
    const teams = [
      { id: "team-minus-1", name: "Vector -1", logo: "/images/vector-1-team.png" },
      { id: "team-12", name: "Equipo 12", logo: "/placeholder.svg" },
      { id: "team-5", name: "Equipo 5", logo: "/placeholder.svg" },
    ]

    const followedTeamsData = teams.filter((team) => (currentUser.followedTeams || []).includes(team.id))
    setFollowedTeams(followedTeamsData)

    // Load followed tournaments data
    const tournaments = [
      {
        id: "founders-championship",
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maxresdefault-iYAEGRcAqGjJavgCxepRAjtkF22edt.jpg",
      },
      {
        id: "chemistry-quest",
        name: "Chemistry Quest",
        date: "TBD",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chemistry-quest-iYAEGRcAqGjJavgCxepRAjtkF22edt.jpg",
      },
    ]

    const followedTournamentsData = tournaments.filter((tournament) =>
      (currentUser.followedTournaments || []).includes(tournament.id),
    )
    setFollowedTournaments(followedTournamentsData)

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    Auth.logout()
    router.push("/")
  }

  const handleJoinTeam = async () => {
    if (!selectedTeam || !joinMessage) return

    try {
      // In a real app, this would send a request to the server
      // For now, we'll simulate it with a timeout
      setIsLoading(true)

      // Send email to admin (simulated)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSuccessMessage(`Your request to join ${selectedTeam} has been sent! The team admin will review your request.`)
      setShowSuccess(true)

      // Reset form
      setSelectedTeam("")
      setJoinMessage("")

      // Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: "team_request",
        title: "Team Join Request Sent",
        description: `Your request to join ${selectedTeam} has been submitted for review.`,
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))
    } catch (error) {
      console.error("Error sending team join request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClaimTeam = async () => {
    if (!selectedTeam || !claimMessage) return

    try {
      // In a real app, this would send a request to the server
      // For now, we'll simulate it with a timeout
      setIsLoading(true)

      // Send email to admin (simulated)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSuccessMessage(`Your claim for ${selectedTeam} has been sent to dg1444478@gmail.com for approval!`)
      setShowSuccess(true)

      // Reset form
      setSelectedTeam("")
      setClaimMessage("")

      // Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: "team_claim",
        title: "Team Claim Submitted",
        description: `Your claim for ${selectedTeam} has been submitted for review.`,
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))
    } catch (error) {
      console.error("Error sending team claim request:", error)
    } finally {
      setIsLoading(false)
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Profile</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Manage your account and preferences
                </p>
              </div>
            </div>

            {showSuccess && (
              <Alert className="max-w-3xl mx-auto mt-4 bg-green-50 border-green-200">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setShowSuccess(false)}
                >
                  X
                </Button>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto relative h-24 w-24 rounded-full overflow-hidden mb-4">
                      <Image src={userData.avatar || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                    </div>
                    <CardTitle>{userData.name}</CardTitle>
                    <CardDescription>{userData.email}</CardDescription>
                    {userData.bio && <p className="text-sm text-muted-foreground mt-2">{userData.bio}</p>}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Link href="/profile/edit">
                        <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                          <User className="h-5 w-5 mr-2 text-primary" />
                          <span>Edit Profile</span>
                        </div>
                      </Link>
                      <Link href="/profile/email">
                        <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                          <Mail className="h-5 w-5 mr-2 text-primary" />
                          <span>Update Email</span>
                        </div>
                      </Link>
                      <Link href="/settings">
                        <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                          <Settings className="h-5 w-5 mr-2 text-primary" />
                          <span>Account Settings</span>
                        </div>
                      </Link>

                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                            <Send className="h-5 w-5 mr-2 text-primary" />
                            <span>Join a Team</span>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Request to Join a Team</DialogTitle>
                            <DialogDescription>
                              Send a request to join an existing team. The team admin will review your request.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <label htmlFor="team">Select Team</label>
                              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a team" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Vector -1">Vector -1</SelectItem>
                                  <SelectItem value="Equipo 12">Equipo 12</SelectItem>
                                  <SelectItem value="Equipo 5">Equipo 5</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="message">Message to Team Admin</label>
                              <Textarea
                                id="message"
                                value={joinMessage}
                                onChange={(e) => setJoinMessage(e.target.value)}
                                placeholder="Explain why you want to join this team..."
                                rows={4}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleJoinTeam} disabled={!selectedTeam || !joinMessage || isLoading}>
                              {isLoading ? "Sending..." : "Send Request"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                            <Shield className="h-5 w-5 mr-2 text-primary" />
                            <span>Claim a Team</span>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Claim Team Ownership</DialogTitle>
                            <DialogDescription>
                              Request ownership of a team. An approval email will be sent to the MechaLeague admin.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <label htmlFor="team">Select Team</label>
                              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a team" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Vector -1">Vector -1</SelectItem>
                                  <SelectItem value="Equipo 12">Equipo 12</SelectItem>
                                  <SelectItem value="Equipo 5">Equipo 5</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="claim-message">Proof of Ownership</label>
                              <Textarea
                                id="claim-message"
                                value={claimMessage}
                                onChange={(e) => setClaimMessage(e.target.value)}
                                placeholder="Explain why you should be the team owner and provide proof..."
                                rows={4}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleClaimTeam} disabled={!selectedTeam || !claimMessage || isLoading}>
                              {isLoading ? "Sending..." : "Submit Claim"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="followed" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="followed">Followed Teams</TabsTrigger>
                    <TabsTrigger value="tournaments">Followed Tournaments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="followed" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-red-500" />
                          Teams You Follow
                        </CardTitle>
                        <CardDescription>
                          You'll receive updates about matches and results for these teams
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {followedTeams.length > 0 ? (
                          <div className="space-y-4">
                            {followedTeams.map((team) => (
                              <Link href={`/teams/${team.id}`} key={team.id}>
                                <div className="flex items-center p-3 rounded-md hover:bg-muted transition-colors">
                                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                                    <Image
                                      src={
                                        team.id === "team-minus-1" ? "/images/vector-1-team.png" : "/placeholder.svg"
                                      }
                                      alt={team.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-medium">{team.name}</h3>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <h3 className="text-lg font-medium mb-2">No followed teams</h3>
                            <p className="text-muted-foreground mb-4">
                              You haven't followed any teams yet. Follow teams to receive updates.
                            </p>
                            <Button asChild>
                              <Link href="/teams">Browse Teams</Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tournaments" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Trophy className="h-5 w-5 mr-2 text-primary" />
                          Tournaments You Follow
                        </CardTitle>
                        <CardDescription>You'll receive updates about these tournaments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {followedTournaments.length > 0 ? (
                          <div className="space-y-4">
                            {followedTournaments.map((tournament) => (
                              <Link href={`/tournaments/${tournament.id}`} key={tournament.id}>
                                <div className="flex items-center p-3 rounded-md hover:bg-muted transition-colors">
                                  <div className="relative h-10 w-10 rounded-md overflow-hidden mr-3">
                                    <Image
                                      src={tournament.image || "/images/maxresdefault.jpg"}
                                      alt={tournament.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-medium">{tournament.name}</h3>
                                    <p className="text-sm text-muted-foreground">{tournament.date}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                            <h3 className="text-lg font-medium mb-2">No followed tournaments</h3>
                            <p className="text-muted-foreground mb-4">
                              You haven't followed any tournaments yet. Follow tournaments to receive updates.
                            </p>
                            <Button asChild>
                              <Link href="/tournaments">Browse Tournaments</Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function Link({ href, children, className = "" }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
