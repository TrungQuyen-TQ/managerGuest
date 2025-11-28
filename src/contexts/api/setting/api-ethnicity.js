import LotusClient from "../lotus-api";

export const addEthnicApi = async (data) => {
    try {
        const response = await LotusClient.post('/Ethnic/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateEthnicApi = async (data) => {
    try {
        const response = await LotusClient.put('/Ethnic/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listEthnicApi = async () => {
    try {
        const response = await LotusClient.get('/Ethnic/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findEthnicByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/Ethnic/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}