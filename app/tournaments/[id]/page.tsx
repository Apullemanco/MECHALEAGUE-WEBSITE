"use client"

import { useState, useEffect } from "react"
import { useRouter, notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Trophy, Users, Clock, MapPin, AlertCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Database } from "@/lib/db"

export default function TournamentPage({ params }: { params: { id: string } }) {
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

  // Fetch tournament data using the Database module
  useEffect(() => {
    const tournamentData = Database.getTournamentById(params.id)
    if (!tournamentData) {
      notFound()
    }
    setTournament(tournamentData)
    setLoading(false)
  }, [params.id])

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

  const handleRegisterTeam = () => {
    window.open("https://tally.so/r/3jge7R", "_blank")
  }

  const handleContactOrganizers = () => {
    window.open("https://www.instagram.com/mechaleague", "_blank")
  }

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
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={tournament.image || "/placeholder.svg"}
                    alt={tournament.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{tournament.name}</h1>
                  </div>
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
                      <span>
                        Status: <Badge variant="secondary">{tournament.status}</Badge>
                      </span>
                    </div>
                    {tournament.winner && (
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>
                          Winner: <strong>{tournament.winner}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="font-medium mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">{tournament.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Tournament Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tournament.status !== "completed" && (
                      <Button className="w-full" onClick={handleRegisterTeam}>
                        Register Your Team
                      </Button>
                    )}
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleContactOrganizers}>
                      Contact Organizers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Tournament Format</h3>
                      <p className="text-sm text-muted-foreground">
                        Teams compete in 3v3 alliances (Blue Alliance vs Red Alliance) in a series of qualification
                        matches followed by elimination rounds.
                      </p>
                    </div>
                    {tournament.status === "completed" && (
                      <div>
                        <h3 className="font-semibold mb-2">Results</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-5 w-5 text-yellow-500" />
                              <span className="font-medium">1st Place</span>
                            </div>
                            <span className="font-semibold">{tournament.winner}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-5 w-5 text-gray-400" />
                              <span className="font-medium">2nd Place</span>
                            </div>
                            <span className="font-semibold">Equipo 5</span>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-5 w-5 text-orange-600" />
                              <span className="font-medium">3rd Place</span>
                            </div>
                            <span className="font-semibold">Vector -1</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-6 p-4 bg-muted/30 rounded-md">
                      <h3 className="font-medium mb-2">Note</h3>
                      <p className="text-sm text-muted-foreground">
                        {tournament.status === "completed"
                          ? "This tournament has concluded. Check back for future tournaments!"
                          : "Tournament details are subject to change. Please check back for updates."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
