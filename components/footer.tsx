import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

const loanTypes = [
  { name: "Home Loan", href: "/loans/home-loan" },
  { name: "Project Loan", href: "/loans/project-loan" },
  { name: "Loan Against Property", href: "/loans/lap" },
  { name: "Personal & Business Loan", href: "/loans/personal-business-loan" },
  { name: "MSME Unsecured Loan", href: "/loans/msme-unsecured-loan" },
  { name: "MSME Secured Loan", href: "/loans/msme-secured-loan" },
  { name: "Education & New Car Loan", href: "/loans/education-car-loan" },
  { name: "CDA & Low Cibil Score Loan", href: "/loans/cda-low-cibil-loan" },
]

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Contact us", href: "/contact-us" },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="https://moneysolutionpoint.co.in/wp-content/uploads/2025/02/MSP-LOGO-2.png" alt="Money Solution Point Logo" width={40} height={40} className="h-10 w-auto" />
              <span className="font-bold text-xl">Money Solution Point</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              Established in 2004, Money Solution Point has been a trusted name in the loan consultancy industry,
              helping individuals and businesses secure the best financial solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/people/Money-solution-point/100065137954089/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/_moneysolutionpoint_/?igsh=cXBvcTQ0czNxbTBw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {loanTypes.slice(0, 6).map((loan) => (
                <li key={loan.name}>
                  <Link
                    href={loan.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline text-sm"
                  >
                    {loan.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-0.5" />
                <span className="text-sm">
                  664/2, Mangal Pandey Nagar,
                  <br />
                  Near Sapna Hospital, Meerut-
                  <br />
                  250003
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/80" />
                <Link href="tel:+918057348348" className="text-sm hover:underline">
                  +91-8057348348
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/80" />
                <Link href="mailto:moneysolutionpoint2004@gmail.com" className="text-sm hover:underline">
                  moneysolutionpoint2004@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/70">
          <p>Copyright © {new Date().getFullYear()} MONEY SOLUTION POINT. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
