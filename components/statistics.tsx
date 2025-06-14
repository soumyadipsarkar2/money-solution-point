"use client"

import { Users, Building2, Landmark, Award } from "lucide-react"
import AnimatedCounter from "@/components/animated-counter"

const stats = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: 4000000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: <Building2 className="h-8 w-8 text-primary" />,
    value: 2500,
    suffix: "+",
    label: "Relationship Managers",
  },
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    value: 100,
    suffix: "+",
    label: "Banks & NBFCs",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    value: 20,
    suffix: "+",
    label: "Years Experience",
  },
]

export default function Statistics() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter">Our Achievements</h2>
          <p className="text-muted-foreground mt-2">Numbers that speak for our excellence</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-full bg-primary/10">{stat.icon}</div>
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
