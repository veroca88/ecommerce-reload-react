
import React from 'react'
import { ProductContext } from '../context/ProductsProvider'

export default function Search() {
  return (
      <div className='search'>
        <ProductContext.Consumer>
          {(context) => {
            const { handleSearchItems } = context;
            return (

              <input
              onChange={handleSearchItems}
              id="search"
              name="search"
              placeholder="Search Products"
              style={{ width: "50%" }}
              />
              )
          }}
        </ProductContext.Consumer>
      </div>
  )
}

