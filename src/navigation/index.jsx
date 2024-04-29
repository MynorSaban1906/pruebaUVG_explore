import * as React from 'react';
import Inicio  from '../screens/Inicio';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dos from '../screens/dos';

const Stack = createNativeStackNavigator();

export const Navigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>


                <Stack.Screen name="Home" component={Inicio} options={{ headerShown: false }} />
                <Stack.Screen name="Dos" component={Dos} options={{ headerShown: false }} />



            </Stack.Navigator>
        </NavigationContainer>
    );
}