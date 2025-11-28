import LotusClient from "../lotus-api";

//Get all Major
export const listMajorApi = async () => {
    try {
        const response = await LotusClient.get('/Major/all?sortByExpression=createdAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

//Post a Major
export const addMajorApi = async (data) => {
    try {
        const response = await LotusClient.post('/Major/insert', data)
        return response;
    } catch(error) {
        return error;
    }
}

//Edit a Major 
export const editMajorApi = async (data) => {
    try {
        const response = await LotusClient.put('/Major/update',data)
        return response;
    } catch (error) {
        return error;
    }
}

// Get a Major by Id
export const findMajorByIDApi = async (MajorId) => {
    try {
        const response = await LotusClient.get(`/Major/${MajorId}`)
        return response;
    } catch (error) {
        return error;
    }
}

