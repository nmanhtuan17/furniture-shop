import axios from "axios";
import { toast } from "react-toastify";

const API_URL = 'http://127.0.0.1:8000/api'

class ApiService {
  axiosInstance = axios.create({
    baseURL: API_URL,
  });

  async post(endpoint, data, options = {}) {
    return this.callApi("POST", endpoint, data, options);
  }

  async get(endpoint, data, config = {}) {
    return this.callApi("GET", endpoint, data, config);
  }

  async put(endpoint, data, options = {}) {
    return this.callApi("PUT", endpoint, data, options);
  }

  async delete(endpoint, data) {
    return this.callApi("DELETE", endpoint, data);
  }

  async callApi(method, endpoint, data = {}, config) {
    try {
      const r = await this.axiosInstance({
        method,
        url: endpoint,
        ...config,
        data: method.toLowerCase() === "get" ? undefined : data,
        headers: {
          ...(config?.headers || {})
        },
      });
      return r.data;
    } catch (e) {
      toast.error('Failed!!')
      if (e.response) {
        if (e.response.data) throw e.response.data;
        throw e.response;
      } else {
        throw e;
      }
    }
  }
}

export default new ApiService();