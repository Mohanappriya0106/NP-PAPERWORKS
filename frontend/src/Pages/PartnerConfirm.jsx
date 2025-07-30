import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PartnerConfirm = () => {
  const [partnerName, setPartnerName] = useState("");
  const [initiatorName, setInitiatorName] = useState("");
  const [date, setDate] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(true);

  const certificateRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPartnerName(params.get("partnerName") || "");
    setInitiatorName(params.get("initiatorName") || "");
    setDate(params.get("date") || "");
  }, []);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerName, initiatorName, date }),
      });

      const data = await res.json();
      if (res.ok) {
        setConfirmed(true);
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (error) {
      alert("Network error");
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setShowHearts(false);
    certificateRef.current.scrollIntoView({ behavior: "smooth" });
    await new Promise((res) => setTimeout(res, 500));

    try {
      const canvas = await html2canvas(certificateRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("certificate-of-love.pdf");
    } catch (error) {
      alert("Download failed. Try again.");
      console.error("PDF error:", error);
    }

    setShowHearts(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4"
      style={{
        backgroundColor: "#fff4f4",
        fontFamily: "Georgia, serif",
      }}
    >
      {showHearts && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute text-xl animate-bounce"
              style={{
                color: "#fecdd3",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              💖
            </span>
          ))}
        </div>
      )}

      {!confirmed ? (
        <div
          className="p-8 rounded-2xl shadow-2xl max-w-md text-center z-10 border"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#f9a8d4",
            fontFamily: "Georgia, serif",
            color: "#4b3832",
            fontStyle: "italic",
          }}
        >
          <h2 style={{ color: "#ec4899", marginBottom: "1rem" }}>
            "True love begins when two hearts say yes at the same time."
          </h2>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#be185d", marginBottom: "1rem" }}>
            💌 Hey {partnerName}!
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#374151" }}>
            <strong>{initiatorName}</strong> wants to make your bond official on{" "}
            <strong>{date}</strong>! 💍
          </p>
          <button
            onClick={handleAccept}
            disabled={loading}
            style={{
              backgroundColor: "#ec4899",
              color: "#fff",
              padding: "0.5rem 1.5rem",
              borderRadius: "9999px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Confirming..." : "I Accept 💖"}
          </button>
        </div>
      ) : (
        <>
          <div
            ref={certificateRef}
            style={{
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/4/47/Old_paper_texture_background.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              border: "4px solid #f472b6",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "#4b3832",
              padding: "3rem",
              borderRadius: "1rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              width: "100%",
              maxWidth: "960px",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#ec4899", marginBottom: "1rem" }}>
              💞 Certificate of Eternal Love 💞
            </h2>
            <p style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
              This certifies that{" "}
              <span style={{ fontWeight: "600", color: "#db2777" }}>{initiatorName}</span> and{" "}
              <span style={{ fontWeight: "600", color: "#db2777" }}>{partnerName}</span> have officially
              committed their hearts on <span style={{ color: "#f472b6" }}>{date}</span>.
            </p>
            <p style={{ marginTop: "2rem", fontSize: "0.9rem", fontStyle: "italic", color: "#6b7280" }}>
              “Two souls, one bond, one beautiful journey together.” 💑
            </p>
          </div>

          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#a855f7",
              color: "#fff",
              padding: "0.5rem 2rem",
              borderRadius: "9999px",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              fontStyle: "normal",
            }}
          >
            Download Certificate 📜
          </button>
        </>
      )}
    </div>
  );
};

export default PartnerConfirm;

