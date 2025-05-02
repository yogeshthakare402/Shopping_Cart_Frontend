"use client"
import "./index.css"
import { CartState } from "../../Context/CartContext"
import { FaShoppingCart, FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"

const categories = [
  { id: 1, name: "Mobile", icon: "🔥", link: "/mobile" },
  { id: 2, name: "Cosmetics", icon: "✨", link: "/cosmetics" },
  { id: 3, name: "Electronics", icon: "⚡", link: "/electronics" },
  { id: 4, name: "Furniture", icon: "🛋️", link: "/furniture" },
  { id: 5, name: "Watches", icon: "⌚", link: "/watches" },
  { id: 6, name: "Decor", icon: "🏠", link: "/decor" },
  { id: 7, name: "Accessories", icon: "💎", link: "/accessories" },
]

function Home() {
  const {
    state: { products },
    dispatch,
  } = CartState()

  const featuredProducts = products.filter(prod => prod.inStock).slice(0, 8)

  return (
    <div className="home-container">
      <section className="categories-section">
        <h2>Shop By Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={category.link} key={category.id} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((prod) => (
            <div key={prod.id} className="product-card">
              <div className="product-image-container">
                <img src={prod.image} alt={prod.name} className="product-image" />
                {prod.fastDelivery && (
                  <span className="fast-delivery-badge">Fast Delivery</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{prod.name}</h3>
                <div className="product-rating">
                  <span className="rating-stars">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < prod.ratings ? "#ffc107" : "#e4e5e9"}
                      />
                    ))}
                  </span>
                  <span className="rating-count">({prod.ratings})</span>
                </div>
                <div className="product-price">
                  <span className="current-price">₹{prod.price}</span>
                  {prod.originalPrice && (
                    <>
                      <span className="original-price">₹{prod.originalPrice}</span>
                      <span className="discount">
                        {Math.round(
                          ((prod.originalPrice - prod.price) / prod.originalPrice) * 100
                        )}% off
                      </span>
                    </>
                  )}
                </div>
                <button
                  className="add-to-cart-button"
                  onClick={() => dispatch({ type: "Add_To_Cart", payload: prod })}
                  disabled={!prod.inStock}
                >
                  {prod.inStock ? (
                    <>
                      <FaShoppingCart /> Add to Cart
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
