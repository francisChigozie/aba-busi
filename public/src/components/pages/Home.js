import React, {  useEffect, Fragment } from 'react'
import SearchComponent from './Search';
import Spinner from '../layout/Spinner'
import { useContacts, getShops } from '../../context/contact/ContactState';
import { Link } from 'react-router-dom'

const Shops = () => {

  const [contactState, contactDispatch] = useContacts();

  const { contacts } = contactState;

  useEffect(() => {
    getShops(contactDispatch);
  }, [contactDispatch]);

  
   if(!contacts){
    return <Spinner />
 }else{
   return (
     <div >
        <SearchComponent />
       <Fragment>
      <div className='grid-1'>
      {contacts.map((shop) => (
          <div className='card text-center' key={shop._id}>
               <h3>{shop.name}</h3>
                  <img
                  src={`img/${shop.imageCover}`}  alt='item cover'
                  className='round-img'
                  style={{width: '200px'}}/>
               <h3>{shop.summary}</h3>
             <div>
                <Link to={`/shop/${shop._id}`} 
                  className='btn btn-dark btn-sm my-1'>More
                </Link>
             </div>    
        </div>
            ))} 
      </div>
       </Fragment>

     </div>
   )
 }
}

export default Shops


/* import React, { Fragment, useEffect, useState } from 'react'
import Search from './Search'
//import Shops from '../shops/Shops'
//import ContactFilter from '../contacts/ContactFilter'
import ShopItems from './Items'
//import { Link } from 'react-router-dom'


const Home = () => {
// State to store some data
const [users, setUsers] = useState([]);
  

// Effect to fetch data when the component mounts
useEffect(() => {
  // Simulating a data fetch from an API
  const fetchData = async () => {
    try {
      const response = await fetch('/api/shops');
      const result = await response.json();
      console.log(setUsers(result))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function
  fetchData();

  // Clean-up function (optional)
  return () => {
    console.log('Component will unmount or dependency changed. Cleanup here.');
  };
}, []); // The empty dependency array means the effect runs only once, similar to componentDidMount

  return (

    
    <Fragment>
        <Search key={users.id}/> 
        <div className='grid-1'>
                {users.map((shop) => (
                  <ShopItems key={shop._id} shop={shop} shoId={shop.id}/>
                ))}
        </div>
   </Fragment> 
  )
}

export default Home */