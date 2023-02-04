import React, { createContext, useContext, useReducer } from 'react';
import {faker} from'@faker-js/faker';
import Reducer from './Reducer';

let CartConte = createContext();
//to not change data every time page rerender
faker.seed(99);

function CartContext({children}) {
    //genarating data using faker
    const products = [...Array(20)].map(()=>({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:faker.commerce.price(),
        image:faker.image.cats(),
        inStock:faker.datatype.boolean(),
        fastDelivery:faker.datatype.boolean(),
        ratings:faker.helpers.arrayElement([1,2,3,4,5]),
        qty:1
    }))
// console.log(products)
const [state, dispatch] = useReducer(Reducer, {
    // to access data
    products:products,
    cart:[],
    // for Fiter Data
    sort:'',
    byStock: false,
    byFastDelivery: false,
    byRating:0,
    serachQuery:''
});


  return (
    <CartConte.Provider value={{state, dispatch}}>
        {children}
    </CartConte.Provider>
  )
}

export default CartContext;

export const CartState = ()=>{
    return useContext(CartConte)
}