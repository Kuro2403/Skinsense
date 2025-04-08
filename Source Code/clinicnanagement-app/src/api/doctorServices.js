import axiosClient from '../helper/axiosClient';
import { jwt } from '../helper/JWTConfig';
const END_POINT = {
    CONTROLLER: 'Doctors',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const CreateDoctorServices = (object) => {
    return axiosClient.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object, jwt);
}
export const GetAllDoctorServices = () => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, jwt);
}
export const GetDoctorServices = (id) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}/${id}`, jwt);
}
export const EditDoctorServices = (id, object) => {
    return axiosClient.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object, jwt);
}
export const DeleteDoctorServices = (id) => {
    return axiosClient.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, jwt);
}