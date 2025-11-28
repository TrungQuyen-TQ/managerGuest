import LotusClient from "../lotus-api";

export const addVocabularyApi = async (data) => {
    try {
        const response = await LotusClient.post('/Vocalbulary/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateVocabularyApi = async (data) => {
    try {
        const response = await LotusClient.put('/Vocalbulary/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listVocabularyApi = async () => {
    try {
        const response = await LotusClient.get('/Vocalbulary/all?sortByExpression=CreatedAt desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findVocabularyByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/Vocalbulary/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}