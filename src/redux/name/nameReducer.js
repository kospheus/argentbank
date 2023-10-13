const initialState = {
    userName: '', // L'état initial du nom d'utilisateur
    // ...autres propriétés d'état
  };
  
  const nameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USERNAME':
        return {
          ...state,
          userName: action.payload,
        };
      // ...d'autres cas pour d'autres actions
      default:
        return state;
    }
  };
  
  export default nameReducer;