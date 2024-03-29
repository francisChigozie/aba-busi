import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import axios from 'axios';
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState';

const initialContact = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  address:'',
  type: 'business'
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { current } = contactState;

  const [contact, setContact] = useState(initialContact);
  
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, summary, address, imageCover, type } = contact; // imageCover,

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (name === '' || email === '' || phone === ''
     || summary === '' || address === '') {
      setAlert('Please enter required(*) informations', 'danger');
    }else if (current === null) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialContact)
      );
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Shop' : 'Add Shop'}
      </h2>
      <input
        type='text'
        placeholder='Name*'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email*'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone*'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Summary*'
        name='summary'
        value={summary}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Address*'
        name='address'
        value={address}
        onChange={onChange}
      />
      <h5>Shop Type</h5>
      <input
        type='radio'
        name='type'
        value='business'
        checked={type === 'business'}
        onChange={onChange}
      />{' '}
      Business{' '}
      <input
        type='radio'
        name='type'
        value='eshop'
        checked={type === 'eshop'}
        onChange={onChange}
      />{' '}
      E-Shop
      <div>
        <input
          type='submit'
          value={current ? 'Update Shop' : 'Add Shop'}
          className='btn btn-primary btn-block' 
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
       {/* <div>
          <button className='btn btn-primary btn-block' onClick={handleUpload}>
            Upload Photo
          </button>
        </div> */}
    </form>
  );
};

export default ContactForm;
