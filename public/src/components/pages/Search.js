import React, { useState, useEffect } from 'react';
import { useContacts, getShops } from '../../context/contact/ContactState';
import { Link } from 'react-router-dom'

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [contactState, contactDispatch] = useContacts();

  const { contacts } = contactState;

  useEffect(() => {
    //getShops(contactDispatch);
    setUsers(contacts);
  }, [contactDispatch,contacts]);


 /*  useEffect(() => {
    // Fetch all users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/shops');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the fetchUsers function when the component mounts
  }, []); */

  useEffect(() => {
    // Filter users based on the search text
    const filteredResult = users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filteredResult);
  }, [searchText, users]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value );
  };

  return (
      <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type='text' placeholder='Search For Shops...' 
               onChange={handleSearchChange} />
          </form>
          <ul className='grid-1'>
              { searchText !== '' ? (
                  filteredUsers
                  .map(shop => (
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
                ))
                ) : ''
              }
            </ul>
      </div>
  );
};

export default SearchComponent;