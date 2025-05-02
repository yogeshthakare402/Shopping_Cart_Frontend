"use client"

import { useState, useEffect, useRef } from "react"
import { BiRupee } from "react-icons/bi"
import Rating from "../Rating/index"
import "./index.css"
import { CartState } from "../../Context/CartContext"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Button from "../Common/Button"
import ProductCard from "../ProductCard"

const banners = [
  {
    id: 1,
    title: "SMART WEARABLE",
    subtitle: "Best Deal Online on smart watches",
    discount: "UP to 80% OFF",
    image: "https://pngimg.com/uploads/smartwatch/smartwatch_PNG101814.png",
    backgroundColor: "#7986cb", // Light Indigo
  },
  {
    id: 2,
    title: "LATEST SMARTPHONES",
    subtitle: "New Arrivals with Amazing Deals",
    discount: "UP to 40% OFF",
    image: "https://pngimg.com/uploads/smartphone/smartphone_PNG101814.png",
    backgroundColor: "#4db6ac", // Light Teal
  },
  {
    id: 3,
    title: "PREMIUM LAPTOPS",
    subtitle: "Work & Gaming Laptops",
    discount: "UP to 30% OFF",
    image: "https://pngimg.com/uploads/laptop/laptop_PNG101814.png",
    backgroundColor: "#a1887f", // Light Brown
  },
];




function ProductCarousel() {
  const {
    state: { products, cart },
    dispatch,
  } = CartState()
  const [currentBanner, setCurrentBanner] = useState(0)
  const [currentProduct, setCurrentProduct] = useState(0)
  const carouselRef = useRef(null)
  const featuredProducts = products.filter((prod) => prod.inStock).slice(0, 8)

  const getVisibleProducts = () => {
    const width = window.innerWidth
    if (width >= 1200) return 4
    if (width >= 768) return 3
    if (width >= 576) return 2
    return 1
  }

  const nextProduct = () => {
    const maxIndex = featuredProducts.length - getVisibleProducts()
    setCurrentProduct(current => current < maxIndex ? current + 1 : 0)
  }

  const prevProduct = () => {
    const maxIndex = featuredProducts.length - getVisibleProducts()
    setCurrentProduct(current => current > 0 ? current - 1 : maxIndex)
  }

  // Banner carousel navigation
  const nextBanner = () => {
    setCurrentBanner(current => (current + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner(current => (current - 1 + banners.length) % banners.length)
  }

  // Auto-rotate banners
  useEffect(() => {
    const timer = setInterval(nextBanner, 5000)
    return () => clearInterval(timer)
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const maxIndex = featuredProducts.length - getVisibleProducts()
      if (currentProduct > maxIndex) {
        setCurrentProduct(Math.max(0, maxIndex))
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentProduct, featuredProducts.length])

  const handleAddToCart = (product) => {
    dispatch({ type: "Add_To_Cart", payload: product })
  }

  const handleRemoveFromCart = (product) => {
    dispatch({ type: "Remove_From_Cart", payload: product })
  }

  return (
    <div className="carousel-container">
      <div className="banner-carousel">
        <button className="banner-nav prev" onClick={prevBanner}>
          <FaChevronLeft />
        </button>

        <div
          className="banner-content"
          style={{ backgroundColor: banners[currentBanner].backgroundColor }}
        >
          <div className="banner-text">
            <h2>{banners[currentBanner].title}</h2>
            <h3>{banners[currentBanner].subtitle}</h3>
            <div className="banner-discount">{banners[currentBanner].discount}</div>
          </div>
          <div className="banner-image">
            <img
              src={banners[currentBanner].image}
              alt={banners[currentBanner].title}
            />
          </div>
        </div>

        <button className="banner-nav next" onClick={nextBanner}>
          <FaChevronRight />
        </button>

        <div className="banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`banner-dot ${index === currentBanner ? "active" : ""}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Carousel */}
      <div className="product-carousel">
        <h2 className="carousel-title">Featured Products</h2>

        <div className="carousel-controls">
          <Button
            className="product-nav prev"
            variant="outline"
            icon={<FaChevronLeft />}
            onClick={prevProduct}
          />

          <div className="carousel-wrapper" ref={carouselRef}>
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentProduct * (100 / getVisibleProducts())}%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="carousel-card">
                  <ProductCard
                    product={product}
                    isInCart={cart.some(p => p.id === product.id)}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            className="product-nav next"
            variant="outline"
            icon={<FaChevronRight />}
            onClick={nextProduct}
          />
        </div>

        <div className="product-dots">
          {Array.from({ length: Math.ceil(featuredProducts.length / getVisibleProducts()) }).map((_, index) => (
            <button
              key={index}
              className={`product-dot ${index === Math.floor(currentProduct / getVisibleProducts()) ? "active" : ""}`}
              onClick={() => setCurrentProduct(index * getVisibleProducts())}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel
