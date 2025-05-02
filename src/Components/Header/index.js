"use client"

import "./index.css"
import { Link } from "react-router-dom"
import { CartState } from "../../Context/CartContext"
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa"

function Header() {
  const {
    state: { cart },
    dispatch,
  } = CartState()

  const handleSearch = (e) => {
    dispatch({
      type: "Sort_By_SearchQuery",
      payload: e.target.value,
    })
  }

  return (
    <header className="header">
        <Link to="/" className="logo">
          <h1>MegaMart</h1>
        </Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search essentials, groceries and more..."
            onChange={handleSearch}
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        <div className="header-actions">
          <Link to="/login" className="auth-link">
            <FaUser className="auth-icon" />
            <span>Login</span>
          </Link>

          <Link to="/cart" className="cart-link">
            <div className="cart-icon-container">
              <FaShoppingCart className="cart-icon" />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </div>
            <span>Cart</span>
          </Link>
        </div>
    </header>
  )
}

export default Header
