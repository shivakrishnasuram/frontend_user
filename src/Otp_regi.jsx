import axios from 'axios';
import React, { useState } from 'react';
import './Otp_regi.css';

function Otp_regi() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    async function handlesub(e) {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const res = await axios.post("http://localhost:5000/otp/send-otp", { email });
            console.log("OTP sent to:", email);
            console.log(res.data);
            setOtpSent(true);
            setMessage({ text: "OTP sent successfully! Check your email.", type: "success" });
        } catch (err) {
            console.error("Error sending OTP:", err);
            setMessage({ text: err.response?.data?.message || "Failed to send OTP", type: "error" });
        } finally {
            setLoading(false);
        }
    }

    async function handleOtp(e) {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const res = await axios.post("http://localhost:5000/otp/verify-otp", { email, otp });
            console.log("OTP verification result:", res.data);
            setMessage({ text: "OTP verification successful!", type: "success" });
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setMessage({ text: err.response?.data?.message || "Invalid OTP", type: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="otp-container">
            <div className="otp-card">
                <div className="otp-header">
                    <h2>Verify Your Account</h2>
                    <p>We'll send a verification code to confirm your identity</p>
                </div>

                {message.text && (
                    <div className={`otp-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <div className="otp-steps">
                    <div className={`otp-step ${!otpSent ? 'active' : 'completed'}`}>
                        <div className="step-number">1</div>
                        <div className="step-title">Enter Email</div>
                    </div>
                    <div className="step-connector"></div>
                    <div className={`otp-step ${otpSent ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <div className="step-title">Verify OTP</div>
                    </div>
                </div>

                {!otpSent ? (
                    <form onSubmit={handlesub} className="otp-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="otp-button"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleOtp} className="otp-form">
                        <div className="form-group">
                            <label htmlFor="otp">Verification Code</label>
                            <div className="otp-input-container">
                                <input
                                    id="otp"
                                    type="number"
                                    name="otp"
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    required
                                />
                            </div>
                            <div className="otp-resend">
                                Didn't receive the code?
                                <button
                                    type="button"
                                    className="resend-button"
                                    onClick={handlesub}
                                    disabled={loading}
                                >
                                    Resend
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="otp-button"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <button
                            type="button"
                            className="back-button"
                            onClick={() => setOtpSent(false)}
                        >
                            Back to Email
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Otp_regi;