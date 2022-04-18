import './Header.css'
import {NavLink} from 'react-router-dom'

function Header(){
  return <header className="main-header">
    <div>Enjoy your Shopping!!</div>
    <nav className='main-nav'>
      <ul className='main-nav-items link-wrapper'>
        <li className='main-nav-item '><NavLink to='/'>Shop</NavLink></li>
        <li className='main-nav-item '><NavLink to='/cart'  >Cart</NavLink></li>
        <li className='main-nav-item'><NavLink to='/orders'  >Orders</NavLink></li>
        <li className='main-nav-item'><NavLink to='/add-product'  >Add Product</NavLink></li>
        <li className='main-nav-item'><NavLink to='/admin-products'  >Admin Products</NavLink></li>
        <li className='main-nav-item auth'><NavLink to='/auth'  >Login</NavLink></li>
      </ul>
    </nav>
  </header> 
}

export default Header