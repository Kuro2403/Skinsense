import axios from "./axios";
import { getJwtHeaders } from "../utils/utils";
const END_POINT = {
    CONTROLLER: 'ReportFromAis',
    ADD: 'Add',
    GET_ALL: 'Gets',
    GET_ID: 'Get',
    EDIT: 'Edit',
    DELETE: 'Delete',
}
export const GetAllReportFromAisServices = async() => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`, await getJwtHeaders());
}
export const GetReportFromAisServices = async(id) => {
    return axios.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}`, await getJwtHeaders());
}
export const CreateReportFromAisServices = async(object) => {
    return axios.post(`/${END_POINT.CONTROLLER}/${END_POINT.ADD}`, object,await getJwtHeaders());
}
export const EditReportFromAisServices = async(id, object) => {
    return axios.put(`/${END_POINT.CONTROLLER}/${END_POINT.EDIT}/${id}`, object,await getJwtHeaders());
}
export const DeleteReportFromAisServices = async(id) => {
    return axios.delete(`/${END_POINT.CONTROLLER}/${END_POINT.DELETE}/${id}`, await getJwtHeaders());
}