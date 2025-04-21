import axios from "axios"

const apiLogin = axios.create({
    baseURL:'https://rentserver-c73g.onrender.com',
    // baseURL:'http://localhost:3000',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

apiLogin.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>{
        return Promise.reject(error)}
)

export default apiLogin;