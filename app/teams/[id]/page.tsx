"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, MapPin } from "lucide-react"
import { Database } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TeamPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      const teamData = Database.getTeamById(params.id)
      if (!teamData) {
        notFound()
      }
      setTeam(teamData)
      setLoading(false)
    }

    fetchTeam()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
        <SiteHeader />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!team) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={team.logo || "/placeholder.svg"} alt={team.name} className="object-contain" />
                  <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {team.location}
                        </Badge>
                        <Badge variant="outline">#{team.ranking} in Rankings</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Record</p>
                      <p className="font-semibold">
                        {team.wins}W - {team.losses}L
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{team.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-semibold">{team.founded}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              {team.members && team.members.length > 0 && <TabsTrigger value="members">Members</TabsTrigger>}
              {team.achievements && team.achievements.length > 0 && (
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Team Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold">{team.stats.wins}</p>
                      <p className="text-sm text-muted-foreground">Wins</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold">{team.stats.losses}</p>
                      <p className="text-sm text-muted-foreground">Losses</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold">{team.stats.draws}</p>
                      <p className="text-sm text-muted-foreground">Draws</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold">#{team.ranking}</p>
                      <p className="text-sm text-muted-foreground">Ranking</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {team.members && team.members.length > 0 && (
              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Team Members
                    </CardTitle>
                    <CardDescription>Meet the talented individuals behind {team.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {team.members.map((member: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <Avatar>
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {team.achievements && team.achievements.length > 0 && (
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Achievements & Awards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {team.achievements.map((achievement: any, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                          <Trophy className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <p className="font-semibold">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.date}</p>
                            <p className="text-sm mt-2">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
