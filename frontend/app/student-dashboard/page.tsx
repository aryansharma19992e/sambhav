"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, MessageSquare, TrendingUp, User, FileText } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { useState, useEffect } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

async function apiPost(path: string, body: any) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function apiGet(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export default function StudentDashboard() {
  // Simulate first-time login (in real app, fetch from backend or user profile)
  const [showDetailsForm, setShowDetailsForm] = useState(true)
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    qualifications: '',
    location: '',
    pincode: '',
    income: '',
    interest: '',
    phone: '',
  })
  const [formError, setFormError] = useState('')
  const [waitingStatus, setWaitingStatus] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    // Get user id from localStorage (set at login)
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      setUserId(user._id || user.id || user.userId || user.email || '')
    } catch {
      setUserId('')
    }
  }, [])

  // On userId load, check if student profile exists
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const data = await apiGet(`/student-profile/${userId}/status`)
        if (data.status) {
          setWaitingStatus(data.status)
          setShowDetailsForm(false)
        } else {
          setShowDetailsForm(true)
        }
      } catch {
        setShowDetailsForm(true)
      }
    })();
  }, [userId])

  // Poll status if waiting
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (waitingStatus === 'waiting_for_counsellor' && userId) {
      interval = setInterval(async () => {
        try {
          const data = await apiGet(`/student-profile/${userId}/status`)
          if (data.status && data.status !== 'waiting_for_counsellor') {
            setWaitingStatus(data.status)
            setShowDetailsForm(false)
            if (interval) clearInterval(interval)
          }
        } catch {}
      }, 5000)
    }
    return () => { if (interval) clearInterval(interval) }
  }, [waitingStatus, userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.age || !formData.gender || !formData.qualifications || !formData.location || !formData.pincode || !formData.income || !formData.interest || !formData.phone) {
      setFormError('Please fill in all fields.')
      return
    }
    setFormError('')
    // Send to backend
    try {
      const data = await apiPost('/student-profile', { ...formData, user: userId })
      setWaitingStatus('waiting_for_counsellor')
      setShowDetailsForm(false)
    } catch (err: any) {
      setFormError(err.message || 'Failed to save profile')
    }
  }

  return (
    <AuthGuard allowedRoles={["student"]}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600">Welcome back, John Doe</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">Student</Badge>
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Student Details Form - Required for Counselling */}
          {showDetailsForm ? (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Profile for Counselling</CardTitle>
                  <CardDescription>All fields are required</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleFormSubmit}>
                    <div>
                      <label className="block mb-1 font-medium" htmlFor="age">Age</label>
                      <input id="age" name="age" type="number" min="1" required className="w-full border rounded px-3 py-2" value={formData.age} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium" htmlFor="gender">Gender</label>
                      <select id="gender" name="gender" required className="w-full border rounded px-3 py-2" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium" htmlFor="qualifications">Qualifications</label>
                      <input id="qualifications" name="qualifications" type="text" required className="w-full border rounded px-3 py-2" value={formData.qualifications} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium" htmlFor="location">Location</label>
                      <input id="location" name="location" type="text" required className="w-full border rounded px-3 py-2" value={formData.location} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium" htmlFor="pincode">Pincode</label>
                      <input id="pincode" name="pincode" type="text" pattern="\d{6}" required className="w-full border rounded px-3 py-2" value={formData.pincode} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium" htmlFor="income">Current Annual Income</label>
                      <input id="income" name="income" type="number" min="0" required className="w-full border rounded px-3 py-2" value={formData.income} onChange={handleInputChange} />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium" htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" pattern="[0-9]{10}" required className="w-full border rounded px-3 py-2" value={formData.phone} onChange={handleInputChange} placeholder="Enter 10-digit phone number" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1 font-medium" htmlFor="interest">Interest</label>
                      <input id="interest" name="interest" type="text" required className="w-full border rounded px-3 py-2" value={formData.interest} onChange={handleInputChange} />
                    </div>
                    {formError && (
                      <div className="md:col-span-2 text-red-600 text-sm">{formError}</div>
                    )}
                    <div className="md:col-span-2 text-right">
                      <Button type="submit">Save Details</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : waitingStatus === 'waiting_for_counsellor' ? (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Waiting for Counsellor's Response</CardTitle>
                  <CardDescription>Your details have been submitted. Please wait for a counsellor to respond.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ) : waitingStatus === 'in_progress' ? (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Counselling In Progress</CardTitle>
                  <CardDescription>Your counselling session is in progress. Please wait for updates from your counsellor.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ) : waitingStatus === 'completed' ? (
            <>
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">75%</div>
                    <Progress value={75} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Web Development Course</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">92%</div>
                    <Progress value={92} className="mb-2" />
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">8/10</div>
                    <Progress value={80} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/student-dashboard/courses">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                      <CardTitle>My Courses</CardTitle>
                      <CardDescription>Access your enrolled courses and materials</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/attendance">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <Calendar className="w-8 h-8 text-green-600 mb-2" />
                      <CardTitle>Attendance</CardTitle>
                      <CardDescription>View your attendance record and schedule</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/forum">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
                      <CardTitle>Forum</CardTitle>
                      <CardDescription>Connect with counsellors and peers</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/assessment">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <FileText className="w-8 h-8 text-orange-600 mb-2" />
                      <CardTitle>Assessment Tracking</CardTitle>
                      <CardDescription>Track your test scores and evaluations</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/feedback">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <TrendingUp className="w-8 h-8 text-red-600 mb-2" />
                      <CardTitle>Feedback</CardTitle>
                      <CardDescription>View feedback from instructors</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/profile">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <User className="w-8 h-8 text-gray-600 mb-2" />
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Manage your profile and settings</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">75%</div>
                    <Progress value={75} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Web Development Course</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">92%</div>
                    <Progress value={92} className="mb-2" />
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">8/10</div>
                    <Progress value={80} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/student-dashboard/courses">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                      <CardTitle>My Courses</CardTitle>
                      <CardDescription>Access your enrolled courses and materials</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/attendance">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <Calendar className="w-8 h-8 text-green-600 mb-2" />
                      <CardTitle>Attendance</CardTitle>
                      <CardDescription>View your attendance record and schedule</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/forum">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
                      <CardTitle>Forum</CardTitle>
                      <CardDescription>Connect with counsellors and peers</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/assessment">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <FileText className="w-8 h-8 text-orange-600 mb-2" />
                      <CardTitle>Assessment Tracking</CardTitle>
                      <CardDescription>Track your test scores and evaluations</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/feedback">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <TrendingUp className="w-8 h-8 text-red-600 mb-2" />
                      <CardTitle>Feedback</CardTitle>
                      <CardDescription>View feedback from instructors</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/student-dashboard/profile">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <User className="w-8 h-8 text-gray-600 mb-2" />
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Manage your profile and settings</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </>
          )}
        </main>
      </div>
    </AuthGuard>
  )
}
