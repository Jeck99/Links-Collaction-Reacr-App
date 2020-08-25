import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    updateItem,
    postNewItem,
    deleteItem
};
const baseUrl = 'https://localhost:44323';

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json',  'Content-Type': 'application/json' },
    };
    return fetch(`${baseUrl}/users/Login?Email=${user.Email}&Password=${user.Password}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
function getAll(action) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${baseUrl}/api/${action}`, requestOptions).then(handleResponse);
}
function getById(action, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${baseUrl}/api/${action}${id}`, requestOptions).then(handleResponse);
}
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/users/register`, requestOptions).then(handleResponse);
}
function updateItem(action, item) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(`${baseUrl}/api/${action}/${item.id}`, requestOptions).then(handleResponse);;
}
function deleteItem(action, id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${baseUrl}/api/${action}/${id}`, requestOptions).then(handleResponse);
}
function postNewItem(action, item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(`${baseUrl}/api/${action}`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
