  import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from "react-router";
import Spinner from '../layout/Spinner';
import axios from 'axios';

const UserComponent = (match) => {
  const [user, setUsers] = useState([]);
  const { id } = useParams()

   useEffect(() => {

    const fetchUsers = async () => {

      try {
       // const response = await fetch(`/api/shops/${id}`);
          await axios.get(`/api/shops/${id}`)
          .then((data) => {
        //console.log(data.data.data.shop)
        setUsers(data.data.data.shop)
        // eslint-disable-next-line
       })
       
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    // eslint-disable-next-line
    };
    fetchUsers();

    // eslint-disable-next-line
  }, [id]);
 

  if (!user) { 
    return <Spinner/>;
  }

  return (

    <Fragment>
      
 
      <div>
      <Link to='/' className='btn btn-light'>
    Back To Search
    </Link>
    Active: {' '}
    {user.active === 'true' ?
     <i className='fas fa-times-circle text-danger' /> : <i className='  fas fa-check text-success' />} 
     
    <div className='card grid-2'>
      <div className='all-center'>
        <img
          src={`/img/${user.imageCover}`} alt='item cover'
          className='round-img'
          style={{ width: '250px' }} />
        <h3>{user.name}</h3>
        <p><strong>Location</strong> : {''}{user.address}</p>
      </div>
      <div>
        <Fragment>
          <h4>Summary</h4>
          <p>{user.summary}</p>
        </Fragment>
        <a href='/about' className='btn btn-dark my-1'>Link</a>
        <ul>
          <li>
            <Fragment>
              <p><h5>Contact : {user.phone}</h5></p>
            </Fragment>
          </li>
          <li>
            <Fragment>
              <p><h5>E-Mail : {user.email}</h5></p>
            </Fragment>
          </li>
          <li>
            <Fragment>
              <p><h5>Website : {user.website}</h5></p>
            </Fragment>
          </li>
        </ul>
      </div>
    </div><div className='card text-center'>
        <div className='badge badge-success'><a className='call-style-w3 text-a'
          href={`tel:${user.contact}`}>WhatsApp</a></div>
        <div className='badge badge-primary'> <a href='https://de-de.facebook.com/login.php/'
          className='text-a'>Facebook</a></div>
        <div className='badge badge-danger'> <a href='https://www.instagram.com/explore/'
          className='text-a'>Instagram</a></div>
        <div className='badge badge-dark'> <a href='https://twitter.com/i/flow/login'
          className='text-a'>Twitter</a></div>
      </div>
    
     </div>
     

</Fragment>
  );

};

export default UserComponent;   