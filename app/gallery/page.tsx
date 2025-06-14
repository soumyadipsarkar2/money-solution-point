"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3X3,
  LayoutGrid,
  Camera,
  Video,
  Sparkles,
  Heart,
  Share2,
  ZoomIn,
  Eye,
} from "lucide-react"

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: "/gallery/ram-navami.jpg",
    title: "Happy Ram Navami",
    category: "Festivals",
    description: "Celebrating Ram Navami with divine blessings",
    tags: ["festival", "celebration", "spiritual"],
  },
  {
    id: 2,
    type: "image",
    src: "/gallery/unlocking-opportunities.jpg",
    title: "Unlocking Big Opportunities",
    category: "Marketing",
    description: "Seamless financing solutions for business growth",
    tags: ["business", "opportunities", "financing"],
  },
  {
    id: 3,
    type: "video",
    src: "t9f5IbeTOEc",
    thumbnail: "https://i.ytimg.com/vi/t9f5IbeTOEc/hqdefault.jpg",
    title: "Founder's Message",
    category: "Videos",
    description: "Our founder shares insights about loan challenges",
    tags: ["founder", "message", "insights"],
  },
  {
    id: 4,
    type: "image",
    src: "/gallery/flexible-loan-solutions.jpg",
    title: "Flexible Loan Solutions",
    category: "Services",
    description: "Fast approval, low rates, no hidden fees since 2004",
    tags: ["loans", "flexible", "solutions"],
  },
  {
    id: 5,
    type: "video",
    src: "r15OIaTV-Jc",
    thumbnail: "https://i.ytimg.com/vi/r15OIaTV-Jc/hqdefault.jpg",
    title: "COVID Success Story",
    category: "Videos",
    description: "MBA dreams fulfilled during challenging times",
    tags: ["success", "education", "covid"],
  },
  {
    id: 6,
    type: "image",
    src: "/gallery/personal-loan-reasons.jpg",
    title: "5 Reasons for Personal Loan",
    category: "Education",
    description: "Medical, vacation, wedding, relocation needs",
    tags: ["personal", "loan", "reasons"],
  },
  {
    id: 7,
    type: "image",
    src: "/gallery/car-loan-hindi.jpg",
    title: "Car Loan Solutions",
    category: "Services",
    description: "Sapno ki car chahiye? Paisa ab rukawat nahi",
    tags: ["car", "loan", "hindi"],
  },
  {
    id: 8,
    type: "video",
    src: "weB7cwUaBrg",
    thumbnail: "https://i.ytimg.com/vi/weB7cwUaBrg/hqdefault.jpg",
    title: "Customer Testimonial",
    category: "Videos",
    description: "Real customer sharing their success story",
    tags: ["testimonial", "customer", "success"],
  },
  {
    id: 9,
    type: "image",
    src: "/gallery/msme-loans.jpg",
    title: "MSME Loans",
    category: "Services",
    description: "Scale to greater heights with business loans",
    tags: ["msme", "business", "growth"],
  },
  {
    id: 10,
    type: "video",
    src: "vg9KAVdt5ek",
    thumbnail: "https://i.ytimg.com/vi/vg9KAVdt5ek/hqdefault.jpg",
    title: "Personal Loan Success",
    category: "Videos",
    description: "Customer experience with personal loans",
    tags: ["personal", "loan", "experience"],
  },
  {
    id: 11,
    type: "image",
    src: "/gallery/loan-services.jpg",
    title: "Complete Loan Services",
    category: "Services",
    description: "Home, MSME, Personal, LAP, Education & Car loans",
    tags: ["services", "comprehensive", "loans"],
  },
  {
    id: 12,
    type: "video",
    src: "ohzp3KlDR80",
    thumbnail: "https://i.ytimg.com/vi/ohzp3KlDR80/hqdefault.jpg",
    title: "CIBIL Score Tips",
    category: "Videos",
    description: "How to improve your credit score fast",
    tags: ["cibil", "credit", "tips"],
  },
  {
    id: 13,
    type: "image",
    src: "/gallery/business-growth.jpg",
    title: "Fuel Your Business Growth",
    category: "Inspiration",
    description: "Steps to success with Money Solution Point",
    tags: ["business", "growth", "success"],
  },
  {
    id: 14,
    type: "video",
    src: "jJS33gthb24",
    thumbnail: "https://i.ytimg.com/vi/jJS33gthb24/hqdefault.jpg",
    title: "MSME Schemes",
    category: "Videos",
    description: "Government schemes for small businesses",
    tags: ["msme", "schemes", "government"],
  },
]

const categories = ["All", "Images", "Videos", "Services", "Marketing", "Education", "Festivals", "Inspiration"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry")

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === "All") return true
    if (selectedCategory === "Images") return item.type === "image"
    if (selectedCategory === "Videos") return item.type === "video"
    return item.category === selectedCategory
  })

  const openLightbox = (item: any) => {
    setSelectedItem(item)
    setIsPlaying(false)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
    setIsPlaying(false)
  }

  const navigateItem = (direction: "prev" | "next") => {
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem?.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedItem(filteredItems[newIndex])
    setIsPlaying(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return

      switch (e.key) {
        case "Escape":
          closeLightbox()
          break
        case "ArrowLeft":
          navigateItem("prev")
          break
        case "ArrowRight":
          navigateItem("next")
          break
        case " ":
          e.preventDefault()
          if (selectedItem.type === "video") {
            setIsPlaying(!isPlaying)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem, isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-24">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Visual Journey
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Our{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                Media Collection
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our collection of inspiring visuals, success stories, and educational content that showcase our
              journey in financial services
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                <div className="text-2xl font-bold text-primary">
                  {galleryItems.filter((i) => i.type === "image").length}
                </div>
                <div className="text-sm text-muted-foreground">Images</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                <div className="text-2xl font-bold text-primary">
                  {galleryItems.filter((i) => i.type === "video").length}
                </div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 border-b border-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="gap-2"
                >
                  <Filter className="h-3 w-3" />
                  {category}
                </Button>
              ))}
            </div>

            {/* Layout Toggle */}
            <div className="flex gap-2">
              <Button
                variant={layout === "masonry" ? "default" : "outline"}
                size="sm"
                onClick={() => setLayout("masonry")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant={layout === "grid" ? "default" : "outline"} size="sm" onClick={() => setLayout("grid")}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div
            className={`${
              layout === "masonry"
                ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-start"
            }`}
          >
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
                  layout === "masonry" ? "break-inside-avoid mb-6" : ""
                }`}
                onClick={() => openLightbox(item)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                  opacity: 0,
                }}
              >
                <div className="relative overflow-hidden">
                  {item.type === "image" ? (
                    <div className="relative aspect-auto">
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Play className="h-6 w-6 text-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="mb-2">
                        {item.type === "image" ? (
                          <Camera className="h-3 w-3 mr-1" />
                        ) : (
                          <Video className="h-3 w-3 mr-1" />
                        )}
                        {item.category}
                      </Badge>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <ZoomIn className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => navigateItem("prev")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => navigateItem("next")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Content */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              {selectedItem.type === "image" ? (
                <div className="relative">
                  <Image
                    src={selectedItem.src || "/placeholder.svg"}
                    alt={selectedItem.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
              ) : (
                <div className="relative aspect-video">
                  {isPlaying ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedItem.src}?autoplay=1`}
                      title={selectedItem.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      <Image
                        src={selectedItem.thumbnail || "/placeholder.svg"}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                      />
                      <Button
                        size="lg"
                        className="absolute bg-primary/90 hover:bg-primary text-white rounded-full p-6"
                        onClick={() => setIsPlaying(true)}
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Info Panel */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {selectedItem.category}
                    </Badge>
                    <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                    <p className="text-muted-foreground">{selectedItem.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
