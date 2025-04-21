import axios from "axios"

const apiDelivery = axios.create({
    baseURL:'https://rentserver-c73g.onrender.com/delivery',
    // baseURL:'http://localhost:3000/delivery',
    timeout: 5000,
    headers:{
        'Content-Type':'application/json'
    }
})

apiDelivery.interceptors.response.use(
    (response) =>{
        return response},
    (error) =>{
        return Promise.reject(error)}
)

export default apiDelivery;