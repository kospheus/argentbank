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

    //requete fetch
    const handleName = () => {

    // L'URL de l'API que vous souhaitez appeler
    const apiUrl = 'http://localhost:3001/api/v1/user/profile';

    // Options de la requête POST
    const requestOptions = {
      method: 'POST', // Méthode HTTP (POST pour une requête POST)
      headers: {
        'Content-Type': 'application/json', // Type de contenu de la requête (dans ce cas, JSON)
        'Authorization': 'Bearer ' + (userRedux && userRedux.token), 
      },
    };

    // Effectuer la requête Fetch
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué avec le code : ' + response.status);
        }
        return response.json(); // Analyse la réponse JSON
      })
      .then(data => {
        // Traitez les données renvoyées par l'API
        console.log('Réponse de l\'API :', data);
        // const user = { userName: username, token: data.body.token };
        console.log(data);
      })
      .catch(error => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la requête Fetch :', error);
      });   
      
  };

    userRedux && handleName();

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