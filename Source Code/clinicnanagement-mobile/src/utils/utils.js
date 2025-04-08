import { _storeData,_retrieveData } from "./AsyncStoreService";


async function getJwtToken() {
    try {
        const token = await _retrieveData('jwtToken');
        return token;
    } catch (error) {
        console.error("Error retrieving jwtToken:", error);
        return null;
    }
}

export async function getJwtHeaders() {
    const token = await getJwtToken();

    if (token) {
        const jwtHeaders = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return jwtHeaders;
    } else {
        console.log("JWT Token not available.");
        return null;
    }
}
