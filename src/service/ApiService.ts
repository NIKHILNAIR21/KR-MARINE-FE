import * as api from "../../request";
interface LoginResponse {
  data: any;
  token: string;
  // Add other fields if needed
}

export const login = async (body: object): Promise<LoginResponse> => {
  const response = await api.PostReq(`/login`, body);
  return response as LoginResponse; // Ensure this is typed correctly
};

export const personal_info = async (body:object)=>{
  const response = await api.PostReq('/personal_infos',body);
  return response 
}