import axios from "axios"

const apiJuegos = axios.create({
    baseURL:'https://rentserver-c73g.onrender.com/juegos',
    // baseURL:'http://localhost:3000/juegos',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

apiJuegos.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>{
        return Promise.reject(error)}
)

export default apiJuegos;