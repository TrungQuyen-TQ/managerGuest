import LotusClient from "../lotus-api";

export const addDocumentApi = async (paperData) => {
  try {
    const response = await LotusClient.post('/Paper/insert', paperData);
    return response;
  } catch (error) {
    return error;
  }
}

export const ListDocumentApi = async () => {
  try {
    const response = await LotusClient.get('/Paper/all?sortByExpression=creataleat desc');
    return response;
  } catch (error) {
    return error;
  }
}

export const updateDocumentApi = async (paperData) => {
  try {
    const response = await LotusClient.put('/Paper/update', paperData);
    return response;
  } catch (error) {
    return error;
  }
}

export const findDocumentByIdApi = async (paperId) => {
  try {
    const response = await LotusClient.get(`/Paper/${paperId}`);
    return response;
  } catch (error) {
    return error;
  }
}