import React from "react";

let cartContext = React.createContext({
    cart:{},
    addToCart:(item)=>{},
    deleteProduct:()=>{},
    productforEdit:{},
    setproductforEdit:(item)=>{}
})

export default cartContext
