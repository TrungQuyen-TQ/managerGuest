import LotusClient from "../lotus-api";

export const addEmigrarionGroupApi = async (data) => {
    try {
        const response = await LotusClient.post('/ExitGroup/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateEmigrarionGroupApi = async (data) => {
    try {
        const response = await LotusClient.put('/ExitGroup/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listEmigrarionGroupApi = async () => {
    try {
        const response = await LotusClient.get('/ExitGroup/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findEmigrarionGroupByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/ExitGroup/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}