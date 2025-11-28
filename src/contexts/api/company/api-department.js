import LotusClient from "../lotus-api";

export const addDepartmentApi = async (data) => {
    try {
        const response = await LotusClient.post('/Department/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateDepartmentApi = async (data) => {
    try {
        const response = await LotusClient.put('/Department/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listDepartmentApi = async () => {
    try {
        const response = await LotusClient.get('/Department/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findDepartmentByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/Department/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}