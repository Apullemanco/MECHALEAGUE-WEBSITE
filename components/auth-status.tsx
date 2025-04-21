"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export function AuthStatus() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (loading) {
    return <div>Cargando...</div>
  }

  if (session) {
    return (
      <div>
        <p>Conectado como: {session.user?.email}</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </div>
    )
  }

  return (
    <div>
      <p>No has iniciado sesión</p>
      <button onClick={() => signIn("google")}>Iniciar sesión con Google</button>
    </div>
  )
}
