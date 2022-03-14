import React, { PropsWithChildren, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./user/LoginScreen";
import AuthContext from "./user/AuthContext";
import Loading from "./Loading";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const auth = useContext(AuthContext);

  if (auth.status === 'idle' || auth.status === 'loading') {
    return <Loading/>
  }

  const initialRoute = (auth.user) ? "Home" : "Login"
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
