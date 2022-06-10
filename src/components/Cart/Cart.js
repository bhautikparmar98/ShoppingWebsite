import { useContext, useState, useEffect} from 'react'
import cartContext from '../../store/cart-context'
import classes from './cart.module.css'


function Cart(props) {
    const ctx = useContext(cartContext)

    const [cartArray, setcartArray] = useState(ctx.cart.items)
    const authToken = sessionStorage.getItem('token')

    const [total ,setTotal] = useState()

    useEffect(()=>{
        let total = 0
        for(let i of cartArray){
            total += (i.price * i.qty)
        }
        setTotal(total)
    },[cartArray])


    function deleteFromCart(event) {
        for (let i of cartArray) {
            if (i.id === event.target.id) {
                cartArray.splice(cartArray.indexOf(i), 1)
                break
            }
        }
        // we cannot mutate original Array thats y we use spread Operator to make copy 
        setcartArray([...cartArray])
        setTotal(()=>{
            let total = 0
            for(let i of cartArray){
                total += (i.price * i.qty)
            }
            return total
        })
    }

    function addtoOrder() {
        if(authToken.length){
            //payment
            fetch('http://localhost:5000/create-payment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : 'Bearer '+ authToken
                },
                body: JSON.stringify({cart: cartArray})
            })
            .then(res=>{
                if(res.ok){
                    return res.json()
                }
                return res.json().then(e=>Promise.reject(e))
            })
            .then(res=>{
                sessionStorage.setItem('cartArray',JSON.stringify(cartArray))
                window.location = res.url
            })
            .catch(e=>console.error(e))

            //this need to store in database
            // fetch('http://localhost:5000/postOrder', {
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: 'Bearer ' + authToken
            //     },
            //     method: 'POST',
            //     body: JSON.stringify({ cart: cartArray })
            // }).then(result => {
            //     cartArray.splice(0, cartArray.length)
            //     setcartArray([...cartArray])
            //     navigate('/orders')
            // }
            // )
        }else{
            window.alert('To Place Orders, Please Login or Signup')
        }
    }
    return <div>
        <div className={classes.cartitems}>
            {cartArray.map(product =>
                <div className={classes.cartitem} key={product.id}>
                    <h2 >{product.title} </h2>
                    <h2>Quantity: {product.qty}</h2>
                    <h2>price: &#8377;{product.price * product.qty}</h2>
                    <button id={product.id} onClick={deleteFromCart} >Delete</button>
                </div>
            )}
        </div>
        {cartArray.length !== 0 && <h1 className={classes.total}>Total: &#8377;{total}</h1>}
        {cartArray.length !== 0 && <hr />}
        {cartArray.length === 0 && <h1>No Products Added to Cart yet🙄</h1>}
        <div>{cartArray.length !== 0 && <button onClick={addtoOrder} className={classes.placeorderbtn}>Place Order</button>}</div>
    </div>
}
export default Cart