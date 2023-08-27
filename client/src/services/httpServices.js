import axios from "axios";

class HttpService {
  constructor() {
    this.baseUrl = "https://api-straitpay-task-app.onrender.com";
  }

  getData = async (url) => {
    return axios.get(this.baseUrl);
  };

  postData = async (payload, url) => {
    return axios.post(`${this.baseUrl}`, payload);
  };

  deleteData = async (url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.delete(this.baseUrl + url, {
      headers: { Authorization: AuthStr },
    });
  };
}
export default HttpService;
