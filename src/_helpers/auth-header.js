export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    sessionStorage.setItem('UserName', user.UserName);
    sessionStorage.setItem('accessToken', user.access_token);
    
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}