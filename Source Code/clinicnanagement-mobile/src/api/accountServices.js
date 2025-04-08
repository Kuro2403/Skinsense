import axios from "./axios";
import { getJwtHeaders } from "../utils/utils";
const END_POINT = {
    CONTROLLER: 'Accounts',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const GetAllAccountServices = () => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`);
}
export const GetAccountServices = (id) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}/${id}`);
}
export const CreateAccountServices = (object) => {
    return axios.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object);
}
export const EditAccountServices = (id, object) => {
    return axios.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object);
}
export const DeleteAccountServices = async(id) => {
    return axios.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, await getJwtHeaders());
}