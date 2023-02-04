// import React from 'react'

function Reducer(state, action) {
    // state has product and cart so product should be unchange and ...state,
    //in cart we are adding selected product with previous added products ...state.cart
    //also action payload with add on qty default is 1 {...action.payload, qty:1}

    console.log(action.payload)
    //next we are returning product without removed ones
    switch (action.type) {
        case "Add_To_Cart":
            return { ...state, cart: [...state.cart, { ...action.payload }] };

        case "Remove_From_Cart":
            return {
                ...state, cart: state.cart.filter((prod) => {
                    return prod.id !== action.payload.id;
                })
            };

        case "Change_Cart_Qty":
            return {
                ...state, cart: state.cart.filter((prod) => {
                    return prod.id === action.payload.id ? (prod.qty = action.payload.qty) : prod.qty;
                })
            }
        case "Clear_Cart":
            return {...state, cart: []};

        // for Sorting or Filtering Data
        case "Sort_By_Price":
            return { ...state, sort: action.payload };

        case "Sort_By_Stock":
            return { ...state, byStock: !state.byStock };

        case "Sort_By_FastDelivery":
            return { ...state, byFastDelivery: !state.byFastDelivery };

        case "Sort_By_Rating":
            return { ...state, byRating: action.payload };

        case "Sort_By_SearchQuery":
            return { ...state, serachQuery: action.payload };

        case "Clear_Filter":
            return {
                ...state,
                sort: '',
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                serachQuery: ''
            }
        default:
            return state;
    }
}

export default Reducer