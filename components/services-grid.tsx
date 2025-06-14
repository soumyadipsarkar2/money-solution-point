import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Home,
  Building,
  Landmark,
  Briefcase,
  Shield,
  FileText,
  GraduationCap,
  CreditCard,
} from "lucide-react"

const services = [
  {
    icon: <Home className="h-6 w-6 text-primary" />,
    title: "Home Loan",
    description: "Finance your dream home with flexible terms and low rates.",
    href: "/loans/home-loan",
  },
  {
    icon: <Building className="h-6 w-6 text-primary" />,
    title: "Project Loan",
    description: "Fund your project's growth with tailored loan solutions.",
    href: "/loans/project-loan",
  },
  {
    icon: <Landmark className="h-6 w-6 text-primary" />,
    title: "LAP on Plots",
    description: "Unlock your land's value with a loan against property.",
    href: "/loans/lap",
  },
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: "Personal & Business Loan",
    description: "Funds for personal or business needs with easy repayment.",
    href: "/loans/personal-business-loan",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "MSME Secured Loan",
    description: "Secure funding for your MSME with competitive rates.",
    href: "/loans/msme-secured-loan",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "MSME Unsecured Loan",
    description: "Get quick funding for your MSME without collateral.",
    href: "/loans/msme-unsecured-loan",
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
    title: "Education & New Car Loan",
    description: "Finance your education or new car with affordable loans.",
    href: "/loans/education-car-loan",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: "CDA & Low CIBIL Score Loan",
    description: "Obtain a loan even with a low CIBIL score or through CDA.",
    href: "/loans/cda-low-cibil-loan",
  },
]

export default function ServicesGrid() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Financial Solutions for Every Need
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a wide range of financial products that meet our customers' needs
            </p>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service) => (
            <Card key={service.title} className="group transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href={service.href}
                  className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
