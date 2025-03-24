import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      {showIntro ? (
        <video
          className="intro-video"
          autoPlay
          muted
          onEnded={() => setShowIntro(false)}
        >
          <source src="/intro_vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          <div className="hamburger" onClick={() => setShowContact(!showContact)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          {showContact && (
            <div className="contact-popup">
              <p className="contact-heading">Contact:</p>
              <p>
                <a
                  href="https://www.instagram.com/kairos_customs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Instagram - Kairos_Customs
                </a>
              </p>
              <p>
                <a
                  href="mailto:customskairos@gmail.com"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Email - customskairos@gmail.com
                </a>
              </p>
            </div>
          )}
          <h1 className="home-title">Kairos Customs</h1>
          <p className="home-subtitle">Hand Painted Hoodies</p>
          <div className="buttons-container">
            <button className="home-button" onClick={() => navigate("/gallery")}>
              Gallery
            </button>
            <button className="home-button" onClick={() => navigate("/request")}>
              Request
            </button>
            <button
              className="home-button"
              onClick={() =>
                window.open(
                  "https://mixam.com/print-on-demand/6772231c4ee31e3ccce9913f",
                  "_blank"
                )
              }
            >
              Magazine
            </button>
          </div>
          <img src="/home_left.png" alt="Left Hoodie" className="left-image" />
          <img src="/home_right.png" alt="Right Hoodie" className="right-image" />
        </>
      )}
    </div>
  );
}

export default Home;

