"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Trophy, Users, Heart } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useToast } from "@/hooks/use-toast"
import { Auth } from "@/lib/auth"

export default function ChemistryQuestPage() {
  const { toast } = useToast()
  const router = useRouter()
  const tournament = chemistryQuestTournament
  const [isFollowing, setIsFollowing] = useState(false)

  // Move the currentUser check into useEffect
  useEffect(() => {
    const currentUser = Auth.getCurrentUser()
    if (currentUser) {
      setIsFollowing(currentUser.followedTournaments.includes(tournament.id))
    }
  }, [tournament.id])

  // Helper function to get team ID from name
  const getTeamId = (teamName) => {
    if (teamName === "Vector -1") return "team-minus-1"
    if (teamName.startsWith("Team ")) {
      const num = teamName.replace("Team ", "")
      return `team-${num}`
    }
    return ""
  }

  // Add new function to handle registration
  const handleRegisterTeam = () => {
    window.open("https://tally.so/r/3jge7R", "_blank")
  }

  // Add new function to contact organizers
  const handleContactOrganizers = () => {
    window.open("https://www.instagram.com/mechaleague", "_blank")
  }

  // Update the handleFollowTournament function
  const handleFollowTournament = () => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return
    }

    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn !== "true") {
      localStorage.setItem("redirectAfterLogin", "/tournaments/chemistry-quest")
      router.push("/register")
      return
    }

    // Get current user
    const currentUser = Auth.getCurrentUser()
    if (!currentUser) {
      router.push("/register")
      return
    }

    // Check if tournament is already followed
    const isFollowed = currentUser.followedTournaments.includes(tournament.id)

    try {
      // Toggle follow status
      const updatedUser = Auth.updateProfile(currentUser.id, {
        followedTournaments: isFollowed
          ? currentUser.followedTournaments.filter((id) => id !== tournament.id)
          : [...currentUser.followedTournaments, tournament.id],
      })

      // Add notification
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: isFollowed ? "tournament_unfollowed" : "tournament_followed",
        title: isFollowed ? "Tournament Unfollowed" : "Tournament Followed",
        description: isFollowed
          ? `You are no longer following ${tournament.name}`
          : `You are now following ${tournament.name}`,
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))

      toast({
        title: isFollowed ? "Tournament unfollowed" : "Tournament followed",
        description: isFollowed
          ? "You will no longer receive updates about this tournament"
          : "You will receive updates about this tournament",
      })
    } catch (error) {
      console.error("Error following tournament:", error)
      toast({
        title: "Error",
        description: "Failed to update tournament following status",
        variant: "destructive",
      })
    }
  }

  // Remove this line
  // const currentUser = Auth.getCurrentUser()
  // const isFollowing = currentUser?.followedTournaments.includes(tournament.id) || false

  // It's already handled by the useState and useEffect above

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:py-8 max-w-7xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-6 hover:scale-105 transition-transform">
            <Link href="/tournaments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to tournaments
            </Link>
          </Button>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative">
                  <Link href={`/tournaments/chemistry-quest`}>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20Project%20%2880%29-uxbuErb6n8ZamqylgK8aDAVQD0T8Tz.png"
                      alt={tournament.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{tournament.name}</h1>
                    <Button variant="ghost" size="icon" onClick={handleFollowTournament} title="Follow tournament">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">Presented by Prepa Tec</div>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{tournament.teams} teams</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span>Status: {tournament.status}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="font-medium mb-2">Tournament format</h3>
                    <p className="text-sm text-muted-foreground">
                      Teams compete in 3v3 alliances (Blue Alliance vs Red Alliance) in a series of qualification
                      matches.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Registered Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tournament.participatingTeams.map((team, index) => (
                      <div
                        key={team.id}
                        className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors"
                      >
                        <Link
                          href={`/teams/${team.id}`}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <div className="relative h-8 w-8 rounded-full overflow-hidden">
                            {team.id === "team-minus-1" ? (
                              <Image src="/images/vector-1-team.png" alt={team.name} fill className="object-cover" />
                            ) : (
                              <Image src="/placeholder.svg" alt={team.name} fill className="object-cover" />
                            )}
                          </div>
                          <span>{team.name}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Tournament Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" onClick={handleRegisterTeam}>
                      Register Your Team
                    </Button>
                    <Button
                      variant={isFollowing ? "default" : "outline"}
                      className="w-full"
                      onClick={handleFollowTournament}
                    >
                      {isFollowing ? "Following" : "Follow Tournament"}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleContactOrganizers}>
                      Contact Organizers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="schedule" className="animate-in fade-in duration-500">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="schedule" className="transition-all hover:bg-primary/20">
                    Schedule
                  </TabsTrigger>
                  <TabsTrigger value="matches" className="transition-all hover:bg-primary/20">
                    Matches
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="transition-all hover:bg-primary/20">
                    Teams
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="schedule" className="mt-6 animate-in slide-in-from-left duration-300">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Tournament Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Time</TableHead>
                              <TableHead>Event</TableHead>
                              <TableHead>Location</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tournament.schedule.map((event, index) => (
                              <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium">{event.time}</TableCell>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.location}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="mt-6 p-4 bg-muted/30 rounded-md">
                        <h3 className="font-medium mb-2">Note</h3>
                        <p className="text-sm text-muted-foreground">
                          Schedule is tentative and subject to change. Please check back closer to the event date for
                          updates.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="matches" className="mt-6 animate-in slide-in-from-left duration-300">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Upcoming Matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Match</TableHead>
                              <TableHead>Blue Alliance</TableHead>
                              <TableHead>Red Alliance</TableHead>
                              <TableHead>Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tournament.upcomingMatches.map((match, index) => (
                              <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium">Q{index + 1}</TableCell>
                                <TableCell>
                                  <div className="flex flex-col space-y-1">
                                    <div className="flex items-center space-x-2">
                                      {match.blueAlliance.map((team, teamIndex) => (
                                        <Link href={`/teams/${getTeamId(team)}`} key={teamIndex}>
                                          <Badge
                                            variant="outline"
                                            className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-colors"
                                          >
                                            {team}
                                          </Badge>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col space-y-1">
                                    <div className="flex items-center space-x-2">
                                      {match.redAlliance.map((team, teamIndex) => (
                                        <Link href={`/teams/${getTeamId(team)}`} key={teamIndex}>
                                          <Badge
                                            variant="outline"
                                            className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer transition-colors"
                                          >
                                            {team}
                                          </Badge>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>{match.time}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="mt-6 p-4 bg-muted/30 rounded-md">
                        <h3 className="font-medium mb-2">Note</h3>
                        <p className="text-sm text-muted-foreground">
                          Match schedule is preliminary and subject to change. Final alliance selections will be made on
                          the day of the event.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="teams" className="mt-6 animate-in slide-in-from-left duration-300">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Participating Teams</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tournament.participatingTeams.map((team) => (
                          <Link href={`/teams/${team.id}`} key={team.id}>
                            <div className="flex items-center p-3 rounded-md hover:bg-muted transition-colors">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                                {team.id === "team-minus-1" ? (
                                  <Image
                                    src="/images/vector-1-team.png"
                                    alt={team.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <Image src="/placeholder.svg" alt={team.name} fill className="object-cover" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{team.name}</h3>
                                {team.rank && (
                                  <p className="text-xs text-muted-foreground">Current Rank: #{team.rank}</p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-muted/30 rounded-md">
                        <h3 className="font-medium mb-2">Registration</h3>
                        <p className="text-sm text-muted-foreground">
                          Team registration is still open. Contact us if your team would like to participate in this
                          tournament.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

const chemistryQuestTournament = {
  id: "chemistry-quest",
  name: "Chemistry Quest",
  date: "TBD",
  location: "Saltillo, Coahuila, Mexico",
  teams: "1+",
  status: "Registration Open",
  description: "An upcoming MechaLeague competition focused on chemistry-related challenges.",
  image:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20Project%20%2880%29-uxbuErb6n8ZamqylgK8aDAVQD0T8Tz.png",
  schedule: [
    {
      time: "8:00 AM",
      name: "Team Check-in",
      location: "Main Entrance",
    },
    {
      time: "9:00 AM",
      name: "Opening Ceremony",
      location: "Main Arena",
    },
    {
      time: "9:30 AM",
      name: "Qualification Matches Begin",
      location: "Competition Field",
    },
    {
      time: "12:00 PM",
      name: "Lunch Break",
      location: "Cafeteria",
    },
    {
      time: "1:00 PM",
      name: "Qualification Matches Resume",
      location: "Competition Field",
    },
    {
      time: "3:00 PM",
      name: "Alliance Selection",
      location: "Main Arena",
    },
    {
      time: "3:30 PM",
      name: "Playoff Matches",
      location: "Competition Field",
    },
    {
      time: "5:00 PM",
      name: "Finals",
      location: "Competition Field",
    },
    {
      time: "6:00 PM",
      name: "Awards Ceremony",
      location: "Main Arena",
    },
  ],
  participatingTeams: [
    {
      id: "team-minus-1",
      name: "Vector -1",
      rank: 3,
    },
  ],
  upcomingMatches: [
    {
      blueAlliance: ["Vector -1", "TBD", "TBD"],
      redAlliance: ["TBD", "TBD", "TBD"],
      time: "TBD",
    },
  ],
}
