import React from 'react';
import {useDispatch} from 'react-redux';
import {getUserName} from '../../redux/name/nameActions.js';


export const EditNameModal = ({ onCancel }) => {

  const dispatch = useDispatch();

  const handleCloseEdit = () => {
    onCancel();
  };

  const handleSaveName = () => {
    const newFirstName = document.querySelector('#firstName').value
    const newLastName = document.querySelector('#lastName').value
    if (newFirstName && newLastName) {
      dispatch(getUserName(newFirstName, newLastName));
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