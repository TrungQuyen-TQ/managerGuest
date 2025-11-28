import LotusClient from "../lotus-api";

export const addCQACategoryApi = async (data) => {
    try {
        const response = await LotusClient.post('/CQACategory/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCQACategoryApi = async (data) => {
    try {
        const response = await LotusClient.put('/CQACategory/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCQACategoryApi = async () => {
    try {
        const response = await LotusClient.get('/CQACategory/all?sortByExpression=orderCategory%20asc');
        return response;                        
    } catch (error) {
        return error;
    }
}

export const findCQACategoryByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/CQACategory/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}