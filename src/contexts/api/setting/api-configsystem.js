import LotusClient from "../lotus-api";

//Get all ConfigSystem
export const listConfigSystemApi = async () => {
    try {
        const response = await LotusClient.get('ConfigSystem/all?sortByExpression=createdAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

//Post a ConfigSystem
export const addConfigSystemApi = async (data) => {
    try {
        const response = await LotusClient.post('/ConfigSystem/insert', data)
        return response;
    } catch(error) {
        return error;
    }
}

//Edit a ConfigSystem 
export const editConfigSystemApi = async (data) => {
    try {
        const response = await LotusClient.put('/ConfigSystem/update',data)
        return response;
    } catch (error) {
        return error;
    }
}

// Get a ConfigSystem by Id
export const findConfigSystemByIDApi = async (ConfigSystemId) => {
    try {
        const response = await LotusClient.get(`/ConfigSystem/${ConfigSystemId}`)
        return response;
    } catch (error) {
        return error;
    }
}

