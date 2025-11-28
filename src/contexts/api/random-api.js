import { LotusRandomGenerate } from "./lotus-api";

export const GenerateApi = async (prefix, type) => {
    try {
        const response = await LotusRandomGenerate.get(`/RandomString/Generate?prefix=${prefix}&type=${type}`);
        return response;
    } catch (error) {
        return error;
    }
};