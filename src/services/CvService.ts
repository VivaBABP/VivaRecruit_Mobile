import { URL } from "@env";
import { CvControllerClient } from "../client/recruitBack";
import axiosApiInstanceFormData from "../configuration/axiosInstanceFormData";
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

export default class CvService {
  private CvClient = new CvControllerClient(URL, axiosApiInstanceFormData)

  async uploadCv(data: string): Promise<any> {
    const token = await SecureStore.getItemAsync("token") as string;
    console.log(`${URL}/cv`);

    const test = await FileSystem.uploadAsync(`${URL}/cv`, data, {
      httpMethod: 'POST',
      fieldName: 'file',
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(test);
  }
}