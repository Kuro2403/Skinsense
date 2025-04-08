export const validateEmail = (value) => {
    const Regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!value) {
        return 'Please enter an email!';
    }
    if (!value.match(Regex)) {
        return 'Please enter a valid email address!';
    }
    return '';
};

export const validateName = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the name!';
    }
    return '';
};

export const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    if (!value || value.trim() === '') {
        return 'Please enter phone number!';
    }
    if (!phoneRegex.test(value)) {
        return 'Please enter a valid 10-digit phone number!';
    }
    return '';
};

export const validateAddress = (value) => {
    const addressRegex = /^[A-Za-z0-9\-,'/' ]*$/;
    if (!value || value.trim() === '') {
        return 'Please enter address!';
    }
    if (!addressRegex.test(value)) {
        return 'Please enter a valid address containing only letters, numbers, hyphen, slash and comma!';
    }
    return '';
};

export const validateGender = (value) => {
    const Regex = /^(male|female|other)$/i;
    if (!value || value.trim() === '') {
        return 'Please enter a gender!';
    }
    if (!value.match(Regex)) {
        return 'Please enter a valid gender (Male, Female or Orther)!';
    }
    return '';
};

export const validateSpecialty = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the specialty!';
    }
    return '';
};

export const validateHospital = (value) => {
    if (!value || value.trim() === '') {
        return 'List hospitals where they have worked, if not applicable, state `not applicable`';
    }
    return '';
};

export const validateYOE = (value) => {
    const Regex = /^(60|\d{1,2})$/;
    if (!value || value.trim() === '') {
        return 'Please enter a year of experience!';
    }
    if (!value.match(Regex)) {
        return 'Please enter a number year of experience 0 - 60!';
    }
    return '';
};

export const validateAvailability = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the availability!';
    }
    return '';
};

export const validateMedication = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the medication name!';
    }
    return '';
};

export const validateDosage = (value) => {
    const Regex = /^[1-9]\d*$/;
    if (!value || value.trim() === '') {
        return 'Please enter the dosage!';
    }
    if (!value.match(Regex)) {
        return 'Please enter a number a greater than 0!';
    }
    return '';
};

export const validatePrice = (value) => {
    const Regex = /^[1-9]\d*$/;
    if (!value || value.trim() === '') {
        return 'Please enter the price!';
    }
    if (!value.match(Regex)) {
        return 'Please enter a number a greater than 0!';
    }
    return '';
};

export const validateTreatmentName = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the treatment name!';
    }
    return '';
};

export const validateDescription = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the description!';
    }
    return '';
};

export const validateCost = (value) => {
    const Regex = /^[1-9]\d*$/;
    if (!value || value.trim() === '') {
        return 'Please enter the cost!';
    }
    if (!value.match(Regex)) {
        return 'Please enter a number a greater than 0!';
    }
    return '';
};

export const validateRoomName = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the room name!';
    }
    return '';
};

export const validateSpecialistName = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the specialist name!';
    }
    return '';
};

export const validatePatientPhone = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the phone number of patient!';
    }
    return '';
};

export const validateTitle = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the title of news!';
    }
    return '';
};

export const validateContext = (value) => {
    if (!value || value.trim() === '') {
        return 'Please enter the new context of news!';
    }
    return '';
};