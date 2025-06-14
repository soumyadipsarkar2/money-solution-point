"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Play, Quote, Users, Heart } from "lucide-react"
import Link from "next/link"

const testimonials = [
  {
    id: 1,
    name: "Gaurav Pradhan",
    role: "Restaurant Owner",
    content:
      "मुझे बिज़नेस के लिए बड़े की जरूरत थी लेकिन बैंक की प्रक्रिया बहुत लंबी थी। Money Solution Point की टीम ने मेरा लोन बहुत कम समय में स्वीकृत करवा दिया और मैं अपनी प्रगति के साथ आगे बढ़ सका। हार्दिक धन्यवाद टीम को।",
    image: "/placeholder.svg?height=100&width=100",
    youtubeId: "vg9KAVdt5ek",
    thumbnail: "https://i.ytimg.com/vi/vg9KAVdt5ek/hqdefault.jpg",
    rating: 5,
    loanType: "Business Loan",
    amount: "₹15 Lakhs",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Home Owner",
    content:
      "Money Solution Point helped me secure a home loan with the best interest rates in the market. Their team guided me through the entire process and made it hassle-free.",
    image: "/placeholder.svg?height=100&width=100",
    youtubeId: "weB7cwUaBrg",
    thumbnail: "https://i.ytimg.com/vi/weB7cwUaBrg/hqdefault.jpg",
    rating: 5,
    loanType: "Home Loan",
    amount: "₹45 Lakhs",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Small Business Owner",
    content:
      "Getting an MSME loan was a breeze with Money Solution Point. Their expertise in handling documentation and negotiating with banks saved me both time and money.",
    image: "/placeholder.svg?height=100&width=100",
    youtubeId: "r15OIaTV-Jc",
    thumbnail: "https://i.ytimg.com/vi/r15OIaTV-Jc/hqdefault.jpg",
    rating: 4,
    loanType: "MSME Loan",
    amount: "₹8 Lakhs",
    startTime: 200, // Start at 3:20 (200 seconds)
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    setActiveVideo(null)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    setActiveVideo(null)
  }

  const handleVideoClick = (testimonialId: number) => {
    setActiveVideo(activeVideo === testimonialId ? null : testimonialId)
  }

  const getVideoUrl = (testimonial: any) => {
    const baseUrl = `https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1`
    return testimonial.startTime ? `${baseUrl}&start=${testimonial.startTime}` : baseUrl
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            <Heart className="h-4 w-4" />
            Customer Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real people who found their perfect financial solution with us
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10">
            <div className="text-2xl font-bold text-primary">4M+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-primary/10">
            <div className="text-2xl font-bold text-primary">4.9★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-primary/5 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid lg:grid-cols-2 min-h-[500px]">
                        {/* Video Section */}
                        <div className="relative bg-black">
                          {activeVideo === testimonial.id ? (
                            <iframe
                              className="w-full h-full min-h-[400px]"
                              src={getVideoUrl(testimonial)}
                              title={`Testimonial from ${testimonial.name}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <div
                              className="relative w-full h-full min-h-[400px] cursor-pointer group"
                              onClick={() => handleVideoClick(testimonial.id)}
                            >
                              <img
                                src={testimonial.thumbnail || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />

                              {/* Play Button Overlay */}
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                                <div className="bg-primary/90 backdrop-blur-sm rounded-full p-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-white/30">
                                  <Play className="h-12 w-12 text-white ml-1" />
                                </div>
                              </div>

                              {/* Video Badge */}
                              <div className="absolute top-6 left-6">
                                <span className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                  Live Testimonial
                                </span>
                              </div>

                              {/* Loan Info Badge */}
                              <div className="absolute bottom-6 left-6">
                                <div className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-lg shadow-lg">
                                  <div className="text-sm font-medium">{testimonial.loanType}</div>
                                  <div className="text-lg font-bold">{testimonial.amount}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                          {/* Quote Icon */}
                          <Quote className="h-12 w-12 text-primary/20 mb-6" />

                          {/* Rating */}
                          <div className="flex mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-6 w-6 ${
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Testimonial Text */}
                          <blockquote className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed italic">
                            "{testimonial.content}"
                          </blockquote>

                          {/* Customer Info */}
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full overflow-hidden relative border-4 border-primary/20">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-foreground">{testimonial.name}</h4>
                              <p className="text-muted-foreground">{testimonial.role}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Users className="h-4 w-4 text-primary" />
                                <span className="text-sm text-primary font-medium">Verified Customer</span>
                              </div>
                            </div>
                          </div>

                          {/* Watch Video Button */}
                          <Button
                            onClick={() => handleVideoClick(testimonial.id)}
                            className="mt-6 w-fit bg-primary hover:bg-primary/90"
                          >
                            {activeVideo === testimonial.id ? "Close Video" : "Watch Full Story"}
                            <Play className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border-primary/20 hover:bg-primary hover:text-white w-12 h-12"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border-primary/20 hover:bg-primary hover:text-white w-12 h-12"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-8 bg-primary" : "w-3 bg-primary/30 hover:bg-primary/50"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setActiveVideo(null)
              }}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-2xl p-8 max-w-2xl mx-auto border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-muted-foreground mb-6">
              Let us help you achieve your financial goals with our expert guidance and personalized solutions
            </p>
            <Link href="/apply">
              <Button size="lg" className="gap-2">
                Start Your Journey
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
