import axios from "./axios";
const END_POINT = {
    LOGINS: 'Logins',
    LOGIN: 'Login',
}
export const Login = (user) => {
    return axios.post(`/${END_POINT.LOGINS}/${END_POINT.LOGIN}`, user);
}