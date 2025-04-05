import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../styles/DesignApproval.css";

function DesignApproval() {
  const { designId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clientName = queryParams.get("clientName") || "Valued Client";
  const price = queryParams.get("price") || "Price not set";
  const customImageUrl = queryParams.get("imageUrl"); // e.g., "/AS_DESIGN.png"
  const [design, setDesign] = useState(null);
  const [error, setError] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const [shippingName, setShippingName] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCountry, setShippingCountry] = useState("US");
  const shippingCost = 7.99;
  const [totalPrice, setTotalPrice] = useState(null);

  const [declineName, setDeclineName] = useState("");
  const [declineEmail, setDeclineEmail] = useState("");
  const [declineFeedback, setDeclineFeedback] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [showDeclineForm, setShowDeclineForm] = useState(false);

  useEffect(() => {
    fetch(`/api/design/${designId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setDesign(data))
      .catch((err) => setError(err.message));
  }, [designId]);

  useEffect(() => {
    if (showPayPal && window.paypal) {
      const container = document.getElementById("paypal-button-container");
      container.innerHTML = "";
      const basePrice = parseFloat(price.replace(/[^0-9.]/g, ""));
      const finalAmount = (basePrice + shippingCost).toFixed(2);
      let countryCode = shippingCountry.trim().toUpperCase();
      if (countryCode.length !== 2) {
        countryCode = "US";
      }
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: { value: finalAmount },
              shipping: {
                name: { full_name: shippingName },
                address: {
                  address_line_1: shippingAddress,
                  admin_area_2: shippingCity, // City
                  admin_area_1: shippingState,
                  postal_code: shippingZip,
                  country_code: countryCode
                }
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        },
        onError: function (err) {
          console.error("PayPal Checkout onError", err);
        }
      }).render("#paypal-button-container");
    }
  }, [
    showPayPal,
    price,
    shippingName,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry
  ]);

  const handleApproveAndPay = () => {
    setShowShippingForm(true);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    let countryCode = shippingCountry.trim().toUpperCase();
    if (countryCode.length !== 2) {
      alert("Please enter a valid 2-letter country code (e.g., US).");
      return;
    }
    if (!shippingCity) {
      alert("Please enter your city.");
      return;
    }
    const basePrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    setTotalPrice((basePrice + shippingCost).toFixed(2));
    fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: shippingName,
        email: shippingEmail,
        message: `Shipping Information for Order ${designId}:
Name: ${shippingName}
Email: ${shippingEmail}
Address: ${shippingAddress}
City: ${shippingCity}
State: ${shippingState}
Zip: ${shippingZip}
Country: ${countryCode}`
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(() => {
        setShowShippingForm(false);
        setShowPayPal(true);
      })
      .catch(() => {
        setSubmitStatus("Failed to submit shipping information");
      });
  };

  const handleDecline = () => {
    setShowDeclineForm(true);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: declineName,
        email: declineEmail,
        message: `Design ID ${designId} was declined. Feedback: ${declineFeedback}`
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(() => {
        setSubmitStatus("Feedback submitted successfully");
        setShowDeclineForm(false);
      })
      .catch(() => {
        setSubmitStatus("Failed to submit feedback");
      });
  };

  if (error) return <div>Error: {error}</div>;
  if (!design)
    return (
      <div style={{ color: "white", padding: "20px" }}>
        Loading design...
      </div>
    );

  const displayImageUrl = customImageUrl ? customImageUrl : design.imageUrl;

  return (
    <div className="design-container">
      <h1 className="design-title">Design Approval</h1>
      <p className="design-description">Design mockup for {clientName}</p>
      <img
        src={displayImageUrl}
        alt="Design preview"
        style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
      />
      <p className="design-price" style={{ color: "white" }}>
        Price: {price}
      </p>
      <div className="button-container">
        <button className="design-button" onClick={handleApproveAndPay}>
          Approve &amp; Pay
        </button>
        <button className="design-button" onClick={handleDecline}>
          Decline
        </button>
      </div>
      {showShippingForm && (
        <form onSubmit={handleShippingSubmit} style={{ marginTop: "20px" }}>
          <h2 style={{ color: "white" }}>Shipping Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={shippingName}
            onChange={(e) => setShippingName(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={shippingEmail}
            onChange={(e) => setShippingEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="text"
            placeholder="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={shippingCity}
            onChange={(e) => setShippingCity(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="text"
            placeholder="State"
            value={shippingState}
            onChange={(e) => setShippingState(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={shippingZip}
            onChange={(e) => setShippingZip(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="text"
            placeholder="Country (2-letter code, e.g., US)"
            value={shippingCountry}
            onChange={(e) => setShippingCountry(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <p style={{ color: "white" }}>Shipping Cost: $7.99</p>
          <button type="submit" className="design-button" style={{ marginTop: "10px" }}>
            Submit Shipping Info
          </button>
        </form>
      )}
      {showPayPal && (
        <div id="paypal-button-container" style={{ marginTop: "20px" }}></div>
      )}
      {showDeclineForm && (
        <form onSubmit={handleFeedbackSubmit} style={{ marginTop: "20px" }}>
          <h2 style={{ color: "white" }}>Decline Feedback</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={declineName}
            onChange={(e) => setDeclineName(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={declineEmail}
            onChange={(e) => setDeclineEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <textarea
            placeholder="What do you not like about the design? What would you change?"
            value={declineFeedback}
            onChange={(e) => setDeclineFeedback(e.target.value)}
            style={{ width: "100%", height: "100px", marginBottom: "10px" }}
            required
          ></textarea>
          <button type="submit" className="design-button" style={{ marginTop: "10px" }}>
            Submit Feedback
          </button>
        </form>
      )}
      {submitStatus && (
        <p style={{ color: "white", marginTop: "20px" }}>{submitStatus}</p>
      )}
    </div>
  );
}

export default DesignApproval;

