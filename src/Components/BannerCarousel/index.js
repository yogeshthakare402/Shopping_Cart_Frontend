"use client"
import { useState, useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Button from "../Common/Button"
import "./index.css"

function BannerCarousel({ banners }) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="banner-carousel">
            <Button
                className="banner-nav prev"
                variant="outline"
                icon={<FaChevronLeft />}
                onClick={prevSlide}
            />

            <div
                className="banner-content"
                style={{ backgroundColor: banners[currentSlide].backgroundColor }}
            >
                <div className="banner-text">
                    <h2>{banners[currentSlide].title}</h2>
                    <h3>{banners[currentSlide].subtitle}</h3>
                    <div className="banner-discount">{banners[currentSlide].discount}</div>
                </div>
                <div className="banner-image">
                    <img
                        src={banners[currentSlide].image}
                        alt={banners[currentSlide].title}
                    />
                </div>
            </div>

            <Button
                className="banner-nav next"
                variant="outline"
                icon={<FaChevronRight />}
                onClick={nextSlide}
            />

            <div className="banner-dots">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`banner-dot ${index === currentSlide ? "active" : ""}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default BannerCarousel 