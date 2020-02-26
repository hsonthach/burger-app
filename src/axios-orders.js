import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-8b24d.firebaseio.com/"
});

export default instance;
