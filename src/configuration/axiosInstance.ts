import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { URL } from '@env';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import { AuthControllerClient } from "../client/recruitBack";

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync("token") as string;
    config.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } as any
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await SecureStore.getItemAsync("refreshToken") as string;
    const refreshInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      }
    })
    try {
      const access_token = await new AuthControllerClient(URL, refreshInstance).refresh();
      await SecureStore.setItemAsync("token", access_token.access_token)
      await SecureStore.setItemAsync("refreshToken", access_token.refresh_token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token.access_token;
      return axiosApiInstance(originalRequest);
    } catch (error) {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
    }
  }
  return Promise.reject(error);
});

export default axiosApiInstance