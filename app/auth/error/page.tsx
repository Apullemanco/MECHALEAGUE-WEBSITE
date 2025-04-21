"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    // Log the error for debugging
    if (error) {
      console.error("Authentication error:", error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mt-10">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error de autenticación</AlertTitle>
            <AlertDescription>
              {error === "OAuthSignin" && "Error al iniciar el proceso de OAuth."}
              {error === "OAuthCallback" && "Error durante la devolución de llamada de OAuth."}
              {error === "OAuthCreateAccount" && "Error al crear una cuenta de usuario."}
              {error === "EmailCreateAccount" && "Error al crear una cuenta de usuario."}
              {error === "Callback" && "Error durante la devolución de llamada."}
              {error === "OAuthAccountNotLinked" && "La cuenta ya está vinculada a otra cuenta."}
              {error === "EmailSignin" && "Error al enviar el correo electrónico de inicio de sesión."}
              {error === "CredentialsSignin" && "Las credenciales de inicio de sesión no son válidas."}
              {error === "SessionRequired" && "Se requiere iniciar sesión para acceder a esta página."}
              {!error && "Se produjo un error desconocido durante la autenticación."}
            </AlertDescription>
          </Alert>

          <div className="flex justify-center space-x-4">
            <Button onClick={() => router.push("/register")}>Volver a iniciar sesión</Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Ir a la página principal
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
