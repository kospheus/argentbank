import React, { useState } from 'react';
import './Global.css';
import Header from '../componants/header/headerAccount.js';
import AccountSection from '../componants/accountSection/accountSection.js';
import Footer from '../componants/footer/footer.js';
import { login } from '../redux/auth/authActions.js';
import authReducer from '../redux/auth/authReducer.js';
import store from "../redux/store";
import {EditNameModal} from '../componants/editNameModal/editNameModal'; // Importez le composant EditNameModal
import {useSelector} from 'react-redux';




function Account() {
    
    const user = localStorage.getItem('user');
    if (!user) {
        document.location.href = '/sign-in';
    }
    authReducer(null, login(JSON.parse(user).userName, JSON.parse(user).token));
    store.dispatch(login(JSON.parse(user).userName, JSON.parse(user).token));

    const userRedux = useSelector(state => state.authReducer);
    console.log(userRedux);

    const [isModalOpen, setModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState(JSON.parse(user).userName);

    const handleEditName = () => {
        setModalOpen(true);
    };

    const handleSaveName = () => {
        setModalOpen(false);
    };

    const handleCancelEdit = () => {
        setModalOpen(false);
        setNewUsername(JSON.parse(user).userName);
    };

    // Options de la requête POST
    const requestOptions = {
        method: 'POST', // Méthode HTTP (POST pour une requête POST)
        headers: {
        'Content-Type': 'application/json', // Type de contenu de la requête (dans ce cas, JSON)
        'Authorization': 'Bearer ' + (userRedux && userRedux.token), 
        },
    };

    
    // Effectuer la requête Fetch
    fetch('http://localhost:3001/api/v1/user/profile', requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Erreur lors de la requête Fetch :', error);
    }); 

    return (
        <>
            <Header />
            <main className="main bg-dark">
                <div className="header">
                    <h1>
                        Welcome back<br />
                        {JSON.parse(user).userName}
                    </h1>
                    <button className="edit-button" onClick={handleEditName}>
                        Edit Name
                    </button>
                    <div className='modal-container'>
                    {isModalOpen && (
                        <EditNameModal 
                            updateUserName={(newName) => setNewUsername(newName)}
                            onSave={handleSaveName}
                            onCancel={handleCancelEdit}
                        />
                    )}
                    </div>
                </div>
                <h2 className="sr-only">Accounts</h2>
                <AccountSection
                    title="Argent Bank Checking (x8349)"
                    amount="$2,082.79"
                    amountDescription="Available Balance"
                />
                <AccountSection
                    title="Argent Bank Savings (x6712)"
                    amount="$10,928.42"
                    amountDescription="Available Balance"
                />
                <AccountSection
                    title="Argent Bank Credit Card (x8349)"
                    amount="$184.30"
                    amountDescription="Current Balance"
                />
            </main>
            <Footer />
        </>
    );
}



export default Account;