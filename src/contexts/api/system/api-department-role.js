import LotusClient from "../lotus-api";


export const addDepartmentRoleApi = async (data) => {
    try {
        const response = await LotusClient.post('/DepartmentRole/insert', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateDepartmentRoleApi = async (data) => {
    try {
        const response = await LotusClient.put('/DepartmentRole/update', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const listDepartmentRoleApi = async () => {
    try {
        const response = await LotusClient.get('/DepartmentRole/all?sortByExpression=departmentRoleId');
        return response;
    } catch (error) {
        return error;
    }
}

export const findByDepartmentRoleIdApi = async (departmentRoleId) => {
    try {
        const response = await LotusClient.get(`/DepartmentRole/detail/${departmentRoleId}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const findByDepartmentIdApi = async (departmentId) => {
    try {
        const response = await LotusClient.get(`/DepartmentRole/${departmentId}`);
        return response;
    } catch (error) {
        return error;
    }
}