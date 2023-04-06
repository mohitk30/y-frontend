import axios from "axios"
const API_VERSION = "v1"
const BACKEND_URL = process.env.REACT_APP_HOST_BACKEND
 

export const register = (userDetails) => {
    return axios.post(`${BACKEND_URL}/${API_VERSION}/auth/register`,userDetails);
}

export const login = (userDetails) => {
    return axios.post(`${BACKEND_URL}/${API_VERSION}/auth/login`,userDetails);
}


export const addContact = (contactDetails) => {
 
    return   axios.post(`${BACKEND_URL}/${API_VERSION}/contact/add/`,contactDetails)
}

export const allContacts = () => {
 
    return   axios.get(`${BACKEND_URL}/${API_VERSION}/contact/all/`)
}
 
export const updateContact = (contactDetails) => {
 
    return   axios.post(`${BACKEND_URL}/${API_VERSION}/contact/update/`,contactDetails)
}

export const deleteContact = (contactDetails) => {
 
    return   axios.post(`${BACKEND_URL}/${API_VERSION}/contact/delete/`,contactDetails)
}

export const deleteMultipleContact = (contactDetails) => {
 
    return   axios.post(`${BACKEND_URL}/${API_VERSION}/contact/deleteMultiple/`,contactDetails)
}