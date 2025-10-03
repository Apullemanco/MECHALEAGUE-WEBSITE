"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import { Database } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    const allTeams = Database.getAllTeams()
    setTeams(allTeams)
  }, [])

  const sortedTeams = [...teams].sort((a, b) => a.ranking - b.ranking)

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Teams</h1>
            <p className="text-muted-foreground">Explore all competing teams in MechaLeague</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedTeams.map((team) => (
              <Link key={team.id} href={`/teams/${team.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={team.logo || "/placeholder.svg"} alt={team.name} className="object-contain" />
                        <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Badge variant="secondary">#{team.ranking}</Badge>
                    </div>
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{team.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          Record
                        </span>
                        <span className="font-semibold">
                          {team.wins}W - {team.losses}L
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
