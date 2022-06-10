import { useEffect, useState } from 'react';
import classes from './orders.module.css';
import {BeatLoader} from 'react-spinners';
function Orders(props){
    //in real fetch orders from database
    const [OrderdItems,setOrderedItems] = useState([])
    const [haveOrders, sethaveOrders] = useState(true)
    const [Loading, setLoading] =  useState(true)
    const authToken = sessionStorage.getItem('token')
    useEffect(()=>{
        fetch('http://localhost:5000/getOrder',{
            headers:{ 
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + authToken
            },
            method: 'GET'
        })
        .then(res=>{
            if(res.status === 200){
                res.json().then(orders=>{
                    if(orders.length === 0){
                        sethaveOrders(false)
                    }
                    const OrderedItems = orders.reverse().map(o=>{
                        return {id:o._id,items:[...o.products]}
                    })
                    setOrderedItems([...OrderedItems])
                    setLoading(false)
                }
                )
            }else{
                sethaveOrders(false)
                setLoading(false)
            }
        })
        .catch(e=>sethaveOrders(false))
    },[authToken,OrderdItems.length])
    
    return (<div>
        {Loading && <div className='loading'><BeatLoader size={25}  color='rgba(219, 64, 64, 0.794)'/></div>}
        {!haveOrders && !Loading && <h1>No Orders Found🙄</h1>}
        {!Loading && <ul className={classes["orders"]}>
            {OrderdItems.map((item)=>
                <li className={classes["order-items"]}key={item.id}>
                    <h3>OrderID #{item.id}</h3>
                    <ul className={classes["order-products"]}>
                        {item.items.map((product)=>
                        <li className={classes["order-products-item"]} key={product._id}>
                            <span>{product.name}</span>
                            <span> ({product.quantity})</span>
                        </li>
                        )}
                    </ul>
                </li>
        )}
    </ul>}
    </div>)
}
export default Orders