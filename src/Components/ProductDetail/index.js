"use client"

import { useState, useEffect } from 'react';
import { FaHeart, FaShare, FaExchangeAlt, FaWhatsapp } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CartState } from "../../Context/CartContext";
import './index.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const {
        state: { products, cart },
        dispatch,
    } = CartState();

    useEffect(() => {
        // Find the product from the products array
        const foundProduct = products.find(p => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            // Find related products (products in the same category or with similar price)
            const related = products
                .filter(p => p.id !== id && (p.category === foundProduct.category || Math.abs(p.price - foundProduct.price) < 10))
                .slice(0, 3);
            setRelatedProducts(related);
        } else {
            // If product not found, redirect to home
            navigate('/');
        }
        setLoading(false);
    }, [id, products, navigate]);

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                ...product,
                qty: quantity
            },
        });
    };

    if (loading || !product) {
        return (
            <div className="product-detail-container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh'
                }}>
                    <div style={{
                        fontSize: '1.25rem',
                        color: '#667eea'
                    }}>
                        Loading product details...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-main">
                <div className="product-gallery">
                    <div className="main-image-container">
                        {product.fastDelivery && (
                            <span className="fast-delivery-badge">Fast Delivery</span>
                        )}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="main-image"
                        />
                    </div>
                </div>

                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>

                    <div className="product-meta">
                        <div className="rating-container">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`star ${i < Math.floor(product.ratings) ? 'filled' : ''}`}
                                    >★</span>
                                ))}
                            </div>
                            <span className="rating-count">({product.ratings})</span>
                        </div>
                        <span className="sku">SKU: {product.id}</span>
                    </div>

                    <div className="product-price">
                        <span className="current-price">${Number(product.price).toFixed(2)}</span>
                        {product.originalPrice && (
                            <>
                                <span className="original-price">${Number(product.originalPrice).toFixed(2)}</span>
                                <span className="discount">
                                    {Math.round(
                                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                                    )}% off
                                </span>
                            </>
                        )}
                    </div>

                    <div className="product-actions">
                        <div className="quantity-selector">
                            <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(-1)}
                            >−</button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="quantity-input"
                            />
                            <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(1)}
                            >+</button>
                        </div>

                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            {product.inStock ? "Add to cart" : "Out of Stock"}
                        </button>
                        <button className="buy-now-btn">Buy Now</button>
                    </div>

                    <div className="whatsapp-order">
                        <button className="whatsapp-btn">
                            <FaWhatsapp /> Order on WhatsApp
                        </button>
                    </div>

                    <div className="product-meta-actions">
                        <button className="meta-action-btn">
                            <FaHeart /> Add to wishlist
                        </button>
                        <button className="meta-action-btn">
                            <FaShare /> Share this Product
                        </button>
                        <button className="meta-action-btn">
                            <FaExchangeAlt /> Compare
                        </button>
                    </div>

                    <div className="product-info-blocks">
                        <div className="info-block">
                            <h3>Delivery</h3>
                            <p>{product.fastDelivery ? 'Fast delivery available' : 'Standard delivery'}</p>
                        </div>
                        <div className="info-block">
                            <h3>Stock Status</h3>
                            <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <div className="related-products">
                    <h2>Related products</h2>
                    <div className="products-grid">
                        {relatedProducts.map(product => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} />
                                    <button className="wishlist-btn" onClick={(e) => {
                                        e.stopPropagation();
                                        // Add wishlist functionality
                                    }}>
                                        <FaHeart />
                                    </button>
                                </div>
                                <div className="product-details">
                                    <h3>{product.name}</h3>
                                    <div className="product-rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`star ${i < Math.floor(product.ratings) ? 'filled' : ''}`}
                                                >★</span>
                                            ))}
                                        </div>
                                        <span className="review-count">({product.ratings})</span>
                                    </div>
                                    <div className="product-price">
                                        <span className="current-price">${Number(product.price).toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className="original-price">${Number(product.originalPrice).toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail; 