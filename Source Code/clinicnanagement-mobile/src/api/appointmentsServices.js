import axios from "./axios";
import { getJwtHeaders } from "../utils/utils";
const END_POINT = {
    CONTROLLER: 'Appointments',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const GetAllAppointment = async() => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, await getJwtHeaders());
}
export const deleteAppointment = async(id) => {
    return axios.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, await getJwtHeaders());
}