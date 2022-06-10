import classes from './cart.module.css'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function CheckoutSuccess(props){

    const authToken = sessionStorage.getItem('token')
    const navigate = useNavigate()
    const cartArray = JSON.parse(sessionStorage.getItem('cartArray'))
    console.log(cartArray)
    useEffect(()=>{
        //this need to store in database
        if(cartArray.length){
            fetch('http://localhost:5000/postOrder', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + authToken
                },
                method: 'POST',
                body: JSON.stringify({ cart: cartArray })
            }).then(result => {
               sessionStorage.removeItem('cartArray')
            }
            )
        }
    },[authToken,cartArray])

     function goToOrders(){
        navigate('/orders')
     }

    return <div>
        <h1 className={classes.successtext}>checkout Success!!</h1>
        <button onClick={goToOrders} className={classes["go-to-orders-btn"]}>Go to Your Orders</button>
    </div>
}

export default CheckoutSuccess