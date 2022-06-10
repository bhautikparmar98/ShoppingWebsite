import './Products.css'
import {useState,useEffect, useRef} from 'react'
import Product from '../Product/Product';
import {BeatLoader} from 'react-spinners';
import {css} from '@emotion/react'

function Products(props){

    const [products,setproducts] = useState([])
    const [Loading, setLoading] =  useState(true)
    let [page,setpage] = useState()
    const ITEMS_PER_PAGE = 4;
    let [TOTAL_ITEMS,setTotalItems] = useState();
    const LoaderCss = css`
          margin-top:30px;
          `
     //fetching products from server
    
  const tempFetchfunction = useRef()
 
  const fetchProducts = ()=>{
    fetch('http://localhost:5000/?page='+page,{
      headers:{
        Authorization: 'Bearer ' + props.authToken
      }
    }).then(response=>{
      //here response.json() help to convert json onject to real object and it also return promise
      response.json().then((res)=>{
        setpage(res.currentPage)
        setTotalItems(res.totalItems)
        setproducts([...res.prods])
        setLoading(false)
      })
    })
  }
  tempFetchfunction.current = fetchProducts
    useEffect(()=>{
      tempFetchfunction.current()
    },[])

    const authToken = sessionStorage.getItem('token')
    function deleteProduct(pid){
        if(window.confirm('Are you Sure you want to Delete')){
            setproducts((products)=>{
                return products.filter(prod=>prod._id!==pid)
            })
            //delete from database also
            fetch('http://localhost:5000/delete',{
                    headers : { 
                      "Content-Type": "application/json",
                      Authorization: 'Bearer ' + authToken
                    },
                    method:'DELETE',
                    body:JSON.stringify({id:pid})
            }).then(response=>{
                
              })
        }
    }
    function incrementPage(){
      page++;
      setpage(page)
      setLoading(true)
      fetchProducts()
    }
    function decrementPage(){
      page--;
      setpage(page)
      setLoading(true)
      fetchProducts()
    }

    return (<main>
      {Loading && <div className='loading'><BeatLoader css={LoaderCss} size={25}  color='rgba(219, 64, 64, 0.794)'/></div>}
      {!Loading && <div className="grid">
            { products.map((product)=>
                <Product 
                 deleteProduct={deleteProduct}
                 id={product._id}
                 key={product._id}
                 title={product.title} 
                 price={product.price} 
                 description={product.description} 
                 imgUrl={product.imgUrl}/>
            )  
            }
        </div> }
        {!Loading && <section className='pagination'>
          <button disabled={page===1} onClick={decrementPage}>Previous</button>
          <button disabled={page===Math.ceil(TOTAL_ITEMS/ITEMS_PER_PAGE)} onClick={incrementPage}>Next</button>
        </section>}
    </main>)
}

export default Products