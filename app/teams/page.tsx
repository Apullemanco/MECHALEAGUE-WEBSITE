"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Trophy, Users, Heart, AlertCircle, Bell, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { fetchTeamsFromGoogleSheets } from "@/lib/google-sheets"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [allTeams, setAllTeams] = useState([...teams])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [followedTeams, setFollowedTeams] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    async function loadNewTeams() {
      try {
        setLoading(true)
        setError(null)
        const newTeams = await fetchTeamsFromGoogleSheets()
        // Assign images to new teams
        const newTeamsWithImages = newTeams.map((team, index) => {
          return {
            ...team,
          }
        })
        setAllTeams([...teams, ...newTeamsWithImages])
      } catch (error) {
        console.error("Error loading new teams:", error)
        setError("Failed to load new teams. Showing existing teams only.")
      } finally {
        setLoading(false)
      }
    }

    loadNewTeams()
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    if (userLoggedIn === "true") {
      setIsLoggedIn(true)
      // Load followed teams from localStorage
      const storedFollowedTeams = localStorage.getItem("followedTeams")
      if (storedFollowedTeams) {
        setFollowedTeams(JSON.parse(storedFollowedTeams))
      }
    }
  }, [])

  const filteredTeams = allTeams.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleFollowTeam = (teamId: string) => {
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      localStorage.setItem("redirectAfterLogin", "/teams")
      window.location.href = "/register"
      return
    }

    let updatedFollowedTeams
    if (followedTeams.includes(teamId)) {
      // Unfollow team
      updatedFollowedTeams = followedTeams.filter((id) => id !== teamId)
      toast({
        title: "Team unfollowed",
        description: "You will no longer receive updates about this team",
      })
    } else {
      // Follow team
      updatedFollowedTeams = [...followedTeams, teamId]
      toast({
        title: "Team followed",
        description: "You will now receive updates about this team",
      })

      // Add notification about following the team
      const team = allTeams.find((t) => t.id === teamId)
      if (team) {
        const notifications = JSON.parse(localStorage.getItem("notifications") || "[]")
        notifications.push({
          id: Date.now(),
          type: "team_followed",
          title: `You are now following ${team.name}`,
          description: "You will receive updates about matches and results",
          date: new Date().toISOString(),
          read: false,
        })
        localStorage.setItem("notifications", JSON.stringify(notifications))
      }
    }

    setFollowedTeams(updatedFollowedTeams)
    localStorage.setItem("followedTeams", JSON.stringify(updatedFollowedTeams))
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">MechaLeague teams</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Browse all teams or search for your favorites
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search teams..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4 max-w-md mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="all" className="mt-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="all">All teams</TabsTrigger>
                <TabsTrigger value="top">Top ranked</TabsTrigger>
                {isLoggedIn && <TabsTrigger value="followed">Followed</TabsTrigger>}
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading teams...</p>
                  </div>
                ) : filteredTeams.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team) => (
                      <TeamCard
                        key={team.id}
                        team={team}
                        isFollowed={followedTeams.includes(team.id)}
                        onFollowToggle={handleFollowTeam}
                        isLoggedIn={isLoggedIn}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No teams found matching your search.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="top" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeams
                    .filter((team) => team.rank && team.rank <= 5)
                    .sort((a, b) => a.rank - b.rank)
                    .map((team) => (
                      <TeamCard
                        key={team.id}
                        team={team}
                        isFollowed={followedTeams.includes(team.id)}
                        onFollowToggle={handleFollowTeam}
                        isLoggedIn={isLoggedIn}
                      />
                    ))}
                </div>
              </TabsContent>

              {isLoggedIn && (
                <TabsContent value="followed" className="mt-6">
                  {followedTeams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTeams
                        .filter((team) => followedTeams.includes(team.id))
                        .map((team) => (
                          <TeamCard
                            key={team.id}
                            team={team}
                            isFollowed={true}
                            onFollowToggle={handleFollowTeam}
                            isLoggedIn={isLoggedIn}
                          />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No followed teams</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        You haven't followed any teams yet. Follow teams to receive updates about their matches and
                        results.
                      </p>
                      <Button asChild variant="outline">
                        <Link href="#all">Browse teams</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              )}
            </Tabs>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function TeamCard({ team, isFollowed, onFollowToggle, isLoggedIn }) {
  // Function to get team image
  const getTeamImage = (team) => {
    if (team.id === "team-minus-1") {
      return "/images/vector-1-team.png"
    }

    // Use the new default team image for all other teams
    return "/images/team-default.png"
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-muted">
            <Image
              src={getTeamImage(team) || "/images/team-default.png"}
              alt={team.name}
              fill
              className="object-cover"
              onError={(e) => {
                // If image fails, use the default team image
                e.currentTarget.src = "/images/team-default.png"
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{team.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className={`${isFollowed ? "text-red-500" : "text-muted-foreground"}`}
                onClick={(e) => {
                  e.preventDefault()
                  onFollowToggle(team.id)
                }}
                title={isFollowed ? "Unfollow team" : "Follow team"}
              >
                <Heart className={`h-5 w-5 ${isFollowed ? "fill-current" : ""}`} />
              </Button>
            </div>
            {team.rank ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Trophy className="h-4 w-4" />
                <span>Rank: #{team.rank}</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground mt-1">
                <span className="text-primary">New Team</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{team.members} members</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="text-sm">
            <span className="font-medium">Status: </span>
            <span className="text-muted-foreground">{team.recentPerformance}</span>
          </div>
          {team.id === "team-minus-1" && (
            <div className="text-sm mt-1">
              <span className="font-medium">Achievement: </span>
              <span className="text-muted-foreground">First officially registered team</span>
            </div>
          )}
          {team.participants && team.participants.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium">Members: </span>
              <span className="text-sm text-muted-foreground">{team.participants.join(", ")}</span>
            </div>
          )}
        </div>
        <div className="mt-4 pt-2">
          <Link href={`/teams/${team.id}`} className="inline-flex items-center text-sm font-medium text-primary">
            View details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

const teams = [
  {
    id: "team-minus-1",
    name: "Vector -1",
    rank: 3,
    members: 3,
    logo: "/images/vector-1-team.png",
    recentPerformance: "Judges' Favorite Team in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 11,
  },
  {
    id: "team-2",
    name: "Equipo 2",
    rank: 8,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 9,
  },
  {
    id: "team-3",
    name: "Equipo 3",
    rank: 4,
    members: 4,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 11,
  },
  {
    id: "team-4",
    name: "Equipo 4",
    rank: 5,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 11,
  },
  {
    id: "team-5",
    name: "Equipo 5",
    rank: 2,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 12,
  },
  {
    id: "team-6",
    name: "Equipo 6",
    rank: 11,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 7,
  },
  {
    id: "team-7",
    name: "Equipo 7",
    rank: 6,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 11,
  },
  {
    id: "team-8",
    name: "Equipo 8",
    rank: 9,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 9,
  },
  {
    id: "team-9",
    name: "Equipo 9",
    rank: 14,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 5,
  },
  {
    id: "team-10",
    name: "Equipo 10",
    rank: 7,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 10,
  },
  {
    id: "team-11",
    name: "Equipo 11",
    rank: 12,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 7,
  },
  {
    id: "team-12",
    name: "Equipo 12",
    rank: 1,
    members: 2,
    logo: "/images/team-default.png",
    recentPerformance: "Winner of MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 14,
  },
  {
    id: "team-13",
    name: "Equipo 13",
    rank: 10,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 8,
  },
  {
    id: "team-14",
    name: "Equipo 14",
    rank: 13,
    members: 3,
    logo: "/images/team-default.png",
    recentPerformance: "Competed in MechaLeague Founders Championship",
    isNew: false,
    rankingPoints: 6,
  },
]
