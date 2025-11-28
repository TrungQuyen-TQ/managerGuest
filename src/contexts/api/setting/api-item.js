import LotusClient from "../lotus-api";

//Get all Item
export const listItemApi = async () => {
    try {
        const response = await LotusClient.get('/Assets/all?sortByExpression=createdAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

//Post a Item
export const addItemApi = async (data) => {
    try {
        const response = await LotusClient.post('/Assets/insert', data)
        return response;
    } catch(error) {
        return error;
    }
}

//Edit a Item 
export const editItemApi = async (data) => {
    try {
        const response = await LotusClient.put('/Assets/update',data)
        return response;
    } catch (error) {
        return error;
    }
}

// Get a Item by Id
export const findItemByIDApi = async (AssetsId) => {
    try {
        const response = await LotusClient.get(`/Assets/${AssetsId}`)
        return response;
    } catch (error) {
        return error;
    }
}

