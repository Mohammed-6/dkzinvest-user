import axios from "axios";
const create = axios.create();
import { serverHeaders, serverURL } from "../../stuff";
import { aadharInformationProp, bankInformationProp, basicInformationProp, panInformationProp, profileInformationProp } from "../types/onboard";

export const onboardStatus = () => {
    return create.get(serverURL + "/c1/onboardStatus", {
      params: serverHeaders,
    });
  };

export const onboardBI = (data: basicInformationProp) => {
  return create.post(serverURL + "/c1/onboardBI", data, {
    params: serverHeaders,
  });
};

export const onboardAI = (data: aadharInformationProp) => {
  return create.post(serverURL + "/c1/onboardAI", data, {
    params: serverHeaders,
  });
};

export const uploadFile = (data: File) => {
  return create.post(
    serverURL + "/c1/upload-single",
    { attachment: data },
    {
      params: serverHeaders,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const onboardPI = (data: panInformationProp) => {
    return create.post(serverURL + "/c1/onboardPI", data, {
      params: serverHeaders,
    });
  };
  
export const onboardBankI = (data: bankInformationProp) => {
    return create.post(serverURL + "/c1/onboardBankI", data, {
      params: serverHeaders,
    });
  };
  
export const onboardProfileI = (data: profileInformationProp) => {
    return create.post(serverURL + "/c1/onboardProfileI", data, {
      params: serverHeaders,
    });
  };