import Link from "next/link"
import Image from "next/image"
import { Calendar, Trophy, Users, Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "David Gil Alvarado",
      role: "Cofounder",
      bio: "Passionate about robotics and STEM education, experienced in robotics design and +3 years of robotics competitions.",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0233_Original.jpg-pCM2gFcK7HG6JrBQPuC4mTU3ZaI7X2.jpeg",
    },
    {
      name: "Ramón De León Cabrera",
      role: "Cofounder",
      bio: "Programming expert, +3 years of robotics competitions.",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file.jpg-C294FOQhPujC7DMhQuFr4QiWmtYMNr.jpeg",
    },
    {
      name: "Adrián Rangel Martínez",
      role: "Outreach Coordinator",
      bio: "Dedicated to expanding MechaLeague's reach.",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file%20%281%29.jpg-KY8HHUjkHG22WP4RN4lV7sjjvfZygx.jpeg",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About MechaLeague</h1>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  Founded in 2024, MechaLeague has grown from a small school subject competition to an organization
                  seeking to improve STEM education in our country with more than 15 teams.
                </p>
                <p className="mt-4 text-muted-foreground">
                  What started as a robotics class on school has evolved into a new organization about STEM education
                  improvement league, fostering innovation, teamwork, and technological advancement.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MECHALEAGUE%20%281%29-YQ7yIbW5dr4TG7hY9YEzAtZrGLPder.png"
                  alt="MechaLeague"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our mission</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  To advance robotics technology through competition and collaboration.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Competition</h3>
                    <p className="text-muted-foreground">
                      Creating challenging environments that push the boundaries of what robots can do.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Community</h3>
                    <p className="text-muted-foreground">
                      Building a local network of robotics enthusiasts, engineers, students and innovators.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Innovation</h3>
                    <p className="text-muted-foreground">
                      Fostering technological advancement through creative problem-solving.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our history</h2>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <div className="space-y-8">
                {historyEvents.map((event, index) => (
                  <div key={index} className="relative pl-8 pb-8">
                    <div className="absolute left-0 top-0 h-full w-px bg-border"></div>
                    <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-primary"></div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{event.year}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                    {index < historyEvents.length - 1 && (
                      <div className="absolute left-2 bottom-0 h-4 w-px bg-border"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our team</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Meet the people behind MechaLeague
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden">
                    <Image src={member.avatar || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Founders Championship</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Highlights from our inaugural competition
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3299.JPG-mDdSfmICDU8rPbp9VuC8q3oHAB2Nok.jpeg"
                  alt="Competition robot"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">Tesla Cybertruck inspired robot design</p>
                </div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3297.JPG-okEmsTSFdQGGzSOfm7GAmWN2zSqWwP.jpeg"
                  alt="Vector -1 robot"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">Team Vector -1's robot in action</p>
                </div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3323.JPG-RZdPaDNfOgidNB4opvqU4fbxDagtpP.jpeg"
                  alt="Competition arena"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium">Multiple robots competing in the arena</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Contact us</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Get in touch with the MechaLeague team
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Button asChild size="lg" className="flex items-center gap-2">
                    <Link href="https://www.instagram.com/mechaleague/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4 mr-2" />
                      Follow us on Instagram
                    </Link>
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

const historyEvents = [
  {
    year: "2024",
    description:
      "The league is created to include teams from all the groups of the robotics class, and the first championship is held in Saltillo, Coahuila.",
  },
  {
    year: "2025",
    description:
      "The league expands to include teams from other schools, and the next national championship is held again in Saltillo, Coahuila.",
  },
]
