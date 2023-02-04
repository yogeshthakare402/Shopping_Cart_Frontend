import React, { useState } from 'react';
import './Style.css'
import { Link, useNavigate } from 'react-router-dom';
import { ImCart } from 'react-icons/im';
import { CartState } from '../Context/CartContext';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';

function Header() {
    const { state: {cart}, dispatch } = CartState();
    const [menu, setMenu] = useState(false)

    const navigate = useNavigate()
    const showMenu = () => {
        setMenu(!menu)
    }
    return (
        <div id='header'>
            <Link to='/' id='heading'><div id='logo'><img src="https://static.vecteezy.com/system/resources/previews/008/515/125/original/online-shop-logo-good-shop-logo-design-vector.jpg" alt="logo" /></div><h1>Shopping</h1></Link>
            <input type="text" 
            name="search" 
            id="search" 
            placeholder='Search Items'
            onChange={(e)=>dispatch({
                type:"Sort_By_SearchQuery",
                payload: e.target.value
            })}
            />
            <div id='cart'>
                <ImCart onClick={()=>navigate("/cart")}/>
                <div>{cart.length}</div>
                <MdOutlineKeyboardArrowDown onClick={() => showMenu()} />
                {menu && <div id='menu'>
                    {cart.length > 0 ? (cart.map((prod) => {
                        return <div className='menu' key={prod.id}>
                            <img src={prod.image} alt={prod.name} />
                            <div className='menuName'>
                                <div className='name'>{prod.name}</div>
                                <div><BiRupee />{prod.price.split(".")[0]}</div>
                            </div>
                            <AiFillDelete className='deletebtn' onClick={() => dispatch({ type: "Remove_From_Cart", payload: prod })} />
                        </div>

                    })
                    ) : (<div> No items in Cart</div>)}
                    <button onClick={() => {
                        showMenu();
                        navigate("/cart")
                    }}>Go to Cart</button>
                </div>
                }

            </div>
        </div>
    )
}

export default Header