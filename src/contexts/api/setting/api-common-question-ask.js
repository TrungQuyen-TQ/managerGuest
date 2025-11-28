import LotusClient from "../lotus-api";

export const addCommonQuestionAskApi = async (data) => {
    try {
        const response = await LotusClient.post('/CommonQuestionAsk/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCommonQuestionAskApi = async (data) => {
    try {
        const response = await LotusClient.put('/CommonQuestionAsk/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCommonQuestionAskApi = async () => {
    try {
        const response = await LotusClient.get('/CommonQuestionAsk/all?sortByExpression=createdAt%20desc');
        return response;                        
    } catch (error) {
        return error;
    }
}

export const findCommonQuestionAskByIdApi = async (id) => {
    try {
        const response = await LotusClient.get(`/CommonQuestionAsk/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}