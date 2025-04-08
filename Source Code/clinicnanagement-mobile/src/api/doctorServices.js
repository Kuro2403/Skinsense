import axios from "./axios";
import { getJwtHeaders } from "../utils/utils";
const END_POINT = {
    CONTROLLER: 'Doctor',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const GetAllDoctorServices = async() => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, await getJwtHeaders());
}
export const GetDoctorServices = async(id) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}`, await getJwtHeaders());
}
export const CreateDoctorServices = async(object) => {
    return axios.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object,await getJwtHeaders());
}
export const EditDoctorServices = async(id, object) => {
    return axios.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object,await getJwtHeaders());
}
export const DeleteDoctorServices = async(id) => {
    return axios.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, await getJwtHeaders());
}