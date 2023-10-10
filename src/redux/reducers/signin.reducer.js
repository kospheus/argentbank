const initialState = {
    username: '',
    token: '',
    isAuthenticated: false,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
            ...state,
            username: action.payload.userName, // Utilisez 'userName' ici
            token: action.payload.token,
            isAuthenticated: true,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;