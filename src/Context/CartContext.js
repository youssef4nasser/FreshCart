import axios from "axios";
import { createContext, useEffect, useState } from "react";

export  let cartContext = createContext();

export function CartContextProvider(props){
    //  https://route-ecommerce-app.vercel.app/api/v1/cart

    const [cartId, setcartId] = useState(null);
    const [numOfCartItems, setnumbOfCartItems] = useState(0);
    // const [numOfWishlistItems, setnumbOfWishlistItems] = useState(0);

    let headers = {
        token: localStorage.getItem("userToken")
    }

    async function addToCart(productId){
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: productId },
                { headers: headers }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    async function getCart(){
        let res = await getLoggedUserCart()
        if (res?.data?.status === "success"){
            setnumbOfCartItems(res.data.numOfCartItems);
            setcartId(res.data.data._id);
        }
    }

    useEffect(() => {
        getCart();
    }, []) 

    async function getLoggedUserCart(){
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                { headers: headers }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    // async function addToWishlist(productId){
    //     try {
    //         const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    //             { "productId": productId },
    //             { headers: headers }
    //         );
    //         return response;
    //     } catch (error) {
    //         return error;
    //     } 
    // }

    // async function getwishlist(){
    //     let response = await getloggedUserWishlist();
    //     if(response.data.status === "success"){
    //         setnumbOfWishlistItems(response.data);
    //     }
    // }

    // useEffect(() => {
    //     getwishlist();
    // }, [])

    // async function getloggedUserWishlist(){
    //     try {
    //         const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    //             { headers: headers }
    //         );
    //         return response;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    async function removeItem(productId){
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers: headers }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    async function updateProductCount(productId, count){
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count: count },
                { headers: headers }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    async function onlinePayment(cartId, shippingAddress){
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
                { shippingAddress: shippingAddress },
                { headers: headers }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    return <cartContext.Provider value={{ setnumbOfCartItems, addToCart, getLoggedUserCart, removeItem, updateProductCount, onlinePayment, cartId, numOfCartItems}}>
        {props.children}
    </cartContext.Provider>
}