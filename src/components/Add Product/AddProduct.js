import './addProduct.css'
function AddProduct(){
    return <form className="product-form">
        <div className='form-control'>
            <label htmlFor="title">Title</label>
            <input id="title"/>
        </div>
        <div className='form-control'>
            <label htmlFor="imgurl">Image Url</label>
            <input id="imgurl"/>
        </div>
        <div className='form-control'>
            <label htmlFor="price">Price</label>
            <input type="number" id="price"/>
        </div>
        <div className='form-control'>
            <label htmlFor="desc">Description</label>
            <textarea id="desc" rows='5'/>
        </div>
        <button className="btn" type="submit">Submit</button>
    </form>
}
export default AddProduct