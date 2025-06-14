"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Phone, Mail, ArrowRight, Star, Users, Award } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        </div>

        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Thank You for Your Interest!</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your inquiry has been successfully submitted. Our financial experts will review your requirements and
              contact you shortly with the best loan solutions.
            </p>

            {/* Confirmation Card */}
            <Card className="max-w-2xl mx-auto mb-12 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary to-primary-foreground text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center justify-center gap-3">
                  <Mail className="h-6 w-6" />
                  Confirmation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-medium text-green-800">Status:</span>
                    <span className="text-green-600 font-bold">✅ Successfully Submitted</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="font-medium text-yellow-800">Expected Response:</span>
                    <span className="text-yellow-600 font-bold">⏰ Within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Happens Next?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Step 1: Review</h3>
                  <p className="text-muted-foreground">
                    Our loan experts will carefully review your requirements and financial profile within 2-4 hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Step 2: Contact</h3>
                  <p className="text-muted-foreground">
                    We'll call you to discuss your needs and explain the best loan options available for you.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Step 3: Process</h3>
                  <p className="text-muted-foreground">
                    Once you're satisfied, we'll guide you through the quick and easy application process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Choose Money Solution Point?</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">4M+</h3>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">20+</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">100+</h3>
                <p className="text-muted-foreground">Bank Partners</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="text-muted-foreground mb-6">
                Our customer support team is available to help you with any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="tel:+918057348348">
                  <Button size="lg" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call +91-8057348348
                  </Button>
                </Link>
                <Link href="https://wa.me/918057348348" target="_blank">
                  <Button variant="outline" size="lg" className="gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309" />
                    </svg>
                    WhatsApp Chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Actions */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Explore More Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Calculate Your EMI</h3>
                  <p className="text-muted-foreground mb-6">
                    Use our EMI calculator to plan your loan repayment and find the best option for your budget.
                  </p>
                  <Link href="/#emi-calculator">
                    <Button variant="outline" className="gap-2">
                      Calculate EMI <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Learn About Our Services</h3>
                  <p className="text-muted-foreground mb-6">
                    Discover all the loan types we offer and find the perfect financial solution for your needs.
                  </p>
                  <Link href="/#services">
                    <Button variant="outline" className="gap-2">
                      View Services <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
