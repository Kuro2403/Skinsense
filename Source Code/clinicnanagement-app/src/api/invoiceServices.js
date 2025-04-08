import axiosClient from '../helper/axiosClient';
import { jwt } from '../helper/JWTConfig';
const END_POINT = {
    CONTROLLER: 'Invoices',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const CreateInvoiceServices = (object) => {
    return axiosClient.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object, jwt);
}
export const GetAllInvoicesServices = () => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, jwt);
}
export const GetInvoiceServices = (id) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}/${id}`, jwt);
}
export const EditInvoiceServices = (id, object) => {
    return axiosClient.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object, jwt);
}
export const DeleteInvoiceServices = (id) => {
    return axiosClient.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, jwt);
}