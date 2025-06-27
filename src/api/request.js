import axios from "axios";

const Request = axios.create({
  baseURL: "http://localhost:3001",
});

export default Request;
