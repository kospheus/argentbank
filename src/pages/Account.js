import React, { useState, useEffect } from 'react';
import './Global.css';
import Header from '../componants/header/headerAccount.js';
import AccountSection from '../componants/accountSection/accountSection.js';
import Footer from '../componants/footer/footer.js';
import { login } from '../redux/auth/authActions.js';
import authReducer from '../redux/auth/authReducer.js';
import {getUserName} from '../redux/name/nameActions.js';
import {EditNameModal} from '../componants/editNameModal/editNameModal'; // Importez le composant EditNameModal
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'; 


function Account() {

    const navigate = useNavigate(); // Obtenez la fonction de navigation

    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
    const firstName = useSelector(state => state.name.firstname);
    const lastName = useSelector(state => state.name.lastname);
    
    //requete fetch
    const handleName = (user) => {

        // Requête Fetch
        fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', 
              // Utilisation du token dans l'authorization
              'Authorization': 'Bearer ' + user, 
            },
        })
        .then((response) => response.json())
        .then(data => {
        console.log('Réponse de l\'API :', data);
        // Envoi du prénom et du nom dans Redux
        dispatch(getUserName(data.body.firstName, data.body.lastName));
        })
        .catch(error => {
        console.error('Erreur lors de la requête Fetch :', error);
        });    
    };
    
    useEffect(() => {
        if (user) {
            authReducer(null, login(JSON.parse(user).userName, JSON.parse(user).token));
            dispatch(login(JSON.parse(user).userName, JSON.parse(user).token));
            handleName(JSON.parse(user).token);
        } else {
            navigate('/sign-in');
            document.location.href = '/sign-in';
        }
    }, []);
    

    const [isModalOpen, setModalOpen] = useState(false);

    const handleEditName = () => {
        setModalOpen(true);
    };

    const handleSaveName = () => {
        setModalOpen(false);
    };

    const handleCancelEdit = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Header />
            <main className="main bg-dark">
                <div className="header">
                    <h1>
                        Welcome back<br />
                        {firstName} {lastName} 
                    </h1>
                    <button className="edit-button" onClick={handleEditName}>
                        Edit Name
                    </button>
                    <div className='modal-container'>
                    {isModalOpen && (
                        <EditNameModal 
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