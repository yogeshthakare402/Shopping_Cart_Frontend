"use client"

import React from 'react';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { CartState } from '../../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const handleQuantityChange = (id, qty, action) => {
    if (action === "increase") {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: id,
          qty: qty + 1,
        },
      });
    } else if (action === "decrease" && qty > 1) {
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: {
          id: id,
          qty: qty - 1,
        },
      });
    }
  };

  const handleRemoveFromCart = (product) => {
    dispatch({
      type: "Remove_From_Cart",
      payload: product,
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + Number(item.price) * item.qty, 0);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + Number(item.price) * item.qty, 0);
  };

  const calculateDiscount = () => {
    return cart.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      const discount = (originalPrice - item.price) * item.qty;
      return total + (discount > 0 ? discount : 0);
    }, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            <FaArrowLeft /> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart ({cart.length} items)</h1>
        <button className="continue-shopping-link" onClick={() => navigate('/')}>
          <FaArrowLeft /> Continue Shopping
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <Link to={`/product/${item.id}`} className="item-name">
                  {item.name}
                </Link>
                {item.fastDelivery && (
                  <span className="delivery-badge">Fast Delivery</span>
                )}
                <div className="item-price">
                  <span className="current-price">
                    <BiRupee />{Number(item.price).toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <>
                      <span className="original-price">
                        <BiRupee />{Number(item.originalPrice).toFixed(2)}
                      </span>
                      <span className="discount">
                        {Math.round(
                          ((Number(item.originalPrice) - Number(item.price)) / Number(item.originalPrice)) * 100
                        )}% off
                      </span>
                    </>
                  )}
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => {
                        if (item.qty > 1) {
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: item.id,
                              qty: item.qty - 1,
                            },
                          });
                        }
                      }}
                      disabled={item.qty <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.qty}</span>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => {
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: item.id,
                            qty: item.qty + 1,
                          },
                        });
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      dispatch({
                        type: "Remove_From_Cart",
                        payload: item,
                      });
                    }}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
              <div className="item-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">
                  <BiRupee />{(Number(item.price) * item.qty).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span><BiRupee />{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span className="discount-amount">- <BiRupee />{calculateDiscount().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span><BiRupee />{calculateTotal().toFixed(2)}</span>
          </div>
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
          <div className="secure-checkout">
            <p>🔒 Secure Checkout</p>
            <div className="accepted-payments">
              <span>We accept:</span>
              <div className="payment-icons">
                {/* Add payment method icons here */}
                <img src="https://placehold.co/40x25/667eea/ffffff?text=VISA" alt="Visa" />
                <img src="https://placehold.co/40x25/667eea/ffffff?text=MC" alt="Mastercard" />
                <img src="https://placehold.co/40x25/667eea/ffffff?text=AMEX" alt="American Express" />
                <img src="https://placehold.co/40x25/667eea/ffffff?text=UPI" alt="UPI" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
