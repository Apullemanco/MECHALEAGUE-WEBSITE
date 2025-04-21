"use client"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Medal, Search, Trophy, Users, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function TeamDetailPage() {
  const params = useParams()
  const teamId = params.id

  // Find the team data based on the ID from the URL
  const team = teams.find((t) => t.id === teamId)

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Team not found</h1>
        <p className="text-muted-foreground mb-6">The team you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/teams">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to teams
          </Link>
        </Button>
      </div>
    )
  }

  // Helper function to get team ID from name
  const getTeamId = (teamName) => {
    if (teamName === "Vector -1") return "team-minus-1"
    if (teamName.startsWith("Team ")) {
      const num = teamName.replace("Team ", "")
      return `team-${num}`
    }
    return ""
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
              <div className="relative w-8 h-8">
                <Image src="/images/mechaleague-logo.png" alt="MechaLeague" width={32} height={32} />
              </div>
              <span className="inline-block font-bold">MechaLeague</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link href="/teams" className="flex items-center text-sm font-medium text-foreground">
                Teams
              </Link>
              <Link
                href="/tournaments"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tournaments
              </Link>
              <Link
                href="/about"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="relative w-full max-w-sm mr-4 hidden md:flex">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teams, tournaments..."
                className="pl-8 w-full transition-all focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="icon" asChild className="hover:bg-primary/10 transition-colors">
                <Link href="/search">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:py-8 max-w-7xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-6 hover:scale-105 transition-transform">
            <Link href="/teams">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to teams
            </Link>
          </Button>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-muted mb-4 hover:border-primary transition-colors duration-300 transform hover:scale-105">
                      {team.id === "team-minus-1" ? (
                        <Image src="/images/vector-1-team.png" alt={team.name} fill className="object-cover" />
                      ) : (
                        <Image src="/placeholder.svg" alt={team.name} fill className="object-cover" />
                      )}
                    </div>
                    <h1 className="text-2xl font-bold">{team.name}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Trophy className="h-4 w-4" />
                      <span>Rank: #{team.rank}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{team.members} members</span>
                    </div>

                    <Separator className="my-4" />

                    <div className="w-full">
                      <h3 className="font-medium mb-2">Team stats</h3>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-muted rounded-lg p-2 hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105">
                          <div className="text-2xl font-bold">{team.stats.wins}</div>
                          <div className="text-xs text-muted-foreground">Wins</div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105">
                          <div className="text-2xl font-bold">{team.stats.losses}</div>
                          <div className="text-xs text-muted-foreground">Losses</div>
                        </div>
                        <div className="bg-muted rounded-lg p-2 hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105">
                          <div className="text-2xl font-bold">{team.stats.tournaments}</div>
                          <div className="text-xs text-muted-foreground">Tournaments</div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="w-full text-left">
                      <h3 className="font-medium mb-2">Team members</h3>
                      <ul className="space-y-2">
                        {team.teamMembers.map((member, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors duration-200"
                          >
                            <div className="relative h-8 w-8 rounded-full overflow-hidden transform hover:scale-110 transition-transform">
                              <Image src="/placeholder.svg" alt={member.name} fill className="object-cover" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{member.name}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="results" className="animate-in fade-in duration-500">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="results" className="transition-all hover:bg-primary/20">
                    Tournament results
                  </TabsTrigger>
                  <TabsTrigger value="matches" className="transition-all hover:bg-primary/20">
                    Match history
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="transition-all hover:bg-primary/20">
                    Upcoming matches
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="results" className="mt-6 animate-in slide-in-from-left duration-300">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Tournament results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {team.tournaments.map((tournament, index) => (
                          <AccordionItem
                            key={index}
                            value={`tournament-${index}`}
                            className="hover:bg-muted/50 transition-colors duration-200"
                          >
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                  <Link href={`/tournaments/${tournament.id || "mechaleague-founders-championship"}`}>
                                    <div className="relative h-10 w-10 rounded-md overflow-hidden transform hover:scale-110 transition-transform">
                                      <Image
                                        src="/images/maxresdefault.jpg"
                                        alt={tournament.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  </Link>
                                  <div className="text-left">
                                    <div className="font-medium">{tournament.name}</div>
                                    <div className="text-xs text-muted-foreground">Presented by Prepa Tec</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {tournament.date}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      tournament.placement === 1
                                        ? "bg-yellow-100 text-yellow-800"
                                        : tournament.placement === 2
                                          ? "bg-gray-100 text-gray-800"
                                          : tournament.placement === 3
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-muted text-muted-foreground"
                                    } transform hover:scale-105 transition-transform`}
                                  >
                                    {tournament.placement === 1
                                      ? "1st place"
                                      : tournament.placement === 2
                                        ? "2nd place"
                                        : tournament.placement === 3
                                          ? "3rd place"
                                          : `${tournament.placement}th place`}
                                  </div>
                                  {tournament.placement <= 3 && (
                                    <Medal
                                      className={`h-4 w-4 ${
                                        tournament.placement === 1
                                          ? "text-yellow-500"
                                          : tournament.placement === 2
                                            ? "text-gray-400"
                                            : "text-amber-600"
                                      } animate-pulse`}
                                    />
                                  )}
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="animate-in slide-in-from-top duration-300">
                              <div className="pl-12 pt-2">
                                <div className="text-sm mb-2">{tournament.description}</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Performance stats</h4>
                                    <ul className="space-y-1 text-sm">
                                      <li className="flex justify-between hover:bg-muted/50 p-1 rounded transition-colors">
                                        <span className="text-muted-foreground">Matches won:</span>
                                        <span>{tournament.stats.matchesWon}</span>
                                      </li>
                                      <li className="flex justify-between hover:bg-muted/50 p-1 rounded transition-colors">
                                        <span className="text-muted-foreground">Matches lost:</span>
                                        <span>{tournament.stats.matchesLost}</span>
                                      </li>
                                      <li className="flex justify-between hover:bg-muted/50 p-1 rounded transition-colors">
                                        <span className="text-muted-foreground">Points scored:</span>
                                        <span>{tournament.stats.pointsScored}</span>
                                      </li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Notable achievements</h4>
                                    <ul className="space-y-1 text-sm list-disc pl-4">
                                      {tournament.achievements.map((achievement, idx) => (
                                        <li key={idx} className="hover:text-primary transition-colors">
                                          {achievement}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="matches" className="mt-6 animate-in slide-in-from-left duration-300">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Match history</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {team.matches.map((match, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300 hover:border-primary/50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm text-muted-foreground">
                                {match.tournament} <span className="text-xs">- Presented by Prepa Tec</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{match.date}</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="relative h-10 w-10 rounded-full overflow-hidden transform hover:scale-110 transition-transform">
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
                                    <div className="font-medium">
                                      {match.alliance === "Blue" ? "Blue Alliance" : "Red Alliance"}
                                    </div>
                                    <div className="text-sm">
                                      {[team.name, ...match.allies].map((allyName, idx) => (
                                        <span key={idx}>
                                          <Link
                                            href={`/teams/${getTeamId(allyName)}`}
                                            className="hover:underline hover:text-primary transition-colors"
                                          >
                                            {allyName}
                                          </Link>
                                          {idx < [team.name, ...match.allies].length - 1 ? ", " : ""}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`text-xl font-bold ${match.result === "win" ? "text-green-500" : match.result === "loss" ? "text-red-500" : "text-yellow-500"}`}
                                  >
                                    {match.score.team}
                                  </div>
                                  <div className="text-sm text-muted-foreground">vs</div>
                                  <div
                                    className={`text-xl font-bold ${match.result === "loss" ? "text-green-500" : match.result === "win" ? "text-red-500" : "text-yellow-500"}`}
                                  >
                                    {match.score.opponent}
                                  </div>
                                </div>
                                <Badge
                                  className={`mt-1 transform hover:scale-105 transition-transform ${
                                    match.result === "win"
                                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                                      : "bg-red-100 text-red-800 hover:bg-red-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-1">
                                    {match.result === "win" ? (
                                      <>
                                        <CheckCircle2 className="h-3 w-3 animate-pulse" />
                                        <span>Victory</span>
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="h-3 w-3 animate-pulse" />
                                        <span>Defeat</span>
                                      </>
                                    )}
                                  </div>
                                </Badge>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-2 justify-end">
                                  <div className="text-right">
                                    <div className="font-medium">
                                      {match.alliance === "Blue" ? "Red Alliance" : "Blue Alliance"}
                                    </div>
                                    <div className="text-sm">
                                      {match.opponents.map((opponentName, idx) => (
                                        <span key={idx}>
                                          <Link
                                            href={`/teams/${getTeamId(opponentName)}`}
                                            className="hover:underline hover:text-primary transition-colors"
                                          >
                                            {opponentName}
                                          </Link>
                                          {idx < match.opponents.length - 1 ? ", " : ""}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="relative h-10 w-10 rounded-full overflow-hidden transform hover:scale-110 transition-transform">
                                    <Image src="/placeholder.svg" alt="Opponents" fill className="object-cover" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="upcoming" className="mt-6 animate-in slide-in-from-left duration-300">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle>Upcoming matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {team.upcomingMatches.length > 0 ? (
                        <div className="space-y-4">
                          {team.upcomingMatches.map((match, index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300 hover:border-primary/50"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm text-muted-foreground">
                                  {match.tournament} <span className="text-xs">- Presented by Prepa Tec</span>
                                </div>
                                <div className="text-sm font-medium text-primary animate-pulse">{match.date}</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="relative h-10 w-10 rounded-full overflow-hidden transform hover:scale-110 transition-transform">
                                    {team.id === "team-minus-1" ? (
                                      <Image
                                        src="/images/vector-1-team.png"
                                        alt={team.name}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <Image src="/placeholder.svg" alt={match.name} fill className="object-cover" />
                                    )}
                                  </div>
                                  <div className="font-medium">{team.name}</div>
                                </div>
                                <div className="text-sm font-medium animate-pulse">VS</div>
                                <div className="flex items-center gap-2">
                                  <div className="font-medium">{match.opponent}</div>
                                  <div className="relative h-10 w-10 rounded-full overflow-hidden transform hover:scale-110 transition-transform">
                                    <Image src="/placeholder.svg" alt={match.opponent} fill className="object-cover" />
                                  </div>
                                </div>
                              </div>
                              <Separator className="my-3" />
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="hover:bg-muted/50 p-2 rounded transition-colors">
                                  <h4 className="text-sm font-medium mb-1">Match type</h4>
                                  <div className="text-sm text-muted-foreground">{match.type}</div>
                                </div>
                                <div className="hover:bg-muted/50 p-2 rounded transition-colors">
                                  <h4 className="text-sm font-medium mb-1">Location</h4>
                                  <div className="text-sm text-muted-foreground">{match.location}</div>
                                </div>
                                <div className="hover:bg-muted/50 p-2 rounded transition-colors">
                                  <h4 className="text-sm font-medium mb-1">Time</h4>
                                  <div className="text-sm text-muted-foreground">{match.time}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-700">
                          <Calendar className="h-12 w-12 text-muted-foreground mb-4 animate-bounce" />
                          <h3 className="text-lg font-medium mb-2">No upcoming matches</h3>
                          <p className="text-sm text-muted-foreground max-w-md">
                            {team.name} doesn't have any scheduled matches at the moment. Check back later for updates.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 MechaLeague. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:underline hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link href="/contact" className="text-sm font-medium text-primary hover:underline transition-colors">
              Contact
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data for teams with updated member information, match records, and corrected point totals
const teams = [
  {
    id: "team-minus-1",
    name: "Vector -1",
    rank: 3,
    members: 3,
    logo: "/images/vector-1-team.png",
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Ramón", avatar: "/placeholder.svg" },
      { name: "David Gil", avatar: "/placeholder.svg" },
      { name: "Victor Udave", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 3,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 3,
          matchesLost: 3,
          pointsScored: 68,
        },
        achievements: ["Judges' Favorite Team", "First officially registered team", "Most innovative robot design"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 1",
        alliance: "Blue",
        allies: ["Team 11", "Team 5"],
        opponents: ["Team 3", "Team 13", "Team 9"],
        opponent: "Team 3, Team 13, Team 9",
        result: "win",
        score: {
          team: 12,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 3",
        alliance: "Red",
        allies: ["Team 4", "Team 12"],
        opponents: ["Team 2", "Team 8", "Team 10"],
        opponent: "Team 2, Team 8, Team 10",
        result: "win",
        score: {
          team: 17,
          opponent: 11,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 6",
        alliance: "Blue",
        allies: ["Team 6", "Team 9"],
        opponents: ["Team 2", "Team 14", "Team 11"],
        opponent: "Team 2, Team 14, Team 11",
        result: "loss",
        score: {
          team: 6,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 9",
        alliance: "Red",
        allies: ["Team 12", "Team 13"],
        opponents: ["Team 5", "Team 7", "Team 10"],
        opponent: "Team 5, Team 7, Team 10",
        result: "loss",
        score: {
          team: 4,
          opponent: 18,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 10",
        alliance: "Red",
        allies: ["Team 6", "Team 3"],
        opponents: ["Team 14", "Team 4", "Team 9"],
        opponent: "Team 14, Team 4, Team 9",
        result: "win",
        score: {
          team: 16,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 13",
        alliance: "Blue",
        allies: ["Team 11", "Team 8"],
        opponents: ["Team 12", "Team 10", "Team 4"],
        opponent: "Team 12, Team 10, Team 4",
        result: "loss",
        score: {
          team: 13,
          opponent: 18,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-2",
    name: "Equipo 2",
    rank: 8,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Mia Rocamontes", avatar: "/placeholder.svg" },
      { name: "Ian Gerardo", avatar: "/placeholder.svg" },
      { name: "Armando", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 8,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 4,
          matchesLost: 2,
          pointsScored: 77,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 2",
        alliance: "Red",
        allies: ["Team 8", "Team 10"],
        opponents: ["Team 14", "Team 6", "Team 7"],
        opponent: "Team 14, Team 6, Team 7",
        result: "win",
        score: {
          team: 13,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 3",
        alliance: "Blue",
        allies: ["Team 8", "Team 10"],
        opponents: ["Team 4", "Team -1", "Team 12"],
        opponent: "Team 4, Team -1, Team 12",
        result: "loss",
        score: {
          team: 11,
          opponent: 17,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 6",
        alliance: "Red",
        allies: ["Team 14", "Team 11"],
        opponents: ["Team -1", "Team 6", "Team 9"],
        opponent: "Team -1, Team 6, Team 9",
        result: "win",
        score: {
          team: 14,
          opponent: 6,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 8",
        alliance: "Red",
        allies: ["Team 9", "Team 8"],
        opponents: ["Team 3", "Team 11", "Team 6"],
        opponent: "Team 3, Team 11, Team 6",
        result: "loss",
        score: {
          team: 14,
          opponent: 18,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 11",
        alliance: "Blue",
        allies: ["Team 12", "Team 8"],
        opponents: ["Team 10", "Team 11", "Team 5"],
        opponent: "Team 10, Team 11, Team 5",
        result: "win",
        score: {
          team: 14,
          opponent: 4,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 14",
        alliance: "Red",
        allies: ["Team 7", "Team 14"],
        opponents: ["Team 5", "Team 13", "Team 4"],
        opponent: "Team 5, Team 13, Team 4",
        result: "win",
        score: {
          team: 11,
          opponent: 6,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-3",
    name: "Equipo 3",
    rank: 4,
    members: 4,
    logo: "/placeholder.svg",
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Mariana", avatar: "/placeholder.svg" },
      { name: "Matteo", avatar: "/placeholder.svg" },
      { name: "Jesús Rodrigo", avatar: "/placeholder.svg" },
      { name: "Marco", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 4,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 4,
          matchesLost: 2,
          pointsScored: 84,
        },
        achievements: [
          "Participated in the inaugural MechaLeague competition",
          "Part of the winning alliance in the final match",
        ],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 1",
        alliance: "Red",
        allies: ["Team 13", "Team 9"],
        opponents: ["Team -1", "Team 11", "Team 5"],
        opponent: "Team -1, Team 11, Team 5",
        result: "loss",
        score: {
          team: 8,
          opponent: 12,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 4",
        alliance: "Red",
        allies: ["Team 12", "Team 13"],
        opponents: ["Team 11", "Team 14", "Team 6"],
        opponent: "Team 11, Team 14, Team 6",
        result: "win",
        score: {
          team: 14,
          opponent: 10,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 5",
        alliance: "Red",
        allies: ["Team 9", "Team 7"],
        opponents: ["Team 4", "Team 5", "Team 13"],
        opponent: "Team 4, Team 5, Team 13",
        result: "loss",
        score: {
          team: 13,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 8",
        alliance: "Blue",
        allies: ["Team 11", "Team 6"],
        opponents: ["Team 9", "Team 2", "Team 8"],
        opponent: "Team 9, Team 2, Team 8",
        result: "win",
        score: {
          team: 18,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 10",
        alliance: "Red",
        allies: ["Team 6", "Team -1"],
        opponents: ["Team 14", "Team 4", "Team 9"],
        opponent: "Team 14, Team 4, Team 9",
        result: "win",
        score: {
          team: 16,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 12",
        alliance: "Blue",
        allies: ["Team 7", "Team 14"],
        opponents: ["Team 6", "Team 13", "Team 9"],
        opponent: "Team 6, Team 13, Team 9",
        result: "win",
        score: {
          team: 15,
          opponent: 5,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-4",
    name: "Equipo 4",
    rank: 5,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Patricio", avatar: "/placeholder.svg" },
      { name: "Avril", avatar: "/placeholder.svg" },
      { name: "Jaime", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 5,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 3,
          matchesLost: 3,
          pointsScored: 75,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 3",
        alliance: "Red",
        allies: ["Team -1", "Team 12"],
        opponents: ["Team 2", "Team 8", "Team 10"],
        opponent: "Team 2, Team 8, Team 10",
        result: "win",
        score: {
          team: 17,
          opponent: 11,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 5",
        alliance: "Blue",
        allies: ["Team 5", "Team 13"],
        opponents: ["Team 9", "Team 3", "Team 7"],
        opponent: "Team 9, Team 3, Team 7",
        result: "win",
        score: {
          team: 16,
          opponent: 13,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 7",
        alliance: "Blue",
        allies: ["Team 12", "Team 8"],
        opponents: ["Team 7", "Team 5", "Team 10"],
        opponent: "Team 7, Team 5, Team 10",
        result: "loss",
        score: {
          team: 10,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 10",
        alliance: "Blue",
        allies: ["Team 14", "Team 9"],
        opponents: ["Team 6", "Team 3", "Team -1"],
        opponent: "Team 6, Team 3, Team -1",
        result: "loss",
        score: {
          team: 8,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 13",
        alliance: "Red",
        allies: ["Team 12", "Team 10"],
        opponents: ["Team 11", "Team -1", "Team 8"],
        opponent: "Team 11, Team -1, Team 8",
        result: "win",
        score: {
          team: 18,
          opponent: 13,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 14",
        alliance: "Blue",
        allies: ["Team 5", "Team 13"],
        opponents: ["Team 14", "Team 2", "Team 7"],
        opponent: "Team 14, Team 2, Team 7",
        result: "loss",
        score: {
          team: 6,
          opponent: 11,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-5",
    name: "Equipo 5",
    rank: 2,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Enrique", avatar: "/placeholder.svg" },
      { name: "Jorge Rivera", avatar: "/placeholder.svg" },
      { name: "Brian", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 2,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 4,
          matchesLost: 2,
          pointsScored: 72,
        },
        achievements: ["Participated in the inaugural MechaLeague competition", "Reached the finals"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 1",
        alliance: "Blue",
        allies: ["Team -1", "Team 11"],
        opponents: ["Team 3", "Team 13", "Team 9"],
        opponent: "Team 3, Team 13, Team 9",
        result: "win",
        score: {
          team: 12,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 5",
        alliance: "Blue",
        allies: ["Team 4", "Team 13"],
        opponents: ["Team 9", "Team 3", "Team 7"],
        opponent: "Team 9, Team 3, Team 7",
        result: "win",
        score: {
          team: 16,
          opponent: 13,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 7",
        alliance: "Red",
        allies: ["Team 7", "Team 10"],
        opponents: ["Team 4", "Team 12", "Team 8"],
        opponent: "Team 4, Team 12, Team 8",
        result: "win",
        score: {
          team: 16,
          opponent: 10,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 9",
        alliance: "Blue",
        allies: ["Team 7", "Team 10"],
        opponents: ["Team -1", "Team 12", "Team 13"],
        opponent: "Team -1, Team 12, Team 13",
        result: "win",
        score: {
          team: 18,
          opponent: 4,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 11",
        alliance: "Red",
        allies: ["Team 11", "Team 10"],
        opponents: ["Team 8", "Team 2", "Team 12"],
        opponent: "Team 8, Team 2, Team 12",
        result: "loss",
        score: {
          team: 4,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 14",
        alliance: "Blue",
        allies: ["Team 13", "Team 4"],
        opponents: ["Team 14", "Team 2", "Team 7"],
        opponent: "Team 14, Team 2, Team 7",
        result: "loss",
        score: {
          team: 6,
          opponent: 11,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-6",
    name: "Equipo 6",
    rank: 11,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 2,
      losses: 4,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Jose Antonio Berlanga", avatar: "/placeholder.svg" },
      { name: "Edmundo Gómez", avatar: "/placeholder.svg" },
      { name: "Juan Mena", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 11,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 2,
          matchesLost: 4,
          pointsScored: 63,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 2",
        alliance: "Blue",
        allies: ["Team 14", "Team 7"],
        opponents: ["Team 10", "Team 2", "Team 8"],
        opponent: "Team 10, Team 2, Team 8",
        result: "loss",
        score: {
          team: 8,
          opponent: 13,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 4",
        alliance: "Blue",
        allies: ["Team 11", "Team 14"],
        opponents: ["Team 12", "Team 3", "Team 13"],
        opponent: "Team 12, Team 3, Team 13",
        result: "loss",
        score: {
          team: 10,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 6",
        alliance: "Blue",
        allies: ["Team -1", "Team 9"],
        opponents: ["Team 2", "Team 14", "Team 11"],
        opponent: "Team 2, Team 14, Team 11",
        result: "loss",
        score: {
          team: 6,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 8",
        alliance: "Blue",
        allies: ["Team 3", "Team 11"],
        opponents: ["Team 9", "Team 2", "Team 8"],
        opponent: "Team 9, Team 2, Team 8",
        result: "win",
        score: {
          team: 18,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 10",
        alliance: "Red",
        allies: ["Team 3", "Team -1"],
        opponents: ["Team 14", "Team 4", "Team 9"],
        opponent: "Team 14, Team 4, Team 9",
        result: "win",
        score: {
          team: 16,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 12",
        alliance: "Red",
        allies: ["Team 13", "Team 9"],
        opponents: ["Team 7", "Team 14", "Team 3"],
        opponent: "Team 7, Team 14, Team 3",
        result: "loss",
        score: {
          team: 5,
          opponent: 15,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-7",
    name: "Equipo 7",
    rank: 6,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Saro", avatar: "/placeholder.svg" },
      { name: "Pablo", avatar: "/placeholder.svg" },
      { name: "Sebastián", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 6,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 3,
          matchesLost: 3,
          pointsScored: 75,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 2",
        alliance: "Blue",
        allies: ["Team 14", "Team 6"],
        opponents: ["Team 10", "Team 2", "Team 8"],
        opponent: "Team 10, Team 2, Team 8",
        result: "loss",
        score: {
          team: 8,
          opponent: 13,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 5",
        alliance: "Red",
        allies: ["Team 9", "Team 3"],
        opponents: ["Team 4", "Team 5", "Team 13"],
        opponent: "Team 4, Team 5, Team 13",
        result: "loss",
        score: {
          team: 13,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 7",
        alliance: "Red",
        allies: ["Team 5", "Team 10"],
        opponents: ["Team 4", "Team 12", "Team 8"],
        opponent: "Team 4, Team 12, Team 8",
        result: "win",
        score: {
          team: 16,
          opponent: 10,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 9",
        alliance: "Blue",
        allies: ["Team 5", "Team 10"],
        opponents: ["Team -1", "Team 12", "Team 13"],
        opponent: "Team -1, Team 12, Team 13",
        result: "win",
        score: {
          team: 18,
          opponent: 4,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 12",
        alliance: "Blue",
        allies: ["Team 3", "Team 14"],
        opponents: ["Team 6", "Team 13", "Team 9"],
        opponent: "Team 6, Team 13, Team 9",
        result: "win",
        score: {
          team: 15,
          opponent: 5,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 14",
        alliance: "Red",
        allies: ["Team 2", "Team 14"],
        opponents: ["Team 5", "Team 13", "Team 4"],
        opponent: "Team 5, Team 13, Team 4",
        result: "win",
        score: {
          team: 11,
          opponent: 6,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-8",
    name: "Equipo 8",
    rank: 9,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 2,
      losses: 4,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Santiago Guerrero", avatar: "/placeholder.svg" },
      { name: "José Daniel", avatar: "/placeholder.svg" },
      { name: "Ricardo Ayala", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 9,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 2,
          matchesLost: 4,
          pointsScored: 75,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 2",
        alliance: "Red",
        allies: ["Team 10", "Team 2"],
        opponents: ["Team 14", "Team 6", "Team 7"],
        opponent: "Team 14, Team 6, Team 7",
        result: "win",
        score: {
          team: 13,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 3",
        alliance: "Blue",
        allies: ["Team 2", "Team 10"],
        opponents: ["Team 4", "Team -1", "Team 12"],
        opponent: "Team 4, Team -1, Team 12",
        result: "loss",
        score: {
          team: 11,
          opponent: 17,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 7",
        alliance: "Blue",
        allies: ["Team 4", "Team 12"],
        opponents: ["Team 7", "Team 5", "Team 10"],
        opponent: "Team 7, Team 5, Team 10",
        result: "loss",
        score: {
          team: 10,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 8",
        alliance: "Red",
        allies: ["Team 9", "Team 2"],
        opponents: ["Team 3", "Team 11", "Team 6"],
        opponent: "Team 3, Team 11, Team 6",
        result: "loss",
        score: {
          team: 14,
          opponent: 18,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 11",
        alliance: "Blue",
        allies: ["Team 2", "Team 12"],
        opponents: ["Team 10", "Team 11", "Team 5"],
        opponent: "Team 10, Team 11, Team 5",
        result: "win",
        score: {
          team: 14,
          opponent: 4,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 13",
        alliance: "Blue",
        allies: ["Team 11", "Team -1"],
        opponents: ["Team 12", "Team 10", "Team 4"],
        opponent: "Team 12, Team 10, Team 4",
        result: "loss",
        score: {
          team: 13,
          opponent: 18,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-9",
    name: "Equipo 9",
    rank: 14,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 0,
      losses: 6,
      tournaments: 1,
    },
    teamMembers: [
      { name: "David", avatar: "/placeholder.svg" },
      { name: "Mariano", avatar: "/placeholder.svg" },
      { name: "Emiliano Valdés", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 14,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 1,
          matchesLost: 5,
          pointsScored: 64,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 1",
        alliance: "Red",
        allies: ["Team 3", "Team 13"],
        opponents: ["Team -1", "Team 11", "Team 5"],
        opponent: "Team -1, Team 11, Team 5",
        result: "loss",
        score: {
          team: 8,
          opponent: 12,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 5",
        alliance: "Red",
        allies: ["Team 3", "Team 7"],
        opponents: ["Team 4", "Team 5", "Team 13"],
        opponent: "Team 4, Team 5, Team 13",
        result: "loss",
        score: {
          team: 13,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 6",
        alliance: "Blue",
        allies: ["Team -1", "Team 6"],
        opponents: ["Team 2", "Team 14", "Team 11"],
        opponent: "Team 2, Team 14, Team 11",
        result: "loss",
        score: {
          team: 6,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 8",
        alliance: "Red",
        allies: ["Team 2", "Team 8"],
        opponents: ["Team 3", "Team 11", "Team 6"],
        opponent: "Team 3, Team 11, Team 6",
        result: "loss",
        score: {
          team: 14,
          opponent: 18,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 10",
        alliance: "Blue",
        allies: ["Team 14", "Team 4"],
        opponents: ["Team 6", "Team 3", "Team -1"],
        opponent: "Team 6, Team 3, Team -1",
        result: "loss",
        score: {
          team: 8,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 12",
        alliance: "Red",
        allies: ["Team 6", "Team 13"],
        opponents: ["Team 7", "Team 14", "Team 3"],
        opponent: "Team 7, Team 14, Team 3",
        result: "loss",
        score: {
          team: 5,
          opponent: 15,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-10",
    name: "Equipo 10",
    rank: 7,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Mia", avatar: "/placeholder.svg" },
      { name: "Diego", avatar: "/placeholder.svg" },
      { name: "Sergio", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 7,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 3,
          matchesLost: 3,
          pointsScored: 82,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 2",
        alliance: "Red",
        allies: ["Team 2", "Team 8"],
        opponents: ["Team 14", "Team 6", "Team 7"],
        opponent: "Team 14, Team 6, Team 7",
        result: "win",
        score: {
          team: 13,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 3",
        alliance: "Blue",
        allies: ["Team 2", "Team 8"],
        opponents: ["Team 4", "Team -1", "Team 12"],
        opponent: "Team 4, Team -1, Team 12",
        result: "loss",
        score: {
          team: 11,
          opponent: 17,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 7",
        alliance: "Red",
        allies: ["Team 5", "Team 7"],
        opponents: ["Team 4", "Team 12", "Team 8"],
        opponent: "Team 4, Team 12, Team 8",
        result: "win",
        score: {
          team: 16,
          opponent: 10,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 9",
        alliance: "Blue",
        allies: ["Team 5", "Team 7"],
        opponents: ["Team -1", "Team 12", "Team 13"],
        opponent: "Team -1, Team 12, Team 13",
        result: "win",
        score: {
          team: 18,
          opponent: 4,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 11",
        alliance: "Red",
        allies: ["Team 11", "Team 5"],
        opponents: ["Team 8", "Team 2", "Team 12"],
        opponent: "Team 8, Team 2, Team 12",
        result: "loss",
        score: {
          team: 4,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 13",
        alliance: "Red",
        allies: ["Team 12", "Team 4"],
        opponents: ["Team 11", "Team -1", "Team 8"],
        opponent: "Team 11, Team -1, Team 8",
        result: "win",
        score: {
          team: 18,
          opponent: 13,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-11",
    name: "Equipo 11",
    rank: 12,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Andrea", avatar: "/placeholder.svg" },
      { name: "Sara", avatar: "/placeholder.svg" },
      { name: "Renata", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 12,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 2,
          matchesLost: 4,
          pointsScored: 61,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 1",
        alliance: "Blue",
        allies: ["Team -1", "Team 5"],
        opponents: ["Team 3", "Team 13", "Team 9"],
        opponent: "Team 3, Team 13, Team 9",
        result: "win",
        score: {
          team: 12,
          opponent: 8,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 4",
        alliance: "Blue",
        allies: ["Team 14", "Team 6"],
        opponents: ["Team 12", "Team 3", "Team 13"],
        opponent: "Team 12, Team 3, Team 13",
        result: "loss",
        score: {
          team: 10,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 6",
        alliance: "Red",
        allies: ["Team 2", "Team 14"],
        opponents: ["Team -1", "Team 6", "Team 9"],
        opponent: "Team -1, Team 6, Team 9",
        result: "win",
        score: {
          team: 14,
          opponent: 6,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 8",
        alliance: "Blue",
        allies: ["Team 3", "Team 6"],
        opponents: ["Team 9", "Team 2", "Team 8"],
        opponent: "Team 9, Team 2, Team 8",
        result: "win",
        score: {
          team: 18,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 11",
        alliance: "Red",
        allies: ["Team 10", "Team 5"],
        opponents: ["Team 8", "Team 2", "Team 12"],
        opponent: "Team 8, Team 2, Team 12",
        result: "loss",
        score: {
          team: 4,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 13",
        alliance: "Blue",
        allies: ["Team -1", "Team 8"],
        opponents: ["Team 12", "Team 10", "Team 4"],
        opponent: "Team 12, Team 10, Team 4",
        result: "loss",
        score: {
          team: 13,
          opponent: 18,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-12",
    name: "Equipo 12",
    rank: 1,
    members: 2,
    logo: "/placeholder.svg",
    stats: {
      wins: 4,
      losses: 2,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Emilio Llamas", avatar: "/placeholder.svg" },
      { name: "Adolfo Múzquiz", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 1,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 5,
          matchesLost: 1,
          pointsScored: 85,
        },
        achievements: [
          "Winner of the inaugural MechaLeague competition",
          "Highest scoring team in the tournament",
          "Most consistent performance across all matches",
        ],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 3",
        alliance: "Red",
        allies: ["Team 4", "Team -1"],
        opponents: ["Team 2", "Team 8", "Team 10"],
        opponent: "Team 2, Team 8, Team 10",
        result: "win",
        score: {
          team: 17,
          opponent: 11,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 4",
        alliance: "Red",
        allies: ["Team 3", "Team 13"],
        opponents: ["Team 11", "Team 14", "Team 6"],
        opponent: "Team 11, Team 14, Team 6",
        result: "win",
        score: {
          team: 14,
          opponent: 10,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 7",
        alliance: "Blue",
        allies: ["Team 4", "Team 8"],
        opponents: ["Team 7", "Team 5", "Team 10"],
        opponent: "Team 7, Team 5, Team 10",
        result: "loss",
        score: {
          team: 10,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 9",
        alliance: "Red",
        allies: ["Team -1", "Team 13"],
        opponents: ["Team 5", "Team 7", "Team 10"],
        opponent: "Team 5, Team 7, Team 10",
        result: "loss",
        score: {
          team: 4,
          opponent: 18,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 11",
        alliance: "Blue",
        allies: ["Team 2", "Team 8"],
        opponents: ["Team 10", "Team 11", "Team 5"],
        opponent: "Team 10, Team 11, Team 5",
        result: "win",
        score: {
          team: 14,
          opponent: 4,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 13",
        alliance: "Red",
        allies: ["Team 10", "Team 4"],
        opponents: ["Team 11", "Team -1", "Team 8"],
        opponent: "Team 11, Team -1, Team 8",
        result: "win",
        score: {
          team: 18,
          opponent: 13,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-13",
    name: "Equipo 13",
    rank: 10,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 2,
      losses: 4,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Gonzalo", avatar: "/placeholder.svg" },
      { name: "Isaac", avatar: "/placeholder.svg" },
      { name: "Emiliano", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 10,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 2,
          matchesLost: 4,
          pointsScored: 53,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 1",
        alliance: "Red",
        allies: ["Team 3", "Team 9"],
        opponents: ["Team -1", "Team 11", "Team 5"],
        opponent: "Team -1, Team 11, Team 5",
        result: "loss",
        score: {
          team: 8,
          opponent: 12,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 4",
        alliance: "Red",
        allies: ["Team 12", "Team 3"],
        opponents: ["Team 11", "Team 14", "Team 6"],
        opponent: "Team 11, Team 14, Team 6",
        result: "win",
        score: {
          team: 14,
          opponent: 10,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 5",
        alliance: "Blue",
        allies: ["Team 4", "Team 5"],
        opponents: ["Team 9", "Team 3", "Team 7"],
        opponent: "Team 9, Team 3, Team 7",
        result: "win",
        score: {
          team: 16,
          opponent: 13,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 9",
        alliance: "Red",
        allies: ["Team -1", "Team 12"],
        opponents: ["Team 5", "Team 7", "Team 10"],
        opponent: "Team 5, Team 7, Team 10",
        result: "loss",
        score: {
          team: 4,
          opponent: 18,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 12",
        alliance: "Red",
        allies: ["Team 6", "Team 9"],
        opponents: ["Team 7", "Team 14", "Team 3"],
        opponent: "Team 7, Team 14, Team 3",
        result: "loss",
        score: {
          team: 5,
          opponent: 15,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 14",
        alliance: "Blue",
        allies: ["Team 5", "Team 4"],
        opponents: ["Team 14", "Team 2", "Team 7"],
        opponent: "Team 14, Team 2, Team 7",
        result: "loss",
        score: {
          team: 6,
          opponent: 11,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
  {
    id: "team-14",
    name: "Equipo 14",
    rank: 13,
    members: 3,
    logo: "/placeholder.svg",
    stats: {
      wins: 3,
      losses: 3,
      tournaments: 1,
    },
    teamMembers: [
      { name: "Sofia", avatar: "/placeholder.svg" },
      { name: "Alessia", avatar: "/placeholder.svg" },
      { name: "Maximiliano", avatar: "/placeholder.svg" },
    ],
    tournaments: [
      {
        name: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        image: "/images/maxresdefault.jpg",
        id: "mechaleague-founders-championship",
        placement: 13,
        description: "The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.",
        stats: {
          matchesWon: 3,
          matchesLost: 3,
          pointsScored: 66,
        },
        achievements: ["Participated in the inaugural MechaLeague competition"],
      },
    ],
    matches: [
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 2",
        alliance: "Blue",
        allies: ["Team 6", "Team 7"],
        opponents: ["Team 10", "Team 2", "Team 8"],
        opponent: "Team 10, Team 2, Team 8",
        result: "loss",
        score: {
          team: 8,
          opponent: 13,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 4",
        alliance: "Blue",
        allies: ["Team 11", "Team 6"],
        opponents: ["Team 12", "Team 3", "Team 13"],
        opponent: "Team 12, Team 3, Team 13",
        result: "loss",
        score: {
          team: 10,
          opponent: 14,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 6",
        alliance: "Red",
        allies: ["Team 2", "Team 11"],
        opponents: ["Team -1", "Team 6", "Team 9"],
        opponent: "Team -1, Team 6, Team 9",
        result: "win",
        score: {
          team: 14,
          opponent: 6,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 10",
        alliance: "Blue",
        allies: ["Team 4", "Team 9"],
        opponents: ["Team 6", "Team 3", "Team -1"],
        opponent: "Team 6, Team 3, Team -1",
        result: "loss",
        score: {
          team: 8,
          opponent: 16,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 12",
        alliance: "Blue",
        allies: ["Team 7", "Team 3"],
        opponents: ["Team 6", "Team 13", "Team 9"],
        opponent: "Team 6, Team 13, Team 9",
        result: "win",
        score: {
          team: 15,
          opponent: 5,
        },
        duration: "2:30",
      },
      {
        tournament: "MechaLeague Founders Championship",
        date: "November 21, 2024",
        type: "Qualification Match 14",
        alliance: "Red",
        allies: ["Team 2", "Team 7"],
        opponents: ["Team 5", "Team 13", "Team 4"],
        opponent: "Team 5, Team 13, Team 4",
        result: "win",
        score: {
          team: 11,
          opponent: 6,
        },
        duration: "2:30",
      },
    ],
    upcomingMatches: [],
  },
]
