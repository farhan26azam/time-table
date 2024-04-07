export const BASE_URL ="https://hiring-test-task.vercel.app/api"
let token = localStorage.getItem('token');
export const requestConfig = {

    Headers: [{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }],
    withCredentials: true,
    credentials: 'include'
}