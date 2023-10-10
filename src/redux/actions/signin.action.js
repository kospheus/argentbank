
export const login = (username, password) => {
    return async (dispatch) => {
      try {
        // Les données que vous souhaitez envoyer
        const dataToSend = {
          password,
          email: username,
          // ... autres données
        };
  
        // L'URL de l'API que vous souhaitez appeler
        const apiUrl = 'http://localhost:3001/api/v1/user/login';
  
        // Options de la requête POST
        const requestOptions = {
          method: 'POST', // Méthode HTTP (POST pour une requête POST)
          headers: {
            'Content-Type': 'application/json', // Type de contenu de la requête (dans ce cas, JSON)
            // Ajoutez d'autres en-têtes si nécessaire
          },
          body: JSON.stringify(dataToSend), // Convertit les données en JSON
        };
  
        // Effectuer la requête Fetch
        const response = await fetch(apiUrl, requestOptions);
  
        if (!response.ok) {
          throw new Error('La requête a échoué avec le code : ' + response.status);
        }
  
        const data = await response.json();
  
        // Traitez les données renvoyées par l'API
        const user = { userName: username, token: data.body.token };
        localStorage.setItem('user', JSON.stringify(user));
  
        // Dispatchez l'action pour mettre à jour l'état Redux
        dispatch({
          type: 'LOGIN',
          payload: { username, token: data.body.token },
        });
        
        // Redirigez l'utilisateur vers la page 'account'
        document.location.href = '/account';
      } catch (error) {
        // Gérez les erreurs ici
        console.error('Erreur lors de la requête Fetch :', error);
      }
    };
  };
  
  
  