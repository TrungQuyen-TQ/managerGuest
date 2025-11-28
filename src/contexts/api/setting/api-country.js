import LotusClient from "../lotus-api";

export const addCountryApi = async (countryData) => {
    try {
        const response = await LotusClient.post('/Country/insert', countryData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCountryApi = async () => {
    try {
        const response = await LotusClient.get('/Country/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findCountryByIdApi = async (carId) => {
    try {
        const response = await LotusClient.get(`/Country/${carId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCountryApi = async (countryData) => {
    try {
        const response = await LotusClient.put("/Country/update", countryData)
        return response;
    } catch (error) {
        return error;
    }
}