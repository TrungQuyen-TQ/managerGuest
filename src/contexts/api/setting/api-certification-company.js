import LotusClient from "../lotus-api";

export const addCertificationCompanyApi = async (CertificationCompanyData) => {
    try {
        const response = await LotusClient.post('/CertificationCompany/insert', CertificationCompanyData);
        return response;
    } catch (error) {
        return error;
    }
}

export const listCertificationCompanyApi = async () => {
    try {
        const response = await LotusClient.get('/CertificationCompany/all?sortByExpression=creataleat desc');
        return response;
    } catch (error) {
        return error;
    }
}

export const findCertificationCompanyApi = async (CertificationCompanycompanyId) => {
    try {
        const response = await LotusClient.get(`/CertificationCompany/${CertificationCompanycompanyId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateCertificationCompanyApi = async (CertificationCompanyData) => {
    try {
        const response = await LotusClient.put('/CertificationCompany/update', CertificationCompanyData);
        return response;
    } catch (error) {
        return error;
    }
}