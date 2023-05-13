import { AuthControllerClient, CreateUserDTO } from './../client/recruitBack';
import { URL } from "@env";
import { CredentialDTO, TokenDTO, ValidationCodeDTO } from "../client/recruitBack";
import axiosApiInstance from '../configuration/axiosInstance';

export class AuthService {
  private authClient = new AuthControllerClient(URL);

  signIn(credential: CredentialDTO): Promise<TokenDTO> {  
    return this.authClient.login(credential);
  }

  signUp(createUser: CreateUserDTO): Promise<void> {
    return this.authClient.register(createUser);
  }

  validation(ValidationCode: ValidationCodeDTO): Promise<TokenDTO> {
    return this.authClient.emailValidation(ValidationCode);
  }
  
  test(): Promise<string> {
    const testClient = new AuthControllerClient(URL, axiosApiInstance)
    return testClient.test();
  }
}