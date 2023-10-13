const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  const outReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          user: null,
        };
      // ... d'autres cas de réduction
      default:
        return state;
    }
  };
  
  export default outReducer;