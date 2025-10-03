"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Trophy, Users, MapPin, AlertCircle, ArrowLeft, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Database } from "@/lib/db"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TournamentPage({ params }: { params: { id: string } }) {
  const [tournament, setTournament] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeMatchTab, setActiveMatchTab] = useState("qualification")

  useEffect(() => {
    const tournamentData = Database.getTournamentById(params.id)
    if (!tournamentData) {
      notFound()
    }

    // Find full tournament data with matches
    const fullTournamentData = tournaments.find((t) => t.id === params.id)
    setTournament(fullTournamentData || tournamentData)
    setLoading(false)
  }, [params.id])

  const handleWatchVideo = (videoUrl: string) => {
    window.open(videoUrl, "_blank")
  }

  // Helper function to get team logo
  const getTeamLogo = (teamName: string) => {
    if (teamName === "Vector -1") {
      return "/images/vector-1-team.png"
    }
    return "/images/team-default.png"
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

  if (!tournament) {
    return (
      <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
        <SiteHeader />
        <main className="flex-1 w-full">
          <div className="container px-4 md:px-6 py-12 max-w-[1600px] mx-auto">
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Tournament not found</AlertDescription>
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
        <div className="relative w-full h-[400px] md:h-[500px] mb-8">
          <Image
            src={tournament.image || "/placeholder.svg"}
            alt={tournament.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Button variant="ghost" size="sm" asChild className="mb-4 text-white hover:bg-white/20">
                <Link href="/tournaments">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to tournaments
                </Link>
              </Button>
              <Badge className="mb-4" variant={tournament.status === "completed" ? "secondary" : "default"}>
                {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{tournament.name}</h1>
              <p className="text-white/90 text-lg">{tournament.description}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Date</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tournament.date}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Location</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{tournament.location}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Teams</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tournament.teams || tournament.participants}</div>
              </CardContent>
            </Card>
            {tournament.winner && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Winner</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{tournament.winner}</div>
                </CardContent>
              </Card>
            )}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tournament Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">About</h3>
                          <p className="text-sm text-muted-foreground">{tournament.description}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Tournament Format</h3>
                          <p className="text-sm text-muted-foreground">
                            Teams compete in 3v3 alliances (Blue Alliance vs Red Alliance) in a series of qualification
                            matches followed by elimination rounds.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {tournament.status === "completed" && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5" />
                          Final Standings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                            <div className="flex items-center gap-4">
                              <Trophy className="h-6 w-6 text-yellow-500" />
                              <div>
                                <p className="font-bold text-lg">1st Place</p>
                                <p className="text-sm text-muted-foreground">{tournament.winner}</p>
                              </div>
                            </div>
                            <Badge variant="default">Champion</Badge>
                          </div>
                          {tournament.secondPlace && (
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/20">
                              <div className="flex items-center gap-4">
                                <Trophy className="h-6 w-6 text-gray-400" />
                                <div>
                                  <p className="font-bold text-lg">2nd Place</p>
                                  <p className="text-sm text-muted-foreground">{tournament.secondPlace}</p>
                                </div>
                              </div>
                              <Badge variant="secondary">Runner-up</Badge>
                            </div>
                          )}
                          {tournament.thirdPlace && (
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                              <div className="flex items-center gap-4">
                                <Trophy className="h-6 w-6 text-orange-600" />
                                <div>
                                  <p className="font-bold text-lg">3rd Place</p>
                                  <p className="text-sm text-muted-foreground">{tournament.thirdPlace}</p>
                                </div>
                              </div>
                              <Badge variant="outline">3rd Place</Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="lg:col-span-1">
                  <Card>
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
              </div>
            </TabsContent>

            <TabsContent value="teams" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alliance Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  {tournament.alliances && tournament.alliances.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tournament.alliances.map((alliance: any, index: number) => (
                        <Card key={index} className="border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Alliance {index + 1}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {alliance.teams.map((team: any, teamIndex: number) => (
                                <div key={teamIndex} className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    {teamIndex + 1}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
                                      <Image
                                        src={getTeamLogo(team.name) || "/placeholder.svg"}
                                        alt={team.name}
                                        width={32}
                                        height={32}
                                        className="object-contain p-1"
                                      />
                                    </div>
                                    <Link href={`/teams/${team.id}`} className="hover:underline">
                                      {team.name}
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">Alliance selection not available yet</p>
                  )}
                </CardContent>
              </Card>

              {tournament.registeredTeams && tournament.registeredTeams.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>All Registered Teams</CardTitle>
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
                        {tournament.registeredTeams
                          .sort((a: any, b: any) => b.rankingPoints - a.rankingPoints)
                          .map((team: any, index: number) => (
                            <TableRow key={team.id}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="relative h-8 w-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
                                    <Image
                                      src={getTeamLogo(team.name) || "/placeholder.svg"}
                                      alt={team.name}
                                      width={32}
                                      height={32}
                                      className="object-contain p-1"
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
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="matches" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  {tournament.matches ? (
                    <>
                      <div className="flex border-b mb-4">
                        <div
                          className={`flex-1 text-center py-2 px-4 cursor-pointer ${
                            activeMatchTab === "qualification"
                              ? "border-b-2 border-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => setActiveMatchTab("qualification")}
                        >
                          Qualification
                        </div>
                        <div
                          className={`flex-1 text-center py-2 px-4 cursor-pointer ${
                            activeMatchTab === "playoff"
                              ? "border-b-2 border-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => setActiveMatchTab("playoff")}
                        >
                          Playoff
                        </div>
                        <div
                          className={`flex-1 text-center py-2 px-4 cursor-pointer ${
                            activeMatchTab === "semifinal"
                              ? "border-b-2 border-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => setActiveMatchTab("semifinal")}
                        >
                          Semifinal
                        </div>
                        <div
                          className={`flex-1 text-center py-2 px-4 cursor-pointer ${
                            activeMatchTab === "final"
                              ? "border-b-2 border-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => setActiveMatchTab("final")}
                        >
                          Final
                        </div>
                      </div>

                      {activeMatchTab === "qualification" && tournament.matches.qualification && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Qualification Matches</h3>
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
                                {tournament.matches.qualification.map((match: any, index: number) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-4">Q{index + 1}</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        {match.blueAlliance.map((team: string) => (
                                          <span
                                            key={team}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                          >
                                            {team}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold text-blue-600">{match.blueScore}</span>
                                      <span className="mx-2">-</span>
                                      <span className="font-bold text-red-600">{match.redScore}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        {match.redAlliance.map((team: string) => (
                                          <span
                                            key={team}
                                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                                          >
                                            {team}
                                          </span>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      {match.video && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="flex items-center"
                                          onClick={() => handleWatchVideo(match.video)}
                                        >
                                          <span className="mr-1">Watch</span>
                                          <Play className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeMatchTab === "playoff" && tournament.matches.playoffs && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Playoff Matches</h3>
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
                                {tournament.matches.playoffs.map((match: any, index: number) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-4">M{index + 1}</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          {match.blueAlliance}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold text-blue-600">{match.blueScore}</span>
                                      <span className="mx-2">-</span>
                                      <span className="font-bold text-red-600">{match.redScore}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          {match.redAlliance}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      {match.video && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="flex items-center"
                                          onClick={() => handleWatchVideo(match.video)}
                                        >
                                          <span className="mr-1">Watch</span>
                                          <Play className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeMatchTab === "semifinal" && tournament.matches.semifinals && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Semifinal Matches</h3>
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
                                {tournament.matches.semifinals.map((match: any, index: number) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-4">S{index + 1}</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          {match.blueAlliance}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold text-blue-600">{match.blueScore}</span>
                                      <span className="mx-2">-</span>
                                      <span className="font-bold text-red-600">{match.redScore}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          {match.redAlliance}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      {match.video && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="flex items-center"
                                          onClick={() => handleWatchVideo(match.video)}
                                        >
                                          <span className="mr-1">Watch</span>
                                          <Play className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeMatchTab === "final" && tournament.matches.finals && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold mb-4">Final Match</h3>
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
                                {tournament.matches.finals.map((match: any, index: number) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-4">FINAL</td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                          {match.blueAlliance}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <span className="font-bold text-blue-600">{match.blueScore}</span>
                                      <span className="mx-2">-</span>
                                      <span className="font-bold text-red-600">{match.redScore}</span>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex flex-wrap gap-2">
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                          {match.redAlliance}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      {match.video && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="flex items-center"
                                          onClick={() => handleWatchVideo(match.video)}
                                        >
                                          <span className="mr-1">Watch</span>
                                          <Play className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">Match schedule not available yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
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
    location: "Saltillo, Coahuila, Mexico",
    image: "/images/founders-championship.png",
    winner: "Alliance 4 (Team 3, Team 6, Team 8)",
    secondPlace: "Alliance 2 (Team 5, Team 13, Team 4)",
    thirdPlace: "Alliance 1 (Team 12, Team 7, Team 10)",
    registeredTeams: [
      { id: "team-12", name: "Equipo 12", rankingPoints: 14 },
      { id: "team-5", name: "Equipo 5", rankingPoints: 12 },
      { id: "team-minus-1", name: "Vector -1", rankingPoints: 11 },
      { id: "team-3", name: "Equipo 3", rankingPoints: 11 },
      { id: "team-4", name: "Equipo 4", rankingPoints: 11 },
      { id: "team-7", name: "Equipo 7", rankingPoints: 11 },
      { id: "team-10", name: "Equipo 10", rankingPoints: 10 },
      { id: "team-2", name: "Equipo 2", rankingPoints: 9 },
      { id: "team-8", name: "Equipo 8", rankingPoints: 9 },
      { id: "team-13", name: "Equipo 13", rankingPoints: 8 },
      { id: "team-6", name: "Equipo 6", rankingPoints: 7 },
      { id: "team-11", name: "Equipo 11", rankingPoints: 7 },
      { id: "team-14", name: "Equipo 14", rankingPoints: 6 },
      { id: "team-9", name: "Equipo 9", rankingPoints: 5 },
    ],
    alliances: [
      {
        teams: [
          { id: "team-12", name: "Equipo 12" },
          { id: "team-7", name: "Equipo 7" },
          { id: "team-10", name: "Equipo 10" },
        ],
      },
      {
        teams: [
          { id: "team-5", name: "Equipo 5" },
          { id: "team-13", name: "Equipo 13" },
          { id: "team-4", name: "Equipo 4" },
        ],
      },
      {
        teams: [
          { id: "team-minus-1", name: "Vector -1" },
          { id: "team-11", name: "Equipo 11" },
          { id: "team-14", name: "Equipo 14" },
        ],
      },
      {
        teams: [
          { id: "team-3", name: "Equipo 3" },
          { id: "team-6", name: "Equipo 6" },
          { id: "team-8", name: "Equipo 8" },
        ],
      },
    ],
    matches: {
      qualification: [
        {
          blueAlliance: ["Vector -1", "Equipo 11", "Equipo 5"],
          redAlliance: ["Equipo 3", "Equipo 13", "Equipo 9"],
          blueScore: 12,
          redScore: 8,
          video: "https://youtu.be/Obm0N51Wumg",
        },
        {
          blueAlliance: ["Equipo 14", "Equipo 6", "Equipo 7"],
          redAlliance: ["Equipo 10", "Equipo 2", "Equipo 8"],
          blueScore: 8,
          redScore: 13,
          video: "https://youtu.be/DeONBCciLps",
        },
        {
          blueAlliance: ["Equipo 2", "Equipo 8", "Equipo 10"],
          redAlliance: ["Equipo 4", "Vector -1", "Equipo 12"],
          blueScore: 11,
          redScore: 17,
          video: "https://youtu.be/CUrbMQkRj50",
        },
        {
          blueAlliance: ["Equipo 11", "Equipo 14", "Equipo 6"],
          redAlliance: ["Equipo 12", "Equipo 3", "Equipo 13"],
          blueScore: 10,
          redScore: 14,
          video: "https://youtu.be/8MmfqLjJIVs",
        },
        {
          blueAlliance: ["Equipo 4", "Equipo 5", "Equipo 13"],
          redAlliance: ["Equipo 9", "Equipo 3", "Equipo 7"],
          blueScore: 16,
          redScore: 13,
          video: "https://youtu.be/WMheoayhL6o",
        },
        {
          blueAlliance: ["Vector -1", "Equipo 6", "Equipo 9"],
          redAlliance: ["Equipo 2", "Equipo 14", "Equipo 11"],
          blueScore: 6,
          redScore: 14,
          video: "https://youtu.be/NWa8xF2ueVQ",
        },
        {
          blueAlliance: ["Equipo 4", "Equipo 12", "Equipo 8"],
          redAlliance: ["Equipo 7", "Equipo 5", "Equipo 10"],
          blueScore: 10,
          redScore: 16,
          video: "https://youtu.be/w9-nNmC9-ag",
        },
        {
          blueAlliance: ["Equipo 3", "Equipo 11", "Equipo 6"],
          redAlliance: ["Equipo 9", "Equipo 2", "Equipo 8"],
          blueScore: 18,
          redScore: 14,
          video: "https://youtu.be/2rxa1ujiWs8",
        },
        {
          blueAlliance: ["Equipo 7", "Equipo 13", "Equipo 2"],
          redAlliance: ["Equipo 8", "Equipo 14", "Equipo 5"],
          blueScore: 15,
          redScore: 12,
          video: "https://youtu.be/xOrD6k-lfnk",
        },
        {
          blueAlliance: ["Equipo 10", "Equipo 3", "Equipo 9"],
          redAlliance: ["Vector -1", "Equipo 12", "Equipo 6"],
          blueScore: 13,
          redScore: 19,
          video: "https://youtu.be/C8QpXf0N1Qo",
        },
        {
          blueAlliance: ["Equipo 5", "Equipo 8", "Equipo 11"],
          redAlliance: ["Equipo 4", "Equipo 10", "Equipo 14"],
          blueScore: 21,
          redScore: 17,
          video: "https://youtu.be/S3lr8EuuUao",
        },
        {
          blueAlliance: ["Equipo 12", "Equipo 9", "Equipo 7"],
          redAlliance: ["Equipo 13", "Equipo 6", "Equipo 2"],
          blueScore: 24,
          redScore: 11,
          video: "https://youtu.be/dlmkxlDAzQA",
        },
        {
          blueAlliance: ["Vector -1", "Equipo 4", "Equipo 14"],
          redAlliance: ["Equipo 11", "Equipo 3", "Equipo 10"],
          blueScore: 19,
          redScore: 15,
          video: "https://youtu.be/DCxu1iRa1Ys",
        },
        {
          blueAlliance: ["Equipo 13", "Equipo 8", "Equipo 3"],
          redAlliance: ["Equipo 12", "Equipo 7", "Equipo 5"],
          blueScore: 14,
          redScore: 22,
          video: "https://youtu.be/Dp9TmhJuExs",
        },
      ],
      playoffs: [
        {
          blueAlliance: "Alliance 4 (Team 3, Team 6, Team 8)",
          redAlliance: "Alliance 1 (Team 12, Team 7, Team 10)",
          blueScore: 12,
          redScore: 14,
          video: "https://youtu.be/1BpFKWQFNFE",
        },
        {
          blueAlliance: "Alliance 3 (Vector -1, Team 11, Team 14)",
          redAlliance: "Alliance 2 (Team 5, Team 13, Team 4)",
          blueScore: 9,
          redScore: 13,
          video: "https://youtu.be/ghzNZhRUyqA",
        },
      ],
      semifinals: [
        {
          blueAlliance: "Alliance 2 (Team 5, Team 13, Team 4)",
          redAlliance: "Alliance 1 (Team 12, Team 7, Team 10)",
          blueScore: 12,
          redScore: 11,
          video: "https://youtu.be/i8yOsdfUjm4",
        },
        {
          blueAlliance: "Alliance 4 (Team 3, Team 6, Team 8)",
          redAlliance: "Alliance 3 (Vector -1, Team 11, Team 14)",
          blueScore: 18,
          redScore: 4,
          video: "https://youtu.be/MzOj5RB1DNA",
        },
      ],
      finals: [
        {
          blueAlliance: "Alliance 4 (Team 3, Team 6, Team 8)",
          redAlliance: "Alliance 2 (Team 5, Team 13, Team 4)",
          blueScore: 20,
          redScore: 13,
          video: "https://youtu.be/r6xYP0zGU_w",
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
    location: "Saltillo, Coahuila, Mexico",
    image: "/images/chemistry-quest-banner.png",
    registeredTeams: [],
    alliances: [],
    matches: {
      qualification: [],
      playoffs: [],
      semifinals: [],
      finals: [],
    },
  },
]
