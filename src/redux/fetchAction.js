export const FETCHACTION = "FETCHACTION";

export const fetchAction = (dataToSend) => {
    return (dispatch) => {
        
        // Options de la requête POST
        const requestOptions = {
            method: 'POST', // Méthode HTTP (POST pour une requête POST)
            headers: {
                'Content-Type': 'application/json', // Type de contenu de la requête (dans ce cas, JSON)
            },
            body: JSON.stringify(dataToSend), // Convertit les données en JSON
        };
        
        // Effectuer la requête Fetch
        fetch('http://localhost:3001/api/v1/user/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué avec le code : ' + response.status);
            }
            return response.json()
        })
        .then(res => {
            console.log(res)
            return dispatch({ type: FETCHACTION, payload: res.body })
        })
        .catch(error => {
            // Gérez les erreurs ici
            console.error('Erreur lors de la requête Fetch :', error);
        });
    }
}