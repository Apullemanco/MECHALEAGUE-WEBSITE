import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Trophy, Users, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/New%20Project%20%2872%29.png-1LL9q7O7j2kQzqbl3BfogCvS06MMfj.jpeg"
              alt="Robots"
              fill
              className="object-cover opacity-20 dark:opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          </div>
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Welcome to MechaLeague</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  The premier robotics competition league for students
                </p>
              </div>
              <div className="space-x-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
                <Button asChild className="transition-transform hover:scale-105">
                  <Link href="/teams">Explore Teams</Link>
                </Button>
                <Button variant="outline" asChild className="transition-transform hover:scale-105">
                  <Link href="/tournaments">View Tournaments</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Tournament</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Check out our latest competition
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative">
                  <Image
                    src="/images/maxresdefault.jpg"
                    alt="MechaLeague Founders Championship"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      Completed
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      href="https://youtu.be/r6xYP0zGU_w"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/80 hover:bg-primary text-white p-4 rounded-full transition-colors"
                    >
                      <Play className="h-8 w-8" />
                    </Link>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>MechaLeague Founders Championship</CardTitle>
                  <p className="text-sm text-muted-foreground">Presented by Prepa Tec</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>November 21, 2024</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Saltillo, Coahuila, Mexico</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>14 teams</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span>Winner: Alliance 4 (Team 3, Team 6, Team 8)</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    The inaugural competition of MechaLeague featuring 14 teams competing in 3v3 alliances format.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full hover:bg-primary/10 transition-colors">
                    <Link href="/tournaments/mechaleague-founders-championship">View results</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Top Teams</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Meet the leading teams in MechaLeague
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Second place - left */}
              <div className="mt-16">
                <Link href={`/teams/${topTeams[1].id}`} className="group block">
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group-hover:border-primary/50 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-muted group-hover:border-primary transition-colors">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team5-random.jpg-Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9.jpeg"
                            alt={topTeams[1].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {topTeams[1].name}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-1">
                            <Trophy className="h-4 w-4" />
                            <span>Rank: #{topTeams[1].rank}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{topTeams[1].members} members</span>
                          </div>
                        </div>
                        <Badge className="bg-gray-400 text-white">2nd Place</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* First place - center */}
              <div>
                <Link href={`/teams/${topTeams[0].id}`} className="group block">
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group-hover:border-primary/50 bg-gradient-to-b from-yellow-100 to-transparent dark:from-yellow-900/30">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-yellow-400 group-hover:border-primary transition-colors">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team12-random.jpg-Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9.jpeg"
                            alt={topTeams[0].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                            {topTeams[0].name}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-1">
                            <Trophy className="h-4 w-4" />
                            <span>Rank: #{topTeams[0].rank}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{topTeams[0].members} members</span>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500 text-white">1st Place</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* Third place - right */}
              <div className="mt-24">
                <Link href={`/teams/${topTeams[2].id}`} className="group block">
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group-hover:border-primary/50 bg-gradient-to-b from-amber-100 to-transparent dark:from-amber-900/30">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-muted group-hover:border-primary transition-colors">
                          <Image src="/images/vector-1-team.png" alt={topTeams[2].name} fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {topTeams[2].name}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-1">
                            <Trophy className="h-4 w-4" />
                            <span>Rank: #{topTeams[2].rank}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{topTeams[2].members} members</span>
                          </div>
                        </div>
                        <Badge className="bg-amber-600 text-white">3rd Place</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild className="transition-transform hover:scale-105">
                <Link href="/teams">View all teams</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join MechaLeague</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Ready to take your robotics skills to the next level?
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Button asChild size="lg" className="animate-pulse">
                    <Link href="https://tally.so/r/wMGpD0" target="_blank" rel="noopener noreferrer">
                      Register your team
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <Link href="/about">Learn more</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

const topTeams = [
  {
    id: "team-12",
    name: "Equipo 12",
    rank: 1,
    members: 2,
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
    id: "team-minus-1",
    name: "Vector -1",
    rank: 3,
    members: 3,
    logo: "/images/vector-1-team.png",
  },
]
