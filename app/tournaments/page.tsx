"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, Search, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useMobile } from "@/hooks/use-mobile"

export default function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followedTournaments, setFollowedTournaments] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn === "true") {
      setIsLoggedIn(true)
      // Load followed tournaments from localStorage
      const storedFollowedTournaments = localStorage.getItem("followedTournaments")
      if (storedFollowedTournaments) {
        setFollowedTournaments(JSON.parse(storedFollowedTournaments))
      }
    }
  }, [])

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort tournaments by date (most recent first)
  const sortedTournaments = [...filteredTournaments].sort((a, b) => {
    const dateA = new Date(a.dateObj || a.date).getTime()
    const dateB = new Date(b.dateObj || b.date).getTime()
    return dateB - dateA
  })

  const upcomingTournaments = filteredTournaments.filter((tournament) => tournament.status === "upcoming")
  const ongoingTournaments = filteredTournaments.filter((tournament) => tournament.status === "ongoing")
  const completedTournaments = filteredTournaments.filter((tournament) => tournament.status === "completed")

  const handleFollowTournament = (tournamentId: string) => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      localStorage.setItem("redirectAfterLogin", "/tournaments")
      window.location.href = "/register"
      return
    }

    let updatedFollowedTournaments
    if (followedTournaments.includes(tournamentId)) {
      // Unfollow tournament
      updatedFollowedTournaments = followedTournaments.filter((id) => id !== tournamentId)
    } else {
      // Follow tournament
      updatedFollowedTournaments = [...followedTournaments, tournamentId]

      // Add notification about following the tournament
      const tournament = tournaments.find((t) => t.id === tournamentId)
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

    setFollowedTournaments(updatedFollowedTournaments)
    localStorage.setItem("followedTournaments", JSON.stringify(updatedFollowedTournaments))
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">MechaLeague Tournaments</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Browse all tournaments or search for specific events
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tournaments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mt-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all">All tournaments</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedTournaments.map((tournament) => (
                    <TournamentCard
                      key={tournament.id}
                      tournament={tournament}
                      isFollowed={followedTournaments.includes(tournament.id)}
                      onFollowToggle={handleFollowTournament}
                      isLoggedIn={isLoggedIn}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                {upcomingTournaments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingTournaments.map((tournament) => (
                      <TournamentCard
                        key={tournament.id}
                        tournament={tournament}
                        isFollowed={followedTournaments.includes(tournament.id)}
                        onFollowToggle={handleFollowTournament}
                        isLoggedIn={isLoggedIn}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No upcoming tournaments</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      There are no upcoming tournaments scheduled at the moment. Check back soon for new events!
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ongoing" className="mt-6">
                {ongoingTournaments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ongoingTournaments.map((tournament) => (
                      <TournamentCard
                        key={tournament.id}
                        tournament={tournament}
                        isFollowed={followedTournaments.includes(tournament.id)}
                        onFollowToggle={handleFollowTournament}
                        isLoggedIn={isLoggedIn}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No ongoing tournaments</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      There are no tournaments currently in progress. Check back soon for live events!
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                {completedTournaments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedTournaments.map((tournament) => (
                      <TournamentCard
                        key={tournament.id}
                        tournament={tournament}
                        isFollowed={followedTournaments.includes(tournament.id)}
                        onFollowToggle={handleFollowTournament}
                        isLoggedIn={isLoggedIn}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No completed tournaments</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      There are no completed tournaments yet. Stay tuned for upcoming events!
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function TournamentCard({ tournament, isFollowed, onFollowToggle, isLoggedIn }) {
  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "ongoing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={tournament.image || "/placeholder.svg"}
            alt={tournament.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Si la imagen falla, usar un placeholder
              e.currentTarget.src = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(tournament.name)}`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold text-xl">{tournament.name}</h3>
            <p className="text-sm text-white/80">{tournament.description}</p>
          </div>
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
              {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{tournament.teams} teams</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button asChild variant="outline" size="sm">
              <Link href={`/tournaments/${tournament.id}`}>View details</Link>
            </Button>
            <Button
              variant={isFollowed ? "default" : "outline"}
              size="sm"
              onClick={() => onFollowToggle(tournament.id)}
            >
              {isFollowed ? "Following" : "Follow"}
            </Button>
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
    dateObj: "2024-11-21",
    status: "completed",
    teams: 14,
    image: "/images/founders-championship.png",
    winner: "Alliance 4 (Team 3, Team 6, Team 8)",
  },
  {
    id: "chemistry-quest",
    name: "Chemistry Quest",
    description: "A tournament focused on chemical engineering challenges",
    date: "TBD",
    dateObj: "2025-06-10", // For sorting purposes
    status: "upcoming",
    teams: 16,
    image: "/images/chemistry-quest.png",
  },
]
