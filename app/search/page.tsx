"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronRight, Search, Trophy, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image src="/images/mechaleague-logo.png" alt="MechaLeague" width={32} height={32} />
              </div>
              <span className="inline-block font-bold">MechaLeague</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground">
                Home
              </Link>
              <Link href="/teams" className="flex items-center text-sm font-medium text-muted-foreground">
                Teams
              </Link>
              <Link href="/tournaments" className="flex items-center text-sm font-medium text-muted-foreground">
                Tournaments
              </Link>
              <Link href="/about" className="flex items-center text-sm font-medium text-muted-foreground">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Search MechaLeague</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Find teams, tournaments, and results
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search teams, tournaments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Tabs defaultValue="teams" className="mt-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="teams">Teams</TabsTrigger>
                <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              </TabsList>

              <TabsContent value="teams" className="mt-6">
                {searchQuery ? (
                  filteredTeams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTeams.map((team) => (
                        <Link href={`/teams/${team.id}`} key={team.id}>
                          <Card className="overflow-hidden transition-all hover:shadow-md h-full">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-muted">
                                  {team.id === "team-minus-1" ? (
                                    <Image
                                      src="/images/vector-1-team.png"
                                      alt={team.name}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <Image
                                      src={team.logo || "/placeholder.svg"}
                                      alt={team.name}
                                      fill
                                      className="object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg">{team.name}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <Trophy className="h-4 w-4" />
                                    <span>Rank: #{team.rank}</span>
                                  </div>
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
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No teams found matching "{searchQuery}"</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Enter a search term to find teams</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tournaments" className="mt-6">
                {searchQuery ? (
                  filteredTournaments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTournaments.map((tournament) => (
                        <Link href={`/tournaments/${tournament.id}`} key={tournament.id}>
                          <Card className="overflow-hidden transition-all hover:shadow-md h-full">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded overflow-hidden border-2 border-muted">
                                  <Image
                                    src="/images/maxresdefault.jpg"
                                    alt={tournament.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg">{tournament.name}</h3>
                                  <p className="text-xs text-muted-foreground">Presented by Prepa Tec</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{tournament.date}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{tournament.teams} teams</span>
                                  </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No tournaments found matching "{searchQuery}"</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Enter a search term to find tournaments</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-[1600px]">
          <p className="text-sm text-muted-foreground">© 2024 MechaLeague. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const teams = [
  {
    id: "team-minus-1",
    name: "Vector -1",
    rank: 3,
    members: 3,
    logo: "/images/vector-1-team.png",
  },
  {
    id: "team-2",
    name: "Equipo 2",
    rank: 8,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-3",
    name: "Equipo 3",
    rank: 4,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-4",
    name: "Equipo 4",
    rank: 5,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-5",
    name: "Equipo 5",
    rank: 2,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-6",
    name: "Equipo 6",
    rank: 11,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-7",
    name: "Equipo 7",
    rank: 6,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-8",
    name: "Equipo 8",
    rank: 9,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-9",
    name: "Equipo 9",
    rank: 14,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-10",
    name: "Equipo 10",
    rank: 7,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-11",
    name: "Equipo 11",
    rank: 12,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-12",
    name: "Equipo 12",
    rank: 1,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-13",
    name: "Equipo 13",
    rank: 10,
    members: 3,
    logo: "/placeholder.svg",
  },
  {
    id: "team-14",
    name: "Equipo 14",
    rank: 13,
    members: 3,
    logo: "/placeholder.svg",
  },
]

const tournaments = [
  {
    id: "mechaleague-founders-championship",
    name: "MechaLeague Founders Championship",
    date: "November 21, 2024",
    location: "Saltillo, Coahuila, Mexico",
    teams: 14,
    image: "/images/maxresdefault.jpg",
  },
]
