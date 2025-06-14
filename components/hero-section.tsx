"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall, ArrowRight, Play, Pause, Users, Building2, Landmark, Award } from "lucide-react"
import AnimatedCounter from "@/components/animated-counter"

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      // Set video properties for autoplay
      videoRef.current.muted = true // Must be muted for autoplay to work in most browsers
      videoRef.current.playsInline = true
      videoRef.current.loop = true

      // Attempt to play the video
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
            setIsPlaying(true)
          })
          .catch((error) => {
            // Auto-play was prevented
            console.log("Auto-play was prevented:", error)
            setIsPlaying(false)
          })
      }
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>

      <div className="container px-4 md:px-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-24">
          {/* Main Content - Left Side (6 columns) */}
          <div className="lg:col-span-6 flex flex-col space-y-6 relative z-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium border border-primary/20 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Trusted Financial Partner Since 2004
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground">
              Unlock Your{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                Financial Freedom
              </span>{" "}
              With Tailored Loan Solutions
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
              We simplify the loan process with personalized solutions, competitive rates, and expert guidance every
              step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 relative z-30">
              <Link href="/apply" className="relative z-40">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base font-medium bg-primary hover:bg-primary/90 text-white shadow-lg"
                >
                  Apply For Loan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="tel:+918057348348" className="relative z-40">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-base font-medium border-primary/20 hover:bg-primary/5"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>+91-8057348348</span>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 max-w-md">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-primary/10 shadow-sm">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <AnimatedCounter end={4000000} suffix="+" />
                  <p className="text-xs text-muted-foreground">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-primary/10 shadow-sm">
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <AnimatedCounter end={2500} suffix="+" />
                  <p className="text-xs text-muted-foreground">Relationship Managers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-primary/10 shadow-sm">
                <Landmark className="h-5 w-5 text-primary" />
                <div>
                  <AnimatedCounter end={100} suffix="+" />
                  <p className="text-xs text-muted-foreground">Banks & NBFCs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-primary/10 shadow-sm">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <AnimatedCounter end={20} suffix="+" />
                  <p className="text-xs text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section - Right Side (6 columns) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-[600px] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              {/* Video Container */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
                muted
                preload="auto"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Transparent Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-auto h-auto p-4 bg-transparent hover:bg-black/20 text-white border-0 shadow-none transition-all duration-300 hover:scale-110 pointer-events-auto"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12 ml-1" />}
                </Button>
              </div>

              {/* Video Overlay for Better Button Visibility */}
              <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-15"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
