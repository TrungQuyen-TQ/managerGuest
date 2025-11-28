import LotusClient from "../lotus-api";

//Get all Notification
export const listNotificationApi = async () => {
    try {
        const response = await LotusClient.get('/Message/all?sortByExpression=createdAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

//Post a Notification
export const addNotificationApi = async (data) => {
    try {
        const response = await LotusClient.post('/Message/insert', data)
        return response;
    } catch(error) {
        return error;
    }
}

//Edit a Notification 
export const editNotificationApi = async (data) => {
    try {
        const response = await LotusClient.put('/Message/update',data)
        return response;
    } catch (error) {
        return error;
    }
}

// Get a Notification by Id
export const findNotificationByIDApi = async (MessageId) => {
    try {
        const response = await LotusClient.get(`/Message/${MessageId}`)
        return response;
    } catch (error) {
        return error;
    }
}

