import axios from 'axios';

const LotusClient = axios.create({
  baseURL: 'http://lotus.a.tisbase.online/api/v1',
  timeout: 8000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
  },
});

const UploadSingleImage = axios.create({
  baseURL: 'https://lotus.i.tisbase.online/api/v1/File/uploadSingle',
  timeout: 8000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
  },
});

const UploadMutipleImage = axios.create({
  baseURL: 'https://lotus.i.tisbase.online/api/v1/File/uploadMulti',
  timeout: 8000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
  },
});

const LotusRandomGenerate = axios.create({
  baseURL: 'http://random.a.tisbase.online/api',
  timeout: 8000,
  headers: {
    'Accept': 'text/plain',
  },
});

export {UploadSingleImage, UploadMutipleImage, LotusRandomGenerate}
export default LotusClient;