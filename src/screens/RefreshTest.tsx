import { View, Button } from 'react-native'
import React from 'react'
import { AuthService } from '../services/AuthService';
import { CredentialDTO } from '../client/recruitBack';
import * as SecureStore from 'expo-secure-store';

export default function RefreshTest() {

  const authService = new AuthService;

  async function getJwt(): Promise<void> {
    // mettre vos login à la maint
    const login = new CredentialDTO({
      email: 'test@test.fr',
      password: '123'
    });

    try {
      const token = await authService.signIn(login as CredentialDTO);

      await SecureStore.setItemAsync('token', token.access_token);
      await SecureStore.setItemAsync('refreshToken', token.refresh_token);

      alert("c'est bon")
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function logJwt(): Promise<void> {
    const token = await SecureStore.getItemAsync('token');
    console.log('token', token);
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    console.log('secret token', refreshToken);
  }

  async function test(): Promise<void> {
    try {
      const result = await authService.test();
      alert(result)
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
  }

  return (
    <View>
      <Button
        title='get JWT'
        onPress={getJwt}
      />
      <Button
        title='Log JWT'
        onPress={logJwt}
      />
      <Button
        title='route test backend'
        onPress={test}
      />
    </View>
  )
}