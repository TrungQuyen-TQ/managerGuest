import LotusClient from "../lotus-api";

export const addStatusApi = async (data) => {
    try {
        const response = await LotusClient.post('/CommonStatus/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateStatusApi = async (data) => {
    try {
        const response = await LotusClient.put('/CommonStatus/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listStatusApi = async () => {
    try {
        const response = await LotusClient.get('/CommonStatus/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findStatusByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/CommonStatus/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const listStatusByAliasApi = async (alias) => {
    try {
        const response = await LotusClient.get(`/CommonStatus/by/${alias}`);
        return response;
    } catch (error) {
        return error;
    }
}