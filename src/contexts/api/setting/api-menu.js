import LotusClient from "../lotus-api";

export const addMenuApi = async (data) => {
    try {
        const response = await LotusClient.post('/SMenu/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateMenuApi = async (data) => {
    try {
        const response = await LotusClient.put('/SMenu/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listMenuApi = async () => {
    try {
        const response = await LotusClient.get('/SMenu/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findMenuByIdApi = async (companyId) => {
    try {
        const response = await LotusClient.get(`/SMenu/${companyId}`);
        return response;
    } catch (error) {
        return error;
    }
}