import LotusClient from "../lotus-api";

// Get all Market
export const listMarketApi = async () => {
    try {
        const response = await LotusClient.get("/Market/all?sortByExpression=Field1");
        return response;
    }
    catch (error) {
        return error;
    }
}

// Add Market
export const addMarketApi = async (data) => {
    try {
        const response = await LotusClient.post('/Market/insert', data);
        return response;
    }
    catch (error) {
        return error;
    }
}

//Edit Market
export const editMarketApi = async (data) => {
    try {
        const response = await LotusClient.put("/Market/update", data);
        return response;
    }
    catch (error) {
        return error;
    }
}

//Find Market by ID
export const findMarketByIDApi = async (marketId) => {
    try {
        const response = await LotusClient.get(`/Market/${marketId}`);
        return response;
    } catch (error) {
        return error;
    }
}
