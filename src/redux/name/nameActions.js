export const getUserName = (firstname, lastname) => ({
    type: 'GET_USERNAME',
    payload: { firstname, lastname,}
});