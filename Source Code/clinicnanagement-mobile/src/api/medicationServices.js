import axios from "./axios";
import { getJwtHeaders } from "../utils/utils";
const END_POINT = {
    CONTROLLER: 'Medications',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const GetAllMedicationServices = async() => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, await getJwtHeaders());
}
export const GetMedicationServices = async(id) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}`, await getJwtHeaders());
}
export const CreateMedicationServices = async(object) => {
    return axios.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object,await getJwtHeaders());
}
export const EditMedicationServices = async(id, object) => {
    return axios.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object,await getJwtHeaders());
}
export const DeleteMedicationServices = async(id) => {
    return axios.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, await getJwtHeaders());
}