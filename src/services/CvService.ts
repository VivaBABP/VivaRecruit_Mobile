import { URL } from "@env";
import { CvControllerClient } from "../client/recruitBack";
import axiosApiInstanceFormData from "../configuration/axiosInstanceFormData";
import { FileParameter } from "../client/recruitBack";

export default class CvService {
  private CvClient = new CvControllerClient(URL, axiosApiInstanceFormData)

  uploadCv(data: string): Promise<void> {
    const formData: FileParameter = {
      data: data,
      fileName: 'File'
    }
    return this.CvClient.uploadCv(formData);
  }
}