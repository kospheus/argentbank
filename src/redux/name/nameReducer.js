import { SET_NAME } from './nameActions.js';

// Reducer initial
const initialState = {
  firstName: '',
  lastName: '',
};

const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        firstName: action.payload,
        lastName: action.payload,
      };
    default:
      return state;
  }
};

export default nameReducer;