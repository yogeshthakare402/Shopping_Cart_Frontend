import React from 'react';
import './Style.css';
import Filter from './Filter';
import { CartState } from '../Context/CartContext';
import SingleProduct from './SingleProduct';

function Home() {
    const {state:{products,sort,byStock,byFastDelivery,byRating,serachQuery}}= CartState()
    // console.log("home " +products)

    const transformProduct = ()=>{
        let sortedProduct = products;
        // sort by price high to low and low to high
        if(sort){
            sortedProduct = sortedProduct.sort((a,b)=>(
                sort==="lowToHigh" ? (a.price - b.price) : (b.price -a.price)
            ))
        }
        // sort if fast delivery or 4 days delivery default
        if(byFastDelivery){
            sortedProduct = sortedProduct.filter((prod)=>prod.fastDelivery)
        }
        // pnly include outof stock if selected
        if(!byStock){
            sortedProduct = sortedProduct.filter((prod)=>prod.inStock)
        }
        if(byRating){
            sortedProduct = sortedProduct.filter((prod)=>prod.ratings===byRating)
        }
        if(serachQuery){
            sortedProduct = sortedProduct.filter((prod)=>prod.name.includes(serachQuery)?prod:'')
        }
        
        return sortedProduct
    }
  return (
    <div id='home'>
        <Filter/>
        <div id='products'>
            {transformProduct().map((prod)=>{
                return <SingleProduct key={prod.id} prod={prod}/>
                
            })}
        </div>
    </div>
  )
}

export default Home