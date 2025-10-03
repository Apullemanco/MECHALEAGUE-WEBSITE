// Simple client-side database using localStorage
// In a real application, this would be replaced with a proper backend database

// User types
export interface User {
  id: string
  name: string
  email: string
  password?: string // Not stored for OAuth users
  avatar?: string
  authProvider: "email" | "google"
  followedTeams: string[]
  followedTournaments: string[]
  createdAt: string
  updatedAt: string
}

// Database class to handle all operations
export class Database {
  // Get all users
  static getUsers(): User[] {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return []
    }

    const users = localStorage.getItem("mechaleague_users")
    return users ? JSON.parse(users) : []
  }

  // Get user by ID
  static getUserById(id: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.id === id) || null
  }

  // Get user by email
  static getUserByEmail(email: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.email === email) || null
  }

  // Create new user
  static createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const users = this.getUsers()

    // Check if user already exists
    if (users.some((u) => u.email === user.email)) {
      throw new Error("User with this email already exists")
    }

    const newUser: User = {
      ...user,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("mechaleague_users", JSON.stringify(users))

    return newUser
  }

  // Update user
  static updateUser(id: string, updates: Partial<User>): User {
    const users = this.getUsers()
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    users[userIndex] = updatedUser
    localStorage.setItem("mechaleague_users", JSON.stringify(users))

    // Update current user if it's the same
    const currentUserId = localStorage.getItem("currentUserId")
    if (currentUserId === id) {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }

    return updatedUser
  }

  // Delete user
  static deleteUser(id: string): boolean {
    const users = this.getUsers()
    const filteredUsers = users.filter((user) => user.id !== id)

    if (filteredUsers.length === users.length) {
      return false // User not found
    }

    localStorage.setItem("mechaleague_users", JSON.stringify(filteredUsers))
    return true
  }

  // Authentication methods
  static authenticateUser(email: string, password: string): User | null {
    const users = this.getUsers()
    const user = users.find((u) => u.email === email && u.password === password)
    return user || null
  }

  // Get current user
  static getCurrentUser(): User | null {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return null
    }

    const userId = localStorage.getItem("currentUserId")
    if (!userId) return null

    return this.getUserById(userId)
  }

  // Set current user
  static setCurrentUser(userId: string): void {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return
    }

    const user = this.getUserById(userId)
    if (!user) return

    localStorage.setItem("currentUserId", userId)
    localStorage.setItem("userLoggedIn", "true")
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  // Clear current user (logout)
  static clearCurrentUser(): void {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return
    }

    localStorage.removeItem("currentUserId")
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("currentUser")
  }

  // Follow/unfollow team
  static toggleFollowTeam(userId: string, teamId: string): User {
    const user = this.getUserById(userId)
    if (!user) throw new Error("User not found")

    const followedTeams = [...user.followedTeams]
    const teamIndex = followedTeams.indexOf(teamId)

    if (teamIndex === -1) {
      followedTeams.push(teamId)
    } else {
      followedTeams.splice(teamIndex, 1)
    }

    return this.updateUser(userId, { followedTeams })
  }

  // Follow/unfollow tournament
  static toggleFollowTournament(userId: string, tournamentId: string): User {
    const user = this.getUserById(userId)
    if (!user) throw new Error("User not found")

    const followedTournaments = [...user.followedTournaments]
    const tournamentIndex = followedTournaments.indexOf(tournamentId)

    if (tournamentIndex === -1) {
      followedTournaments.push(tournamentId)
    } else {
      followedTournaments.splice(tournamentIndex, 1)
    }

    return this.updateUser(userId, { followedTournaments })
  }
}

// Initialize database with some sample data if empty
export function initializeDatabase() {
  const users = Database.getUsers()

  if (users.length === 0) {
    console.log("Initializing database with sample data")

    // Create admin user
    Database.createUser({
      name: "Admin",
      email: "admin@mechaleague.com",
      password: "admin123",
      avatar: "/placeholder.svg",
      authProvider: "email",
      followedTeams: ["team-minus-1", "team-12"],
      followedTournaments: ["mechaleague-founders-championship"],
    })
  }
}
