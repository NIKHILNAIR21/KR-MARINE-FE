import * as req from "./http";

// Define a generic type for the API response
type ApiResponse<T = any> = T; 

export const PostReq = async (path: string, body: unknown): Promise<ApiResponse | void> => {
    try {
        let res = await req.http.post(path, body);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const PatchReq = async (path: string, body: unknown): Promise<ApiResponse | void> => {
    try {
        let res = await req.http.patch(path, body);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const GetReq = async (path: string): Promise<ApiResponse | void> => {
    try {
        let res = await req.http.get(path);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const PutReq = async (path: string, body: unknown): Promise<ApiResponse | void> => {
    try {
        let res = await req.http.put(path, body);
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const DelReq = async (path: string): Promise<ApiResponse | void> => {
    try {
        let res = await req.http.delete(path);
        return res;
    } catch (error) {
        console.error(error);
    }
};