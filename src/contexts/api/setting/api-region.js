import LotusClient from "../lotus-api";

export const addRegionApi = async (regionData) => {
    try {
        const response = await LotusClient.post('/Position/insert', regionData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listRegionApi = async () => {
    try {
        const response = await LotusClient.get('/Position/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findRegionByIdApi = async (positionId) => {
    try {
        const response = await LotusClient.get(`/Position/${positionId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateRegionApi = async (regionData) => {
    try {
        const response = await LotusClient.put('/Position/update', regionData);
        return response;
    } catch (error) {
        return error;
    }
}

export const findRegionByMarketIdApi = async (marketId) => {
    try {
        const response = await LotusClient.get(`/Position/by/${marketId}`);
        return response;
    } catch (error) {
        return error;
    }
}
