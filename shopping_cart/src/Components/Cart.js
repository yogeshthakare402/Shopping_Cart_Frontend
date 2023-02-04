import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import { CartState } from '../Context/CartContext';
import { AiFillDelete } from 'react-icons/ai';
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';

function Cart() {
    const [greeting, setGreeting] = useState(false)
    const { state: { cart }, dispatch } = CartState();
    const [subTotal, setSubTotal] = useState()
    //using reduce which takes function and inital value we are making summ of all the added product with qty
    useEffect(() => {
        setSubTotal(cart.reduce((total, prod) => total + (Number(prod.price) * Number(prod.qty)), 0))
    }, [cart])


    console.log(cart)
    return (
        <div id='showcart'>
            <div className="showcart">
                {cart.length===0?(<div id='noItems'>No Items Added Please Fill free to Shop</div>): (cart.map((prod) => {
                    return <div key={prod.id} className="showcartData">
                        <img src={prod.image} alt={prod.name} />
                        <div className='showcartName'>
                            <div className='name'>{prod.name}</div>
                            <div className='sum'><BiRupee />{prod.price.split(".")[0]}</div>
                        </div>
                        <div><Rating rating={prod.ratings} /></div>
                        <div className='qty'>
                            <input type="number"
                                min={1}
                                value={prod.qty}
                                onChange={(e) =>
                                    dispatch({
                                        type: "Change_Cart_Qty",
                                        payload: {
                                            id: prod.id,
                                            qty: e.target.value
                                        }
                                    })
                                }
                            />
                        </div>
                        <AiFillDelete className='deletebtn' onClick={() => dispatch({ type: "Remove_From_Cart", payload: prod })} />
                    </div>
                }))}
            </div>
            <div className='cartTotal'>
                <h2>Subtotal ({cart.length}) items</h2>
                <div className='sum'>Total : <BiRupee /> {subTotal}</div>
                <button onClick={()=>{
                    dispatch({
                        type:"Clear_Cart"
                    })
                    setGreeting(true)}}>Proceed to Checkout</button>
                {greeting && <h2>Thank You For Shopping!</h2>}
            </div>

        </div>
    )
}

export default Cart