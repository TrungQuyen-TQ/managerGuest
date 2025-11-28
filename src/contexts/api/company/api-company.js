import LotusClient from "../lotus-api";

export const addCompanyApi = async (data) => {
    try {
        const response = await LotusClient.post('/Company/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCompanyApi = async (data) => {
    try {
        const response = await LotusClient.put('/Company/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCompanyApi = async () => {
    try {
        const response = await LotusClient.get('/Company/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findCompanyByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/Company/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}