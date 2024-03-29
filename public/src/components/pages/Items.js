import React from 'react'
import { Link } from 'react-router-dom'

const ShopItems = (props) =>{

  const { name, imageCover,  summary, id } = props.shop

    return (
      <div className='card text-center'>
        <h3>{name}</h3>
       <img
         src={`img/${imageCover}`}  alt='item cover'
         className='round-img'
         style={{width: '200px'}}/>
         <h3>{summary}</h3>

         <div>
          <Link to={`/shop/${id}`} className='btn btn-dark btn-sm my-1'>More</Link>
         </div>
      </div>
    )
  
}

export default ShopItems