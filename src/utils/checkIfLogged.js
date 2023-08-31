export default function checkUserToken() {
    const userToken = localStorage.getItem('user-token');
    return !!(userToken && userToken !== 'undefined' && userToken.length === 68);
}