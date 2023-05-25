import { URL } from '@env';
import { AccountsControllerClient, InformationStudentDTO, InformationUserDTO } from './../client/recruitBack';
import axiosApiInstance from '../configuration/axiosInstance';
export class AccountsService {
  private accountsControllerClient = new AccountsControllerClient(URL, axiosApiInstance)

  getStudents(): Promise<InformationStudentDTO[]> {
    return this.accountsControllerClient.getStudents();
  }

  updateInfoUser(info: InformationUserDTO): Promise<void> {
    return this.accountsControllerClient.addUserInformation(info);
  }
}