import { GetAllAccountServices } from "../api/accountServices";
import { GetAllAppointment } from "../api/appointmentsServices";
import { GetDetailDoctorsServices } from "../api/detailDoctorServices";
import { GetAllDetailInvoicessServices } from "../api/detailInvoicesServices";
import { GetAllDetailSpecialistsServices } from "../api/detailSpecialistServices";
import { GetAllDoctorServices } from "../api/doctorServices";
import { GetsHistoryRoomClinicServices } from "../api/historyRoomClinicServices";
import { GetAllInvoicesServices } from "../api/invoiceServices";
import { GetAllMedicalReportServices } from "../api/medicalReportServices";
import { GetAllPatientsServices } from "../api/patientServices";
import { GetAllReportFromAiServices } from "../api/peportFromAiServices";
import { GetAllPrescriptionServices } from "../api/prescriptionServices";
export const GetDetailDoctorByDoctorID = async (doctorID) => {
    try {
        const data = await GetDetailDoctorsServices();
        const res = data.find(h => h.doctorID === doctorID);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}

export const GetDoctorByEmpID = async (employeeID) => {
    try {
        const data = await GetAllDoctorServices();
        const res = data.find(h => h.employeeID === employeeID);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}

export const checkLoggedIn = async () => {
    try {
        const token = sessionStorage.getItem('authorKey');
        return !!token;
    } catch (error) {
        return error;
    }
}
export const GetDoctorByAvailability = async () => {
    try {
        const data = await GetAllDoctorServices();
        const res = data.filter(h => h.availability === "Online");
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetDoctorBySpecialistID = async (id) => {
    try {
        const data = await GetAllDetailSpecialistsServices();
        const res = data.filter(h => h.specialistID === id);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}

export const GetHistoryRoomByRoomClinicID = async (id) => {
    try {
        const data = await GetsHistoryRoomClinicServices();
        const res = data.filter(h => h.roomClinicID === id);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}

export const GetDetaiSpecialistByDoctorID = async (id) => {
    try {
        const data = await GetAllDetailSpecialistsServices();
        const res = data.find(h => h.doctorID === id);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetPatientByPhone = async (id) => {
    try {
        const data = await GetAllPatientsServices();
        const res = data.find(h => h.phone === id);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const getDoctorNoSpecialist = async () => {
    try {
        const doctorList = await GetAllDoctorServices();
        const detailSpecialist = await GetAllDetailSpecialistsServices();
        const doctorsNotInSpecialist = doctorList.filter(doctor => {
            return !detailSpecialist.some(specialist => specialist.doctorID === doctor.doctorID);
        });
        if (doctorsNotInSpecialist != null)
            return doctorsNotInSpecialist;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
export const getDoctorHasLeftRoom = async () => {
    try {
        const data = await GetsHistoryRoomClinicServices();
        const doctorOut = data.filter(h => h.hasLeft === true);
        const doctorIn = data.filter(h => h.hasLeft === false);
        const doctorsNotInSpecialist = doctorOut.filter(doctor => {
            return !doctorIn.some(h => h.doctorID === doctor.doctorID);
        });
        if (doctorsNotInSpecialist != null)
            return doctorsNotInSpecialist;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
export const getCurrentDate = () => {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;
    var formattedDate = formattedDay + "/" + formattedMonth + "/" + year;
    return formattedDate;
}

export const getCurrentTime = () => {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    var formattedHours = hours < 10 ? "0" + hours : hours;
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedTime = formattedHours + ":" + formattedMinutes + " " + ampm;
    return formattedTime;
};

export const GetInfomationPatientByEmail = async (mail) => {
    try {
        const data = await GetAllPatientsServices();
        const res = data.find(h => h.account.mail.toLowerCase() === mail.toLowerCase());
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetAccountByEmail = async (mail) => {
    try {
        const data = await GetAllAccountServices();
        const res = data.find(h => h.mail.toLowerCase() === mail.toLowerCase());
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}

export const GetAppointmentByDoctorID = async (id) => {
    try {
        const data = await GetAllAppointment();
        const res = data.filter(h => h.doctorID === id);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetInvoiceByEmail = async (mail) => {
    try {
        const data = await GetAllInvoicesServices();
        const res = data.filter(h => h.patient.account.mail.toLowerCase() === mail.toLowerCase());
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetPatientByEmail = async (mail) => {
    try {
        const data = await GetAllPatientsServices();
        const res = data.find(h => h.account.mail.toLowerCase() === mail.toLowerCase());
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetReportFromAIByPatientID = async (id) => {
    try {
        const data = await GetAllReportFromAiServices();
        const res = data.filter(h => h.patientID === parseInt(id));
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetMedicalReportByPatientID = async (id) => {
    try {
        const data = await GetAllMedicalReportServices();
        const res = data.filter(h => h.patientID === parseInt(id));
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetAppointmentByPatientID = async (id) => {
    try {
        const data = await GetAllAppointment();
        const res = data.filter(h => h.patientID === id);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetDetailInvoiceByInvoiceID = async (id) => {
    try {
        const data = await GetAllDetailInvoicessServices();
        const res = data.filter(h => h.invoiceID === id);
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetInfomationDoctorByEmail = async (mail) => {
    try {
        const data = await GetAllDoctorServices();
        const res = data.find(h => h.employee.account.mail.toLowerCase() === mail.toLowerCase());
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}
export const GetPrescriptionByPatientID = async (id) => {
    try {
        const data = await GetAllPrescriptionServices();
        const res = data.filter(h => h.patientID === parseInt(id));
        if (res != null)
            return res;
    } catch (error) {
        return error;
    }
}