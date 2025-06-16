"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, FileText, User, UserPlus, AlertCircle } from "lucide-react"
import MultiFileUpload from "@/components/multi-file-upload"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import UploadProgress from "@/components/UploadProgress"

const loanTypes = [
  {
    value: "home-loan",
    label: "Home Loan",
    image: "/public/home_loan.png",
  },
  {
    value: "project-loan",
    label: "Project Loan",
    image: "/images/project-loan.png",
  },
  {
    value: "lap",
    label: "Loan Against Property (LAP)",
    image: "/images/lap.png",
  },
  {
    value: "personal-business-loan",
    label: "Personal & Business Loan",
    image: "/images/personal-business-loan.png",
  },
  {
    value: "msme-secured-loan",
    label: "MSME Secured Loan",
    image: "/images/msme-secured-loan.png",
  },
  {
    value: "msme-unsecured-loan",
    label: "MSME Unsecured Loan",
    image: "/images/msme-unsecured-loan.png",
  },
  {
    value: "education-car-loan",
    label: "Education & New Car Loan",
    image: "/images/education-car-loan.png",
  },
  {
    value: "cda-low-cibil-loan",
    label: "CDA & Low CIBIL Score Loan",
    image: "/images/cda-low-cibil-loan.png",
  },
]

interface DocumentType {
  id: string;
  key: string;
  label: string;
  hindiLabel?: string;
  required?: boolean;
  name: string;
}

const documentTypes: DocumentType[] = [
  {
    id: "pan",
    key: "pan",
    label: "PAN Card",
    hindiLabel: "पैन कार्ड",
    required: true,
    name: "PAN Card"
  },
  {
    id: "aadhaar",
    key: "aadhaar",
    label: "Aadhaar Card",
    hindiLabel: "आधार कार्ड",
    required: true,
    name: "Aadhaar Card"
  },
  {
    id: "photos",
    key: "photos",
    label: "Photographs",
    hindiLabel: "फोटो",
    required: false,
    name: "Photographs"
  },
  {
    id: "bank_statement",
    key: "bank_statement",
    label: "Bank Statement",
    hindiLabel: "बैंक स्टेटमेंट",
    required: false,
    name: "Bank Statement"
  },
  {
    id: "itr",
    key: "itr",
    label: "ITR",
    hindiLabel: "आईटीआर",
    required: false,
    name: "ITR"
  },
  {
    id: "gst",
    key: "gst",
    label: "GST Returns",
    hindiLabel: "जीएसटी रिटर्न",
    required: false,
    name: "GST Returns"
  },
  {
    id: "loan_history",
    key: "loan_history",
    label: "Loan History",
    hindiLabel: "लोन इतिहास",
    required: false,
    name: "Loan History"
  },
  {
    id: "property_docs",
    key: "property_docs",
    label: "Property Documents",
    hindiLabel: "संपत्ति दस्तावेज",
    required: false,
    name: "Property Documents"
  },
  {
    id: "property_photos_and_videos",
    key: "property_photos_and_videos",
    label: "Property Photos and Videos",
    hindiLabel: "संपत्ति फोटो और वीडियो",
    required: false,
    name: "Property Photos and Videos"
  },
  {
    id: "other",
    key: "other",
    label: "Other Documents",
    hindiLabel: "अन्य दस्तावेज",
    required: false,
    name: "Other Documents"
  }
];

const coApplicantDocTypes: DocumentType[] = [
  {
    id: "co_pan",
    key: "co_pan",
    label: "PAN Card",
    hindiLabel: "पैन कार्ड",
    required: true,
    name: "PAN Card"
  },
  {
    id: "co_aadhaar",
    key: "co_aadhaar",
    label: "Aadhaar Card",
    hindiLabel: "आधार कार्ड",
    required: true,
    name: "Aadhaar Card"
  },
  {
    id: "co_photos",
    key: "co_photos",
    label: "Photographs",
    hindiLabel: "फोटो",
    required: false,
    name: "Photographs"
  },
  {
    id: "co_income",
    key: "co_income",
    label: "Income Proof",
    hindiLabel: "आय प्रमाण",
    required: false,
    name: "Income Proof"
  }
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  loanAmount: string;
  loanType: string;
  message: string;
  coName: string;
  coEmail: string;
  coPhone: string;
  coLocation: string;
  coIncome: string;
}

interface FieldNames {
  [key: string]: string;
}

interface DocNames {
  [key: string]: string;
}

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const loanTypeFromUrl = searchParams.get("type")
  const { toast } = useToast()
  const hasScrolled = useRef(false)

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    loanAmount: "",
    loanType: loanTypeFromUrl || "",
    message: "",
    coName: "",
    coEmail: "",
    coPhone: "",
    coLocation: "",
    coIncome: ""
  })

  const [documents, setDocuments] = useState<Record<string, File[]>>({})
  const [coApplicantDocuments, setCoApplicantDocuments] = useState<Record<string, File[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("applicant")
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const [docErrors, setDocErrors] = useState<Record<string, boolean>>({})
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [applicationNumber, setApplicationNumber] = useState<string>("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showProgress, setShowProgress] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (id: string, files: File[], isCoApplicant = false) => {
    // Only update state without uploading
    if (isCoApplicant) {
      setCoApplicantDocuments((prev) => ({ ...prev, [id]: files }));
    } else {
      setDocuments((prev) => ({ ...prev, [id]: files }));
    }
  };

  const uploadFilesToGoogleDrive = async (files: Record<string, File[]>, isCoApplicant = false) => {
    const uploadedFiles: Record<string, { name: string; webViewLink: string }[]> = {};
    
    for (const [docId, fileList] of Object.entries(files)) {
      if (fileList.length === 0) continue;
      
      const doc = isCoApplicant 
        ? coApplicantDocTypes.find(d => d.id === docId)
        : documentTypes.find(d => d.id === docId);
        
      if (!doc) continue;
      
      uploadedFiles[docId] = [];
      
      for (const file of fileList) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fileName', `${doc.name}-${file.name}`);
          formData.append('docType', docId);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }
          
          const data = await response.json();
          uploadedFiles[docId].push({
            name: file.name,
            webViewLink: data.webViewLink
          });
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          throw error;
        }
      }
    }
    
    return uploadedFiles;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validateAmount = (amount: string) => {
    return /^[0-9]+$/.test(amount) && parseInt(amount) > 0;
  };

  const validateForm = (isApplicant = true) => {
    try {
      const newFieldErrors: Record<string, boolean> = {}
      const newDocErrors: Record<string, boolean> = {}
      const errorMessages: string[] = []

      if (isApplicant) {
        // Required fields for applicant
        const requiredFields = ['name', 'email', 'phone', 'location', 'loanAmount', 'loanType']
        
        // Validate each field
        if (!formData.name) {
          newFieldErrors.name = true
          errorMessages.push("Please enter your full name")
        }
        
        if (!formData.email) {
          newFieldErrors.email = true
          errorMessages.push("Please enter your email address")
        } else if (!validateEmail(formData.email)) {
          newFieldErrors.email = true
          errorMessages.push("Please enter a valid email address")
        }
        
        if (!formData.phone) {
          newFieldErrors.phone = true
          errorMessages.push("Please enter your phone number")
        } else if (!validatePhone(formData.phone)) {
          newFieldErrors.phone = true
          errorMessages.push("Please enter a valid 10-digit phone number")
        }
        
        if (!formData.location) {
          newFieldErrors.location = true
          errorMessages.push("Please enter your location")
        }
        
        if (!formData.loanAmount) {
          newFieldErrors.loanAmount = true
          errorMessages.push("Please enter the loan amount")
        } else if (!validateAmount(formData.loanAmount)) {
          newFieldErrors.loanAmount = true
          errorMessages.push("Please enter a valid positive number for loan amount")
        }
        
        if (!formData.loanType) {
          newFieldErrors.loanType = true
          errorMessages.push("Please select a loan type")
        }

        // Required documents for applicant
        const requiredDocs = documentTypes.filter(doc => doc.required)
        for (const doc of requiredDocs) {
          if (!documents[doc.id] || documents[doc.id].length === 0) {
            newDocErrors[doc.id] = true
            errorMessages.push(`Please upload ${doc.label}`)
          }
        }
      } else {
        // Validate co-applicant details
        if (!formData.coName) {
          newFieldErrors.coName = true
          errorMessages.push("Please enter co-applicant's full name")
        }
        
        if (!formData.coEmail) {
          newFieldErrors.coEmail = true
          errorMessages.push("Please enter co-applicant's email address")
        } else if (!validateEmail(formData.coEmail)) {
          newFieldErrors.coEmail = true
          errorMessages.push("Please enter a valid email address for co-applicant")
        }
        
        if (!formData.coPhone) {
          newFieldErrors.coPhone = true
          errorMessages.push("Please enter co-applicant's phone number")
        } else if (!validatePhone(formData.coPhone)) {
          newFieldErrors.coPhone = true
          errorMessages.push("Please enter a valid 10-digit phone number for co-applicant")
        }
        
        if (!formData.coLocation) {
          newFieldErrors.coLocation = true
          errorMessages.push("Please enter co-applicant's location")
        }
        
        if (!formData.coIncome) {
          newFieldErrors.coIncome = true
          errorMessages.push("Please enter co-applicant's monthly income")
        } else if (!validateAmount(formData.coIncome)) {
          newFieldErrors.coIncome = true
          errorMessages.push("Please enter a valid positive number for co-applicant's income")
        }

        // Required documents for co-applicant
        const requiredDocs = coApplicantDocTypes.filter(doc => doc.required)
        for (const doc of requiredDocs) {
          if (!coApplicantDocuments[doc.id] || coApplicantDocuments[doc.id].length === 0) {
            newDocErrors[doc.id] = true
            errorMessages.push(`Please upload co-applicant's ${doc.label}`)
          }
        }
      }

      if (errorMessages.length > 0) {
        // Show a generic error message in the banner
        const genericMessage = isApplicant 
          ? "Please fill in all required fields in the Primary Applicant section"
          : "Please fill in all required fields in the Co-Applicant section"
        setError(genericMessage)
        
        // Show toast with the first error message
        toast({
          title: "Required Fields Missing",
          description: errorMessages[0],
          variant: "destructive",
        })
        
        setFieldErrors(newFieldErrors)
        setDocErrors(newDocErrors)
        
        // Find and scroll to the first error
        const firstErrorField = Object.keys(newFieldErrors)[0]
        const firstErrorDoc = Object.keys(newDocErrors)[0]
        
        if (firstErrorField) {
          const element = document.getElementById(firstErrorField)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            element.focus()
          }
        } else if (firstErrorDoc) {
          const element = document.getElementById(firstErrorDoc)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
        
        return false
      }

      setError(null)
      setFieldErrors({})
      setDocErrors({})
      return true
    } catch (err) {
      const errorMessage = 'An error occurred during form validation'
      setError(errorMessage)
      toast({
        title: "Validation Error",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }

  const isTabComplete = (tab: string) => {
    if (tab === 'applicant') {
      const requiredFields = ['name', 'email', 'phone', 'location', 'loanAmount', 'loanType']
      const requiredDocs = documentTypes.filter(doc => doc.required).map(doc => doc.id)
      
      const allFieldsFilled = requiredFields.every(field => formData[field as keyof FormData])
      const allDocsUploaded = requiredDocs.every(docId => documents[docId] && documents[docId].length > 0)
      
      return allFieldsFilled && allDocsUploaded
    } else if (tab === 'co-applicant') {
      const requiredFields = ['coName', 'coEmail', 'coPhone', 'coLocation', 'coIncome']
      const requiredDocs = coApplicantDocTypes.filter(doc => doc.required).map(doc => doc.id)
      
      const allFieldsFilled = requiredFields.every(field => formData[field as keyof FormData])
      const allDocsUploaded = requiredDocs.every(docId => coApplicantDocuments[docId] && coApplicantDocuments[docId].length > 0)
      
      return allFieldsFilled && allDocsUploaded
    }
    return false
  }

  const handleNext = async () => {
    if (!validateForm(true)) {
      return
    }
    setIsSubmitting(true)
    try {
      setActiveTab('co-applicant')
      setIsFormComplete(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to proceed to next step'
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

  const handleTabChange = (value: string) => {
    if (value === 'co-applicant') {
      if (!validateForm(true)) {
        // Find the first missing document and scroll to it
        const requiredDocs = documentTypes.filter(doc => doc.required)
        const missingDoc = requiredDocs.find(doc => !documents[doc.id] || documents[doc.id].length === 0)
        if (missingDoc) {
          const docElement = document.getElementById(missingDoc.id)
          if (docElement) {
            docElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
        return
      }
    }
    setActiveTab(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate applicant details
    if (!validateForm(true)) {
      return
    }

    // Validate co-applicant details
    if (!validateForm(false)) {
      return
    }

    setShowConfirmDialog(true)
  }

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false)
    setIsSubmitting(true)
    setError(null)
    setShowProgress(true)

    try {
      // First upload all files and get their metadata
      const applicantFileMetadata = await uploadFilesToGoogleDrive(documents)
      const coApplicantFileMetadata = await uploadFilesToGoogleDrive(coApplicantDocuments, true)
      
      const formDataToSubmit = new FormData()
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSubmit.append(key, value)
        }
      })

      // Append file metadata
      formDataToSubmit.append('applicantFileMetadata', JSON.stringify(applicantFileMetadata))
      formDataToSubmit.append('coApplicantFileMetadata', JSON.stringify(coApplicantFileMetadata))

      const response = await fetch('/api/loan/submit', {
        method: 'POST',
        body: formDataToSubmit,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application')
      }

      setApplicationNumber(data.applicationNumber)
      setIsSuccess(true)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application'
      setError(errorMessage)
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setShowProgress(false)
    }
  }

  // Handle auto-scroll when success state changes
  useEffect(() => {
    if (isSuccess && !hasScrolled.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      hasScrolled.current = true;
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 flex items-center justify-center">
        <Card className="w-full max-w-2xl border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-lg">Thank you for applying with Money Solution Point</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              Your loan application has been received. Our team will review your application and contact you shortly.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">Application Reference Number:</p>
              <p className="text-xl font-bold">{applicationNumber}</p>
            </div>
            <p className="text-muted-foreground">Please keep this reference number handy for future communications.</p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" onClick={() => (window.location.href = "/")}>
              Return to Home
            </Button>
            <p className="text-sm text-muted-foreground">
              If you have any questions, please contact us at +91-8057348348
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {isSubmitting && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-lg font-medium">Submitting your application...</p>
          </div>
        </div>
      )}
      
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your loan application? Please verify all information before proceeding.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSubmit}>
              Yes, Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="container px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Apply for a Loan</h1>
            <p className="mt-4 text-muted-foreground">Complete the application form below to start your loan process</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Loan Application Form</CardTitle>
              <CardDescription>Please provide your personal information and required documents</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <Tabs defaultValue="applicant" value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger 
                        value="applicant" 
                        className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                      >
                        <User className="h-4 w-4" />
                        <span>Primary Applicant</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="co-applicant" 
                        className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Co-Applicant Details</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="applicant" className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex flex-col">
                            <span>Full Name <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">पूरा नाम</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.name ? 'border-red-500' : ''}
                          />
                          {fieldErrors.name && (
                            <p className="text-sm text-red-500">Please enter your full name</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex flex-col">
                            <span>Email Address <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">ईमेल पता</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.email ? 'border-red-500' : ''}
                          />
                          {fieldErrors.email && (
                            <p className="text-sm text-red-500">
                              {!formData.email ? "Please enter your email address" : "Please enter a valid email address"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex flex-col">
                            <span>Phone Number <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">फोन नंबर</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.phone ? 'border-red-500' : ''}
                          />
                          {fieldErrors.phone && (
                            <p className="text-sm text-red-500">
                              {!formData.phone ? "Please enter your phone number" : "Please enter a valid 10-digit phone number"}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="flex flex-col">
                            <span>Location <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">स्थान</span>
                          </Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="Enter your city/location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.location ? 'border-red-500' : ''}
                          />
                          {fieldErrors.location && (
                            <p className="text-sm text-red-500">Please enter your location</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="loanAmount" className="flex flex-col">
                            <span>Loan Amount (₹) <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">ऋण राशि</span>
                          </Label>
                          <Input
                            id="loanAmount"
                            name="loanAmount"
                            type="number"
                            min="1"
                            placeholder="Enter loan amount"
                            value={formData.loanAmount}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.loanAmount ? 'border-red-500' : ''}
                          />
                          {fieldErrors.loanAmount && (
                            <p className="text-sm text-red-500">
                              {!formData.loanAmount ? "Please enter the loan amount" : "Please enter a valid positive number for loan amount"}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loanType" className="flex flex-col">
                            <span>Loan Type <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">ऋण प्रकार</span>
                          </Label>
                          <Select
                            value={formData.loanType}
                            onValueChange={(value) => handleSelectChange("loanType", value)}
                            defaultValue=""
                          >
                            <SelectTrigger className={fieldErrors.loanType ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select loan type" />
                            </SelectTrigger>
                            <SelectContent>
                              {loanTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldErrors.loanType && (
                            <p className="text-sm text-red-500">Please select a loan type</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="flex flex-col">
                          <span>Additional Information (Optional)</span>
                          <span className="text-muted-foreground text-xs">अतिरिक्त जानकारी (वैकल्पिक)</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Any specific requirements or questions?"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Required Documents</h3>
                        <div className="grid grid-cols-1 gap-6">
                          {documentTypes.map((doc) => (
                            <div key={doc.id} id={doc.id}>
                            <MultiFileUpload
                              id={doc.id}
                              label={doc.label}
                              hindiLabel={doc.hindiLabel}
                              required={doc.required}
                              onChange={(files) => handleFileChange(doc.id, files)}
                              maxFiles={doc.id === "property" ? 4 : 10}
                              accept={
                                doc.id === "property_photos_and_videos"
                                  ? "image/*,video/*,application/pdf"
                                  : "image/*,application/pdf"
                              }
                              initialFiles={documents[doc.id] || []}
                              error={docErrors[doc.id]}
                            />
                          </div>                          
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="co-applicant" className="space-y-6 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="coName" className="flex flex-col">
                            <span>Full Name <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">पूरा नाम</span>
                          </Label>
                          <Input
                            id="coName"
                            name="coName"
                            placeholder="Enter co-applicant's full name"
                            value={formData.coName}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.coName ? 'border-red-500' : ''}
                          />
                          {fieldErrors.coName && (
                            <p className="text-sm text-red-500">Please enter co-applicant's full name</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="coEmail" className="flex flex-col">
                            <span>Email Address <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">ईमेल पता</span>
                          </Label>
                          <Input
                            id="coEmail"
                            name="coEmail"
                            type="email"
                            placeholder="Enter co-applicant's email"
                            value={formData.coEmail}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.coEmail ? 'border-red-500' : ''}
                          />
                          {fieldErrors.coEmail && (
                            <p className="text-sm text-red-500">
                              {!formData.coEmail ? "Please enter co-applicant's email address" : "Please enter a valid email address for co-applicant"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="coPhone" className="flex flex-col">
                            <span>Phone Number <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">फोन नंबर</span>
                          </Label>
                          <Input
                            id="coPhone"
                            name="coPhone"
                            type="tel"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            placeholder="Enter co-applicant's phone number"
                            value={formData.coPhone}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.coPhone ? 'border-red-500' : ''}
                          />
                          {fieldErrors.coPhone && (
                            <p className="text-sm text-red-500">
                              {!formData.coPhone ? "Please enter co-applicant's phone number" : "Please enter a valid 10-digit phone number for co-applicant"}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="coLocation" className="flex flex-col">
                            <span>Location <span className="text-red-500">*</span></span>
                            <span className="text-muted-foreground text-xs">स्थान</span>
                          </Label>
                          <Input
                            id="coLocation"
                            name="coLocation"
                            placeholder="Enter co-applicant's city/location"
                            value={formData.coLocation}
                            onChange={handleInputChange}
                            required
                            className={fieldErrors.coLocation ? 'border-red-500' : ''}
                          />
                          {fieldErrors.coLocation && (
                            <p className="text-sm text-red-500">Please enter co-applicant's location</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coIncome" className="flex flex-col">
                          <span>Monthly Income (₹) <span className="text-red-500">*</span></span>
                          <span className="text-muted-foreground text-xs">मासिक आय</span>
                        </Label>
                        <Input
                          id="coIncome"
                          name="coIncome"
                          type="number"
                          min="1"
                          placeholder="Enter co-applicant's monthly income"
                          value={formData.coIncome}
                          onChange={handleInputChange}
                          required
                          className={fieldErrors.coIncome ? 'border-red-500' : ''}
                        />
                        {fieldErrors.coIncome && (
                          <p className="text-sm text-red-500">
                            {!formData.coIncome ? "Please enter co-applicant's monthly income" : "Please enter a valid positive number for co-applicant's income"}
                          </p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Required Documents</h3>
                        <div className="grid grid-cols-1 gap-6">
                          {coApplicantDocTypes.map((doc) => (
                            <div key={doc.id} id={doc.id}>
                            <MultiFileUpload
                              id={doc.id}
                              label={doc.label}
                              hindiLabel={doc.hindiLabel}
                              required={doc.required}
                              onChange={(files) => handleFileChange(doc.id, files, true)}
                              maxFiles={doc.id === "coProperty" ? 4 : 10}
                              accept="image/*,application/pdf"
                              initialFiles={coApplicantDocuments[doc.id] || []}
                              error={docErrors[doc.id]}
                            />
                          </div>                          
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              {activeTab === 'applicant' ? (
                <Button 
                  type="button" 
                  onClick={handleNext} 
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Add Co-Applicant <UserPlus className="h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <FileText className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By submitting this application, you agree to our{" "}
              <a href="/privacy-policy" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </a>{" "}
              and consent to the processing of your personal information.
            </p>
          </div>
        </div>
      </div>
      
      {showProgress && <UploadProgress />}
    </div>
  )
}
