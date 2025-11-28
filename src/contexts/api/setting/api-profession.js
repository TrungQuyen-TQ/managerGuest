import LotusClient from "../lotus-api";

// Get all profession
export const listProfessionApi = async() => {
    try {
        const response = await LotusClient.get("/Job/all?sortByExpression=createdAt%20desc");
        return response;
    }
    catch(error) {
        return error;
    }
}

//Add profession
export const addProfessionApi = async(data) => {
    try {
        const respone = await LotusClient.post("/Job/insert",data);
        return respone;
    }
    catch(error) {
        return error;
    }
}

//Edit profession
export const editProfessionApi = async(data) => {
    try {
        const response = await LotusClient.put("/Job/update",data);
        return response;
    }
    catch(error) {
        return error;
    }
}

//Find profession by ID
export const findProfessionByIDApi = async (jobId) => {
    try {
        const response = await LotusClient.get(`/Job/${jobId}`);
        return response;
    } catch (error) {
        return error;
    }
}