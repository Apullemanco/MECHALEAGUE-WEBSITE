"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { User, Mail, Calendar, Trophy, Users, Heart, ChevronRight } from "lucide-react"
import { Database } from "@/lib/db"
import type { User as UserType } from "@/lib/db"

interface Team {
  id: string
  name: string
  logo: string
  members: number
  rank?: number
}

interface Tournament {
  id: string
  name: string
  date: string
  image: string
  status: string
}

const allTeams: Team[] = [
  {
    id: "team-minus-1",
    name: "Vector -1",
    logo: "/images/vector-1-team.png",
    members: 3,
    rank: 3,
  },
  {
    id: "team-2",
    name: "Equipo 2",
    logo: "/images/team-default.png",
    members: 3,
    rank: 8,
  },
  {
    id: "team-3",
    name: "Equipo 3",
    logo: "/images/team-default.png",
    members: 4,
    rank: 4,
  },
  {
    id: "team-4",
    name: "Equipo 4",
    logo: "/images/team-default.png",
    members: 3,
    rank: 5,
  },
  {
    id: "team-5",
    name: "Equipo 5",
    logo: "/images/team-default.png",
    members: 3,
    rank: 2,
  },
  {
    id: "team-6",
    name: "Equipo 6",
    logo: "/images/team-default.png",
    members: 3,
    rank: 11,
  },
  {
    id: "team-7",
    name: "Equipo 7",
    logo: "/images/team-default.png",
    members: 3,
    rank: 6,
  },
  {
    id: "team-8",
    name: "Equipo 8",
    logo: "/images/team-default.png",
    members: 3,
    rank: 9,
  },
  {
    id: "team-9",
    name: "Equipo 9",
    logo: "/images/team-default.png",
    members: 3,
    rank: 14,
  },
  {
    id: "team-10",
    name: "Equipo 10",
    logo: "/images/team-default.png",
    members: 3,
    rank: 7,
  },
  {
    id: "team-11",
    name: "Equipo 11",
    logo: "/images/team-default.png",
    members: 3,
    rank: 12,
  },
  {
    id: "team-12",
    name: "Equipo 12",
    logo: "/images/team-default.png",
    members: 2,
    rank: 1,
  },
  {
    id: "team-13",
    name: "Equipo 13",
    logo: "/images/team-default.png",
    members: 3,
    rank: 10,
  },
  {
    id: "team-14",
    name: "Equipo 14",
    logo: "/images/team-default.png",
    members: 3,
    rank: 13,
  },
]

const allTournaments: Tournament[] = [
  {
    id: "mechaleague-founders-championship",
    name: "MechaLeague Founders Championship",
    date: "December 14, 2024",
    image: "/images/founders-championship.png",
    status: "completed",
  },
  {
    id: "chemistry-quest",
    name: "Chemistry Quest",
    date: "March 15, 2025",
    image: "/images/chemistry-quest-banner.png",
    status: "upcoming",
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [followedTeams, setFollowedTeams] = useState<Team[]>([])
  const [followedTournaments, setFollowedTournaments] = useState<Tournament[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLoggedIn = localStorage.getItem("userLoggedIn")

      if (userLoggedIn !== "true") {
        router.push("/register")
        return
      }

      const currentUser = Database.getCurrentUser()
      if (!currentUser) {
        router.push("/register")
        return
      }

      setUser(currentUser)

      // Get followed teams
      const userFollowedTeams = currentUser.followedTeams || []
      const teamsData = allTeams.filter((team) => userFollowedTeams.includes(team.id))
      setFollowedTeams(teamsData)

      // Get followed tournaments
      const userFollowedTournaments = currentUser.followedTournaments || []
      const tournamentsData = allTournaments.filter((tournament) => userFollowedTournaments.includes(tournament.id))
      setFollowedTournaments(tournamentsData)

      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
              {/* Profile Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/profile/edit">Edit Profile</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Followed Teams</span>
                      </div>
                      <span className="font-bold">{followedTeams.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Followed Tournaments</span>
                      </div>
                      <span className="font-bold">{followedTournaments.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div>
                <Tabs defaultValue="teams" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="teams">Followed Teams</TabsTrigger>
                    <TabsTrigger value="tournaments">Followed Tournaments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="teams" className="mt-6">
                    {followedTeams.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-4">You haven't followed any teams yet</p>
                          <Button asChild>
                            <Link href="/teams">Browse Teams</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2">
                        {followedTeams.map((team) => (
                          <Link key={team.id} href={`/teams/${team.id}`}>
                            <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-muted flex items-center justify-center bg-white">
                                    <Image
                                      src={team.logo || "/placeholder.svg"}
                                      alt={team.name}
                                      width={64}
                                      height={64}
                                      className="object-contain p-2"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-lg">{team.name}</h3>
                                    {team.rank && (
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Trophy className="h-4 w-4" />
                                        <span>Rank: #{team.rank}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Users className="h-4 w-4" />
                                      <span>{team.members} members</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="tournaments" className="mt-6">
                    {followedTournaments.length === 0 ? (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-4">You haven't followed any tournaments yet</p>
                          <Button asChild>
                            <Link href="/tournaments">Browse Tournaments</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2">
                        {followedTournaments.map((tournament) => (
                          <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
                            <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
                              <div className="relative h-32 bg-white">
                                <Image
                                  src={tournament.image || "/placeholder.svg"}
                                  alt={tournament.name}
                                  fill
                                  className={
                                    tournament.id === "mechaleague-founders-championship"
                                      ? "object-cover"
                                      : "object-contain p-2"
                                  }
                                />
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-bold mb-2">{tournament.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>{tournament.date}</span>
                                </div>
                                <div className="mt-2">
                                  <span
                                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                      tournament.status === "completed"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {tournament.status === "completed" ? "Completed" : "Upcoming"}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    )}
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
