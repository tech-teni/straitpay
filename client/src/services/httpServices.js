import axios from "axios";

class HttpService {
  constructor() {
    this.baseUrl = "https://api-straitpay-task-app.onrender.com";
  }

  getData = async (url) => {
    return axios.get(this.baseUrl);
  };
  getDataById = async (id) => {
    return axios.get(this.baseUrl + "/" + id);
  };

  editDataById = async (payload, id) => {
    return axios.put(this.baseUrl + "/" + id, payload);
  };
  postData = async (payload) => {
    return axios.post(`${this.baseUrl}`, payload);
  };

  deleteData = async (id) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.delete(this.baseUrl + "/" + id);
  };
}
export default HttpService;
