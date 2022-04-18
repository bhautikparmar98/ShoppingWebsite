import './Product.css'
import { useLocation } from 'react-router-dom';
import {useContext} from 'react'
import cartContext from '../../store/cart-context';

function Product(props){

    let currentRoute = useLocation().pathname; 

    const ctx = useContext(cartContext)

    function AddToCart(){
        ctx.addToCart(props)
        alert("product Added to Cart")
    }

    return  <div className="each-product" key={props.id}>
    <header>
        <h1 className="product-title">{props.title}</h1>
    </header>
    <div className="card-image">
        <img src={props.imgUrl}
            alt={props.title}/>
    </div>
    <div className="card-content">
        <h2 className="product__price">${props.price}</h2>
        <p className="product__description">{props.description}</p>
    </div>
    <div className="card-actions">
        {currentRoute==='/' && <button onClick={AddToCart} className='btn'>Add to Cart</button>}
        {currentRoute==='/admin-products' && <button className='btn'>Edit</button>}
        {currentRoute==='/admin-products' && <button className='btn'>Delete</button>}
    </div>
</div>
}

export default Product