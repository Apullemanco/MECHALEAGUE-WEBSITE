import { Database, type User } from "./db"

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
      localStorage.setItem("currentUser", JSON.stringify(user))
      localStorage.setItem("userName", user.name)

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
      localStorage.setItem("userName", user.name)

      // Store user data in localStorage for persistence
      localStorage.setItem("currentUser", JSON.stringify(user))

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
        })
      } else {
        // Create new user
        user = Database.createUser({
          name,
          email,
          authProvider: "google",
          followedTeams: [],
          followedTournaments: [],
          avatar: imageUrl || "/placeholder.svg",
        })
      }

      // Set as current user
      Database.setCurrentUser(user.id)
      localStorage.setItem("userName", user.name)

      // Store user data in localStorage for persistence
      localStorage.setItem("currentUser", JSON.stringify(user))

      return user
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    }
  }

  // Logout
  static logout(): void {
    Database.clearCurrentUser()
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
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
      return JSON.parse(storedUser)
    }

    // Fall back to database
    return Database.getCurrentUser()
  }

  // Update user profile
  static updateProfile(userId: string, updates: Partial<User>): User {
    const updatedUser = Database.updateUser(userId, updates)

    // Update localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    if (updates.name) {
      localStorage.setItem("userName", updates.name)
    }

    return updatedUser
  }
}
