import axios from "axios"

const apiUsers = axios.create({
    baseURL:'https://rentserver-c73g.onrender.com/users',
    // baseURL:'http://localhost:3000/users',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

apiUsers.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>{
        return Promise.reject(error)}
)

export default apiUsers;