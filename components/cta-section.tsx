"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ContactForm from "./contact-form"

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Financial Support
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get the Financial Support You Need
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a wide range of financial solutions to help you achieve your goals. Fill out the form and our experts will get back to you.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <ContactForm 
            submitEndpoint="/api/financial-support/submit"
            showLoanFields={true}
          />
        </div>
      </div>
    </section>
  )
}
