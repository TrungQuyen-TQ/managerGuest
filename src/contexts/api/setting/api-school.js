import LotusClient from "../lotus-api";

export const addSchoolApi = async (data) => {
    try {
        const response = await LotusClient.post('/School/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateSchoolApi = async (data) => {
    try {
        const response = await LotusClient.put('/School/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listSchoolApi = async () => {
    try {
        const response = await LotusClient.get('/School/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findSchoolByIdApi = async (schoolId) => {
    try {
        const response = await LotusClient.get(`/School/${schoolId}`);
        return response;
    } catch (error) {
        return error;
    }
}