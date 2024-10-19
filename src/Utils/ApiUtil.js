import axios from "axios";

const baseUrl = "https://localhost:7236/api/";

export const Post = async (url, data) => {
  try {
    const response = await axios.post(baseUrl + url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Get = async (url) => {
  try {
    const response = await axios.get(baseUrl + url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Put = async (url, data = undefined) => {
  try {
    const finalUrl = baseUrl + url;
    const response = await axios.put(finalUrl, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
