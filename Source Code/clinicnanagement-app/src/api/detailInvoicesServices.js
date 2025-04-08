import axiosClient from '../helper/axiosClient';
import { jwt } from '../helper/JWTConfig';
const END_POINT = {
    CONTROLLER: 'DetailInvoices',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const CreateDetailInvoicesServices = (object) => {
    return axiosClient.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object, jwt);
}
export const GetAllDetailInvoicessServices = () => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, jwt);
}
export const GetDetailInvoicesServices = (id) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}/${id}`, jwt);
}
export const EditDetailInvoicesServices = (id, object) => {
    return axiosClient.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object, jwt);
}
export const DeleteDetailInvoicesServices = (id) => {
    return axiosClient.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, jwt);
}