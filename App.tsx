import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { metrics, tabHeaderStyles } from "./src/utils/metrics";
import { colors } from "./src/utils/colors";
import { getCurrentUser, logOut } from "./src/utils/helpers";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    user && setIsLoggedIn(true);
  }, []);

  const signout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          logOut(setIsLoggedIn);
        },
      },
    ]);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {!isLoggedIn ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false,
                animationTypeForReplace: !isLoggedIn ? "pop" : "push",
              }}
            >
              {(props) => (
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                ...tabHeaderStyles,
                headerBackVisible: true,
                headerRight: () => (
                  <TouchableOpacity onPress={signout}>
                    <Text style={styles.headerLeft}>Logout</Text>
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    color: colors.black,
    fontSize: metrics.width * 0.043,
    fontWeight: "400",
  },
});
