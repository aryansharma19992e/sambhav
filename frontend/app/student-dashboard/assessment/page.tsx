import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, FileText, TrendingUp, Calendar, Award } from "lucide-react"

export default function AssessmentTrackingPage() {
  const assessments = [
    {
      id: 1,
      name: "JavaScript Fundamentals",
      type: "Quiz",
      score: 85,
      maxScore: 100,
      date: "2024-01-15",
      status: "Completed",
    },
    {
      id: 2,
      name: "React Components",
      type: "Assignment",
      score: 92,
      maxScore: 100,
      date: "2024-01-12",
      status: "Completed",
    },
    {
      id: 3,
      name: "Database Design",
      type: "Project",
      score: 78,
      maxScore: 100,
      date: "2024-01-10",
      status: "Completed",
    },
    {
      id: 4,
      name: "Final Assessment",
      type: "Exam",
      score: null,
      maxScore: 100,
      date: "2024-01-20",
      status: "Upcoming",
    },
  ]

  const overallStats = {
    averageScore: 85,
    completedAssessments: 12,
    upcomingAssessments: 3,
    totalAssessments: 15,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/student-dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Assessment Tracking</h1>
                <p className="text-gray-600">Monitor your test scores and academic progress</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.averageScore}%</div>
              <Progress value={overallStats.averageScore} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.completedAssessments}</div>
              <p className="text-xs text-muted-foreground">Assessments completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.upcomingAssessments}</div>
              <p className="text-xs text-muted-foreground">Assessments pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overallStats.completedAssessments}/{overallStats.totalAssessments}
              </div>
              <Progress
                value={(overallStats.completedAssessments / overallStats.totalAssessments) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your assessment scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Performance chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>

        {/* Assessments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
            <CardDescription>Detailed view of all your assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell className="font-medium">{assessment.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{assessment.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {assessment.score ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {assessment.score}/{assessment.maxScore}
                          </span>
                          <Badge
                            variant={
                              assessment.score >= 80 ? "default" : assessment.score >= 60 ? "secondary" : "destructive"
                            }
                          >
                            {assessment.score >= 80
                              ? "Excellent"
                              : assessment.score >= 60
                                ? "Good"
                                : "Needs Improvement"}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-500">Not taken</span>
                      )}
                    </TableCell>
                    <TableCell>{assessment.date}</TableCell>
                    <TableCell>
                      <Badge variant={assessment.status === "Completed" ? "default" : "secondary"}>
                        {assessment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        {assessment.status === "Completed" ? "View Details" : "Take Assessment"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
