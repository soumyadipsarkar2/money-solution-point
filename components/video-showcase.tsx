"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"

const videos = [
  {
    id: 1,
    title: "Founder's Message: Solving Your Loan Challenges",
    description:
      "Our founder shares insights about common loan challenges and how Money Solution Point provides tailored solutions for every financial need.",
    youtubeId: "t9f5IbeTOEc",
    thumbnail: "https://i.ytimg.com/vi/t9f5IbeTOEc/hqdefault.jpg",
    category: "Founder's Message",
    duration: "5:30",
    featured: true,
  },
  {
    id: 2,
    title: "COVID Success Story: MBA Dreams Fulfilled",
    description:
      "A real success story of how we helped a student secure an education loan for MBA during COVID-19 when traditional banks said no.",
    youtubeId: "r15OIaTV-Jc",
    thumbnail: "https://i.ytimg.com/vi/r15OIaTV-Jc/hqdefault.jpg",
    category: "Success Stories",
    duration: "4:15",
    featured: true,
  },
  {
    id: 3,
    title: "How to Improve Your Low CIBIL Score Fast | Credit Score Tips 2025",
    description:
      "Learn proven strategies and credit score tips for 2025 to boost your CIBIL score quickly and effectively.",
    youtubeId: "ohzp3KlDR80",
    thumbnail: "https://i.ytimg.com/vi/ohzp3KlDR80/hqdefault.jpg",
    category: "Credit Tips",
    duration: "1:00",
    featured: false,
  },
  {
    id: 4,
    title: "Top MSME Schemes by the Indian Government | Small Business Support 2025",
    description:
      "Discover the latest MSME schemes and government support programs available for small businesses in 2025.",
    youtubeId: "jJS33gthb24",
    thumbnail: "https://i.ytimg.com/vi/jJS33gthb24/hqdefault.jpg",
    category: "MSME Schemes",
    duration: "1:00",
    featured: false,
  },
  {
    id: 5,
    title: "Customer Testimonial: Business Growth Success",
    description:
      "Real customer testimonial sharing their experience with Money Solution Point and how we helped them achieve business growth.",
    youtubeId: "weB7cwUaBrg",
    thumbnail: "https://i.ytimg.com/vi/weB7cwUaBrg/hqdefault.jpg",
    category: "Customer Stories",
    duration: "3:45",
    featured: false,
  }
]

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const handleVideoClick = (videoId: number) => {
    setActiveVideo(activeVideo === videoId ? null : videoId)
  }

  const featuredVideos = videos.filter((video) => video.featured)
  const otherVideos = videos.filter((video) => !video.featured)

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">Video Gallery</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Financial Insights & Solutions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch our expert videos, real success stories, and customer testimonials to understand how we can help you
            overcome financial challenges
          </p>
        </div>

        {/* Featured Videos */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Featured Stories</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredVideos.map((video) => (
              <Card
                key={video.id}
                className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2"
              >
                <div className="relative">
                  <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                    {activeVideo === video.id ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div
                        className="relative w-full h-full cursor-pointer group"
                        onClick={() => handleVideoClick(video.id)}
                      >
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                          <div className="bg-primary/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-white/20">
                            <Play className="h-8 w-8 text-white ml-1" />
                          </div>
                        </div>

                        <div className="absolute top-4 left-4">
                          <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            {video.category}
                          </span>
                        </div>

                        <div className="absolute top-4 right-4">
                          <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{video.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVideoClick(video.id)}
                        className="group-hover:bg-primary group-hover:text-white transition-colors"
                      >
                        {activeVideo === video.id ? "Close Video" : "Watch Now"}
                      </Button>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        <span>Featured</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Other Videos */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">More Videos & Testimonials</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {otherVideos.map((video) => (
              <Card
                key={video.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="relative">
                  <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                    {activeVideo === video.id ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div
                        className="relative w-full h-full cursor-pointer group"
                        onClick={() => handleVideoClick(video.id)}
                      >
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                          <div className="bg-primary/80 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Play className="h-6 w-6 text-white ml-0.5" />
                          </div>
                        </div>

                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                            {video.category}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-muted-foreground text-sm line-clamp-2">{video.description}</p>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVideoClick(video.id)}
                      className="w-full group-hover:bg-primary/10 transition-colors"
                    >
                      {activeVideo === video.id ? "Close" : "Watch Video"}
                      <Play className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Financial Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Get expert guidance and personalized loan solutions tailored to your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Apply for Loan
                </Button>
              </Link>
              <Link href="tel:+918057348348">
                <Button variant="outline" size="lg">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
