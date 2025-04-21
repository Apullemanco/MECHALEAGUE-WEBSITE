import Link from "next/link"
import Image from "next/image"
import { Trophy, Star, Award, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HallOfFamePage() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">MechaLeague Hall of Fame</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Celebrating the most outstanding teams in MechaLeague history
                </p>
              </div>
            </div>

            {/* Hall of Fame Teams Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Vector -1 */}
              <Card className="relative overflow-hidden border-4 border-amber-500 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-background">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-200/30 to-transparent dark:from-amber-800/10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      Vector -1
                    </CardTitle>
                    <Badge className="bg-amber-500 hover:bg-amber-600">Hall of Fame</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4 relative z-10">
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
                      <Image src="/images/vector-1-team.png" alt="Vector -1" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-center">Team Achievements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Trophy className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">Judges' Favorite Team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">First officially registered team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">Most innovative robot design</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Team Members</h3>
                    <ul className="space-y-1">
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Ramón</span>
                      </li>
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>David Gil</span>
                      </li>
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Victor Udave</span>
                      </li>
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-amber-500 hover:bg-amber-600">
                    <Link href="/teams/team-minus-1">View Full Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Equipo 12 */}
              <Card className="relative overflow-hidden border-4 border-amber-500 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-background">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-200/30 to-transparent dark:from-amber-800/10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      Equipo 12
                    </CardTitle>
                    <Badge className="bg-amber-500 hover:bg-amber-600">Hall of Fame</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4 relative z-10">
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team12-random.jpg-Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9.jpeg"
                        alt="Equipo 12"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-center">Team Achievements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Trophy className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">MechaLeague Founders Championship Winner</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">Highest scoring team in the tournament</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">Most consistent performance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Team Members</h3>
                    <ul className="space-y-1">
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Emilio Llamas</span>
                      </li>
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Adolfo Múzquiz</span>
                      </li>
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-amber-500 hover:bg-amber-600">
                    <Link href="/teams/team-12">View Full Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Equipo 5 */}
              <Card className="relative overflow-hidden border-4 border-amber-500 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-background">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-200/30 to-transparent dark:from-amber-800/10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      Equipo 5
                    </CardTitle>
                    <Badge className="bg-amber-500 hover:bg-amber-600">Hall of Fame</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4 relative z-10">
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/team5-random.jpg-Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9Yx9Yd9Yd9.jpeg"
                        alt="Equipo 5"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-center">Team Achievements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Trophy className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">MechaLeague Founders Championship Runner-up</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">Excellent strategic performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">Outstanding teamwork</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Team Members</h3>
                    <ul className="space-y-1">
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Enrique</span>
                      </li>
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Jorge Rivera</span>
                      </li>
                      <li className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Brian</span>
                      </li>
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-amber-500 hover:bg-amber-600">
                    <Link href="/teams/team-5">View Full Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
