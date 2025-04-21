"use client"

// Asegúrate de que el SessionProvider esté correctamente importado e implementado
import { SessionProvider } from "next-auth/react"

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}
