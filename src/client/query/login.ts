import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { loginProps } from '../types/login';

export const adminLogin = (data: loginProps) => {
    return create.post(serverURL + '/c1/login', data);
}
export const verifyotp = (data: loginProps) => {
    return create.post(serverURL + '/c1/verifyotp', data);
}
export const changePassword = (data: any) => {
    return create.post(serverURL + '/change-password', data, {params: serverHeaders});
}