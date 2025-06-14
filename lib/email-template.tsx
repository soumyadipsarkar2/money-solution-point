import * as React from 'react'

interface EmailTemplateProps {
  name: string
  email: string
  phone: string
  location: string
  loanAmount: string
  loanType: string
  message?: string
  googleDriveLink: string
  applicationId: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  location,
  loanAmount,
  loanType,
  message,
  googleDriveLink,
  applicationId,
}) => (
  <div style={{
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  }}>
    {/* Header */}
    <div style={{
      background: 'linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)',
      padding: '32px 24px',
      textAlign: 'center',
      color: 'white'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        marginBottom: '16px'
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      <h1 style={{
        margin: '0 0 8px 0',
        fontSize: '28px',
        fontWeight: 'bold',
        letterSpacing: '-0.025em'
      }}>
        New Loan Application
      </h1>
      <p style={{
        margin: '0',
        fontSize: '16px',
        opacity: '0.9'
      }}>
        Money Solution Point
      </p>
    </div>

    {/* Application ID Badge */}
    <div style={{
      padding: '24px 24px 0 24px',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'inline-block',
        backgroundColor: '#fef3c7',
        color: '#92400e',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        border: '1px solid #fbbf24'
      }}>
        Application ID: {applicationId}
      </div>
    </div>

    {/* Main Content */}
    <div style={{ padding: '32px 24px' }}>
      {/* Applicant Details */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#7c2d12',
            borderRadius: '50%',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          Applicant Information
        </h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Full Name:</span>
            <span style={{ color: '#1f2937', fontSize: '16px' }}>{name}</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Email:</span>
            <span style={{ color: '#1f2937', fontSize: '16px' }}>{email}</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Phone:</span>
            <span style={{ color: '#1f2937', fontSize: '16px' }}>{phone}</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Location:</span>
            <span style={{ color: '#1f2937', fontSize: '16px' }}>{location}</span>
          </div>
        </div>
      </div>

      {/* Loan Details */}
      <div style={{
        backgroundColor: '#f0f9ff',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #bae6fd'
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#0369a1',
            borderRadius: '50%',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          Loan Requirements
        </h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Loan Type:</span>
            <span style={{ 
              color: '#1f2937', 
              fontSize: '16px',
              backgroundColor: '#7c2d12',
              padding: '4px 12px',
              borderRadius: '16px',
              fontWeight: '600'
            }}>
              {loanType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#bae6fd' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Loan Amount:</span>
            <span style={{ 
              color: '#059669', 
              fontSize: '18px', 
              fontWeight: 'bold' 
            }}>
              ₹{parseInt(loanAmount).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Message */}
      {message && (
        <div style={{
          backgroundColor: '#fefce8',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #fde047'
        }}>
          <h3 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Additional Information:
          </h3>
          <p style={{
            margin: '0',
            color: '#1f2937',
            lineHeight: '1.6',
            fontStyle: 'italic'
          }}>
            "{message}"
          </p>
        </div>
      )}

      {/* Documents Section */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#7c2d12',
            borderRadius: '50%',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          Application Documents
        </h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', color: '#374151' }}>Documents Link:</span>
            <a 
              href={googleDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              View Documents
            </a>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <p style={{
          margin: '0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          Application submitted on {new Date().toLocaleString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
          })}
        </p>
      </div>
    </div>

    {/* Footer */}
    <div style={{
      backgroundColor: '#1f2937',
      padding: '24px',
      textAlign: 'center',
      color: 'white'
    }}>
      <h3 style={{
        margin: '0 0 12px 0',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        Money Solution Point
      </h3>
      <p style={{
        margin: '0 0 16px 0',
        fontSize: '14px',
        opacity: '0.8'
      }}>
        664/2, Mangal Pandey Nagar, Near Sapna Hospital, Meerut-250003
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        fontSize: '14px',
        opacity: '0.9'
      }}>
        <span>📞 +91-8057348348</span>
        <span>✉️ moneysolutionpoint2004@gmail.com</span>
      </div>
    </div>
  </div>
)
