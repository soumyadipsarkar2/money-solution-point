import type * as React from "react"

interface CTAEmailTemplateProps {
  name: string
  email: string
  phone: string
  loanType: string
  loanAmount: string
  message?: string
  submissionId: string
}

export const CTAEmailTemplate: React.FC<Readonly<CTAEmailTemplateProps>> = ({
  name,
  email,
  phone,
  loanType,
  loanAmount,
  message,
  submissionId,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    }}
  >
    {/* Header with Gradient */}
    <div
      style={{
        background: "linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #f97316 100%)",
        padding: "40px 24px",
        textAlign: "center",
        color: "white",
        position: "relative",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "-10px",
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
        }}
      ></div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          height: "80px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          marginBottom: "20px",
          border: "3px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <h1
        style={{
          margin: "0 0 12px 0",
          fontSize: "32px",
          fontWeight: "bold",
          letterSpacing: "-0.025em",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        🎯 New Lead Inquiry
      </h1>
      <p
        style={{
          margin: "0",
          fontSize: "18px",
          opacity: "0.95",
          fontWeight: "500",
        }}
      >
        Financial Support Request
      </p>
    </div>

    {/* Submission ID Badge */}
    <div
      style={{
        padding: "24px 24px 0 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          color: "#92400e",
          padding: "10px 20px",
          borderRadius: "25px",
          fontSize: "14px",
          fontWeight: "700",
          border: "2px solid #fcd34d",
          boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)",
        }}
      >
        🆔 Inquiry ID: {submissionId}
      </div>
    </div>

    {/* Main Content */}
    <div style={{ padding: "32px 24px" }}>
      {/* Customer Details Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2
          style={{
            margin: "0 0 24px 0",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#1f2937",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)",
              borderRadius: "50%",
              marginRight: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(124, 45, 18, 0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          👤 Customer Information
        </h2>

        <div style={{ display: "grid", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "2px solid #e5e7eb",
            }}
          >
            <span style={{ fontWeight: "600", color: "#374151", fontSize: "16px" }}>📝 Full Name:</span>
            <span style={{ color: "#1f2937", fontSize: "16px", fontWeight: "500" }}>{name}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "2px solid #e5e7eb",
            }}
          >
            <span style={{ fontWeight: "600", color: "#374151", fontSize: "16px" }}>📧 Email:</span>
            <span style={{ color: "#1f2937", fontSize: "16px", fontWeight: "500" }}>{email}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
            }}
          >
            <span style={{ fontWeight: "600", color: "#374151", fontSize: "16px" }}>📱 Phone:</span>
            <span style={{ color: "#1f2937", fontSize: "16px", fontWeight: "500" }}>{phone}</span>
          </div>
        </div>
      </div>

      {/* Loan Requirements Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid #a7f3d0",
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.1)",
        }}
      >
        <h2
          style={{
            margin: "0 0 24px 0",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#1f2937",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
              borderRadius: "50%",
              marginRight: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(5, 150, 105, 0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          💰 Loan Requirements
        </h2>

        <div style={{ display: "grid", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "2px solid #a7f3d0",
            }}
          >
            <span style={{ fontWeight: "600", color: "#374151", fontSize: "16px" }}>🏷️ Loan Type:</span>
            <span
              style={{
                background: "linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)",
                color: "white",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "700",
                boxShadow: "0 2px 6px rgba(124, 45, 18, 0.3)",
              }}
            >
              {loanType.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
            }}
          >
            <span style={{ fontWeight: "600", color: "#374151", fontSize: "16px" }}>💵 Loan Amount:</span>
            <span
              style={{
                color: "#059669",
                fontSize: "20px",
                fontWeight: "bold",
                textShadow: "0 1px 2px rgba(5, 150, 105, 0.2)",
              }}
            >
              ₹{Number.parseInt(loanAmount).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Message Section */}
      {message && (
        <div
          style={{
            background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)",
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "32px",
            border: "2px solid #fde047",
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "18px",
              fontWeight: "700",
              color: "#374151",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "8px", fontSize: "20px" }}>💬</span>
            Additional Message:
          </h3>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #fbbf24",
            }}
          >
            <p
              style={{
                margin: "0",
                color: "#1f2937",
                lineHeight: "1.6",
                fontStyle: "italic",
                fontSize: "16px",
              }}
            >
              "{message}"
            </p>
          </div>
        </div>
      )}

      {/* Action Required Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "32px",
          border: "2px solid #fca5a5",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(239, 68, 68, 0.1)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
            borderRadius: "50%",
            marginBottom: "16px",
            boxShadow: "0 6px 16px rgba(220, 38, 38, 0.3)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          🚨 Action Required
        </h3>
        <p
          style={{
            margin: "0 0 20px 0",
            color: "#6b7280",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          Customer is waiting for financial support. Please contact them as soon as possible.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={`tel:${phone}`}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
              transition: "transform 0.2s",
            }}
          >
            📞 Call Now
          </a>
          <a
            href={`mailto:${email}`}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(124, 45, 18, 0.3)",
              transition: "transform 0.2s",
            }}
          >
            ✉️ Send Email
          </a>
        </div>
      </div>

      {/* Timestamp */}
      <div
        style={{
          textAlign: "center",
          padding: "24px",
          background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
          borderRadius: "12px",
          border: "2px solid #e5e7eb",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            color: "#6b7280",
            fontWeight: "500",
          }}
        >
          🕒 Inquiry submitted on{" "}
          <strong>
            {new Date().toLocaleString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Kolkata",
            })}
          </strong>
        </p>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
        padding: "32px 24px",
        textAlign: "center",
        color: "white",
      }}
    >
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        💼 Money Solution Point
      </h3>
      <p
        style={{
          margin: "0 0 20px 0",
          fontSize: "14px",
          opacity: "0.9",
          lineHeight: "1.5",
        }}
      >
        664/2, Mangal Pandey Nagar, Near Sapna Hospital, Meerut-250003
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          fontSize: "14px",
          opacity: "0.95",
          flexWrap: "wrap",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          📞 <strong>+91-8057348348</strong>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          ✉️ <strong>moneysolutionpoint2004@gmail.com</strong>
        </span>
      </div>
    </div>
  </div>
)
