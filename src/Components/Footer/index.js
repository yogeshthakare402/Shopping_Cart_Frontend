"use client"

import "./index.css"
import { Link } from "react-router-dom"
import { FaWhatsapp, FaPhone } from "react-icons/fa"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <Link to="/" className="footer-logo">
                        <h2>MegaMart</h2>
                    </Link>

                    <div className="contact-section">
                        <h3>Contact Us</h3>
                        <div className="contact-item">
                            <FaWhatsapp className="contact-icon" />
                            <div>
                                <p>Whats App</p>
                                <a href="tel:+1202-918-2132">+1 202-918-2132</a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <div>
                                <p>Call Us</p>
                                <a href="tel:+1202-918-2132">+1 202-918-2132</a>
                            </div>
                        </div>
                    </div>

                    <div className="download-section">
                        <h3>Download App</h3>
                        <div className="app-buttons">
                            <a href="#" className="app-button">
                                <img src="/app-store.png" alt="Download on App Store" />
                            </a>
                            <a href="#" className="app-button">
                                <img src="/play-store.png" alt="Get it on Google Play" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Most Popular Categories</h3>
                    <ul className="footer-links">
                        <li><Link to="/category/staples">Staples</Link></li>
                        <li><Link to="/category/beverages">Beverages</Link></li>
                        <li><Link to="/category/personal-care">Personal Care</Link></li>
                        <li><Link to="/category/home-care">Home Care</Link></li>
                        <li><Link to="/category/baby-care">Baby Care</Link></li>
                        <li><Link to="/category/vegetables-fruits">Vegetables & Fruits</Link></li>
                        <li><Link to="/category/snacks-foods">Snacks & Foods</Link></li>
                        <li><Link to="/category/dairy-bakery">Dairy & Bakery</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Customer Services</h3>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/e-waste-policy">E-waste Policy</Link></li>
                        <li><Link to="/cancellation-return">Cancellation & Return Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2022 All rights reserved. Reliance Retail Ltd.</p>
            </div>
        </footer>
    )
}

export default Footer 