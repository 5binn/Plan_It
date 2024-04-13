import axios from "axios";


const loginInfo = axios.create({
  baseURL: 'http://localhost:8090/api/v1/users/me',
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json'
  },
})

export default loginInfo;