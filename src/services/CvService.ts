import { URL } from "@env";
import { CvControllerClient } from "../client/recruitBack";
import axiosApiInstanceFormData from "../configuration/axiosInstanceFormData";
import { FileParameter } from "../client/recruitBack";

export default class CvService {
  private CvClient = new CvControllerClient(URL, axiosApiInstanceFormData)

  uploadCv(data: string, name: string): Promise<void> {
    const formData: FileParameter = {
      data: data,
      fileName: name
    }
    return this.CvClient.uploadCv(formData);
  }
}