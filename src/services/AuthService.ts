import { CreateUserDTO } from './../client/recruitBack';
import { URL } from "@env";
import { AuthClient, CredentialDTO, TokenDTO } from "../client/recruitBack";

export class AuthService {
  private authClient = new AuthClient(URL)

  signIn(credential: CredentialDTO): Promise<TokenDTO> {
    return this.authClient.signIn(credential);
  }

  signUp(createUser: CreateUserDTO): Promise<TokenDTO> {
    return this.authClient.signUp(createUser);
  }
}