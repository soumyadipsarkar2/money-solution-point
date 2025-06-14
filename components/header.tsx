"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const loanTypes = [
  { name: "Home Loan", href: "/loans/home-loan" },
  { name: "Project Loan", href: "/loans/project-loan" },
  { name: "Loan Against Property (LAP)", href: "/loans/lap" },
  { name: "Personal & Business Loan", href: "/loans/personal-business-loan" },
  { name: "MSME Secured Loan", href: "/loans/msme-secured-loan" },
  { name: "MSME Unsecured Loan", href: "/loans/msme-unsecured-loan" },
  { name: "Education & New Car Loan", href: "/loans/education-car-loan" },
  { name: "CDA & Low CIBIL Score Loan", href: "/loans/cda-low-cibil-loan" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b h-20 shadow-sm"
          : "bg-transparent h-24"
      }`}
    >
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
          <Image
            src="/msp-logo2.png"
            alt="Money Solution Point Logo"
            width={scrolled ? 50 : 60}
            height={scrolled ? 50 : 60}
            className={`transition-all duration-200 ${scrolled ? "h-12 w-auto" : "h-16 w-auto"}`}
          />
          <span
            className={`hidden lg:inline-block font-bold transition-all duration-200 ${
              scrolled ? "text-lg text-primary" : "text-xl text-foreground"
            }`}
          >
            Money Solution Point
          </span>
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref onClick={handleLinkClick}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      scrolled ? "bg-background text-foreground" : "bg-transparent text-foreground hover:bg-white/10",
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  scrolled ? "bg-background text-foreground" : "bg-transparent text-foreground hover:bg-white/10"
                )}>
                  Our Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {loanTypes.map((loan) => (
                      <li key={loan.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={loan.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={handleLinkClick}
                          >
                            <div className="text-sm font-medium leading-none">{loan.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/gallery" legacyBehavior passHref onClick={handleLinkClick}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      scrolled ? "bg-background text-foreground" : "bg-transparent text-foreground hover:bg-white/10",
                    )}
                  >
                    Gallery
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about-us" legacyBehavior passHref onClick={handleLinkClick}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      scrolled ? "bg-background text-foreground" : "bg-transparent text-foreground hover:bg-white/10",
                    )}
                  >
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact-us" legacyBehavior passHref onClick={handleLinkClick}>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      scrolled ? "bg-background text-foreground" : "bg-transparent text-foreground hover:bg-white/10",
                    )}
                  >
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/apply" onClick={handleLinkClick}>
            <Button className="bg-primary hover:bg-primary/90">Apply Now</Button>
          </Link>

          <button
            className={`md:hidden ${scrolled ? "text-foreground" : "text-foreground"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 p-4 bg-background border-t">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
              onClick={handleLinkClick}
            >
              Home
            </Link>

            <div className="px-4 py-2">
              <p className="text-sm font-medium mb-2">Our Services</p>
              <div className="grid grid-cols-1 gap-2 pl-4">
                {loanTypes.map((loan) => (
                  <Link
                    key={loan.name}
                    href={loan.href}
                    className="text-sm hover:text-primary"
                    onClick={handleLinkClick}
                  >
                    {loan.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/gallery"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
              onClick={handleLinkClick}
            >
              Gallery
            </Link>

            <Link
              href="/about-us"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
              onClick={handleLinkClick}
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>

            <Link
              href="/apply"
              className="px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-md text-center"
              onClick={handleLinkClick}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
