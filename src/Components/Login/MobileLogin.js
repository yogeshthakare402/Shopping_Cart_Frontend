"use client"

import "./mobileLogin.css"
import { useState } from "react"
import { FaGoogle, FaGithub, FaFacebook, FaEnvelope, FaPhone, FaTimes, FaArrowLeft } from "react-icons/fa"

function MobileLogin() {
    const [activeView, setActiveView] = useState('login') // login, register, verification
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        confirmPassword: "",
        verificationCode: "",
    })
    const [errors, setErrors] = useState({})
    const [verifyingField, setVerifyingField] = useState("")

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
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const newErrors = {}

        if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid email"
        }
        if (!formData.password) {
            newErrors.password = "Required"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Handle login logic here
        console.log("Login:", { email: formData.email, password: formData.password })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        const newErrors = {}

        if (!formData.fullName) {
            newErrors.fullName = "Required"
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid email"
        }
        if (!validatePhone(formData.phone)) {
            newErrors.phone = "Invalid phone"
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = "Password too weak"
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Handle registration logic here
        console.log("Register:", formData)
    }

    const sendVerificationCode = (field) => {
        setVerifyingField(field)
        setActiveView('verification')
        // Simulate sending verification code
        console.log(`Sending code to ${field}:`, formData[field])
    }

    const handleVerification = (e) => {
        e.preventDefault()
        if (formData.verificationCode === "123456") { // Example verification
            setActiveView('register')
            setVerifyingField("")
        } else {
            setErrors({ verificationCode: "Invalid code" })
        }
    }

    const renderLoginView = () => (
        <div className="mobile-view">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="mobile-form">
                <div className="mobile-input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="mobile-input-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? "error" : ""}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <button type="submit" className="mobile-submit-btn">
                    Login
                </button>

                <div className="mobile-social-login">
                    <button type="button" className="mobile-social-btn google">
                        <FaGoogle />
                    </button>
                    <button type="button" className="mobile-social-btn github">
                        <FaGithub />
                    </button>
                    <button type="button" className="mobile-social-btn facebook">
                        <FaFacebook />
                    </button>
                </div>

                <button
                    type="button"
                    className="mobile-switch-btn"
                    onClick={() => setActiveView('register')}
                >
                    Create Account
                </button>
            </form>
        </div>
    )

    const renderRegisterView = () => (
        <div className="mobile-view">
            <div className="mobile-header">
                <button
                    className="mobile-back-btn"
                    onClick={() => setActiveView('login')}
                >
                    <FaArrowLeft />
                </button>
                <h2>Register</h2>
            </div>

            <form onSubmit={handleRegister} className="mobile-form">
                <div className="mobile-input-group">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? "error" : ""}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="mobile-input-group">
                    <div className="mobile-input-with-button">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? "error" : ""}
                        />
                        <button
                            type="button"
                            className="mobile-verify-btn"
                            onClick={() => sendVerificationCode('email')}
                        >
                            <FaEnvelope />
                        </button>
                    </div>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="mobile-input-group">
                    <div className="mobile-input-with-button">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={errors.phone ? "error" : ""}
                        />
                        <button
                            type="button"
                            className="mobile-verify-btn"
                            onClick={() => sendVerificationCode('phone')}
                        >
                            <FaPhone />
                        </button>
                    </div>
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="mobile-input-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? "error" : ""}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="mobile-input-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={errors.confirmPassword ? "error" : ""}
                    />
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className="mobile-submit-btn">
                    Register
                </button>
            </form>
        </div>
    )

    const renderVerificationView = () => (
        <div className="mobile-view">
            <div className="mobile-header">
                <button
                    className="mobile-back-btn"
                    onClick={() => setActiveView('register')}
                >
                    <FaArrowLeft />
                </button>
                <h2>Verify {verifyingField}</h2>
            </div>

            <form onSubmit={handleVerification} className="mobile-form">
                <div className="mobile-input-group">
                    <input
                        type="text"
                        name="verificationCode"
                        placeholder="Enter 6-digit code"
                        value={formData.verificationCode}
                        onChange={handleInputChange}
                        className={errors.verificationCode ? "error" : ""}
                        maxLength={6}
                    />
                    {errors.verificationCode && <span className="error-text">{errors.verificationCode}</span>}
                </div>

                <button type="submit" className="mobile-submit-btn">
                    Verify
                </button>
            </form>
        </div>
    )

    return (
        <div className="mobile-container">
            {activeView === 'login' && renderLoginView()}
            {activeView === 'register' && renderRegisterView()}
            {activeView === 'verification' && renderVerificationView()}
        </div>
    )
}

export default MobileLogin 