import React from 'react';
import { Link, Route } from 'react-router-dom';
import Product from './Product';

const Products = ({ match }) => {

const productData = [
    {
      id: 1,
      name: 'Banana',
      description: 'Yellow, possible brown spots included',
      status: 'Available'
    
    },
    {
      id: 2,
      name: 'Apple',
      description: 'Picked not far from the tree',
      status: 'Out of Stock'
    
    },
    {
      id: 3,
      name: 'Cucumber',
      description: 'Now with 40% more water!',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Pinecone',
      description: 'Ignore the evil whispers of the haunted pinecone',
      status: 'Out of Stock'
    },
    
    ];
    var linkList = productData.map( (product) => {
        return(
          <li key={product.id} >
            <Link to={`${match.url}/${product.id}`}>
              {product.name}
            </Link>
          </li>
          )
    
        })
//        console.log(linklist);
    
      return(
        <div>
            <div>
             <div>
               <h3> Products</h3>
               <ul> {linkList} </ul>
             </div>
            </div>
    
            <Route path={`${match.url}/:productId`}
                render={ (props) => <Product data= {productData} {...props} />}/>
            <Route exact path={match.url}
                render={() => (
                <div>Please select a product.</div>
                )}
            />
        </div>
      )
    }
  

 export default Products;