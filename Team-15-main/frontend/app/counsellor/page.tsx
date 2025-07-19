"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

async function apiGet(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function apiPatch(path: string, body: any) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export default function CounsellorDashboard() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Fetch all student profiles on mount
  useEffect(() => {
    (async () => {
      setLoading(true)
      setError('')
      try {
        const data = await apiGet('/student-profile')
        setRequests(data.profiles || [])
      } catch (err: any) {
        setError(err.message || 'Failed to fetch requests')
      }
      setLoading(false)
    })()
  }, [])

  // Handle status change
  const handleStatusChange = async (userId: string, newStatus: string) => {
    setUpdatingId(userId)
    try {
      await apiPatch(`/student-profile/${userId}/status`, { status: newStatus })
      setRequests((prev) => prev.map((req) => req.user._id === userId ? { ...req, status: newStatus } : req))
    } catch (err: any) {
      alert(err.message || 'Failed to update status')
    }
    setUpdatingId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Counsellor Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Student Counselling Requests</CardTitle>
            <CardDescription>Review and manage student requests for counselling</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Age</th>
                      <th className="px-4 py-2 text-left">Gender</th>
                      <th className="px-4 py-2 text-left">Qualifications</th>
                      <th className="px-4 py-2 text-left">Location</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-left">Interest</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req) => (
                      <tr key={req._id} className="border-b last:border-0">
                        <td className="px-4 py-2 font-medium">{req.user?.firstName} {req.user?.lastName}</td>
                        <td className="px-4 py-2">{req.age}</td>
                        <td className="px-4 py-2">{req.gender}</td>
                        <td className="px-4 py-2">{req.qualifications}</td>
                        <td className="px-4 py-2">{req.location} ({req.pincode})</td>
                        <td className="px-4 py-2">{req.phone}</td>
                        <td className="px-4 py-2">{req.interest}</td>
                        <td className="px-4 py-2">
                          {req.status === "waiting_for_counsellor" && <span className="text-yellow-600 font-semibold">Waiting</span>}
                          {req.status === "in_progress" && <span className="text-blue-600 font-semibold">In Progress</span>}
                          {req.status === "completed" && <span className="text-green-600 font-semibold">Completed</span>}
                        </td>
                        <td className="px-4 py-2 space-x-2">
                          <Button size="sm" variant="outline" disabled={req.status !== "waiting_for_counsellor" || updatingId === req.user?._id} onClick={() => handleStatusChange(req.user._id, "in_progress")}>Start</Button>
                          <Button size="sm" variant="outline" disabled={req.status !== "in_progress" || updatingId === req.user?._id} onClick={() => handleStatusChange(req.user._id, "completed")}>Complete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
