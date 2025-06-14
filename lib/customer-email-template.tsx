import type * as React from "react"

interface CustomerEmailTemplateProps {
  name: string
  loanType: string
  loanAmount: string
  submissionId: string
}

export const CustomerEmailTemplate: React.FC<Readonly<CustomerEmailTemplateProps>> = ({
  name,
  loanType,
  loanAmount,
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
    {/* Header */}
    <div
      style={{
        background: "linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #f97316 100%)",
        padding: "40px 24px",
        textAlign: "center",
        color: "white",
        position: "relative",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          width: "60px",
          height: "60px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-5px",
          left: "-5px",
          width: "30px",
          height: "30px",
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
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.09 0 2.13.2 3.1.56" />
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
        🎉 Thank You, {name}!
      </h1>
      <p
        style={{
          margin: "0",
          fontSize: "18px",
          opacity: "0.95",
          fontWeight: "500",
        }}
      >
        Your inquiry has been successfully received
      </p>
    </div>

    {/* Confirmation Badge */}
    <div
      style={{
        padding: "24px 24px 0 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          padding: "12px 24px",
          borderRadius: "25px",
          fontSize: "16px",
          fontWeight: "700",
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
        }}
      >
        ✅ Inquiry ID: {submissionId}
      </div>
    </div>

    {/* Main Content */}
    <div style={{ padding: "32px 24px" }}>
      {/* Welcome Message */}
      <div
        style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid #bae6fd",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: "0 0 16px 0",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          🙏 We're Here to Help You!
        </h2>
        <p
          style={{
            margin: "0",
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.6",
          }}
        >
          Thank you for choosing Money Solution Point for your financial needs. We've received your inquiry and our
          expert team is already working on finding the best loan solution for you.
        </p>
      </div>

      {/* Inquiry Summary */}
      <div
        style={{
          background: "linear-gradient(135d, #fef3c7 0%, #fde68a 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid #fbbf24",
        }}
      >
        <h3
          style={{
            margin: "0 0 20px 0",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1f2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ marginRight: "8px", fontSize: "24px" }}>📋</span>
          Your Inquiry Summary
        </h3>

        <div style={{ display: "grid", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "10px",
              border: "1px solid #f59e0b",
            }}
          >
            <span style={{ fontWeight: "600", color: "#374151" }}>🏷️ Loan Type:</span>
            <span
              style={{
                background: "linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)",
                color: "white",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: "600",
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
              padding: "12px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "10px",
              border: "1px solid #f59e0b",
            }}
          >
            <span style={{ fontWeight: "600", color: "#374151" }}>💰 Amount:</span>
            <span
              style={{
                color: "#059669",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              ₹{Number.parseInt(loanAmount).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid #bbf7d0",
        }}
      >
        <h3
          style={{
            margin: "0 0 20px 0",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1f2937",
            textAlign: "center",
          }}
        >
          🚀 What Happens Next?
        </h3>

        <div style={{ display: "grid", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "12px",
              border: "1px solid #86efac",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              1
            </div>
            <div>
              <h4 style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#1f2937" }}>Review & Analysis</h4>
              <p style={{ margin: "0", fontSize: "14px", color: "#6b7280" }}>
                Our experts will review your requirements within 2-4 hours
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "12px",
              border: "1px solid #86efac",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              2
            </div>
            <div>
              <h4 style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#1f2937" }}>Personal Consultation</h4>
              <p style={{ margin: "0", fontSize: "14px", color: "#6b7280" }}>
                We'll call you to discuss the best loan options available
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "12px",
              border: "1px solid #86efac",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              3
            </div>
            <div>
              <h4 style={{ margin: "0 0 4px 0", fontWeight: "600", color: "#1f2937" }}>Quick Processing</h4>
              <p style={{ margin: "0", fontSize: "14px", color: "#6b7280" }}>
                Fast approval and documentation with minimal paperwork
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div
        style={{
          background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid #fca5a5",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          📞 Need Immediate Assistance?
        </h3>
        <p
          style={{
            margin: "0 0 20px 0",
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Our customer support team is available to help you
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
            href="tel:+918057348348"
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
            }}
          >
            📞 +91-8057348348
          </a>
          <a
            href="https://wa.me/918057348348"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
            }}
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* Trust Indicators */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid #e2e8f0",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            margin: "0 0 20px 0",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          🏆 Why Choose Us?
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#7c2d12", marginBottom: "4px" }}>4M+</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>Happy Customers</div>
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#7c2d12", marginBottom: "4px" }}>20+</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>Years Experience</div>
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#7c2d12", marginBottom: "4px" }}>100+</div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>Bank Partners</div>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
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
          🕒 Inquiry received on{" "}
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
        Your Trusted Financial Partner Since 2004
        <br />
        664/2, Mangal Pandey Nagar, Near Sapna Hospital, Meerut-250003
      </p>
      <div
        style={{
          fontSize: "14px",
          opacity: "0.95",
        }}
      >
        <p style={{ margin: "0" }}>
          📧 moneysolutionpoint2004@gmail.com | 📞 +91-8057348348
        </p>
      </div>
    </div>
  </div>
)
