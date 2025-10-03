import { Database } from "./db"
import type { User } from "./db"

// Authentication service
export class Auth {
  // Register with email and password
  static async registerWithEmail(name: string, email: string, password: string): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = Database.getUserByEmail(email)
      if (existingUser) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const user = Database.createUser({
        name,
        email,
        password,
        authProvider: "email",
        followedTeams: [],
        followedTournaments: [],
        avatar: "/placeholder.svg",
      })

      // Set as current user
      Database.setCurrentUser(user.id)

      // Store user data in localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("userName", user.name)
        localStorage.setItem("userLoggedIn", "true")
        localStorage.setItem("currentUserId", user.id)
      }

      return user
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  // Login with email and password
  static async loginWithEmail(email: string, password: string): Promise<User> {
    try {
      // First check if user exists
      const user = Database.getUserByEmail(email)
      if (!user) {
        throw new Error("No account found with this email address")
      }

      // Then check if password matches
      const authenticatedUser = Database.authenticateUser(email, password)
      if (!authenticatedUser) {
        throw new Error("Invalid password. Please try again.")
      }

      // Set as current user
      Database.setCurrentUser(user.id)

      // Store user data in localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("userName", user.name)
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("userLoggedIn", "true")
        localStorage.setItem("currentUserId", user.id)
      }

      return user
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Login with Google
  static async loginWithGoogle(googleUser: any): Promise<User> {
    try {
      const { name, email, imageUrl } = googleUser

      // Check if user already exists
      let user = Database.getUserByEmail(email)

      if (user) {
        // Update existing user
        user = Database.updateUser(user.id, {
          name,
          avatar: imageUrl || user.avatar,
          authProvider: "google",
        }) as User
      } else {
        // Create new user
        user = Database.createUser({
          name,
          email,
          authProvider: "google",
          followedTeams: [],
          followedTournaments: [],
          avatar: imageUrl || "/placeholder.svg",
          password: "",
        })
      }

      // Set as current user
      Database.setCurrentUser(user.id)

      // Store user data in localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("userName", user.name)
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("userLoggedIn", "true")
        localStorage.setItem("currentUserId", user.id)
      }

      return user
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    }
  }

  // Logout
  static logout(): void {
    Database.clearCurrentUser()
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("userName")
      localStorage.removeItem("userLoggedIn")
      localStorage.removeItem("currentUserId")
    }
  }

  // Get current user
  static getCurrentUser(): User | null {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return null
    }

    // Try to get from localStorage first for persistence
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        return JSON.parse(storedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        return null
      }
    }

    // Fall back to database
    return Database.getCurrentUser()
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userLoggedIn") === "true"
    }
    return false
  }

  // Update user profile
  static updateProfile(userId: string, updates: Partial<User>): User | null {
    const updatedUser = Database.updateUser(userId, updates)

    if (updatedUser && typeof window !== "undefined") {
      // Update localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      if (updates.name) {
        localStorage.setItem("userName", updates.name)
      }
    }

    return updatedUser
  }

  // Update current user
  static updateCurrentUser(updates: Partial<User>): User | null {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return null

    const updatedUser = Database.updateUser(currentUser.id, updates)
    if (updatedUser && typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
    return updatedUser
  }
}
