import LotusClient from "../lotus-api";

export const addOrganApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/Office/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateOrganApi = async (data) => {
    try {
        const response = await LotusClient.put('/Office/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listOrganApi = async () => {
    try {
        const response = await LotusClient.get('/Office/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findOrganByIdApi = async (officeId) => {
    try {
        const response = await LotusClient.get(`/Office/${officeId}`);
        return response;
    } catch (error) {
        return error;
    }
}