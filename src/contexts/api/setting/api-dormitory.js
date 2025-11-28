import LotusClient from "../lotus-api";

export const addDormitoryApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/Dormitory/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateDormitoryApi = async (data) => {
    try {
        const response = await LotusClient.put('/Dormitory/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listDormitoryApi = async () => {
    try {
        const response = await LotusClient.get('/Dormitory/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findDormitoryByIdApi = async (dormitoryId) => {
    try {
        const response = await LotusClient.get(`/Dormitory/${dormitoryId}`);
        return response;
    } catch (error) {
        return error;
    }
}