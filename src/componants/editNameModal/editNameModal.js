import React from 'react';
import {useDispatch} from 'react-redux';
import {getUserName} from '../../redux/name/nameActions.js';


export const EditNameModal = ({ onCancel }) => {

  const dispatch = useDispatch();

  const handleCloseEdit = () => {
    onCancel();
  };

  const handleSaveName = () => {
    const user = JSON.parse(localStorage.getItem('user')).token;
    console.log(user);
    const newFirstName = document.querySelector('#firstName').value
    const newLastName = document.querySelector('#lastName').value
    if (newFirstName && newLastName) {

      fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + user, 
            },
            body: JSON.stringify({
              firstName: newFirstName,
              lastName: newLastName,
            }),
        })
        .then((response) => response.json())
        .then(data => {
          dispatch(getUserName(newFirstName, newLastName));
        })
        .catch(error => {
        console.error('Erreur lors de la requête Fetch :', error);
        });    
      handleCloseEdit();
    } 
  };

  const inputStyle = {
    marginBottom: '4px'
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p className="modal-text">New Name</p>
        <section>
          <p className="input-text">First Name</p>
          <input
            id='firstName'
            type="text"
            style={inputStyle}
          />
        </section>
        <section>
          <p className="input-text">Last Name</p>
          <input
            id='lastName'
            type="text"
          />
        </section>
        <div className="modal-buttons">
          <button className='modal-button1'onClick={handleSaveName}>
            Save
          </button>
          <button className="modal-button2" onClick={handleCloseEdit}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};