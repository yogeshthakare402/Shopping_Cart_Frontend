"use client"

import "./index.css"
import { Link } from "react-router-dom"
import { FaGoogle, FaGithub, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa"
import { useState, useEffect } from "react"
import MobileLogin from "./MobileLogin"

function Login() {
    const [isMobile, setIsMobile] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        confirmPassword: "",
        verificationCode: "",
    })
    const [errors, setErrors] = useState({})
    const [isVerifying, setIsVerifying] = useState({ email: false, phone: false })

    useEffect(() => {
        // Add class when component mounts
        document.body.classList.add('login-page');

        // Check if mobile view should be shown
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        // Cleanup
        return () => {
            document.body.classList.remove('login-page')
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    if (isMobile) {
        return <MobileLogin />
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/
        return regex.test(phone)
    }

    const validatePassword = (password) => {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const newErrors = {}

        if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }
        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Handle login logic here
        console.log("Login attempt with:", { email: formData.email, password: formData.password })
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        const newErrors = {}

        if (!formData.fullName) {
            newErrors.fullName = "Full name is required"
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }
        if (!validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number"
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character"
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Handle registration logic here
        console.log("Register attempt with:", formData)
    }

    const sendVerificationCode = (type) => {
        setIsVerifying(prev => ({ ...prev, [type]: true }))
        // Simulate sending verification code
        console.log(`Sending verification code to ${type}:`, formData[type])
    }

    const verifyCode = (type) => {
        if (formData.verificationCode === "123456") { // Example verification code
            setIsVerifying(prev => ({ ...prev, [type]: false }))
            // Handle successful verification
            console.log(`${type} verified successfully`)
        } else {
            setErrors(prev => ({
                ...prev,
                verificationCode: "Invalid verification code"
            }))
        }
    }

    return (
        <div className="login-container">
            <div className={`card-wrapper ${isFlipped ? "is-flipped" : ""}`}>
                <div className="card-front">
                    <div className="login-content">
                        <div className="login-header">
                            <h2>Login</h2>
                        </div>

                        <form onSubmit={handleLoginSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="login-email">Email</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    placeholder="username@gmail.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? "error" : ""}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <input
                                    type="password"
                                    id="login-password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={errors.password ? "error" : ""}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                                <Link to="/forgot-password" className="forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type="submit" className="sign-in-button">
                                Sign in
                            </button>

                            <div className="divider">
                                <span>or continue with</span>
                            </div>

                            <div className="social-login">
                                <button type="button" className="social-button google">
                                    <FaGoogle />
                                </button>
                                <button type="button" className="social-button github">
                                    <FaGithub />
                                </button>
                                <button type="button" className="social-button facebook">
                                    <FaFacebook />
                                </button>
                            </div>

                            <p className="register-prompt">
                                Don't have an account yet?{" "}
                                <button
                                    type="button"
                                    className="register-link"
                                    onClick={() => setIsFlipped(true)}
                                >
                                    Register for free
                                </button>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="card-back">
                    <div className="login-content">
                        <div className="login-header">
                            <h2>Register</h2>
                        </div>

                        <form onSubmit={handleRegisterSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={errors.fullName ? "error" : ""}
                                />
                                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="register-email">Email</label>
                                <div className="input-with-button">
                                    <input
                                        type="email"
                                        id="register-email"
                                        name="email"
                                        placeholder="username@gmail.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={errors.email ? "error" : ""}
                                    />
                                    <button
                                        type="button"
                                        className="verify-button"
                                        onClick={() => sendVerificationCode("email")}
                                    >
                                        <FaEnvelope />
                                    </button>
                                </div>
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <div className="input-with-button">
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="1234567890"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={errors.phone ? "error" : ""}
                                    />
                                    <button
                                        type="button"
                                        className="verify-button"
                                        onClick={() => sendVerificationCode("phone")}
                                    >
                                        <FaPhone />
                                    </button>
                                </div>
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            {(isVerifying.email || isVerifying.phone) && (
                                <div className="form-group">
                                    <label htmlFor="verificationCode">Verification Code</label>
                                    <div className="input-with-button">
                                        <input
                                            type="text"
                                            id="verificationCode"
                                            name="verificationCode"
                                            placeholder="Enter 6-digit code"
                                            value={formData.verificationCode}
                                            onChange={handleInputChange}
                                            className={errors.verificationCode ? "error" : ""}
                                        />
                                        <button
                                            type="button"
                                            className="verify-button"
                                            onClick={() => verifyCode(isVerifying.email ? "email" : "phone")}
                                        >
                                            Verify
                                        </button>
                                    </div>
                                    {errors.verificationCode && (
                                        <span className="error-message">{errors.verificationCode}</span>
                                    )}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="register-password">Password</label>
                                <input
                                    type="password"
                                    id="register-password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={errors.password ? "error" : ""}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={errors.confirmPassword ? "error" : ""}
                                />
                                {errors.confirmPassword && (
                                    <span className="error-message">{errors.confirmPassword}</span>
                                )}
                            </div>

                            <button type="submit" className="sign-in-button">
                                Register
                            </button>

                            <p className="register-prompt">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="register-link"
                                    onClick={() => setIsFlipped(false)}
                                >
                                    Login here
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <div className="login-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>
        </div>
    )
}

export default Login 