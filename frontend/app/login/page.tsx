"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, Mail } from "lucide-react"

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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!email || !password || !role) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const data = await apiPost('/auth/login', { email, password, role })
      // Store user/session info as needed
      localStorage.setItem("user", JSON.stringify(data.user || { email, role }))
      // Redirect based on role (as before)
      switch (role) {
        case "student":
          router.push("/student-dashboard")
          break
        case "admin":
          router.push("/center-admin")
          break
        case "counsellor":
          router.push("/counsellor")
          break
        case "company":
          router.push("/company")
          break
        default:
          setError("Invalid role selected")
      }
    } catch (err: any) {
      setError(err.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23D97706;stop-opacity:0.3" /><stop offset="50%" style="stop-color:%23059669;stop-opacity:0.3" /><stop offset="100%" style="stop-color:%230891B2;stop-opacity:0.3" /></linearGradient></defs><rect width="100%" height="100%" fill="url(%23grad1)"/></svg>')`,
          backgroundColor: '#1a1a1a'
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-teal-900/40 to-blue-900/40" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">SAMBHAV</span>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              UNLOCK YOUR
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                POTENTIAL
              </span>
            </h1>
            
            <h2 className="text-xl text-gray-200 font-medium">
              Where Your Dreams of Education
              <br />
              Become Reality.
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Embark on a journey where every opportunity
              for learning and growth is within your reach.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link href="/" className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Login Form Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
              <p className="text-gray-400">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/30 text-red-300">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white text-sm font-medium">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white rounded-xl h-12">
                    <SelectValue placeholder="Select your role" className="text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-neutral-700">
                    <SelectItem value="student" className="text-white hover:bg-neutral-800">Student</SelectItem>
                    <SelectItem value="counsellor" className="text-white hover:bg-neutral-800">Counsellor</SelectItem>
                    <SelectItem value="admin" className="text-white hover:bg-neutral-800">Center Admin</SelectItem>
                    <SelectItem value="company" className="text-white hover:bg-neutral-800">Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Link href="#" className="text-sm text-orange-400 hover:text-orange-300 underline">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl h-12 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">or</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4 bg-white/5 border-white/20 text-white hover:bg-white/10 py-3 rounded-xl h-12 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Sign in with Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Are you new?{" "}
                <Link href="/signup" className="text-orange-400 hover:text-orange-300 underline font-medium">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
