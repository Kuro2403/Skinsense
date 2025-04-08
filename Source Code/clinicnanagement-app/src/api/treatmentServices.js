import axiosClient from '../helper/axiosClient';
import { jwt } from '../helper/JWTConfig';
const END_POINT = {
    CONTROLLER: 'Treatments',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const CreateTreatmentServices = (object) => {
    return axiosClient.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object, jwt);
}
export const GetAllTreatmentsServices = () => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, jwt);
}
export const GetTreatmentServices = (id) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}/${id}`, jwt);
}
export const EditTreatmentServices = (id, object) => {
    return axiosClient.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object, jwt);
}
export const DeleteTreatmentServices = (id) => {
    return axiosClient.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, jwt);
}