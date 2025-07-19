import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Briefcase, FileText, TrendingUp, Calendar } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function CompanyPage() {
  return (
    <AuthGuard allowedRoles={["company"]}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Company Portal</h1>
                <p className="text-gray-600">Partner with Sambhav for talent acquisition</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">Company</Badge>
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Job Posts</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">2 new this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">24 pending review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hired Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">Retention rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/company/job-postings">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Briefcase className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>Job Postings</CardTitle>
                  <CardDescription>Create and manage job opportunities</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/company/candidates">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Users className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle>Candidate Pool</CardTitle>
                  <CardDescription>Browse and review student profiles</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/company/interviews">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>Interview Scheduling</CardTitle>
                  <CardDescription>Schedule and manage interviews</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/company/applications">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <FileText className="w-8 h-8 text-orange-600 mb-2" />
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>Review and process applications</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/company/analytics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-red-600 mb-2" />
                  <CardTitle>Hiring Analytics</CardTitle>
                  <CardDescription>View recruitment metrics and insights</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/company/profile">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Building2 className="w-8 h-8 text-gray-600 mb-2" />
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Manage your company information</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
