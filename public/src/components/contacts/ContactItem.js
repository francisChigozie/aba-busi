import React, { useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  useContacts,
  setCurrent
} from '../../context/contact/ContactState';

const ContactItem = ({ contact }) => {
  // we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];
  
  const { _id, name, email, phone, imageCover, summary, type } = contact;

  const handleDeleteUser = async () => {
      await axios.delete(`/api/auth/${_id}`);
      window.location.reload();
  };

  const [selectedFile, setSelectedFile] = useState(null);
  //const [progress, setProgress] = useState({ started: false, pc:0 });
  const [msg, setMsg] = useState(null);

  /* const handleFileChange = (event) => {
    setSelectedFile(event.target.files);
    <input type='file' multiple></input>
  }; */

   const handleUpload = async () => {

    if(!selectedFile){
      setMsg('Select File Below !')
      return
    }

    const fd = new FormData();
    fd.append('file', selectedFile);
    //console.log(fd)
    
          /* const fd = new FormData();
          for(let i=0;i < files.length; i++){
            fd.append(`file${i+1}`, files[i])
          } */

          setMsg('Uploading....')
          /* setProgress(prevState => {
            return{...prevState, started: true}
          }) */
      // Send the image file to the server using fetch or any HTTP client library
      axios.patch(`/api/shops/${_id}/image`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((res) => { 
        setMsg('Successful! Refresh The page')
        setSelectedFile({file: res.data.file})
        //console.log(res.data)
      }) 

      //window.location.reload()
      .catch(err => {
        setMsg('Upload Failed !');
        console.error(err)
      })
      
     // await axios.put(`/api/shops/${_id}/photo`)
     /**
      * /*  onUploadProgrss:(ProgressEvent) => { setProgress(prevState => {
          return {...prevState, pc: ProgressEvent.proress*100}
        })}, */
      
    
  };

  return ( 

    <div className='card bg-light'>
     <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'eshop' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {imageCover && (
            <li>
              <img
                src={`img/${imageCover}`}  alt='item cover'
                className='round-img'
                style={{width: '100px'}}
              /> 
            </li>
          )}
          {email && (
            <li>
              <i className='fas fa-envelope-open' /> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className='fas fa-phone' /> {phone}
            </li>
          )}
          {summary && (
            <li>
              <i className='fas fa-id-card-alt' /> {summary}
            </li>
          )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contactDispatch, contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={handleDeleteUser} >
          Delete
        </button>

        <button  className='btn btn-dark btn-sm ' style={{ float: 'right' }}
           onClick={handleUpload}>
           Change Shop Photo
        </button>

        {/* {progress.started && <progress max={100}
          value={progress.pc}></progress>} */}
        {msg && <span>{msg}</span>}
      </p>
      <div className=''>
      <input
          type="file" onChange={(e) => setSelectedFile(e.target.files[0])}   
        />
        </div>
    </div> 
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem; 
