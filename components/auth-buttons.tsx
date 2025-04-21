"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const isLoggedIn = typeof window !== "undefined" ? localStorage.getItem("userLoggedIn") === "true" : false

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      // Simplified login without NextAuth
      localStorage.setItem("userLoggedIn", "true")
      localStorage.setItem("userName", "Usuario")
      router.push("/")
    } catch (error) {
      console.error("Error signing in:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userName")
    router.push("/")
  }

  if (isLoggedIn) {
    return (
      <Button variant="outline" onClick={handleSignOut} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Cerrar sesión"}
      </Button>
    )
  }

  return (
    <Button onClick={handleSignIn} disabled={isLoading}>
      {isLoading ? "Cargando..." : "Iniciar sesión"}
    </Button>
  )
}
