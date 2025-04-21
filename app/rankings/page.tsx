"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trophy, Medal, Star, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function RankingsPage() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load team data
    setTeams(rankedTeams)
    setLoading(false)
  }, [])

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Team Rankings</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  The official MechaLeague team rankings based on tournament performance
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading rankings...</p>
              </div>
            ) : (
              <div className="mt-12 space-y-8">
                {/* Top 3 Teams */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {/* 2nd Place */}
                  <div className="md:mt-16">
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-2 border-gray-300 dark:border-gray-700">
                      <div className="absolute top-0 right-0 left-0 h-2 bg-gray-400"></div>
                      <CardContent className="p-6 pt-8">
                        <div className="flex flex-col items-center text-center gap-4">
                          <Badge className="absolute -top-3 px-3 py-1 bg-gray-400 text-white text-lg font-bold">
                            2
                          </Badge>
                          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-gray-300">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team5-random.jpg-Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9.jpeg"
                              alt={teams[1]?.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">{teams[1]?.name}</h3>
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
                              <Trophy className="h-4 w-4 text-gray-400" />
                              <span>{teams[1]?.rankingPoints} ranking points</span>
                            </div>
                          </div>
                          <div className="mt-2 space-y-2 w-full">
                            <h4 className="font-medium text-sm">Achievements:</h4>
                            <ul className="text-sm text-muted-foreground text-left space-y-1">
                              <li className="flex items-start gap-2">
                                <Medal className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span>2nd place in MechaLeague Founders Championship</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Star className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span>Consistent performance across all matches</span>
                              </li>
                            </ul>
                          </div>
                          <Link
                            href={`/teams/${teams[1]?.id}`}
                            className="mt-2 text-primary hover:underline text-sm font-medium"
                          >
                            View team profile
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 1st Place */}
                  <div className="md:-mt-8">
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-2 border-yellow-400 dark:border-yellow-600">
                      <div className="absolute top-0 right-0 left-0 h-2 bg-yellow-400"></div>
                      <CardContent className="p-6 pt-8">
                        <div className="flex flex-col items-center text-center gap-4">
                          <Badge className="absolute -top-3 px-3 py-1 bg-yellow-400 text-white text-lg font-bold">
                            1
                          </Badge>
                          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-yellow-400">
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team12-random.jpg-Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9.jpeg"
                              alt={teams[0]?.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-2xl">{teams[0]?.name}</h3>
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span>{teams[0]?.rankingPoints} ranking points</span>
                            </div>
                          </div>
                          <div className="mt-2 space-y-2 w-full">
                            <h4 className="font-medium text-sm">Achievements:</h4>
                            <ul className="text-sm text-muted-foreground text-left space-y-1">
                              <li className="flex items-start gap-2">
                                <Trophy className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>Winner of MechaLeague Founders Championship</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>Highest scoring team in the tournament</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Award className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>Most consistent performance across all matches</span>
                              </li>
                            </ul>
                          </div>
                          <Link
                            href={`/teams/${teams[0]?.id}`}
                            className="mt-2 text-primary hover:underline text-sm font-medium"
                          >
                            View team profile
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 3rd Place */}
                  <div className="md:mt-24">
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border-2 border-amber-600 dark:border-amber-800">
                      <div className="absolute top-0 right-0 left-0 h-2 bg-amber-600"></div>
                      <CardContent className="p-6 pt-8">
                        <div className="flex flex-col items-center text-center gap-4">
                          <Badge className="absolute -top-3 px-3 py-1 bg-amber-600 text-white text-lg font-bold">
                            3
                          </Badge>
                          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-amber-600">
                            <Image src="/images/vector-1-team.png" alt={teams[2]?.name} fill className="object-cover" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">{teams[2]?.name}</h3>
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
                              <Trophy className="h-4 w-4 text-amber-600" />
                              <span>{teams[2]?.rankingPoints} ranking points</span>
                            </div>
                          </div>
                          <div className="mt-2 space-y-2 w-full">
                            <h4 className="font-medium text-sm">Achievements:</h4>
                            <ul className="text-sm text-muted-foreground text-left space-y-1">
                              <li className="flex items-start gap-2">
                                <Trophy className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                <span>Judges' Favorite Team</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Star className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                <span>First officially registered team</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Award className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                <span>Most innovative robot design</span>
                              </li>
                            </ul>
                          </div>
                          <Link
                            href={`/teams/${teams[2]?.id}`}
                            className="mt-2 text-primary hover:underline text-sm font-medium"
                          >
                            View team profile
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Rest of the teams */}
                <Card className="mt-12">
                  <CardHeader>
                    <CardTitle>Complete Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Rank</th>
                            <th className="text-left py-3 px-4">Team</th>
                            <th className="text-left py-3 px-4">Points</th>
                            <th className="text-left py-3 px-4">Wins</th>
                            <th className="text-left py-3 px-4">Losses</th>
                            <th className="text-left py-3 px-4">Notable Achievement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teams.map((team, index) => (
                            <tr
                              key={team.id}
                              className={`border-b hover:bg-muted/50 transition-colors ${
                                index < 3 ? "font-medium" : ""
                              }`}
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <span>#{team.rank}</span>
                                  {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                                  {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                                  {index === 2 && <Medal className="h-4 w-4 text-amber-600" />}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Link href={`/teams/${team.id}`} className="flex items-center gap-2 hover:text-primary">
                                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
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
                                  <span>{team.name}</span>
                                </Link>
                              </td>
                              <td className="py-3 px-4">{team.rankingPoints}</td>
                              <td className="py-3 px-4">{team.stats.wins}</td>
                              <td className="py-3 px-4">{team.stats.losses}</td>
                              <td className="py-3 px-4">
                                {index === 0 && "Tournament Winner"}
                                {index === 1 && "Tournament Runner-up"}
                                {index === 2 && "First Registered Team"}
                                {index === 3 && "Strong Alliance Partner"}
                                {index === 4 && "Consistent Performance"}
                                {index > 4 && "Tournament Participant"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

// Actualizar las estadísticas y posiciones en la página de rankings
const rankedTeams = [
  {
    id: "team-12",
    name: "Equipo 12",
    rank: 1,
    members: 2,
    logo: "/placeholder.svg",
    rankingPoints: 14,
    stats: {
      wins: 5,
      losses: 1,
      tournaments: 1,
    },
  },
  {
    id: "team-5",
    name: "Equipo 5",
    rank: 2,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 12,
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
  },
  {
    id: "team-minus-1",
    name: "Vector -1",
    rank: 3,
    members: 3,
    logo: "/images/vector-1-team.png",
    rankingPoints: 11,
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
  },
  {
    id: "team-3",
    name: "Equipo 3",
    rank: 4,
    members: 4,
    logo: "/placeholder.svg",
    rankingPoints: 10,
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
  },
  {
    id: "team-4",
    name: "Equipo 4",
    rank: 5,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 9,
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
  },
  {
    id: "team-7",
    name: "Equipo 7",
    rank: 6,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 8,
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
  },
  {
    id: "team-10",
    name: "Equipo 10",
    rank: 7,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 7,
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
  },
  {
    id: "team-2",
    name: "Equipo 2",
    rank: 8,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 6,
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
  },
  {
    id: "team-8",
    name: "Equipo 8",
    rank: 9,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 5,
    stats: {
      wins: 2,
      losses: 4,
      tournaments: 1,
    },
  },
  {
    id: "team-13",
    name: "Equipo 13",
    rank: 10,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 4,
    stats: {
      wins: 2,
      losses: 4,
      tournaments: 1,
    },
  },
  {
    id: "team-6",
    name: "Equipo 6",
    rank: 11,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 3,
    stats: {
      wins: 2,
      losses: 4,
      tournaments: 1,
    },
  },
  {
    id: "team-11",
    name: "Equipo 11",
    rank: 12,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 2,
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
  },
  {
    id: "team-14",
    name: "Equipo 14",
    rank: 13,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 1,
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
  },
  {
    id: "team-9",
    name: "Equipo 9",
    rank: 14,
    members: 3,
    logo: "/placeholder.svg",
    rankingPoints: 0,
    stats: {
      wins: 0,
      losses: 6,
      tournaments: 1,
    },
  },
]
