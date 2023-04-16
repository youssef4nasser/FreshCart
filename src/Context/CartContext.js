import axios from "axios";
import { createContext, useEffect, useState } from "react";

export  let cartContext = createContext();

export function CartContextProvider(props){
    const [cartId, setcartId] = useState(null);
    const [numOfCartItems, setnumbOfCartItems] = useState(0);
    
    async function getCart(){
    let res = await getLoggedUserCart()
    if (res?.data?.status === "success"){
        setnumbOfCartItems(res.data.numOfCartItems)
        setcartId(res.data.data._id);
    }
}

useEffect(() => {
    getCart();
}, [])

    let headers = {
        token: localStorage.getItem("userToken")
    }

    function addToCart(productId){
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
        {productId:productId},
        {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error);
    }

    function getLoggedUserCart(productId){
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
        {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error);
    }

    function removeItem(productId){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error);
    }

    function updateProductCount(productId, count){
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {count:count},
        {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error);
    }

    function onlinePayment(cartId, shippingAddress){
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {shippingAddress:shippingAddress},
        {headers:headers}
        ).then((response)=>response)
        .catch((error)=>error);
    }

    return <cartContext.Provider value={{setnumbOfCartItems, addToCart, getLoggedUserCart, removeItem, updateProductCount, onlinePayment, cartId, numOfCartItems}}>
        {props.children}
    </cartContext.Provider>
}