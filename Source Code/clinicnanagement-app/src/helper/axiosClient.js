import axios from "axios";

const instance = axios.create({
    // baseURL: "https://localhost:7244/api/v1/",
    baseURL: "https://clinicskinsense.com/api/v1/",
    timeout: 300000
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