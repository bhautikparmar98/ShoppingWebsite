import './Products.css'

import Product from '../Product/Product';

function Products(props){
    
    return (<main>
        <div className="grid">
            { props.products.map((product)=>
                <Product 
                 id={product.id}
                 key={product.id}
                 title={product.title} 
                 price={product.price} 
                 description={product.description} 
                 imgUrl={product.imgUrl}/>
            )  
            }
        </div>
    </main>)
}

export default Products