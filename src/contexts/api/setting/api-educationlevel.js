import LotusClient from "../lotus-api";

// Get all EducationLevel
export const listEducationLevelApi = async() => {
    try {
        const response = await LotusClient.get("/EducationLevel/all?sortByExpression=createdAt%20asc");
        return response;
    }
    catch(error) {
        return error;
    }
}

//Add EducationLevel
export const addEducationLevelApi = async(data) => {
    try {
        const respone = await LotusClient.post("/EducationLevel/insert",data);
        return respone;
    }
    catch(error) {
        return error;
    }
}

//Edit EducationLevel
export const editEducationLevelApi = async(data) => {
    try {
        const response = await LotusClient.put("/EducationLevel/update",data);
        return response;
    }
    catch(error) {
        return error;
    }
}

//Find EducationLevel by ID
export const findEducationLevelByIDApi = async (educationLevelId) => {
    try {
        const response = await LotusClient.get(`/EducationLevel/${educationLevelId}`);
        return response;
    } catch (error) {
        return error;
    }
}