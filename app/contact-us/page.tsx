"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, CheckCircle } from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/gallery/ram-navami.jpg"
            alt="Contact Us Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Stay Connected</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl">
              We'd love to hear from you! Reach out to our team for any questions, concerns, or to schedule a
              consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">
                        664/2, Mangal Pandey Nagar,
                        <br />
                        Near Sapna Hospital, Meerut-
                        <br />
                        250003
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <Link href="tel:+918057348348" className="text-muted-foreground hover:text-primary">
                        +91-8057348348
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <Link
                        href="mailto:moneysolutionpoint2004@gmail.com"
                        className="text-muted-foreground hover:text-primary"
                      >
                        moneysolutionpoint2004@gmail.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 10:00 AM - 7:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                <div className="flex gap-4">
                  <Link
                    href="https://www.facebook.com/moneysolutionpoint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/moneysolutionpoint"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ContactForm 
                    submitEndpoint="/api/financial-support/submit"
                    showLoanFields={true}
                  />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>We'll get back to you within 24 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Find Us</h2>
            <p className="text-muted-foreground mt-2">Visit our office for in-person consultations</p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.9714663606365!2d77.7031!3d28.9844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c7b8f2bffffff%3A0xbfffffffff!2sMoney%20Solution%20Point!5e0!3m2!1sen!2sin!4v1623456789012!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Money Solution Point Office Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}
