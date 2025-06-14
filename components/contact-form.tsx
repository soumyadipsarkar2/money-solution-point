"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface ContactFormProps {
  title?: string
  description?: string
  submitEndpoint: string
  successMessage?: string
  showLoanFields?: boolean
}

export default function ContactForm({
  title = "Get Financial Support",
  description = "Fill out this quick form and we'll get back to you as soon as possible.",
  submitEndpoint,
  successMessage = "Your request has been submitted successfully. We'll get back to you soon.",
  showLoanFields = false
}: ContactFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    loanAmount: "",
    message: ""
  })
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formDataToSubmit = new FormData()
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSubmit.append(key, value)
        }
      })

      // Add default values for required fields if not present
      if (!formDataToSubmit.get('loanType')) {
        formDataToSubmit.append('loanType', 'General Inquiry')
      }
      if (!formDataToSubmit.get('loanAmount')) {
        formDataToSubmit.append('loanAmount', '0')
      }

      const response = await fetch(submitEndpoint, {
        method: 'POST',
        body: formDataToSubmit,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit request')
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        loanType: '',
        loanAmount: '',
        message: ''
      })

      toast({
        title: "Success",
        description: successMessage,
      })

      // Redirect to thank you page
      if (data.redirect) {
        window.location.href = data.redirect
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request'
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background rounded-xl shadow-lg p-6 md:p-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input 
                id="name" 
                name="name"
                placeholder="Enter your full name" 
                required 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="Enter your email" 
                required 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input 
                id="phone" 
                name="phone"
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Enter your phone number" 
                required 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            {showLoanFields && (
              <>
                <div className="grid gap-2">
                  <label
                    htmlFor="loan-type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Loan Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="loan-type"
                    name="loanType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    value={formData.loanType}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select loan type
                    </option>
                    <option value="home-loan">Home Loan</option>
                    <option value="project-loan">Project Loan</option>
                    <option value="lap">Loan Against Property</option>
                    <option value="personal-business">Personal & Business Loan</option>
                    <option value="msme-secured">MSME Secured Loan</option>
                    <option value="msme-unsecured">MSME Unsecured Loan</option>
                    <option value="education-car">Education & New Car Loan</option>
                    <option value="cda-cibil">CDA & Low CIBIL Score Loan</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="loan-amount"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Loan Amount Required (₹) <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="loan-amount" 
                    name="loanAmount"
                    type="number" 
                    placeholder="Enter loan amount" 
                    required 
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            <div className="grid gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Message (Optional)
              </label>
              <Textarea 
                id="message" 
                name="message"
                placeholder="Enter your message" 
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  )
} 