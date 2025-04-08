import axios from "./axios";
import { getJwtHeaders } from "../utils/utils";
const END_POINT = {
    CONTROLLER: 'Invoices',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const GetAllInvoicesServices = async() => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`,await getJwtHeaders());
}
export const GetInvoicesServices = async(id) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}/${id}`,await getJwtHeaders());
}