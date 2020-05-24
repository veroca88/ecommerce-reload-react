import React, { Component } from 'react';
import SingleProduct from '../SingleProduct/SingleProduct';
import Search from "../Search/Search";
import { ProductContext } from '../context/ProductsProvider'
class ProductList extends Component {
    render() {
        return (
            <>
            <div className='py-5'>
                <Search handleSearchItems={this.handleSearchItems} />
                <div className='container'>
                    <div className='row'>
                        <ProductContext.Consumer>
                            {value => {
                                return value.productsList.map((eachProduct, index) => {
                                    return <SingleProduct key={index} eachProduct={eachProduct} />
                                })                                
                            }
                        }
                        </ProductContext.Consumer>                    

                    </div>

                </div>
            </div>
            </>
        );
    }
}

export default ProductList;