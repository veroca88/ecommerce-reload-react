import React from 'react'

export default function ProductOfCart({eachProduct, value}) {
  const { _id, name, size, color, image, cost, count, total } = eachProduct
  const {  addQuantity, subtractQuantity, deleteProduct } = value
    return (
        <>
        <div className='row my-2 text-center'>
          <div className='col-10 mx-auto col-lg-1'>
          <img
                    className="shop-bag-img img-fluid"
                    alt={name}
                    src={image}
                  ></img>
          </div>
          <div className='col-10 mx-auto col-lg-1'>
            <span className='d-lg-none'>Size: </span>
            {size}
          </div>
          <div className='col-10 mx-auto col-lg-1'>
          <span className='d-lg-none'>Size: </span>
            {color}         
         </div>
         <div className='col-10 mx-auto col-lg-1 my-2 my-lg-0'>
           <div className='snippet'>
             <div>
               <span className='snip btn-black mx-0' onClick={() => {subtractQuantity(_id)}}>-</span>
               <span className='snip btn-black mx-0'>{count}</span>
               <span className='snip btn-black mx-0' onClick={() => {addQuantity(_id)}}>+</span>
             </div>
           </div>         
         </div>
         <div className='col-10 mx-auto col-lg-1'>
         <span className='d-lg-none'>Price: </span>
            {cost}
         </div>
         <div className='col-10 mx-auto col-lg-1'>
         <div className='cart-icon' onClick={() => {deleteProduct(_id)}}>
         <i className="far fa-trash-alt"/>  
         </div>
         </div>
         <div className='col-10 mx-auto col-lg-1'>
           <strong>${(cost * count)}</strong>
         
         </div>

        </div>
        </>
    )
}
