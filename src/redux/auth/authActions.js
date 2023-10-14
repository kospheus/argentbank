

export const login = (username, token) => ({
    type: 'LOGIN',
    payload: { username, token },
});
  

  
export const changeUserName = (userName) => ({
    type: 'CHANGE_USERNAME',
    payload: userName,
});

