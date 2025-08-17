# Money Solution Point 💰

A comprehensive financial services and loan management platform built with Next.js, offering various loan types with competitive interest rates and streamlined application processes.

## 🌟 Features

### Core Functionality
- **Multi-Loan Platform**: Home loans, Personal loans, Business loans, MSME loans, Project loans, and Loan Against Property
- **EMI Calculator**: Interactive tool to calculate loan EMIs and plan repayments
- **File Upload System**: Multi-file upload functionality for loan applications
- **Progress Tracking**: Real-time loan application progress monitoring
- **Contact Management**: Integrated contact forms and WhatsApp integration

### User Experience
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Dark/Light Theme**: Theme switching with system preference detection
- **Multi-language Support**: Hindi and English content support
- **Accessibility**: WCAG compliant components with keyboard navigation

### Business Features
- **Loan Application Workflow**: Streamlined application process with step-by-step guidance
- **Document Management**: Secure file upload and storage system
- **Email Notifications**: Automated email templates for customer communication
- **Google Drive Integration**: Cloud storage for document management

## 🚀 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **Vercel Blob** - File storage and management
- **Google APIs** - Drive integration for document storage
- **Resend** - Email service for notifications

### Development Tools
- **pnpm** - Fast package manager
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Tailwind CSS Animate** - Smooth animations

## 📁 Project Structure

```
money-solution-point/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── components/        # App-specific components
│   ├── loans/            # Loan type pages
│   └── globals.css       # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── [feature].tsx     # Feature-specific components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── styles/                # Additional styling
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm 8+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd money-solution-point
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # Vercel Blob
   BLOB_READ_WRITE_TOKEN=your_blob_token
   
   # Google Drive API
   GOOGLE_CLIENT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY=your_private_key
   GOOGLE_DRIVE_FOLDER_ID=your_folder_id
   
   # Email Service
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## 🎯 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🏦 Loan Types Supported

### 1. Home Loan
- Property purchase, construction, and renovation
- Competitive interest rates
- Flexible repayment options

### 2. Personal & Business Loan
- Quick disbursement
- Minimal documentation
- No collateral required (for eligible applicants)

### 3. MSME Loans
- Secured and unsecured options
- Business growth funding
- Tailored repayment schedules

### 4. Project Loan
- Project-specific funding
- Milestone-based disbursement
- Business expansion support

### 5. Loan Against Property (LAP)
- Property-backed financing
- Lower interest rates
- Higher loan amounts

### 6. Education & Car Loans
- Student financing solutions
- Vehicle purchase support
- Competitive rates

## 🔧 Key Components

### Core Components
- **HeroSection** - Main landing section with video showcase
- **ServicesGrid** - Loan services overview
- **EmiCalculator** - Interactive EMI calculation tool
- **MultiFileUpload** - File upload system for applications
- **StepProgress** - Application progress tracking
- **ContactForm** - Customer inquiry management

### UI Components
- **ThemeProvider** - Dark/light theme management
- **Header/Footer** - Navigation and site information
- **WhatsAppButton** - Direct customer support integration
- **Responsive Design** - Mobile-first approach

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:
- Responsive breakpoints for all screen sizes
- Touch-friendly interface elements
- Optimized mobile navigation
- Progressive Web App features

## 🌐 Internationalization

- Multi-language support (English/Hindi)
- Culturally appropriate content
- Localized loan information
- Regional compliance features

## 🔒 Security Features

- Secure file upload validation
- API route protection
- Environment variable management
- HTTPS enforcement in production

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **AWS**: Use with custom server configuration
- **Docker**: Containerized deployment option

## 📊 Performance

- **Next.js 15** optimizations
- **Image optimization** with Next.js Image component
- **Code splitting** for better loading times
- **Lazy loading** for non-critical components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries:
- **Website**: [Money Solution Point](https://moneysolutionpoint.com)
- **Email**: Contact through the website form
- **WhatsApp**: Direct integration available on the site

## 🔮 Future Enhancements

- **AI-powered loan recommendations**
- **Blockchain-based document verification**
- **Mobile app development**
- **Advanced analytics dashboard**
- **Integration with banking APIs**

---

**Built with ❤️ using Next.js and modern web technologies**