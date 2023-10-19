import React, { useState, useEffect } from 'react';
import './Global.css';
import Header from '../componants/header/headerAccount.js';
import AccountSection from '../componants/accountSection/accountSection.js';
import Footer from '../componants/footer/footer.js';
import { login } from '../redux/auth/authActions.js';
import authReducer from '../redux/auth/authReducer.js';
import {setName} from '../redux/name/nameActions.js';
import {EditNameModal} from '../componants/editNameModal/editNameModal'; // Importez le composant EditNameModal
import {useSelector, useDispatch} from 'react-redux';


function Account() {
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();
    const userRedux = useSelector(state => state.auth);
    const { firstName, lastName } = useSelector(state => state.name);


    //requete fetch
    const handleName = () => {

        // Effectuer la requête Fetch
        fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + (userRedux && userRedux.token), 
            },
        })
        .then((response) => response.json())
        .then(data => {
        // Traitez les données renvoyées par l'API
        console.log('Réponse de l\'API :', data);
        dispatch(setName(firstName, lastName));
        })
        .catch(error => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la requête Fetch :', error);
        });    
    };

    userRedux && handleName();
    
    useEffect(() => {
        if (user) {
            authReducer(null, login(JSON.parse(user).userName, JSON.parse(user).token));
            dispatch(login(JSON.parse(user).userName, JSON.parse(user).token));
        } else {
            document.location.href = '/sign-in';
        }
    }, []);
    

    const [isModalOpen, setModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState(JSON.parse(user).userName);

    const handleEditName = () => {
        setModalOpen(true);
    };

    const handleSaveName = () => {
        // Mettez à jour le nom de l'utilisateur ici (vous pouvez envoyer une requête au serveur si nécessaire)
        // Une fois que le nom est mis à jour, vous pouvez le stocker localement et fermer la modale
        setModalOpen(false);
        // Vous pouvez également envoyer une requête au serveur pour mettre à jour le nom ici
    };

    const handleCancelEdit = () => {
        // Annulez les modifications et fermez la modale
        setModalOpen(false);
        // Réinitialisez le nouveau nom à sa valeur précédente
        setNewUsername(JSON.parse(user).userName);
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