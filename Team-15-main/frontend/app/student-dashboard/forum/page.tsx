import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, MessageSquare, Plus, Search } from "lucide-react"

export default function ForumPage() {
  const discussions = [
    {
      id: 1,
      title: "Need help with JavaScript concepts",
      author: "John Doe",
      replies: 5,
      lastActivity: "2 hours ago",
      category: "Technical",
      status: "Open",
    },
    {
      id: 2,
      title: "Career guidance for web development",
      author: "Jane Smith",
      replies: 12,
      lastActivity: "4 hours ago",
      category: "Career",
      status: "Answered",
    },
    {
      id: 3,
      title: "Study group for upcoming exam",
      author: "Mike Johnson",
      replies: 8,
      lastActivity: "1 day ago",
      category: "Study",
      status: "Open",
    },
  ]

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
                <h1 className="text-2xl font-bold text-gray-900">Discussion Forum</h1>
                <p className="text-gray-600">Connect with counsellors and fellow students</p>
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Forum Content */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search discussions..." className="pl-10" />
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{discussion.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback>
                                {discussion.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{discussion.author}</span>
                          </div>
                          <span>•</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant={discussion.status === "Answered" ? "default" : "secondary"}>
                          {discussion.status}
                        </Badge>
                        <Badge variant="outline">{discussion.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Post */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Question</CardTitle>
                <CardDescription>Ask a quick question to the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Question title..." />
                <Textarea placeholder="Describe your question..." rows={3} />
                <Button className="w-full">Post Question</Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Technical Help
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Career Guidance
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Study Groups
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    General Discussion
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Online Counsellors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Online Counsellors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Dr. Sarah Wilson</p>
                      <p className="text-xs text-gray-600">Career Counsellor</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mr. John Davis</p>
                      <p className="text-xs text-gray-600">Academic Advisor</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
