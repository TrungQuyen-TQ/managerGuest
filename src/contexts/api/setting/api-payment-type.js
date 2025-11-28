import LotusClient from "../lotus-api";
export const addPaymentTypeApi = async (paymentTypeData) => {
    try {
        const response = await LotusClient.post('/PaymentType/insert', paymentTypeData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listPaymentTypeApi = async () => {
    try {
        const response = await LotusClient.get('/PaymentType/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findPaymentTypeByIdApi = async (paymenttypeId) => {
    try {
        const response = await LotusClient.get(`/PaymentType/${paymenttypeId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updatePaymentTypeApi = async (paymentTypeData) => {
    try {
        const response = await LotusClient.put('/PaymentType/update', paymentTypeData);
        return response;
    } catch (error) {
        return error;
    }
}

