import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/DesignApproval.css";
import Payment from "./Payment";

function DesignApproval() {
  const { designId } = useParams();
  const [design, setDesign] = useState(null);
  const [error, setError] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    fetch(`/design/${designId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDesign(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [designId]);

  const handleDecline = () => {
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Design Declined",
        email: "N/A",
        message: `Design ID ${designId} was declined. Feedback: ${feedback}`
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        setSubmitStatus("Feedback submitted successfully");
        setShowFeedbackForm(false);
      })
      .catch((err) => {
        setSubmitStatus("Failed to submit feedback");
      });
  };

  if (error) return <div>Error: {error}</div>;
  if (!design) return <div style={{ color: "white", padding: "20px" }}>Loading design...</div>;

  return (
    <div className="design-container">
      <h1 className="design-title">Design Preview</h1>
      <img
        src={design.imageUrl}
        alt="Design preview"
        style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
      />
      <p className="design-description">{design.description}</p>
      <div className="button-container">
        <button className="design-button" onClick={() => alert("Design approved, proceeding to payment")}>
          Approve &amp; Pay
        </button>
        <button className="design-button" onClick={handleDecline}>
          Decline
        </button>
      </div>
      {showFeedbackForm && (
        <form onSubmit={handleFeedbackSubmit} style={{ marginTop: "20px", width: "100%" }}>
          <textarea
            placeholder="Enter changes and additional details..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{ width: "100%", height: "100px" }}
          ></textarea>
          <button type="submit" className="design-button" style={{ marginTop: "10px" }}>
            Submit Feedback
          </button>
        </form>
      )}
      {submitStatus && <p style={{ color: "white", marginTop: "20px" }}>{submitStatus}</p>}
    </div>
  );
}

export default DesignApproval;

