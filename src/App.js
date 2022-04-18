import './App.css';
import {Route, Routes} from 'react-router-dom'
import React, {useReducer} from 'react';
import cartContext from './store/cart-context';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Orders from './components/Orders/orders'
import AddProduct from './components/Add Product/AddProduct'
import Auth from './components/Auth/Auth'


function reducerFunc(state,action){
  const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.body.id)
  let updatedState
  let newState
  if(existingCartItemIndex>=0){
    updatedState={...state.items[existingCartItemIndex]}
    updatedState.qty++
    state.items[existingCartItemIndex]=updatedState
    newState = {
      items:[...state.items],
    }
  }else{
    updatedState={...action.body, qty:1 }
    newState = {
      items:state.items.concat(updatedState),
    }
  }
  console.log(newState)
  return newState
}

function App() {
  const InitialCart ={
    items:[],
  }
  //if some complex calculation needed while updating state then use useReducer isntead of useState
  let [CartDetail,dispatchFunc] = useReducer(reducerFunc,InitialCart)
  function AddToCart(item){
    dispatchFunc({type:"ADD",body:item})
  }
  let products = [
    {
        id:'1',
        title:"A Great Book",
        imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
        price:99.9,
        description:'A great Dummy Book'
    },
    {
        id:'2',
        title:"Another Book",
        imgUrl:"https://static4.depositphotos.com/1011434/506/i/950/depositphotos_5066698-stock-photo-fredom.jpg",
        price:200,
        description:'A great Dummy Book'
    },
    {
        id:'3',
        title:"Another Book",
        imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
        price:200,
        description:'A great Dummy Book'
    },
    {
        id:'4',
        title:"Another Book",
        imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
        price:200,
        description:'A great Dummy Book'
    },
    {
        id:'5',
        title:"Another Book",
        imgUrl:"https://www.adazing.com/wp-content/uploads/2019/02/open-book-clipart-17-300x300.png",
        price:200,
        description:'A great Dummy Book'
    }
]
  return (
  <React.Fragment>
      <Header></Header>
      <Routes>
        <Route path='/' element={
          <cartContext.Provider value={ {cart:CartDetail, addToCart:AddToCart} }>
            <Products products={products}/>
          </cartContext.Provider>
        }/>
           
          <Route path='/cart' element={
            <cartContext.Provider value={ {cart:CartDetail, addToCart:AddToCart} }>
              <Cart></Cart>
            </cartContext.Provider>
          }/>
        
        <Route path='/orders' element={<Orders/>}/>
        
        <Route path='/admin-products' element={
          <cartContext.Provider value={ {cart:CartDetail} }>
            <Products products={products}/>
          </cartContext.Provider>
        }/>
        
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/*' element={<h1>404! Page Not Found</h1>}/>
      </Routes>
  </React.Fragment>
  )
}

export default App;
