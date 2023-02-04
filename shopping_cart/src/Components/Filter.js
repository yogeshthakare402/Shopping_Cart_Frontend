import React from 'react';
import './Style.css';
import Rating from './Rating';
import { CartState } from '../Context/CartContext';

function Filter() {
    const {state:{sort,byStock,byFastDelivery,byRating},dispatch} = CartState();
    console.log(sort,byStock,byFastDelivery,byRating)
    
  return (
    <div id='filter'>
        <h2>Filter Products</h2>
        <div className='filter'>
            <input type="radio" 
            name="ascending" 
            id="ascending"
            onChange={()=>
                dispatch({
                type:"Sort_By_Price",
                payload:"lowToHigh",
            })} 
            checked={sort === "lowToHigh" ? true:false}
             />
            <label htmlFor="ascending">Ascending</label>
        </div>
        <div className='filter'>
            <input type="radio" 
            name="descending" 
            id="descending" 
            onChange={()=>
                dispatch({
                type:"Sort_By_Price",
                payload:"highTolow",
            })} 
            checked={sort === "highToLow" ? true:false}
            />
            <label htmlFor="descending">Descending</label>
        </div>

        <div className='filter'>
            <input type="checkbox" 
            name="outOfStock" 
            id="outOfStock" 
            onChange={()=>
                dispatch({
                type:"Sort_By_Stock"
            })}
            checked={byStock}
            />
            <label htmlFor="outOfStock">Include Out Of Stock</label>
        </div>

        <div className='filter'>
            <input type="checkbox" 
            name="fastDelivery" 
            id="fastDelivery" 
            onChange={()=>
                dispatch({
                type:"Sort_By_FastDelivery"
            })}
            checked={byFastDelivery}
            />
            <label htmlFor="fastDelivery">Fast Delivery Only</label>
        </div>
        <div className='filter'>Rating : <Rating rating={byRating} 
        onClick={(i)=>
            dispatch({
            type:"Sort_By_Rating",
            payload: i+1,
        })} 
        style={{cursor:"Pointer"}}/></div>

        <button onClick={()=>{
            dispatch({
                type:"Clear_Filter"
            })
        }}>Clear Filter</button>
    </div>
  )
}

export default Filter