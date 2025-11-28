import { UploadSingleImage } from "./lotus-api";

export const uploadSingleFile = async (uploadDirectory, fileName) => {
    try {
        const data = {
            file: fileName
        }
        const response = await UploadSingleImage.post(`?uploadDirectory=${uploadDirectory}`, data);
        return response;
    } catch (error) {
        return error;
    }
};