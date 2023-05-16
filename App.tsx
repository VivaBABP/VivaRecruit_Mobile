import React, {useEffect, useMemo, useReducer} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator, {AppNavigatorNotRecruit} from './src/navigations/AppNavigator';
import {IAction} from "./src/interfaces/IAction";
import * as SecureStore from 'expo-secure-store';
import {TokenDTO} from "./src/client/recruitBack";
import {AuthContext} from "./src/context/AuthContext";
import { NavigationContainer } from '@react-navigation/native';
import {AuthNavigator} from "./src/navigations/AuthNavigator";
import AppNavigatorRecruit from "./src/navigations/AppNavigator";
import * as jwtDecode from "jwt-decode";

export default function App() {

    const [state, dispatch] = useReducer(
        (prevState: any, action: IAction) => {
            /*if(action.type != 'DISCONNECT') {
                let role= false;
                jwtDecode.default(action.token as string).then((res)=>{role = res.role})
            }*/
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        token: action.token,
                        isLoading: false,
                    };
                case 'LOGIN':
                    return {
                        ...prevState,
                        isSignout: false,
                        token: action.token,
                    };
                case 'DISCONNECT':
                    return {
                        ...prevState,
                        isSignout: true,
                        token: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            token: null,
        }
    );


    useEffect(() => {
        async function bootstrapAsync() {
            let token: string | null;
            try {
                token = await SecureStore.getItemAsync("token");
                console.log(token);
            } catch (error) {
                alert(error)
                token = null;
            }
            dispatch({type: 'RESTORE_TOKEN', token: token})
        }
        bootstrapAsync();
        console.log(state);
    }, [])



    const authContext = useMemo(() => ({
            async login(data: TokenDTO) {
                await SecureStore.setItemAsync("token", data.access_token)
                await SecureStore.setItemAsync("refreshToken", data.refresh_token)
                dispatch({ type: 'LOGIN', token: data.access_token });
            },
            async disconnect() {
                await SecureStore.deleteItemAsync("token");
                await SecureStore.deleteItemAsync("refreshToken");
                dispatch({ type: 'DISCONNECT', token: null })
            }
        }),
        [])

    return (
        <SafeAreaProvider>
            <PaperProvider>
                <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {
                        state.isSignout ? <AuthNavigator/> : ( state.token) ? <AppNavigatorRecruit/> : <AppNavigatorNotRecruit/>
                    }
                </NavigationContainer>
                </AuthContext.Provider>
            </PaperProvider>
        </SafeAreaProvider>
    );
}


