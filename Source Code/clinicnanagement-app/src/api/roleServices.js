import axiosClient from '../helper/axiosClient';
const END_POINT = {
    CONTROLLER: 'Roles',
    GET_ALL: 'Gets',
    GET_ID: 'Get'
}
export const GetRoles = () => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ALL}`);
}
export const GetRoleServices = (id) => {
    return axiosClient.get(`/${END_POINT.CONTROLLER}/${END_POINT.GET_ID}/${id}`);
}