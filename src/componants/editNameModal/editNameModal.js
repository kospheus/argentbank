import React, { useState } from 'react';
import store from '../../redux/store';

export const EditNameModal = ({ userName, onSave, onCancel }) => {
  const [newName, setNewName] = useState(userName);

  const handleSaveName = () => {
    // Appelez la fonction onSave avec le nouveau nom
    onSave(newName);
  };

  const handleCancelEdit = () => {
    // Appelez la fonction onCancel pour annuler la modification
    onCancel();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p className="modal-text">Saisissez votre nouveau nom</p>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="modal-button1" onClick={handleSaveName}>
            Save
          </button>
          <button className="modal-button2" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};