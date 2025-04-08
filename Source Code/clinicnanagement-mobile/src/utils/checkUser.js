import { GetAllAccountServices } from "../api/accountServices";
import { GetAllPatientServices } from "../api/patientServices";
import {GetAllRoleServices} from "../api/rolesServices";

export const getUserByMail = async (mail) => {
    try {
        const accounts = await GetAllAccountServices();
        const account = accounts.find(account => account.mail === mail);
        if (account) {
            return  getPatientById(account.accountID);
        }
    } catch (error) {
        return error;
    }

}
export const getPatientById = async (id) => {
    try { 
        const patients = await GetAllPatientServices();
        
        const patient = patients.find(patient => patient.accountID === id);
        
        if (patient) {
            return patient;
        }
    } catch (error) {
        return error;
    }
}
export const getIdUserByMail = async (mail) => {
    try {
        const accounts = await GetAllAccountServices();
        
        const account = accounts.find(account => account.mail === mail);
        if (account) {
            return account.accountID;
        }
    } catch (error) {
        return error;
    }

}
export const getAccountByMail = async(email) =>{
    try {
        const accounts = await GetAllAccountServices();
        
        const account = accounts.find(account => account.mail === email);
        if (account) {
            return account;
        }
    } catch (error) {
        return error;
    }
}
export const getIdRole = async (role_) => {
    try {
        const roles = await GetAllRoleServices();
        
        const role = roles.find(role => role.roleName === role_);
        if (role) {
            return role.roleID;
        }
    } catch (error) {
        return error;
    }

}