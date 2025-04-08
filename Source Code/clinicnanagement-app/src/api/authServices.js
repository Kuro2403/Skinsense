import axiosClient from '../helper/axiosClient';
const END_POINT = {
    LOGINS: 'Logins',
    LOGIN: 'Login',
}
export const Login = (user) => {
    return axiosClient.post(`/${END_POINT.LOGINS}/${END_POINT.LOGIN}`, user);
}