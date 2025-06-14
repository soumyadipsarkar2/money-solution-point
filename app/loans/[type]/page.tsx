import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, FileText, ArrowRight } from "lucide-react"

// Define loan types and their details
const loanTypes = {
  "home-loan": {
    title: "Home Loan: Make Your Dream Residence a Reality",
    description:
      "A home loan is a financial product that helps you buy, build, or renovate a property. The lender (usually a bank or financial institution) provides you with the money, which you repay over time with interest. The property you purchase serves as collateral for the loan.",
    features: [
      "Competitive and Reasonably Priced Loan Rates - The Lowest Interest Rates",
      "Simple & Quick Process: Fast approval and little paperwork",
      "Adaptable Repayment Options: Practical EMI schedules tailored to your requirements",
      "Loans for All Needs: Refinance a current loan, build a home, or purchase a new property",
    ],
    whyChooseUs:
      "Years of working experience in the banking and financial industry makes them trustworthy and dependable.",
    documents: [
      { title: "Identity Proof", description: "PAN Card, Voter ID Card, Driving License" },
      {
        title: "Financial Documents",
        description:
          "Bank statements (last 3 months), salary slips (last 3 months), Income Tax Returns (last 2-3 years)",
      },
      { title: "Proof of Residence", description: "Utility bills, rental agreement, or property tax receipts" },
      { title: "Employment & Income Proof", description: "Employment certificate or appointment letter" },
      { title: "Property Documents", description: "Sale agreement, title deed, or NOC from builder (if applicable)" },
    ],
    image: "/home_loan.png"
  },
  "project-loan": {
    title: "Project Loan: Fund Your Growth Ambitions",
    description:
      "Project loans are designed to provide financial support for business expansion, new ventures, or specific projects. These loans offer tailored solutions to meet the unique requirements of your project's timeline and cash flow needs.",
    features: [
      "Flexible funding options for projects of all sizes",
      "Customized repayment schedules aligned with project milestones",
      "Competitive interest rates for optimal financial planning",
      "Quick approval process to keep your project on schedule",
    ],
    whyChooseUs:
      "Our expertise in project financing ensures you get the right funding structure that aligns with your project timeline and cash flow projections.",
    documents: [
      { title: "Project Proposal", description: "Detailed project plan with timelines and milestones" },
      { title: "Financial Projections", description: "Cash flow forecasts, profit & loss projections" },
      { title: "Business Documents", description: "Registration certificates, licenses, permits" },
      { title: "Collateral Details", description: "Property documents or other security details" },
      {
        title: "Personal & Business Financial Statements",
        description: "Bank statements, tax returns, balance sheets",
      },
    ],
    image: "/project_loan.png"
  },
  lap: {
    title: "Loan Against Property (LAP): Unlock Your Property's Value",
    description:
      "A Loan Against Property (LAP) allows you to leverage the value of your existing property to secure funds for various needs. This secured loan typically offers lower interest rates compared to unsecured loans, making it an attractive option for substantial funding requirements.",
    features: [
      "Higher loan amounts based on property valuation",
      "Lower interest rates compared to unsecured loans",
      "Longer repayment tenures for manageable EMIs",
      "Funds can be used for multiple purposes with no restrictions",
    ],
    whyChooseUs:
      "We offer transparent property valuation processes and help you maximize the loan amount while ensuring comfortable repayment terms.",
    documents: [
      { title: "Property Documents", description: "Title deed, property registration documents, tax receipts" },
      { title: "Identity & Address Proof", description: "PAN card, Aadhaar, voter ID, passport" },
      { title: "Income Documents", description: "Salary slips, bank statements, ITR for last 2-3 years" },
      { title: "Property Valuation Report", description: "Recent valuation certificate from approved valuers" },
      { title: "Legal Documents", description: "NOC from society, approved building plan, occupancy certificate" },
    ],
    image: "/loan_against_property.png"
  },
  "personal-business-loan": {
    title: "Personal & Business Loans: Quick Funds for Your Needs",
    description:
      "Whether you need funds for personal expenses or to fuel your business growth, our personal and business loans offer quick access to capital with minimal documentation and flexible repayment options.",
    features: [
      "Quick disbursement with minimal documentation",
      "No collateral required for eligible applicants",
      "Flexible loan amounts based on income and repayment capacity",
      "Competitive interest rates with transparent fee structure",
    ],
    whyChooseUs:
      "Our streamlined approval process ensures you get funds when you need them most, with personalized guidance throughout the application journey.",
    documents: [
      { title: "Identity & Address Proof", description: "PAN card, Aadhaar, voter ID" },
      { title: "Income Proof", description: "Salary slips, bank statements, ITR" },
      {
        title: "Business Documents (for business loans)",
        description: "Business registration, GST registration, business financials",
      },
      { title: "Bank Statements", description: "Last 6-12 months statements" },
      { title: "Proof of Continuity", description: "Employment certificate or business existence proof" },
    ],
    image: "/personal_business_loan.png"
  },
  "msme-secured-loan": {
    title: "MSME Secured Loan: Reliable Funding for Your Business",
    description:
      "MSME Secured Loans provide robust financial support for small and medium enterprises by offering larger loan amounts at competitive interest rates, using business or personal assets as collateral.",
    features: [
      "Higher loan amounts with longer repayment tenures",
      "Lower interest rates due to collateral security",
      "Funds for expansion, equipment purchase, or working capital",
      "Customized repayment options aligned with business cash flows",
    ],
    whyChooseUs:
      "We understand the unique challenges faced by MSMEs and offer tailored financial solutions that support sustainable growth while maintaining healthy cash flows.",
    documents: [
      { title: "Business Registration Documents", description: "MSME registration, incorporation documents" },
      { title: "Financial Statements", description: "Balance sheets, profit & loss statements for 2-3 years" },
      { title: "Tax Documents", description: "GST returns, ITR for business and promoters" },
      { title: "Collateral Documents", description: "Property papers, machinery ownership documents" },
      { title: "Business Plan", description: "Projection of fund utilization and expected returns" },
    ],
    image: "/msme_secured_loan.png"
  },
  "msme-unsecured-loan": {
    title: "MSME Unsecured Loan: Quick Business Funding Without Collateral",
    description:
      "MSME Unsecured Loans provide quick access to funds without requiring collateral, ideal for businesses needing immediate capital for operations, inventory, or short-term growth opportunities.",
    features: [
      "No collateral requirement - approval based on business performance",
      "Quick processing and disbursement for urgent needs",
      "Flexible loan amounts based on business turnover",
      "Short to medium-term tenure options",
    ],
    whyChooseUs:
      "Our expertise in MSME financing helps businesses access funds quickly when opportunities arise, with minimal documentation and hassle-free processing.",
    documents: [
      { title: "Business Proof", description: "MSME registration, shop establishment certificate" },
      { title: "Identity Documents", description: "PAN card, Aadhaar of proprietor/partners/directors" },
      { title: "Bank Statements", description: "Last 12 months business account statements" },
      { title: "Financial Documents", description: "ITR, GST returns, profit & loss statement" },
      { title: "Business Vintage Proof", description: "Utility bills, rent agreement of business premises" },
    ],
    image: "/msme_unsecured_loan.png"
  },
  "education-car-loan": {
    title: "Education & New Car Loans: Invest in Your Future",
    description:
      "Whether you're pursuing higher education or need a new vehicle, our specialized loans offer competitive terms and quick processing to help you achieve your goals without financial strain.",
    features: [
      "Competitive interest rates for both education and car loans",
      "Flexible repayment options including moratorium period for education loans",
      "Quick approval process with minimal documentation",
      "High loan-to-value ratio for car loans",
    ],
    whyChooseUs:
      "We offer specialized guidance for both education and car loans, ensuring you get terms that align with your future income potential and current financial situation.",
    documents: [
      { title: "For Education Loans", description: "Admission letter, course fee structure, academic records" },
      { title: "For Car Loans", description: "Vehicle quotation, driving license, car insurance details" },
      { title: "Identity & Address Proof", description: "PAN card, Aadhaar, voter ID" },
      { title: "Income Documents", description: "Salary slips, bank statements, ITR" },
      { title: "Co-applicant Documents", description: "Income proof and identity documents of co-applicant/guarantor" },
    ],
    image: "/education_car_loan.png"
  },
  "cda-low-cibil-loan": {
    title: "CDA & Low CIBIL Score Loans: Second Chance Financing",
    description:
      "Don't let a low credit score stop you from accessing financial support. Our specialized loans for individuals with low CIBIL scores or through Credit Default Arrangement (CDA) provide pathways to funding despite past credit challenges.",
    features: [
      "Loan options despite low credit scores or past defaults",
      "Reasonable interest rates considering risk factors",
      "Opportunity to rebuild credit history with timely repayments",
      "Flexible eligibility criteria focusing on current financial stability",
    ],
    whyChooseUs:
      "We believe in second chances and work with multiple lenders who specialize in providing loans to individuals with imperfect credit histories, focusing on your current financial situation rather than past challenges.",
    documents: [
      { title: "Identity & Address Proof", description: "PAN card, Aadhaar, voter ID" },
      { title: "Income Stability Proof", description: "Recent salary slips, employment certificate" },
      { title: "Bank Statements", description: "Last 6 months statements showing regular income" },
      { title: "Credit Report", description: "Current CIBIL report with score" },
      { title: "Additional Security", description: "Details of any collateral or guarantor if applicable" },
    ],
    image: "/cda_low_cibil_loan.png"
  },
}

export default function LoanDetailPage({ params }: { params: { type: string } }) {
  // Convert URL parameter to the format used in our data object
  const loanType = params.type.replace(/-/g, "-")

  // Check if the loan type exists in our data
  if (!loanTypes[loanType as keyof typeof loanTypes]) {
    return notFound()
  }

  const loan = loanTypes[loanType as keyof typeof loanTypes]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center bg-primary/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="w-full h-full">
            <Image
              src={loan.image}
              alt="Loan background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{loan.title}</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">{loan.description}</p>
            <div className="mt-8">
              <Link href="/apply">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-4">
                {loan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                <p className="text-muted-foreground mb-6">{loan.whyChooseUs}</p>
                <Link href="/about-us">
                  <Button variant="outline" className="w-full">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2 mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Documents Required</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Please keep these documents ready to ensure a smooth and quick loan approval process
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loan.documents.map((doc, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">{doc.title}</h3>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to apply? Our team is here to guide you through every step of the process.
            </p>
            <Link href="/apply">
              <Button className="gap-2">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
