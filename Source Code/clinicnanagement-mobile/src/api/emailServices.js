import axios from "./axios";
import { getJwtHeaders } from "../utils/utils";
const END_POINT = {
    CONTROLLER: 'Emails',
    Register: 'register-confirmed',
    ForgotPassword: 'forgotpassword-confirmed',
    AdminCreateEmployee: 'createEmployee-confirmed',
}
export const RegisterServices = async(toAddress) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.Register}/${toAddress}`,await getJwtHeaders());
}
export const ForgotPasswordServices = async(toAddress) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.ForgotPassword}/${toAddress}`,await getJwtHeaders());
}
export const AdminCreateEmployeeServices = async(toAddress, password) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.AdminCreateEmployee}/${toAddress}/${password}`,await getJwtHeaders());
}