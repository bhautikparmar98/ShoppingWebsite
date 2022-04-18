import React from "react";

let cartContext = React.createContext({
    cart:{},
    addToCart:(item)=>{}
})

export default cartContext
