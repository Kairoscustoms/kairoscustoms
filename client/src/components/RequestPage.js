import React, { useState } from "react";
import "../styles/RequestPage.css";

function RequestPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showPricing, setShowPricing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    for (let i = 0; i < selectedFiles.length; i++) {
      form.append("images", selectedFiles[i]);
    }
    try {
      const response = await fetch("/send-email", {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        alert("Request submitted successfully!");
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Error submitting request.");
    }
  };

  return (
    <div className="request-container">
      <h1 className="request-title">Custom Order Request</h1>
      <form onSubmit={handleSubmit} className="request-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Describe your design request"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <input type="file" name="images" multiple onChange={handleFileChange} />
        <button type="submit" className="request-submit">Submit Request</button>
      </form>
      <button className="pricing-button" onClick={() => setShowPricing(!showPricing)}>
        Pricing Details
      </button>
      {showPricing && (
        <div className="pricing-details">
          <h2>Kairos Customs Pricing Details</h2>
          <p><strong>Base Price:</strong> $80</p>
          <p>(Includes: simple artwork on front or back, chest logo, small vinyl iron-on, hood text or logo)</p>
          <p><strong>Additional Cost:</strong></p>
          <ul>
            <li>Sleeve design: $5 per sleeve</li>
            <li>Large vinyl iron-on (big text or logo): $10</li>
            <li>Front + back artwork: $30</li>
            <li>Detailed or large artwork (e.g., people or intricate images): $20</li>
            <li>Specific blank over $40: (cost minus $40)</li>
          </ul>
        </div>
      )}
      <p className="request-info">
        We will review your request within 3-5 business days and email you a preview of your design and final pricing.
        Shipping is additional.
      </p>
    </div>
  );
}

export default RequestPage;

