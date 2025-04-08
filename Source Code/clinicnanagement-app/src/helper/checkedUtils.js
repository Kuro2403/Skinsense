import { GetAllAccountServices } from "../api/accountServices";
import { GetsRoomServices } from "../api/roomServices";
import { GetAllSpecialistsServices } from "../api/specicalistServices";

export const CheckDuplicate = async (mail) => {
    try {
        const accounts = await GetAllAccountServices();
        const duplicateAccount = accounts.find(account => account.mail === mail);
        if (duplicateAccount) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking duplicate email:', error);
        return false;
    }
}

export const CheckDuplicateNameRoom = async (name) => {
    try {
        const room = await GetsRoomServices();
        const check = room.find(h => h.roomName.toLowerCase() === name.toLowerCase());
        if (check) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking duplicate:', error);
        return false;
    }
}

export const CheckDuplicateNameSpecialist = async (name) => {
    try {
        const room = await GetAllSpecialistsServices();
        const check = room.find(h => h.specialistName.toLowerCase() === name.toLowerCase());
        if (check) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking duplicate:', error);
        return false;
    }
}

export const IsADMIN = async (mail) => {
    try {
        const data = await GetAllAccountServices();
        const res = data.find(h => h.mail === mail);
        if (res != null && res.role.roleName === 'Admin')
            return true;
        else
            return false;
    } catch (error) {
        return error;
    }
}