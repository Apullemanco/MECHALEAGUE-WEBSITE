"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function InsightsPage() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [showNoDataAlert, setShowNoDataAlert] = useState(false)

  useEffect(() => {
    // Show no data alert when 2025 is selected
    setShowNoDataAlert(selectedYear === "2025")
  }, [selectedYear])

  const winData = [
    { name: "Team 12", wins: 5 },
    { name: "Team 5", wins: 4 },
    { name: "Vector -1", wins: 3 },
    { name: "Team 3", wins: 4 },
    { name: "Team 4", wins: 3 },
    { name: "Team 7", wins: 4 },
    { name: "Team 10", wins: 4 },
    { name: "Team 2", wins: 4 },
    { name: "Team 8", wins: 2 },
    { name: "Team 13", wins: 2 },
    { name: "Team 6", wins: 2 },
    { name: "Team 11", wins: 3 },
    { name: "Team 14", wins: 3 },
    { name: "Team 9", wins: 0 },
  ].sort((a, b) => b.wins - a.wins)

  const matchData = [
    { name: "Qualification", matches: 14 },
    { name: "Playoff", matches: 2 },
    { name: "Semifinal", matches: 2 },
    { name: "Final", matches: 1 },
  ]

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
    "#8DD1E1",
    "#A4DE6C",
    "#D0ED57",
    "#FFD700",
    "#FF6B6B",
    "#4BC0C0",
    "#9966FF",
  ]

  const rankingPointsData = [
    { name: "Team 12", points: 14 },
    { name: "Team 5", points: 12 },
    { name: "Vector -1", points: 11 },
    { name: "Team 3", points: 11 },
    { name: "Team 4", points: 11 },
    { name: "Team 7", points: 11 },
    { name: "Team 10", points: 10 },
    { name: "Team 2", points: 9 },
    { name: "Team 8", points: 9 },
    { name: "Team 13", points: 8 },
    { name: "Team 6", points: 7 },
    { name: "Team 11", points: 7 },
    { name: "Team 14", points: 6 },
    { name: "Team 9", points: 5 },
  ].sort((a, b) => b.points - a.points)

  return (
    <div className="flex flex-col min-h-screen max-w-[1920px] mx-auto">
      <SiteHeader />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">MechaLeague Insights</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Explore team statistics and competition data
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showNoDataAlert && (
              <Alert className="mt-6 max-w-2xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Data Available</AlertTitle>
                <AlertDescription>
                  There is no data available for 2025 yet. Please check back later when the season begins.
                </AlertDescription>
              </Alert>
            )}

            {!showNoDataAlert && (
              <Tabs defaultValue="wins" className="mt-8">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="wins">Team Wins</TabsTrigger>
                  <TabsTrigger value="matches">Matches</TabsTrigger>
                  <TabsTrigger value="ranking">Ranking Points</TabsTrigger>
                </TabsList>

                <TabsContent value="wins" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Wins in {selectedYear}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[500px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={winData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 60,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="wins" fill="#8884d8" name="Wins">
                              {winData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="matches" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Matches in {selectedYear}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[500px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={matchData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={150}
                              fill="#8884d8"
                              dataKey="matches"
                            >
                              {matchData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} matches`, "Count"]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-6 space-y-2">
                        <h3 className="text-lg font-medium">Match Distribution</h3>
                        <ul className="space-y-1">
                          <li className="flex justify-between">
                            <span>Total Qualification Matches:</span>
                            <span className="font-medium">14</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Total Playoff Matches:</span>
                            <span className="font-medium">2</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Total Semifinal Matches:</span>
                            <span className="font-medium">2</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Total Final Matches:</span>
                            <span className="font-medium">1</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Total Matches:</span>
                            <span className="font-medium">19</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ranking" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ranking Points in {selectedYear}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[500px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={rankingPointsData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 60,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="points" fill="#82ca9d" name="Ranking Points">
                              {rankingPointsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
