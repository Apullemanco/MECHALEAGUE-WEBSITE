"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Trophy, Users, Heart, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { fetchTeamsFromGoogleSheets } from "@/lib/google-sheets"
import { useToast } from "@/hooks/use-toast"
import { Database } from "@/lib/db"

export default function TeamsPage() {
  const [allTeams, setAllTeams] = useState([...teams])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [followedTeams, setFollowedTeams] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadNewTeams() {
      try {
        setLoading(true)
        setError(null)
        const newTeams = await fetchTeamsFromGoogleSheets()
        const newTeamsWithImages = newTeams.map((team) => {
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
    if (typeof window !== "undefined") {
      const userLoggedIn = localStorage.getItem("userLoggedIn")
      if (userLoggedIn === "true") {
        setIsLoggedIn(true)
        const currentUser = Database.getCurrentUser()
        if (currentUser && currentUser.followedTeams) {
          setFollowedTeams(currentUser.followedTeams)
        }
      }
    }
  }, [])

  const handleFollowTeam = (teamId: string) => {
    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", "/teams")
      }
      window.location.href = "/register"
      return
    }

    const currentUser = Database.getCurrentUser()
    if (!currentUser) return

    try {
      const updatedUser = Database.toggleFollowTeam(currentUser.id, teamId)
      setFollowedTeams(updatedUser.followedTeams)

      const team = allTeams.find((t) => t.id === teamId)
      if (team) {
        if (updatedUser.followedTeams.includes(teamId)) {
          toast({
            title: "Team followed",
            description: `You are now following ${team.name}`,
          })

          if (typeof window !== "undefined") {
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
        } else {
          toast({
            title: "Team unfollowed",
            description: `You unfollowed ${team.name}`,
          })
        }
      }
    } catch (error) {
      console.error("Error toggling team follow:", error)
      toast({
        title: "Error",
        description: "Failed to update team follow status",
        variant: "destructive",
      })
    }
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
                  Browse all teams competing in MechaLeague
                </p>
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
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="all">All teams</TabsTrigger>
                <TabsTrigger value="top">Top ranked</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading teams...</p>
                  </div>
                ) : allTeams.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allTeams.map((team) => (
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
                    <p className="text-muted-foreground">No teams found.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="top" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allTeams
                    .filter((team) => team.rank && team.rank <= 5)
                    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
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
            </Tabs>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

interface TeamCardProps {
  team: {
    id: string
    name: string
    rank?: number
    members: number
    logo: string
    recentPerformance: string
    participants?: string[]
  }
  isFollowed: boolean
  onFollowToggle: (teamId: string) => void
  isLoggedIn: boolean
}

function TeamCard({ team, isFollowed, onFollowToggle, isLoggedIn }: TeamCardProps) {
  const getTeamImage = (team: TeamCardProps["team"]) => {
    if (team.id === "team-minus-1") {
      return "/images/vector-1-team.png"
    }
    return "/images/team-default.png"
  }

  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-muted flex items-center justify-center bg-white">
              <Image
                src={getTeamImage(team) || "/placeholder.svg"}
                alt={team.name}
                width={64}
                height={64}
                className="object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/images/team-default.png"
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
                    e.stopPropagation()
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
            <div className="inline-flex items-center text-sm font-medium text-primary">
              View details
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
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
