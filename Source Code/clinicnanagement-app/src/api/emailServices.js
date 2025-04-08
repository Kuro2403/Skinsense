import axiosClient from '../helper/axiosClient';
const END_POINT = {
    CONTROLLER: 'Emails',
    Register: 'register-confirmed',
    ForgotPassword: 'forgotpassword-confirmed',
    AdminCreateEmployee: 'createEmployee-confirmed',
    ChangeEmail: 'changeEmail-confirmed',
    AppoimentConfirmed: 'appointments-confirmed',
}
export const RegisterServices = (toAddress) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.Register}/${toAddress}`);
}
export const ForgotPasswordServices = (toAddress) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.ForgotPassword}/${toAddress}`);
}
export const AdminCreateEmployeeServices = (toAddress, password) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.AdminCreateEmployee}/${toAddress}/${password}`);
}
export const changeEmailServices = (toAddress) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.ChangeEmail}/${toAddress}`);
}
export const AppoimentConfirmedServices = (object) => {
    return axiosClient.post(`/${END_POINT.CONTROLLER}/${END_POINT.AppoimentConfirmed}`, object);
}