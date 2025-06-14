import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Percent, Zap } from "lucide-react"

const benefits = [
  {
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    title: "No Collateral Required",
    description:
      "We prioritize transparency and objectivity in everything we do. Our platform delivers impartial solutions without requiring collateral for eligible applicants.",
  },
  {
    icon: <Percent className="h-12 w-12 text-primary" />,
    title: "Fair Interest Rate",
    description:
      "We have built strong relationships with a broad network of trusted lenders to offer you competitive rates that fit your financial situation.",
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: "Superfast Processing",
    description:
      "We focus on ensuring your satisfaction with quick processing times. Our committed customer service team is here to help you every step of the way.",
  },
]

export default function BenefitsSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Unlocking Paths to Your <span className="text-primary">Success</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're committed to providing financial solutions that help you achieve your goals
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 group-hover:from-primary/10 transition-all duration-300"></div>
              <CardHeader className="pb-2 relative">
                <div className="mx-auto mb-4 relative w-24 h-24 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-sm">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
