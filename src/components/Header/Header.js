import './Header.css'
import {NavLink, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'


function Header(props){

  const [windowWidth, setwindowWidth] = useState(window.innerWidth)

  //const [isMobile,setIsMobile] = useState(false)

  const [showMobileMenu, setshowMobileMenu] = useState(false)

  let currentRoute = useLocation().pathname; 

  function handleResize(){
    setwindowWidth(window.innerWidth)
  }
  useEffect(()=>{
    window.addEventListener('resize',handleResize)
  },[])

  useEffect(()=>{
    if(windowWidth<700){
      //setIsMobile(true)
    }else{
     // setIsMobile(false)
      setshowMobileMenu(true)
    }
  },[windowWidth])

  function toggleButton(){
    setshowMobileMenu(prev=>!prev)
  }
  function LogoutHandler(){
    sessionStorage.setItem('token','')
    props.setisAuth(false)
    clearTimeout(props.Timer())
  }
  return <header className="main-header">
    <nav className='main-nav'>
    <h2> Enjoy your Shopping!!</h2>
    <button className='mobile-menu-btn' onClick={toggleButton}><span><div></div><div></div><div></div></span></button>
    {/* {isMobile && <button><span><div></div><div></div><div></div></span></button>} */}
      { showMobileMenu &&
        <ul className='main-nav-items link-wrapper'>
        <li className='main-nav-item '><NavLink to='/'>Shop</NavLink></li>
        <li className='main-nav-item '><NavLink to='/cart'  >Cart</NavLink></li>
        <li className='main-nav-item'><NavLink to='/orders'  >Orders</NavLink></li>
        {props.isAuth && <li className='main-nav-item'><NavLink to='/add-product'  >Add Product</NavLink></li>}
        {props.isAuth && <li className='main-nav-item'><NavLink to='/update-products'  >Update Products</NavLink></li>}
        {props.isAuth && <li className='main-nav-item auth'><NavLink to='/auth/login' onClick={LogoutHandler} >Logout</NavLink></li>}
        {currentRoute!=='/auth' && !props.isAuth && <li className='main-nav-item auth'><NavLink to='/auth/login'  >Login</NavLink></li>}
        {currentRoute!=='/auth' && !props.isAuth && <li className='main-nav-item auth'><NavLink to='/auth/signup'  >Signup</NavLink></li>}
      </ul>}
    </nav>
  </header> 
}

export default Header