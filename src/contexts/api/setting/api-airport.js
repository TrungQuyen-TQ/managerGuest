import LotusClient from "../lotus-api";

export const addAirPortApi = async (airportData) => {
    try {
        const response = await LotusClient.post('/Airport/insert', airportData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listAirPortApi = async () => {
    try {
        const response = await LotusClient.get('/Airport/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findAirPortByIdApi = async (airportId) => {
    try {
        const response = await LotusClient.get(`/Airport/${airportId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateAirPortApi = async (airportData) => {
    try {
        const response = await LotusClient.put("/Airport/update", airportData);
        return response;
    } catch (error) {
        return error;
    }
}   