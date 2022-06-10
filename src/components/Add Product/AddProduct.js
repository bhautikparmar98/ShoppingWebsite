import './addProduct.css'
import cartContext from '../../store/cart-context'
import { useContext , useState} from 'react'
import {useNavigate} from 'react-router-dom'
function AddProduct(){

    const ctx = useContext(cartContext)
    const productforEdit =  ctx.productforEdit
    const navigate = useNavigate()

    let formstate = {
        id:productforEdit.id,
        title:productforEdit.title,
        price:productforEdit.price,
        imgUrl:productforEdit.imgUrl,
        description:productforEdit.description,
        editMode:productforEdit.editMode
    }
    const defaultformState = {
        id:'',
        title:'',
        price:'',
        imgUrl:'',
        description:'',
        editMode:false
    }
    if(formstate.id === undefined){
        formstate = {...defaultformState}
    }

   
    const[newformState, setnewformState] = useState(formstate)
    const authToken = sessionStorage.getItem('token')

    function inputChangeHandler(e){
        const data = {...newformState}
        data[e.target.id] = e.target.value
        setnewformState(data)
    }

    function onsubmit(e){
        e.preventDefault()
        if(newformState.editMode){
            fetch('http://localhost:5000/edit-product',{
                headers : {
                     "Content-Type": "application/json",
                     Authorization: 'Bearer ' + authToken 
                      },
                method:'PUT',
                body:JSON.stringify(newformState)
            }).then(()=>setnewformState(defaultformState))
        }else{
            fetch('http://localhost:5000/add-product',{
                headers : { 
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + authToken
                },
                method:'POST',
                body:JSON.stringify(newformState)
            }).then(()=>setnewformState(defaultformState))
        } 
        alert("submitted")  
        navigate('/update-products')
    }
    function clearForm(){
        setnewformState(defaultformState)
        ctx.productforEdit = defaultformState
    }

    return <form onSubmit={(e)=>onsubmit(e)} className="product-form">
        <div className='form-control'>
            <label htmlFor="title">Title</label>
            <input onChange={(e)=>inputChangeHandler(e)} value={newformState.title} id="title"/>
        </div>
        <div className='form-control'>
            <label htmlFor="imgurl">Image Url</label>
            <input onChange={(e)=>inputChangeHandler(e)} value={newformState.imgUrl} id="imgUrl"/>
        </div>
        <div className='form-control'>
            <label htmlFor="price">Price</label>
            <input onChange={(e)=>inputChangeHandler(e)} value={newformState.price} type="number" id="price"/>
        </div>
        <div className='form-control'>
            <label htmlFor="desc">Description</label>
            <textarea onChange={(e)=>inputChangeHandler(e)} value={newformState.description} id="description" rows='5'/>
        </div>
        <button className="btn" type="submit">Submit</button>
        <button className="btn" onClick={clearForm} type="button">Clear</button>
    </form>
}
export default AddProduct