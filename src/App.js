import React, { useState } from "react";
import axios from "axios";

function OTPGenerator() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateOtp = () => {
    if (!email.endsWith("@gitam.in")) {
      setMessage("Please enter a valid GITAM email address.");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000);
    sendOtpToEmail(newOtp);
  };

  const sendOtpToEmail = async (generatedOtp) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
        otp: generatedOtp,
      });

      if (response.status === 200) {
        setMessage("OTP sent successfully. Check your email.");
      } else {
        setMessage("Failed to send OTP. Try again.");
      }
    } catch (error) {
      setMessage("Error sending OTP. Check your email ID.");
    }
    
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Logo & Title Section */}
      <div style={styles.logoContainer}>
        <img src="VOTING.png" alt="GITAM Voting Wise" style={styles.logo} />
        <h2 style={styles.title}>GITAM Voting Wise</h2>
      </div>
      
      <div style={styles.card}>
        <input
          type="email"
          placeholder="Enter your Gitam Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button 
          onClick={generateOtp} 
          disabled={!email.endsWith("@gitam.in") || loading}
          style={styles.button}
        >
          {loading ? "Sending..." : "Generate OTP"}
        </button>

        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
}

// Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  logo: {
    width: "110px", // Adjust size as needed
    height: "auto",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#008423", // Green text
    marginTop: "10px",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "120px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "2px solid #008423",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    width: "80%",
    padding: "12px",
    backgroundColor: "#008423",
    color: "#ffffff",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default OTPGenerator;
