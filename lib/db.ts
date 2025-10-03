interface Team {
  id: string
  name: string
  location: string
  founded: string
  logo: string
  members: TeamMember[]
  achievements: Achievement[]
  stats: TeamStats
  wins: number
  losses: number
  ranking: number
  region: string
}

interface TeamMember {
  name: string
  avatar: string
}

interface Achievement {
  title: string
  date: string
  description: string
}

interface TeamStats {
  wins: number
  losses: number
  draws: number
  rankingPoints: number
}

interface Tournament {
  id: string
  name: string
  date: string
  location: string
  participants: number
  status: "upcoming" | "ongoing" | "completed"
  image: string
  winner?: string
  description?: string
  teams?: number
  logo?: string
}

export type { Team, Tournament }

class DatabaseClass {
  private teams: Team[] = [
    {
      id: "team-12",
      name: "Equipo 12",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 6,
      losses: 2,
      ranking: 1,
      members: [
        {
          name: "Emilio Llamas",
          avatar: "",
        },
        {
          name: "Adolfo Múzquiz",
          avatar: "",
        },
      ],
      achievements: [
        {
          title: "Founders Championship - Champions",
          date: "November 2024",
          description: "Won the inaugural MechaLeague Founders Championship",
        },
        {
          title: "Excellence Award",
          date: "November 2024",
          description: "Awarded for outstanding performance throughout the tournament",
        },
      ],
      stats: {
        wins: 6,
        losses: 2,
        draws: 0,
        rankingPoints: 14,
      },
    },
    {
      id: "team-5",
      name: "Equipo 5",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 7,
      losses: 2,
      ranking: 2,
      members: [
        {
          name: "Enrique",
          avatar: "",
        },
        {
          name: "Jorge Rivera",
          avatar: "",
        },
        {
          name: "Brian",
          avatar: "",
        },
      ],
      achievements: [
        {
          title: "Founders Championship - 2nd Place",
          date: "November 2024",
          description: "Strong performance in the tournament",
        },
      ],
      stats: {
        wins: 7,
        losses: 2,
        draws: 0,
        rankingPoints: 12,
      },
    },
    {
      id: "team-minus-1",
      name: "Vector -1",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/vector-1-team.png",
      wins: 4,
      losses: 3,
      ranking: 3,
      members: [
        {
          name: "Ramón",
          avatar: "",
        },
        {
          name: "David Gil",
          avatar: "",
        },
        {
          name: "Victor Udave",
          avatar: "",
        },
      ],
      achievements: [
        {
          title: "Founders Championship - 3rd Place",
          date: "November 2024",
          description: "Secured 3rd place in the inaugural MechaLeague tournament",
        },
        {
          title: "Innovation Award",
          date: "November 2024",
          description: "Recognized for innovative robot design and strategy",
        },
      ],
      stats: {
        wins: 4,
        losses: 3,
        draws: 0,
        rankingPoints: 11,
      },
    },
    {
      id: "team-3",
      name: "Equipo 3",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 4,
      losses: 6,
      ranking: 4,
      members: [],
      achievements: [],
      stats: {
        wins: 4,
        losses: 6,
        draws: 0,
        rankingPoints: 11,
      },
    },
    {
      id: "team-4",
      name: "Equipo 4",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 5,
      losses: 3,
      ranking: 5,
      members: [],
      achievements: [],
      stats: {
        wins: 5,
        losses: 3,
        draws: 0,
        rankingPoints: 11,
      },
    },
    {
      id: "team-7",
      name: "Equipo 7",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 5,
      losses: 3,
      ranking: 6,
      members: [],
      achievements: [],
      stats: {
        wins: 5,
        losses: 3,
        draws: 0,
        rankingPoints: 11,
      },
    },
    {
      id: "team-10",
      name: "Equipo 10",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 3,
      losses: 5,
      ranking: 7,
      members: [],
      achievements: [],
      stats: {
        wins: 3,
        losses: 5,
        draws: 0,
        rankingPoints: 10,
      },
    },
    {
      id: "team-2",
      name: "Equipo 2",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 3,
      losses: 3,
      ranking: 8,
      members: [],
      achievements: [],
      stats: {
        wins: 3,
        losses: 3,
        draws: 0,
        rankingPoints: 9,
      },
    },
    {
      id: "team-8",
      name: "Equipo 8",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 4,
      losses: 6,
      ranking: 9,
      members: [],
      achievements: [],
      stats: {
        wins: 4,
        losses: 6,
        draws: 0,
        rankingPoints: 9,
      },
    },
    {
      id: "team-13",
      name: "Equipo 13",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 5,
      losses: 4,
      ranking: 10,
      members: [],
      achievements: [],
      stats: {
        wins: 5,
        losses: 4,
        draws: 0,
        rankingPoints: 8,
      },
    },
    {
      id: "team-6",
      name: "Equipo 6",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 4,
      losses: 5,
      ranking: 11,
      members: [],
      achievements: [],
      stats: {
        wins: 4,
        losses: 5,
        draws: 0,
        rankingPoints: 7,
      },
    },
    {
      id: "team-11",
      name: "Equipo 11",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 3,
      losses: 4,
      ranking: 12,
      members: [],
      achievements: [],
      stats: {
        wins: 3,
        losses: 4,
        draws: 0,
        rankingPoints: 7,
      },
    },
    {
      id: "team-14",
      name: "Equipo 14",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 2,
      losses: 6,
      ranking: 13,
      members: [],
      achievements: [],
      stats: {
        wins: 2,
        losses: 6,
        draws: 0,
        rankingPoints: 6,
      },
    },
    {
      id: "team-9",
      name: "Equipo 9",
      location: "Saltillo, Coahuila",
      region: "Norte",
      founded: "2024",
      logo: "/images/team-default.png",
      wins: 1,
      losses: 5,
      ranking: 14,
      members: [],
      achievements: [],
      stats: {
        wins: 1,
        losses: 5,
        draws: 0,
        rankingPoints: 5,
      },
    },
  ]

  private tournaments: Tournament[] = [
    {
      id: "founders-championship",
      name: "MechaLeague Founders Championship",
      date: "November 21, 2024",
      location: "Saltillo, Coahuila, Mexico",
      participants: 14,
      status: "completed",
      winner: "Equipo 12",
      image: "/images/founders-championship.png",
      logo: "/images/founders-championship.png",
      description: "The inaugural MechaLeague tournament featuring the best teams from across Mexico.",
      teams: 14,
    },
    {
      id: "chemistry-quest",
      name: "Chemistry Quest",
      date: "TBD",
      location: "Saltillo, Coahuila, Mexico",
      participants: 16,
      status: "upcoming",
      image: "/images/chemistry-quest-banner.png",
      logo: "/images/chemistry-quest-banner.png",
      description: "A special tournament focused on chemistry-themed challenges and innovation.",
      teams: 16,
    },
  ]

  getTeam(teamId: string): Team | null {
    return this.teams.find((team) => team.id === teamId) || null
  }

  getTeamById(teamId: string): Team | null {
    return this.getTeam(teamId)
  }

  getAllTeams(): Team[] {
    return this.teams
  }

  getTournament(tournamentId: string): Tournament | null {
    return this.tournaments.find((tournament) => tournament.id === tournamentId) || null
  }

  getTournamentById(tournamentId: string): Tournament | null {
    return this.getTournament(tournamentId)
  }

  getAllTournaments(): Tournament[] {
    return this.tournaments
  }
}

export const Database = new DatabaseClass()
