import React from 'react';
import './Style.css';
import { BiRupee } from 'react-icons/bi';
import Rating from './Rating';
import { CartState } from '../Context/CartContext';

function SingleProduct({ prod }) {
    const { state: { cart }, dispatch } = CartState();

    return (
        <div className='card'>
            <img src={prod.image} alt={prod.name} />
            <div className='data'>
                <h3>{prod.name}</h3>
                <div><BiRupee /><span>{prod.price.split(".")[0]}</span></div>
                {/* if delivery is fast or not boolean */}
                {prod.fastDelivery ? (
                    <div>Fast Delivery</div>
                ) : (
                    <div>4 days delivery</div>
                )}
                <div><Rating rating={prod.ratings} /></div>
                <div>
                    {/* we have to show this remove btn below the added products only thats why check whic are added in cart */}
                    <span>
                        {cart.some((p) => p.id === prod.id) ? (
                            <button id='removebtn' onClick={()=>dispatch({ type: "Remove_From_Cart", payload:prod })}>Remove from Cart</button>
                        ) : (
                            <button disabled={!prod.inStock} id='addbtn'
                                onClick={()=>dispatch({ type: "Add_To_Cart", payload:prod })}
                            >{!prod.inStock ? "Out of Stock" : "Add to Cart"}</button>
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct