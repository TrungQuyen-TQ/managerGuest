import LotusClient from "../lotus-api";

export const addSupplyTypeApi = async (supplyTypeData) => {
    try {
        const response = await LotusClient.post('/SupplySourceType/insert', supplyTypeData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listSupplyTypeApi = async () => {
    try {
        const response = await LotusClient.get('/SupplySourceType/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findSupplyTypeById = async (SupplyTypeId) => {
    try {
        const response = await LotusClient.get(`/SupplySourceType/${SupplyTypeId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateSupplyTypeApi = async (supplyTypeData) => {
    try {
        const response = await LotusClient.put('/SupplySourceType/update', supplyTypeData);
        return response;
    } catch (error) {
        return error;
    }
}   