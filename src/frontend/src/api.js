import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getData = async () => {
    const response = await api.get("/data");
    return response.data;
};

export const postData = async (data) => {
    const response = await api.post("/data", data);
    return response.data;
};
