import { GET_USERNAME } from './nameActions.js';

// Reducer initial
const initialState = {
  firstName: '',
  lastName: '',
};

const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME:
      return action.payload
    default:
      return state;
  }
};

export default nameReducer;