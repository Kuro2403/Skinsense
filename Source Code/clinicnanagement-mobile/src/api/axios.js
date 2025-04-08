import axios from 'axios';


const instance = axios.create({
    baseURL: "https://clinicskinsense.com/api/v1",
    timeout: 300000,
    withCredentials: true
})
instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return console.log(error)
    }
)
export default instance;