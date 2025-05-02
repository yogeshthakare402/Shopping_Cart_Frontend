"use client"
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa"
import { BiRupee } from "react-icons/bi"
import Card from "../Common/Card"
import Button from "../Common/Button"
import Rating from "../Rating"
import "./index.css"
import {useNavigate } from "react-router-dom"
import { CartState } from "../../Context/CartContext"

function ProductCard({ product }) {
    const navigate = useNavigate();
    const {
        state: { cart },
        dispatch,
    } = CartState()

    const cartItem = cart.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.qty : 0

    const handleAddToCart = (e) => {
      e.stopPropagation();
      console.log("product", product)
      dispatch({ type: "Add_To_Cart", payload: product })
    }

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: product,
        })
    }

    const handleQuantityChange = (e, action) => {
        e.stopPropagation();
        if (action === "increase") {
            dispatch({
                type: "CHANGE_CART_QTY",
                payload: {
                    id: product.id,
                    qty: quantity + 1,
                },
            })
        } else if (action === "decrease" && quantity > 1) {
            dispatch({
                type: "CHANGE_CART_QTY",
                payload: {
                    id: product.id,
                    qty: quantity - 1,
                },
            })
        }
    }

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const formatPrice = (price) => {
        const numPrice = Number(price)
        return isNaN(numPrice) ? price : numPrice.toFixed(2)
    }

    return (
        <Card
            hoverable
            className="product-card"
            style={{ cursor: 'pointer' }}
        >
            <div className="product-image-container">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="product-image"
                />
                {product.fastDelivery && (
                    <span className="fast-delivery-badge">Fast Delivery</span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-title">
                    {product.name}
                </h3>
                <div className="product-rating">
                    <Rating rating={product.ratings} style={{display:"flex", alignItems:"center", gap:"4px"}}/>
                    <span className="rating-count">({product.ratings})</span>
                </div>

                <div className="product-price">
                    <span className="current-price">
                        <BiRupee />
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <>
                            <span className="original-price">
                                <BiRupee />
                                {formatPrice(product.originalPrice)}
                            </span>
                            <span className="discount">
                                {Math.round(
                                    ((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100
                                )}% off
                            </span>
                        </>
                    )}
                </div>

                {quantity === 0 ? (
                    <Button
                        variant="primary"
                        icon={<FaShoppingCart />}
                        className="cart-button"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                ) : (
                    <div className="quantity-controls">
                        <button
                            className="quantity-button"
                            onClick={(e) => quantity === 1 ? handleRemoveFromCart(e) : handleQuantityChange(e, "decrease")}
                        >
                            <FaMinus />
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button
                            className="quantity-button"
                            onClick={(e) => handleQuantityChange(e, "increase")}
                        >
                            <FaPlus />
                        </button>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default ProductCard 