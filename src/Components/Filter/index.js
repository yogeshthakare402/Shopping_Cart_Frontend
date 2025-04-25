"use client"
import "./index.css"
import Rating from "../Rating/index"
import { CartState } from "../../Context/CartContext"
import { FaFilter, FaRupeeSign, FaTruck, FaStar } from "react-icons/fa"
import { useState } from "react"

function Filter() {
  const {
    state: { sort, byStock, byFastDelivery, byRating },
    dispatch,
  } = CartState()

  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const handlePriceFilter = () => {
    dispatch({
      type: "Sort_By_Price_Range",
      payload: { min: minPrice, max: maxPrice },
    })
  }

  return (
    <div className="filter-container">
      <div className="filter-header">
        <div className="filter-title">
          <FaFilter /> Filters
        </div>
        <button
          className="filter-button clear-button"
          onClick={() => {
            dispatch({ type: "Clear_Filter" })
            setMinPrice("")
            setMaxPrice("")
          }}
        >
          Clear All
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-section-title">
          <FaRupeeSign /> Price Range
        </div>
        <div className="price-range">
          <input
            type="number"
            className="price-input"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            className="price-input"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button className="filter-button apply-button" onClick={handlePriceFilter}>
            Go
          </button>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-title">
          <FaRupeeSign /> Sort By Price
        </div>
        <div className="filter-option">
          <input
            type="radio"
            name="price"
            id="lowToHigh"
            onChange={() => dispatch({ type: "Sort_By_Price", payload: "lowToHigh" })}
            checked={sort === "lowToHigh"}
          />
          <label htmlFor="lowToHigh">Price: Low to High</label>
        </div>
        <div className="filter-option">
          <input
            type="radio"
            name="price"
            id="highToLow"
            onChange={() => dispatch({ type: "Sort_By_Price", payload: "highToLow" })}
            checked={sort === "highToLow"}
          />
          <label htmlFor="highToLow">Price: High to Low</label>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-title">
          <FaTruck /> Delivery Options
        </div>
        <div className="filter-option">
          <input
            type="checkbox"
            id="fastDelivery"
            onChange={() => dispatch({ type: "Sort_By_FastDelivery" })}
            checked={byFastDelivery}
          />
          <label htmlFor="fastDelivery">Fast Delivery</label>
        </div>
        <div className="filter-option">
          <input
            type="checkbox"
            id="outOfStock"
            onChange={() => dispatch({ type: "Sort_By_Stock" })}
            checked={byStock}
          />
          <label htmlFor="outOfStock">Include Out of Stock</label>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-title">
          <FaStar /> Customer Ratings
        </div>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="filter-option">
            <input
              type="radio"
              name="rating"
              id={`rating-${rating}`}
              onChange={() => dispatch({ type: "Sort_By_Rating", payload: rating })}
              checked={byRating === rating}
            />
            <label htmlFor={`rating-${rating}`}>
              <div className="rating-stars">
                <Rating rating={rating} />
                <span>& Up</span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
