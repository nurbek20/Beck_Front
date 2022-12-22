import axios from "axios";

axios.defaults.baseURL='http://localhost:5000/api/'

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/api/',
//     headers: {
//         'Content-Type': 'application'
//     }
// })

//? create users
const registerService = (data) => {
    return axios.post("auth/registration", data)
}
const loginService=(data)=>{
    return axios.post("auth/login", data)
}

//? Create todo list and get
const todoService=(text, userId)=>{
    return axios.post("todo/add", {text, userId})
}
const todoGet=()=>{
    return axios.get('todo')
}
const todoRemove=(id)=>{
    return axios.delete(`todo/delete/${id}`, id) 
}
const todoCompleted=(id)=>{
    return axios.patch(`todo/complete/${id}`, id)
}
const todoImportant=(id)=>{
    return axios.patch(`todo/important/${id}`, id)
}

const services = {
    registerService,
    loginService,
    todoService,
    todoGet,
    todoRemove,
    todoCompleted,
    todoImportant
}
export default services;