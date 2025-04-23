import axios from "axios"

const apiReseñas = axios.create({
    baseURL:'https://rentserver-c73g.onrender.com/reviews',
    // baseURL:'http://localhost:3000/reviews',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

apiReseñas.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>{
        return Promise.reject(error)}
)

export default apiReseñas;