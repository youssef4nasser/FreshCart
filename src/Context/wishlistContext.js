import axios from "axios";
import { createContext, useEffect, useState } from "react";

export  const wishlistContext = createContext();

export function WishlistContextProvider(props){

    const [numOfWishlistItems, setnumbOfWishlistItems] = useState(0);

    const headers = {
        token: localStorage.getItem("userToken")
    }

    async function addToWishlist(productId){
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId: productId },
                { headers: headers }
            );
            return response;
        } catch (error) {
            return error;
        } 
    }

    async function getwishlist(){
        let response = await getloggedUserWishlist();
        if(response.data.status === "success"){
            setnumbOfWishlistItems(response.data);
        }
    }

    useEffect(() => {
        getwishlist();
    }, [])

    async function getloggedUserWishlist(){
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { headers: headers }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    return <wishlistContext.Provider value={{addToWishlist, getloggedUserWishlist}}>
        {props.children}
    </wishlistContext.Provider>
}