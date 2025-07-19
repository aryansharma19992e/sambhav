import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Calendar, BarChart3, Settings, UserPlus } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

export default function CenterAdminPage() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Center Admin Dashboard</h1>
                <p className="text-gray-600">Manage your center operations</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">Admin</Badge>
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
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+2% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Placements</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/center-admin/recruiting">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <UserPlus className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle>Recruiting</CardTitle>
                  <CardDescription>Manage student recruitment and admissions</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/center-admin/student-tracking">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Users className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle>Student Tracking</CardTitle>
                  <CardDescription>Monitor student progress and performance</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/center-admin/attendance">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>Attendance Management</CardTitle>
                  <CardDescription>Track and manage student attendance</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/center-admin/instructor-management">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <GraduationCap className="w-8 h-8 text-orange-600 mb-2" />
                  <CardTitle>Instructor Management</CardTitle>
                  <CardDescription>Manage instructors and course assignments</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/center-admin/reports">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <BarChart3 className="w-8 h-8 text-red-600 mb-2" />
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>View detailed reports and analytics</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/center-admin/settings">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Settings className="w-8 h-8 text-gray-600 mb-2" />
                  <CardTitle>Center Settings</CardTitle>
                  <CardDescription>Configure center settings and preferences</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
