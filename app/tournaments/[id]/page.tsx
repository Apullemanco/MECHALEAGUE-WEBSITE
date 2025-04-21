"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Trophy, Users, ChevronRight, Clock, MapPin, AlertCircle, ChevronLeft, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useMobile } from "@/hooks/use-mobile"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function TournamentPage() {
  const params = useParams()
  const router = useRouter()
  const tournamentId = params.id as string
  const [tournament, setTournament] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [activeMatchTab, setActiveMatchTab] = useState("qualification")
  const isMobile = useMobile()

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn === "true") {
      setIsLoggedIn(true)

      // Check if user is following this tournament
      const followedTournaments = JSON.parse(localStorage.getItem("followedTournaments") || "[]")
      setIsFollowing(followedTournaments.includes(tournamentId))

      // Check if user is registered for this tournament
      const registeredTournaments = JSON.parse(localStorage.getItem("registeredTournaments") || "[]")
      setIsRegistered(registeredTournaments.includes(tournamentId))
    }

    // Fetch tournament data
    const fetchTournament = async () => {
      setLoading(true)
      try {
        // Find tournament in the mock data
        const foundTournament = tournaments.find((t) => t.id === tournamentId)
        if (foundTournament) {
          setTournament(foundTournament)
        } else {
          setError("Tournament not found")
        }
      } catch (err) {
        console.error("Error fetching tournament:", err)
        setError("Failed to load tournament data")
      } finally {
        setLoading(false)
      }
    }

    fetchTournament()
  }, [tournamentId])

  const handleFollowToggle = () => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      localStorage.setItem("redirectAfterLogin", `/tournaments/${tournamentId}`)
      window.location.href = "/register"
      return
    }

    const followedTournaments = JSON.parse(localStorage.getItem("followedTournaments") || "[]")
    let updatedFollowedTournaments

    if (isFollowing) {
      // Unfollow tournament
      updatedFollowedTournaments = followedTournaments.filter((id) => id !== tournamentId)
    } else {
      // Follow tournament
      updatedFollowedTournaments = [...followedTournaments, tournamentId]

      // Add notification about following the tournament
      if (tournament) {
        const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
        notifications.push({
          id: Date.now(),
          type: "tournament_followed",
          title: `You are now following ${tournament.name}`,
          description: "You will receive updates about this tournament",
          date: new Date().toISOString(),
          read: false,
        })
        localStorage.setItem("notifications", JSON.stringify(notifications))
      }
    }

    localStorage.setItem("followedTournaments", JSON.stringify(updatedFollowedTournaments))
    setIsFollowing(!isFollowing)
  }

  const handleRegister = () => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      localStorage.setItem("redirectAfterLogin", `/tournaments/${tournamentId}`)
      window.location.href = "/register"
      return
    }

    const registeredTournaments = JSON.parse(localStorage.getItem("registeredTournaments") || "[]")
    const updatedRegisteredTournaments = [...registeredTournaments, tournamentId]
    localStorage.setItem("registeredTournaments", JSON.stringify(updatedRegisteredTournaments))
    setIsRegistered(true)

    // Add notification about registering for the tournament
    if (tournament) {
      const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      notifications.push({
        id: Date.now(),
        type: "tournament_registered",
        title: `You have registered for ${tournament.name}`,
        description: "You will receive updates about this tournament",
        date: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }

  const handleWatchVideo = (videoUrl) => {
    window.open(videoUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
        <SiteHeader />
        <main className="flex-1 w-full">
          <div className="container px-4 md:px-6 py-12 max-w-[1600px] mx-auto">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading tournament details...</p>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (error || !tournament) {
    return (
      <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
        <SiteHeader />
        <main className="flex-1 w-full">
          <div className="container px-4 md:px-6 py-12 max-w-[1600px] mx-auto">
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || "Tournament not found"}</AlertDescription>
            </Alert>
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/tournaments">Back to tournaments</Link>
              </Button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={tournament.image || "/placeholder.svg"}
            alt={tournament.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Si la imagen falla, usar un placeholder
              e.currentTarget.src = `/placeholder.svg?height=400&width=1600&text=${encodeURIComponent(tournament.name)}`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <section className="w-full py-6 md:py-12 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="mb-6">
              <Link href="/tournaments" className="flex items-center text-primary hover:underline mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to tournaments
              </Link>

              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{tournament.name}</h1>
                  <p className="text-lg text-muted-foreground">{tournament.description}</p>
                </div>
                {isLoggedIn && (
                  <Button
                    variant={isFollowing ? "default" : "outline"}
                    className="w-full md:w-auto"
                    onClick={handleFollowToggle}
                  >
                    {isFollowing ? "Following" : "Follow Tournament"}
                  </Button>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{tournament.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Saltillo, Coahuila, Mexico</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Teams</p>
                    <p className="font-medium">14 teams</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Winner</p>
                    <p className="font-medium">{tournament.winner || "TBD"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-lg mb-2">Tournament format</h3>
                <p className="text-muted-foreground">
                  Teams compete in 3v3 alliances (Blue Alliance vs Red Alliance) in a series of qualification matches.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                    <TabsTrigger value="matches">Matches</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Tournament Details</CardTitle>
                        <CardDescription>Everything you need to know about {tournament.name}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h3 className="font-medium">Date</h3>
                              <p className="text-muted-foreground">{tournament.date}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h3 className="font-medium">Teams</h3>
                              <p className="text-muted-foreground">{tournament.teams} teams participating</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h3 className="font-medium">Status</h3>
                              <p className="text-muted-foreground capitalize">{tournament.status}</p>
                            </div>
                          </div>
                          {tournament.winner && (
                            <div className="flex items-start gap-3">
                              <Trophy className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h3 className="font-medium">Winner</h3>
                                <p className="text-muted-foreground">{tournament.winner}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-muted-foreground">
                            {tournament.longDescription ||
                              `${tournament.name} is a premier MechaLeague tournament featuring the best teams competing for glory and recognition. Join us for an exciting competition showcasing strategy, teamwork, and innovation.`}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Rules</h3>
                          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                            <li>Teams must have between 2-5 members</li>
                            <li>All participants must be registered MechaLeague members</li>
                            <li>Matches will be played according to standard MechaLeague rules</li>
                            <li>All decisions by tournament officials are final</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Registered Teams</CardTitle>
                        <CardDescription>
                          Teams participating in this tournament with their ranking points
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Rank</TableHead>
                              <TableHead>Team</TableHead>
                              <TableHead>Ranking Points</TableHead>
                              <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tournament.registeredTeams && tournament.registeredTeams.length > 0 ? (
                              tournament.registeredTeams
                                .sort((a, b) => b.rankingPoints - a.rankingPoints)
                                .map((team, index) => (
                                  <TableRow key={team.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                          <Image
                                            src={team.image || "/placeholder.svg"}
                                            alt={team.name}
                                            fill
                                            className="object-cover"
                                          />
                                        </div>
                                        <Link href={`/teams/${team.id}`} className="hover:underline">
                                          {team.name}
                                        </Link>
                                      </div>
                                    </TableCell>
                                    <TableCell>{team.rankingPoints}</TableCell>
                                    <TableCell className="text-right">
                                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        Confirmed
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                  No teams registered yet
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="teams" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Alliance Selection</CardTitle>
                        <CardDescription>Teams grouped into alliances for the elimination rounds</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Alliance 1</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    1
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 12" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-12" className="hover:underline">
                                      Team 12
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    2
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 7" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-7" className="hover:underline">
                                      Team 7
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    3
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 10" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-10" className="hover:underline">
                                      Team 10
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Alliance 2</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    1
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 5" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-5" className="hover:underline">
                                      Team 5
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    2
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 13" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-13" className="hover:underline">
                                      Team 13
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    3
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 4" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-4" className="hover:underline">
                                      Team 4
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Alliance 3</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    1
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image
                                        src="/images/vector-1-team.png"
                                        alt="Vector -1"
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <Link href="/teams/team-minus-1" className="hover:underline">
                                      Vector -1
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    2
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 11" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-11" className="hover:underline">
                                      Team 11
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    3
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 14" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-14" className="hover:underline">
                                      Team 14
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Alliance 4</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    1
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 3" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-3" className="hover:underline">
                                      Team 3
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    2
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 6" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-6" className="hover:underline">
                                      Team 6
                                    </Link>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    3
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                                      <Image src="/placeholder.svg" alt="Team 8" fill className="object-cover" />
                                    </div>
                                    <Link href="/teams/team-8" className="hover:underline">
                                      Team 8
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="mt-8">
                          <h3 className="text-xl font-bold mb-4">All Teams</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tournament.registeredTeams && tournament.registeredTeams.length > 0 ? (
                              tournament.registeredTeams
                                .sort((a, b) => b.rankingPoints - a.rankingPoints)
                                .map((team) => (
                                  <Link key={team.id} href={`/teams/${team.id}`}>
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-muted">
                                        <Image
                                          src={team.image || "/placeholder.svg"}
                                          alt={team.name}
                                          fill
                                          className="object-cover"
                                          onError={(e) => {
                                            e.currentTarget.src = `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(
                                              team.name.charAt(0),
                                            )}`
                                          }}
                                        />
                                      </div>
                                      <div>
                                        <h3 className="font-medium">{team.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                          Ranking Points: {team.rankingPoints}
                                        </p>
                                      </div>
                                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                                    </div>
                                  </Link>
                                ))
                            ) : (
                              <div className="col-span-2 text-center py-6">
                                <p className="text-muted-foreground">No teams registered for this tournament yet.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="matches" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Tournament Matches</CardTitle>
                        <CardDescription>All matches for {tournament.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex border-b mb-4">
                          <div
                            className={`flex-1 text-center py-2 px-4 ${activeMatchTab === "qualification" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                            onClick={() => setActiveMatchTab("qualification")}
                            style={{ cursor: "pointer" }}
                          >
                            Qualification
                          </div>
                          <div
                            className={`flex-1 text-center py-2 px-4 ${activeMatchTab === "playoff" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                            onClick={() => setActiveMatchTab("playoff")}
                            style={{ cursor: "pointer" }}
                          >
                            Playoff
                          </div>
                          <div
                            className={`flex-1 text-center py-2 px-4 ${activeMatchTab === "semifinal" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                            onClick={() => setActiveMatchTab("semifinal")}
                            style={{ cursor: "pointer" }}
                          >
                            Semifinal
                          </div>
                          <div
                            className={`flex-1 text-center py-2 px-4 ${activeMatchTab === "final" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                            onClick={() => setActiveMatchTab("final")}
                            style={{ cursor: "pointer" }}
                          >
                            Final
                          </div>
                        </div>

                        {activeMatchTab === "qualification" && (
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">Qualification matches</h3>

                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2 px-4 font-medium">Match</th>
                                    <th className="text-left py-2 px-4 font-medium">Blue Alliance</th>
                                    <th className="text-center py-2 px-4 font-medium">Score</th>
                                    <th className="text-left py-2 px-4 font-medium">Red Alliance</th>
                                    <th className="text-right py-2 px-4 font-medium">Video</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q1</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Vector -1
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 11
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 5
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">12</span> -{" "}
                                      <span className="font-bold text-red-600">8</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 3
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 13
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 9
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/Obm0N51Wumg")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q2</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 14
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 6
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 7
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">8</span> -{" "}
                                      <span className="font-bold text-red-600">13</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 10
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 2
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 8
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/DeONBCciLps")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q3</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 2
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 8
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 10
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">11</span> -{" "}
                                      <span className="font-bold text-red-600">17</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 4
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Vector -1
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 12
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/CUrbMQkRj50")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q4</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 11
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 14
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 6
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">10</span> -{" "}
                                      <span className="font-bold text-red-600">14</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 12
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 3
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 13
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/8MmfqLjJIVs")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q5</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 4
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 5
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 13
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">16</span> -{" "}
                                      <span className="font-bold text-red-600">13</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 9
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 3
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 7
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/WMheoayhL6o")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q6</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Vector -1
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 6
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 9
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">6</span> -{" "}
                                      <span className="font-bold text-red-600">14</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 2
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 14
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 11
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/NWa8xF2ueVQ")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q7</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 4
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 12
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 8
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">10</span> -{" "}
                                      <span className="font-bold text-red-600">16</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 7
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 5
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 10
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/w9-nNmC9-ag")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q8</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 3
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 11
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 6
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">18</span> -{" "}
                                      <span className="font-bold text-red-600">14</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 9
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 2
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 8
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/2rxa1ujiWs8")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q9</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 7
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 13
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 2
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">15</span> -{" "}
                                      <span className="font-bold text-red-600">12</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 8
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 14
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 5
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/xOrD6k-lfnk")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q10</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 10
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 3
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 9
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">13</span> -{" "}
                                      <span className="font-bold text-red-600">19</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Vector -1
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 12
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 6
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/C8QpXf0N1Qo")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q11</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 5
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 8
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 11
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">21</span> -{" "}
                                      <span className="font-bold text-red-600">17</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 4
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 10
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 14
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/S3lr8EuuUao")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q12</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 12
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 9
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 7
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">24</span> -{" "}
                                      <span className="font-bold text-red-600">11</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 13
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 6
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 2
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/dlmkxlDAzQA")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q13</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Vector -1
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 4
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 14
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">19</span> -{" "}
                                      <span className="font-bold text-red-600">15</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 11
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 3
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 10
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/DCxu1iRa1Ys")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">Q14</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 13
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 8
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Team 3
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">14</span> -{" "}
                                      <span className="font-bold text-red-600">22</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 12
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 7
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Team 5
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/Dp9TmhJuExs")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {activeMatchTab === "playoff" && (
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">Playoff matches</h3>

                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2 px-4 font-medium">Match</th>
                                    <th className="text-left py-2 px-4 font-medium">Blue Alliance</th>
                                    <th className="text-center py-2 px-4 font-medium">Score</th>
                                    <th className="text-left py-2 px-4 font-medium">Red Alliance</th>
                                    <th className="text-right py-2 px-4 font-medium">Video</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">M1</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 4
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">Team 3, Team 6, Team 8</div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">12</span> -{" "}
                                      <span className="font-bold text-red-600">14</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 1
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Team 12, Team 7, Team 10
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/1BpFKWQFNFE")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">M2</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 3
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Vector -1, Team 11, Team 14
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">9</span> -{" "}
                                      <span className="font-bold text-red-600">13</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 2
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Team 5, Team 13, Team 4
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/ghzNZhRUyqA")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {activeMatchTab === "semifinal" && (
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">Semifinal matches</h3>

                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2 px-4 font-medium">Match</th>
                                    <th className="text-left py-2 px-4 font-medium">Blue Alliance</th>
                                    <th className="text-center py-2 px-4 font-medium">Score</th>
                                    <th className="text-left py-2 px-4 font-medium">Red Alliance</th>
                                    <th className="text-right py-2 px-4 font-medium">Video</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">S1</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 2
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Team 5, Team 13, Team 4
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">12</span> -{" "}
                                      <span className="font-bold text-red-600">11</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 1
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Team 12, Team 7, Team 10
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/i8yOsdfUjm4")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">S2</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 4
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">Team 3, Team 6, Team 8</div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">18</span> -{" "}
                                      <span className="font-bold text-red-600">4</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 3
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Vector -1, Team 11, Team 14
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/MzOj5RB1DNA")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {activeMatchTab === "final" && (
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-4">Final match</h3>

                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2 px-4 font-medium">Match</th>
                                    <th className="text-left py-2 px-4 font-medium">Blue Alliance</th>
                                    <th className="text-center py-2 px-4 font-medium">Score</th>
                                    <th className="text-left py-2 px-4 font-medium">Red Alliance</th>
                                    <th className="text-right py-2 px-4 font-medium">Video</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">FINAL</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 4
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">Team 3, Team 6, Team 8</div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold">20</span> -{" "}
                                      <span className="font-bold text-red-600">13</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          Alliance 2
                                        </span>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                          Team 5, Team 13, Team 4
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex items-center"
                                        onClick={() => handleWatchVideo("https://youtu.be/r6xYP0zGU_w")}
                                      >
                                        <span className="mr-1">Watch</span>
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="w-full md:w-80">
                <div className="space-y-4 sticky top-20">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-4">Tournament Actions</h3>
                      <div className="space-y-3">
                        {tournament.status === "upcoming" && !isRegistered ? (
                          <Button className="w-full" onClick={handleRegister}>
                            Register for Tournament
                          </Button>
                        ) : isRegistered ? (
                          <Button className="w-full" variant="outline" disabled>
                            Registered
                          </Button>
                        ) : (
                          <Button className="w-full" disabled>
                            Registration Closed
                          </Button>
                        )}
                        <Button
                          variant={isFollowing ? "default" : "outline"}
                          className="w-full"
                          onClick={handleFollowToggle}
                        >
                          {isFollowing ? "Following" : "Follow Tournament"}
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/contact">Contact Organizers</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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

function MatchCard({ match }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <Badge variant="outline" className="bg-gray-50">
              Match #{match.number}
            </Badge>
            {match.time && (
              <span className="text-sm text-muted-foreground">
                <Clock className="h-3 w-3 inline mr-1" />
                {match.time}
              </span>
            )}
          </div>
          {match.completed && match.video && (
            <Link href={match.video} target="_blank" className="text-sm text-blue-600 hover:underline">
              Watch Replay
            </Link>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
          <div className="flex-1 border-l-4 border-red-500 pl-3">
            <h4 className="font-medium text-sm mb-2">Red Alliance</h4>
            <div className="space-y-2">
              {match.redAlliance.map((team) => (
                <div key={team.id} className="flex items-center gap-2">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden">
                    <Image src={team.image || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
                  </div>
                  <Link href={`/teams/${team.id}`} className="text-sm hover:underline">
                    {team.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {match.completed && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">
                <span className="text-red-500">{match.redScore}</span>
                <span className="mx-2">-</span>
                <span className="text-blue-500">{match.blueScore}</span>
              </div>
              <Badge
                className={
                  match.winner === "red"
                    ? "bg-red-100 text-red-800 mt-1"
                    : match.winner === "blue"
                      ? "bg-blue-100 text-blue-800 mt-1"
                      : "bg-gray-100 text-gray-800 mt-1"
                }
              >
                {match.winner === "red"
                  ? "Red Wins"
                  : match.winner === "blue"
                    ? "Blue Wins"
                    : match.winner === "tie"
                      ? "Tie"
                      : "Pending"}
              </Badge>
            </div>
          )}

          <div className="flex-1 border-l-4 border-blue-500 pl-3">
            <h4 className="font-medium text-sm mb-2">Blue Alliance</h4>
            <div className="space-y-2">
              {match.blueAlliance.map((team) => (
                <div key={team.id} className="flex items-center gap-2">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden">
                    <Image src={team.image || "/placeholder.svg"} alt={team.name} fill className="object-cover" />
                  </div>
                  <Link href={`/teams/${team.id}`} className="text-sm hover:underline">
                    {team.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const tournaments = [
  {
    id: "founders-championship",
    name: "MechaLeague Founders Championship",
    description: "Presented by Prepatec",
    date: "November 21, 2024",
    status: "completed",
    teams: 14,
    image: "/images/founders-championship.png",
    winner: "Alliance 4 (Team 3, Team 6, Team 8)",
    registeredTeams: [
      {
        id: "team-minus-1",
        name: "Vector -1",
        rankingPoints: 11,
        image: "/images/vector-1-team.png",
      },
      {
        id: "team-2",
        name: "Team 2",
        rankingPoints: 9,
        image: "/placeholder.svg",
      },
      {
        id: "team-3",
        name: "Team 3",
        rankingPoints: 11,
        image: "/placeholder.svg",
      },
      {
        id: "team-4",
        name: "Team 4",
        rankingPoints: 11,
        image: "/placeholder.svg",
      },
      {
        id: "team-5",
        name: "Team 5",
        rankingPoints: 12,
        image: "/placeholder.svg",
      },
      {
        id: "team-6",
        name: "Team 6",
        rankingPoints: 7,
        image: "/placeholder.svg",
      },
      {
        id: "team-7",
        name: "Team 7",
        rankingPoints: 11,
        image: "/placeholder.svg",
      },
      {
        id: "team-8",
        name: "Team 8",
        rankingPoints: 9,
        image: "/placeholder.svg",
      },
      {
        id: "team-9",
        name: "Team 9",
        rankingPoints: 5,
        image: "/placeholder.svg",
      },
      {
        id: "team-10",
        name: "Team 10",
        rankingPoints: 10,
        image: "/placeholder.svg",
      },
      {
        id: "team-11",
        name: "Team 11",
        rankingPoints: 7,
        image: "/placeholder.svg",
      },
      {
        id: "team-12",
        name: "Equipo 12",
        rankingPoints: 14,
        image: "/placeholder.svg",
      },
      {
        id: "team-13",
        name: "Team 13",
        rankingPoints: 8,
        image: "/placeholder.svg",
      },
      {
        id: "team-14",
        name: "Team 14",
        rankingPoints: 6,
        image: "/placeholder.svg",
      },
    ],
    alliances: [
      {
        color: "red",
        teams: [
          {
            id: "team-12",
            name: "Equipo 12",
            image: "/placeholder.svg",
          },
          {
            id: "team-5",
            name: "Equipo 5",
            image: "/placeholder.svg",
          },
        ],
      },
      {
        color: "blue",
        teams: [
          {
            id: "team-minus-1",
            name: "Vector -1",
            image: "/images/vector-1-team.png",
          },
        ],
      },
    ],
    matches: {
      qualification: [
        {
          number: 1,
          time: "10:00 AM",
          completed: true,
          redAlliance: [
            {
              id: "team-minus-1",
              name: "Vector -1",
              image: "/images/vector-1-team.png",
            },
          ],
          blueAlliance: [
            {
              id: "team-5",
              name: "Equipo 5",
              image: "/placeholder.svg",
            },
          ],
          redScore: 45,
          blueScore: 38,
          winner: "red",
          video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        {
          number: 2,
          time: "11:30 AM",
          completed: true,
          redAlliance: [
            {
              id: "team-12",
              name: "Equipo 12",
              image: "/placeholder.svg",
            },
          ],
          blueAlliance: [
            {
              id: "team-minus-1",
              name: "Vector -1",
              image: "/images/vector-1-team.png",
            },
          ],
          redScore: 52,
          blueScore: 47,
          winner: "red",
          video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      ],
      playoffs: [
        {
          number: 3,
          time: "2:00 PM",
          completed: true,
          redAlliance: [
            {
              id: "team-12",
              name: "Equipo 12",
              image: "/placeholder.svg",
            },
            {
              id: "team-5",
              name: "Equipo 5",
              image: "/placeholder.svg",
            },
          ],
          blueAlliance: [
            {
              id: "team-minus-1",
              name: "Vector -1",
              image: "/images/vector-1-team.png",
            },
          ],
          redScore: 65,
          blueScore: 60,
          winner: "red",
          video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      ],
      semifinals: [],
      finals: [
        {
          number: 4,
          time: "4:30 PM",
          completed: true,
          redAlliance: [
            {
              id: "team-12",
              name: "Equipo 12",
              image: "/placeholder.svg",
            },
            {
              id: "team-5",
              name: "Equipo 5",
              image: "/placeholder.svg",
            },
          ],
          blueAlliance: [
            {
              id: "team-minus-1",
              name: "Vector -1",
              image: "/images/vector-1-team.png",
            },
          ],
          redScore: 72,
          blueScore: 68,
          winner: "red",
          video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
      ],
    },
  },
  {
    id: "chemistry-quest",
    name: "Chemistry Quest",
    description: "A tournament focused on chemical engineering challenges",
    date: "TBD",
    status: "upcoming",
    teams: 16,
    image: "/images/chemistry-quest.png",
    registeredTeams: [
      {
        id: "team-minus-1",
        name: "Vector -1",
        image: "/images/vector-1-team.png",
      },
    ],
    matches: {
      qualification: [],
      playoffs: [],
      semifinals: [],
      finals: [],
    },
  },
]
