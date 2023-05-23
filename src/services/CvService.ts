import { URL } from "@env";
import { CvControllerClient } from "../client/recruitBack";
import axiosApiInstance from "../configuration/axiosInstance";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

export default class CvService {
  private cvClient = new CvControllerClient(URL, axiosApiInstance)
  
  async getCv(id: number): Promise<any> {
    const token = await SecureStore.getItemAsync("token") as string;
    return axios.get(`${URL}/cv/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
}