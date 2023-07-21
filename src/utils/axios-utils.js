import axios from "axios";

const client = axios.create({baseURL: 'http://localhost:4000'})


//axios intercepter
export const request = ({...options})=>{
    client.defaults.headers.common.Authorization = `Bearer token`;
    const onSuccess = response => response;
    const onError = error =>{
        //optianally catch errors for logging e.t.c
        return error;
    } 
    
    return client(options).then(onSuccess).catch(onError);
}