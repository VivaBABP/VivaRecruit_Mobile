import { URL } from "@env";
import { CvControllerClient } from "../client/recruitBack";
import axiosApiInstance from "../configuration/axiosInstance";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import * as FileSystem from 'expo-file-system';

export default class CvService {

  private cvClient = new CvControllerClient(URL, axiosApiInstance)
  
  async getCv(id: number): Promise<string> {
    const filePath = `${FileSystem.documentDirectory}${id}.pdf`;
    const token = await SecureStore.getItemAsync("token") as string;
    const result = await FileSystem.downloadAsync(
      `${URL}/cv/${id}`,
      filePath,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    return result.uri;
  }

  async uploadCv(data: string): Promise<any> {
    const token = await SecureStore.getItemAsync("token") as string;
    return await FileSystem.uploadAsync(`${URL}/cv`, data, {
      httpMethod: 'POST',
      fieldName: 'file',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  ifExist(): Promise<Boolean> {
    return this.cvClient.exist();
  }
}