import HttpService from "./httpServices";

export const getTasks = async (payload) => {
  const http = new HttpService();
  try {
    const res = await http.getData();

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
