"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TournamentNotFound() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = "/"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-muted/10">
      <Card className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Construction className="h-16 w-16 text-primary mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold mb-2">Tournament Under Construction</h1>
          <p className="text-muted-foreground mb-6">
            The tournament you're looking for is currently being prepared. Please check back later!
          </p>
          <div className="mb-4 text-sm text-muted-foreground">
            Redirecting to home page in <span className="font-bold text-primary">{countdown}</span> seconds...
          </div>
          <Button asChild className="w-full transition-transform hover:scale-105">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
