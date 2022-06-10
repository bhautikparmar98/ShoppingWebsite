import './App.css';
import {Route, Routes} from 'react-router-dom'
import React, {useReducer, useState} from 'react';
import cartContext from './store/cart-context';
import Cart from './components/Cart/Cart';
import CheckoutSuccess from './components/Cart/checkout-success';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Orders from './components/Orders/orders'
import AddProduct from './components/Add Product/AddProduct'
import Auth from './components/Auth/Auth'
import ResetAuth from './components/Auth/ResetAuth'

const reducerFunc = (state,action)=>{
  const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.body.id)
  const existingCartItem = state.items[existingCartItemIndex]
  let updatedState
  let newState
  let updatedItems
  if(existingCartItem){
    updatedState={...existingCartItem, qty: existingCartItem.qty + 1}
    updatedItems = [...state.items]
    updatedItems[existingCartItemIndex]=updatedState
    newState = {
      items:updatedItems,
    }
  }else{
    updatedState={...action.body, qty:1 }
    newState = {
      items:state.items.concat(updatedState),
    }
  }
  return newState
}

function App() {
  const InitialCart ={
    items:[],
  }
  const [authToken,setauthToken] = useState(sessionStorage.getItem('token'))

  const [isAuth,setisAuth] = useState(authToken!==null && authToken!=='')

  //if some complex calculation needed while updating state then use useReducer isntead of useState
  let [CartDetail,dispatchFunc] = useReducer(reducerFunc,InitialCart)

  function AddToCart(item){
    dispatchFunc({type:"ADD",body:item})
  }

  const [productforEdit,setproductforEdit] = useState({})
  const [ Timer, setTimer] = useState() 
  return (
  <React.Fragment>
      <Header isAuth={isAuth} setisAuth={setisAuth}  Timer={Timer}></Header>
      <Routes>
        <Route path='/' element={
          <cartContext.Provider value={ {cart:CartDetail, addToCart:AddToCart} }>
            <Products authToken={authToken}/>
          </cartContext.Provider>
        }/>
           
          <Route path='/cart' element={
            <cartContext.Provider value={ {cart:CartDetail, addToCart:AddToCart} }>
              <Cart authToken={authToken} isAuth={isAuth}></Cart>
            </cartContext.Provider>
          }/>
        
        <Route path='/orders' element={<Orders  authToken={authToken}/>}/>
        <Route path='/checkout/success' element={
           <cartContext.Provider value={ {cart:CartDetail, addToCart:AddToCart} }>
                <CheckoutSuccess CartDetail={CartDetail}/>
            </cartContext.Provider>        
        }/>
        
        <Route path='/update-products' element={
          <cartContext.Provider value={ {cart:CartDetail,setproductforEdit:setproductforEdit} }>
            <Products authToken={authToken}/>
          </cartContext.Provider>
        }/>
        
        <Route path='/add-product' element={
          <cartContext.Provider value={{productforEdit:productforEdit}}>
              <AddProduct/>
          </cartContext.Provider>
        }/>
        <Route path='/auth/:authtype' element={<Auth setauthToken={setauthToken} setisAuth={setisAuth} setTimer={setTimer}/>}/>
        <Route path='/reset-password' element={<ResetAuth />}/>
        <Route path='/*' element={<h1>404! Page Not Found</h1>}/>
      </Routes>
  </React.Fragment>
  )
}

export default App;
