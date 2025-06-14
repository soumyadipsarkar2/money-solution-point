"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What documents do I need to provide to apply for a loan?",
    answer:
      "Typically, the required documents include proof of identity, proof of income, bank statements, and other financial documents. The exact documents needed will be specified in the loan application checklist provided to you.",
  },
  {
    question: "How long does the loan approval process take?",
    answer:
      "Our loan approval process is designed to be efficient. Depending on the loan type and your documentation readiness, approvals can be as quick as 24-48 hours for some loans, while others may take 3-7 business days.",
  },
  {
    question: "What are the eligibility criteria for applying for a loan?",
    answer:
      "Eligibility criteria vary by loan type but generally include factors such as age (21-65 years), minimum income requirements, employment stability, credit score, and existing debt obligations. Our team can provide specific criteria for your desired loan type.",
  },
  {
    question: "How much can I borrow?",
    answer:
      "The loan amount you can borrow depends on several factors including your income, repayment capacity, credit history, and the type of loan you're applying for. We offer loans ranging from ₹1 lakh to ₹10 crores depending on these factors.",
  },
  {
    question: "What types of loans do you offer?",
    answer:
      "We offer a comprehensive range of loans including Home Loans, Project Loans, Loan Against Property (LAP), Personal & Business Loans, MSME Secured and Unsecured Loans, Education & New Car Loans, and special options for those with low CIBIL scores.",
  },
]

export default function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Got Questions?</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our FAQs Have You Covered</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Find answers to commonly asked questions about our loan services
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
