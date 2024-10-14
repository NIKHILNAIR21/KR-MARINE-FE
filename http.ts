import axios, {  AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getToken } from "./session";

// Create an instance of axios with a custom config
export const http = axios.create({
    baseURL: "http://localhost:3000",  // Update with your API base URL
});

// Add a request interceptor
http.interceptors.request.use(
    function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const token = getToken();
        if (token) {
            // Ensure headers are defined
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`,
            } as AxiosRequestHeaders;  // Assert type here
        }
        return config;
    },
    function (error: AxiosError): Promise<AxiosError> {
        return Promise.reject(error);  // Handle request errors
    }
);

// Add a response interceptor
http.interceptors.response.use(
    function (response: AxiosResponse): AxiosResponse {
        return response;  // Pass through successful responses
    },
    function (error: AxiosError): Promise<AxiosError | void> {
        const { response } = error;
        
        if (response) {
            if (response.status === 403 || response.status === 401) {
                // Clear session or storage when unauthorized
                localStorage.clear();
                sessionStorage.clear();

                if (response.status === 401) {
                    // Handle 401 Unauthorized
                    console.error("Unauthorized access - redirecting to login");
                    window.location.href = "/auth";  // Redirect to login page
                }
            }
            return Promise.reject(error);  // Reject other errors with response
        } else {
            // Handle network errors (no response)
           
            return Promise.reject(error);
        }
    }
);
