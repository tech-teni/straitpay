import HttpService from "./httpServices";

export const getTasksService = async (payload) => {
  const http = new HttpService();
  try {
    const res = await http.getData();

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createTasksService = async (payload) => {
  const http = new HttpService();
  try {
    const res = await http.postData(payload);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const viewTaskService = async (id) => {
  const http = new HttpService();
  try {
    const res = await http.getDataById(id);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const editTaskService = async (payload, id) => {
  const http = new HttpService();
  try {
    const res = await http.editDataById(payload, id);

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTaskService = async (id) => {
  const http = new HttpService();
  try {
    const res = await http.deleteData(id);

    return res;
  } catch (err) {
    console.log(err);
  }
};
