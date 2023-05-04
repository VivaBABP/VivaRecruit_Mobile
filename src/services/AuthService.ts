import { CreateUserDTO } from './../client/recruitBack';
import { URL } from "@env";
import { AuthClient, CredentialDTO, TokenDTO } from "../client/recruitBack";
import axiosApiInstance from '../configuration/axiosInstance';

export class AuthService {
  private authClient = new AuthClient(URL)

  signIn(credential: CredentialDTO): Promise<TokenDTO> {  
    return this.authClient.signIn(credential);
  }

  signUp(createUser: CreateUserDTO): Promise<void> {
    return this.authClient.signUp(createUser);
  }

  test(): Promise<string> {
    const testClient = new AuthClient(URL, axiosApiInstance)
    return testClient.test();
  }
}