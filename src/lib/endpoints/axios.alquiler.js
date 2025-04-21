import axios from "axios"

const apiAlquiler = axios.create({
    baseURL:'https://rentserver-c73g.onrender.com/alquiler',
    // baseURL:'http://localhost:3000/alquiler',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

apiAlquiler.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>{
        return Promise.reject(error)}
)

export default apiAlquiler;