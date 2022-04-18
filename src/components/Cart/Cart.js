import {useContext, useState} from 'react'
import cartContext from '../../store/cart-context'
import classes from './cart.module.css'

function Cart(props){
    const ctx = useContext(cartContext)
    
    const [cartArray, setcartArray] = useState(ctx.cart.items)

    function deleteFromCart(event){
        for(let i of cartArray){
            if(i.id === event.target.id){
                cartArray.splice(cartArray.indexOf(i),1)
                break
            }
        }
        // we cannot mutate original Array thats y we use spread Operator to make copy 
        setcartArray([...cartArray]) 
    } 
    return <div>
        <div className={classes.cartitems}>
            {cartArray.map(product=>
                <div className={classes.cartitem} key={product.id}>
                <h2 >{product.title} </h2>
                <h2>{product.qty}</h2>
                <button id={product.id} onClick={deleteFromCart} >Delete</button>
                </div>
            )}
        </div>
        {cartArray.length !== 0 && <hr/>}
        {cartArray.length === 0 && <h1>No Products Added to Cart yet🙄</h1>}
        <div>{cartArray.length !== 0 && <button className={classes.placeorderbtn}>Place Order</button>}</div>
    </div>
}
export default Cart