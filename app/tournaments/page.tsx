"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, Trophy, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Database } from "@/lib/db"
import { useToast } from "@/hooks/use-toast"

interface Tournament {
  id: string
  name: string
  date: string
  location: string
  participants: number
  status: "upcoming" | "ongoing" | "completed"
  prize?: string
  image: string
  winner?: string
  description?: string
}

const tournaments: Tournament[] = [
  {
    id: "mechaleague-founders-championship",
    name: "MechaLeague Founders Championship",
    date: "December 14, 2024",
    location: "Monterrey, Mexico",
    participants: 14,
    status: "completed",
    prize: "$5,000 + Trophy",
    winner: "Team 12",
    image: "/images/founders-championship.png",
    description: "The inaugural MechaLeague tournament featuring the best teams from across Mexico.",
  },
  {
    id: "chemistry-quest",
    name: "Chemistry Quest",
    date: "March 15, 2025",
    location: "Mexico City, Mexico",
    participants: 20,
    status: "upcoming",
    prize: "$10,000 + Trophy",
    image: "/images/chemistry-quest-banner.png",
    description: "A special tournament focused on chemistry-themed challenges and innovation.",
  },
]

export default function TournamentsPage() {
  const [followedTournaments, setFollowedTournaments] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLoggedIn = localStorage.getItem("userLoggedIn")
      if (userLoggedIn === "true") {
        setIsLoggedIn(true)
        const currentUser = Database.getCurrentUser()
        if (currentUser && currentUser.followedTournaments) {
          setFollowedTournaments(currentUser.followedTournaments)
        }
      }
    }
  }, [])

  const handleFollowTournament = (tournamentId: string) => {
    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", "/tournaments")
      }
      window.location.href = "/register"
      return
    }

    const currentUser = Database.getCurrentUser()
    if (!currentUser) return

    try {
      const updatedUser = Database.toggleFollowTournament(currentUser.id, tournamentId)
      setFollowedTournaments(updatedUser.followedTournaments)

      const tournament = tournaments.find((t) => t.id === tournamentId)
      if (tournament) {
        if (updatedUser.followedTournaments.includes(tournamentId)) {
          toast({
            title: "Tournament followed",
            description: `You are now following ${tournament.name}`,
          })

          if (typeof window !== "undefined") {
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
        } else {
          toast({
            title: "Tournament unfollowed",
            description: `You unfollowed ${tournament.name}`,
          })
        }
      }
    } catch (error) {
      console.error("Error toggling tournament follow:", error)
      toast({
        title: "Error",
        description: "Failed to update tournament follow status",
        variant: "destructive",
      })
    }
  }

  const upcomingTournaments = tournaments.filter((t) => t.status === "upcoming" || t.status === "ongoing")
  const completedTournaments = tournaments.filter((t) => t.status === "completed")

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">MechaLeague Tournaments</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Compete in exciting robotics tournaments and showcase your skills
                </p>
              </div>
            </div>

            <Tabs defaultValue="upcoming" className="mt-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
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
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
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
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

interface TournamentCardProps {
  tournament: Tournament
  isFollowed: boolean
  onFollowToggle: (tournamentId: string) => void
  isLoggedIn: boolean
}

function TournamentCard({ tournament, isFollowed, onFollowToggle, isLoggedIn }: TournamentCardProps) {
  const getObjectFit = () => {
    if (tournament.id === "mechaleague-founders-championship") {
      return "object-cover"
    }
    return "object-contain"
  }

  const getBackgroundColor = () => {
    if (tournament.id === "chemistry-quest") {
      return "bg-white"
    }
    return ""
  }

  return (
    <Link href={`/tournaments/${tournament.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full cursor-pointer">
        <div className={`relative h-48 ${getBackgroundColor()}`}>
          <Image src={tournament.image || "/placeholder.svg"} alt={tournament.name} fill className={getObjectFit()} />
          {tournament.status === "ongoing" && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              LIVE
            </div>
          )}
          {tournament.status === "completed" && tournament.winner && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              COMPLETED
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-xl">{tournament.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              className={`${isFollowed ? "text-red-500" : "text-muted-foreground"}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onFollowToggle(tournament.id)
              }}
              title={isFollowed ? "Unfollow tournament" : "Follow tournament"}
            >
              <Heart className={`h-5 w-5 ${isFollowed ? "fill-current" : ""}`} />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{tournament.participants} teams</span>
            </div>
            {tournament.prize && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4" />
                <span>{tournament.prize}</span>
              </div>
            )}
            {tournament.winner && (
              <div className="mt-2 pt-2 border-t">
                <span className="text-sm font-medium">Winner: </span>
                <span className="text-sm text-primary">{tournament.winner}</span>
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
