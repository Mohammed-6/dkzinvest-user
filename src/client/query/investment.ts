import axios from "axios";
const create = axios.create();
import { serverHeaders, serverURL } from "../../stuff";

export const getInvestment = () => {
  return create.get(serverURL + "/c1/getInvestment", {
    params: serverHeaders,
  });
};

export const getInvest = (data:string) => {
  return create.get(serverURL + "/c1/getInvest/"+data, {
    params: serverHeaders,
  });
};