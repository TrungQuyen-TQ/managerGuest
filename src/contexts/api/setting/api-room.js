import LotusClient from "../lotus-api";

export const addRoomApi = async (data) => {
    try {
        console.log(data);
        const response = await LotusClient.post('/DomitoryRoom/insert', data);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateRoomApi = async (data) => {
    try {
        const response = await LotusClient.put('/DomitoryRoom/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listRoomApi = async () => {
    try {
        const response = await LotusClient.get('/DomitoryRoom/all?sortByExpression=createAt%20desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findRoomByIdApi = async (dormitoryRoomId) => {
    try {
        const response = await LotusClient.get(`/DomitoryRoom/${dormitoryRoomId}`);
        return response;
    } catch (error) {
        return error;
    }
}