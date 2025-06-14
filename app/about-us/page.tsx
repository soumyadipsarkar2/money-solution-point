"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Shield, Award, Play } from "lucide-react"
import AnimatedCounter from "@/components/animated-counter"

const allVideos = [
  {
    id: 1,
    title: "Founder's Message: Solving Your Loan Challenges",
    youtubeId: "t9f5IbeTOEc",
    thumbnail: "https://i.ytimg.com/vi/t9f5IbeTOEc/hqdefault.jpg",
    category: "Founder's Message",
  },
  {
    id: 2,
    title: "COVID Success Story: MBA Dreams Fulfilled",
    youtubeId: "r15OIaTV-Jc",
    thumbnail: "https://i.ytimg.com/vi/r15OIaTV-Jc/hqdefault.jpg",
    category: "Success Stories",
  },
  {
    id: 3,
    title: "Customer Testimonial: Business Growth Success",
    youtubeId: "weB7cwUaBrg",
    thumbnail: "https://i.ytimg.com/vi/weB7cwUaBrg/hqdefault.jpg",
    category: "Testimonials",
  },
  {
    id: 4,
    title: "Personal Loan Success: Customer Experience",
    youtubeId: "vg9KAVdt5ek",
    thumbnail: "https://i.ytimg.com/vi/vg9KAVdt5ek/hqdefault.jpg",
    category: "Testimonials",
  },
  {
    id: 5,
    title: "How to Improve Your Low CIBIL Score Fast",
    youtubeId: "ohzp3KlDR80",
    thumbnail: "https://i.ytimg.com/vi/ohzp3KlDR80/hqdefault.jpg",
    category: "Credit Tips",
  },
  {
    id: 6,
    title: "Top MSME Schemes by the Indian Government",
    youtubeId: "jJS33gthb24",
    thumbnail: "https://i.ytimg.com/vi/jJS33gthb24/hqdefault.jpg",
    category: "MSME Schemes",
  },
]

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">About Us</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simplifying Loans, Unlocking Opportunities
              </h1>
              <p className="text-muted-foreground md:text-xl">
                At Money Solution Point, we are dedicated to providing reliable and efficient financial solutions that
                help individuals and businesses navigate their financial needs.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/about_us.jpg"
                alt="Money Solution Point Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
              <div className="w-20 h-1 bg-primary"></div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Established in 2004, Money Solution Point has been a trusted name in the loan consultancy industry. Our
                journey began with a simple mission: to simplify the borrowing process by offering transparent, fast,
                and hassle-free loan services.
              </p>
              <p className="text-muted-foreground">
                Over the years, we have helped thousands of individuals and businesses secure the financial support they
                need to achieve their goals. Our team of experienced professionals is committed to guiding you every
                step of the way with expert advice and unparalleled customer service.
              </p>
              <p className="text-muted-foreground">
                Today, Money Solution Point stands as a beacon of trust and reliability in the financial services
                sector, known for our customer-centric approach and commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Our Video Gallery</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Watch our stories, testimonials, and educational content to understand our journey and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((video) => (
              <Card
                key={video.id}
                className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video bg-black">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-white ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                      {video.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 group-hover:bg-primary/10"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, "_blank")}
                  >
                    Watch Video
                    <Play className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Our Mission & Vision</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Mission</h3>
                  <p className="text-muted-foreground">
                    To offer reliable and efficient loan solutions that empower individuals and businesses to achieve
                    their financial goals, while ensuring a smooth and transparent experience at every stage.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Vision</h3>
                  <p className="text-muted-foreground">
                    To be the go-to provider for accessible and customer-focused financial services, fostering growth
                    and success for individuals and businesses alike.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Our Core Values</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              These principles guide our actions and decisions every day as we serve our customers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">Integrity</h3>
                  <p className="text-sm text-muted-foreground">
                    We operate with honesty and transparency in all our dealings, ensuring our customers' trust is never
                    compromised.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">Customer Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    We put our customers at the center of everything we do, tailoring our services to meet their unique
                    needs.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    We strive for excellence in all aspects of our service, continuously improving to deliver the best
                    outcomes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                      <path d="m8 12 3 3 6-6" />
                    </svg>
                  </div>
                  <h3 className="font-bold">Reliability</h3>
                  <p className="text-sm text-muted-foreground">
                    We are committed to being dependable partners in our customers' financial journeys, delivering on
                    our promises.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Our Milestones</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mb-2">
                <AnimatedCounter end={4000000} suffix="+" />
              </div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mb-2">
                <AnimatedCounter end={2500} suffix="+" />
              </div>
              <p className="text-muted-foreground">Relationship Managers</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mb-2">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              <p className="text-muted-foreground">Banks & NBFCs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Meet Our Team</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our experienced team of financial experts is dedicated to helping you achieve your goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                <Image src="/placeholder.svg?height=160&width=160" alt="Team Member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Rajesh Kumar</h3>
              <p className="text-primary">Founder & CEO</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                With over 25 years of experience in the financial sector, Rajesh leads our team with vision and
                expertise.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                <Image src="/placeholder.svg?height=160&width=160" alt="Team Member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Priya Sharma</h3>
              <p className="text-primary">Chief Financial Officer</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Priya brings 15 years of financial analysis expertise, ensuring our clients receive the best financial
                advice.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                <Image src="/placeholder.svg?height=160&width=160" alt="Team Member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Amit Patel</h3>
              <p className="text-primary">Head of Customer Relations</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Amit ensures every client receives personalized attention and the highest level of service throughout
                their journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you find the perfect financial solution for your needs. Our team is ready to assist you every
            step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="gap-2">
                Apply Now
                <svg
                  className="h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
