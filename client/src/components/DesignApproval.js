import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DesignApproval() {
  const { designId } = useParams();
  const [design, setDesign] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [feedback, setFeedback] = useState("");

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
        console.error("Error fetching design:", err);
        setError(err.message);
      });
  }, [designId]);

  if (error) return <div>Error: {error}</div>;
  if (!design) return <div>Loading design...</div>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Design Preview</h1>
      <img
        src={design.imageUrl}
        alt="Design preview"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p>{design.description}</p>
      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setResponse("approved")}>Approve</button>
        <button onClick={() => setResponse("declined")}>Decline</button>
      </div>
      {response === "declined" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Here you would normally send the feedback to your backend
            alert("Feedback submitted: " + feedback);
          }}
        >
          <textarea
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{ width: "100%", height: "100px" }}
          ></textarea>
          <button type="submit" style={{ marginTop: "10px" }}>
            Submit Feedback
          </button>
        </form>
      )}
      {response === "approved" && (
        <button
          onClick={() => {
            // Here you would trigger payment processing, for now just show an alert
            alert("Proceeding to payment");
          }}
          style={{ marginTop: "20px" }}
        >
          Proceed to Payment
        </button>
      )}
    </div>
  );
}

export default DesignApproval;


