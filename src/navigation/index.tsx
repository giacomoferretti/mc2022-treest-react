import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardFeed from "@/screens/BoardFeed";
import BoardSelectionScreen from "@/screens/BoardSelection";
// import CounterScreen from "@/screens/CounterScreen";
import FirstTimeScreen from "@/screens/FirstTime";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FirstTime"
          component={FirstTimeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BoardSelection"
          component={BoardSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BoardFeed"
          component={BoardFeed}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Counter"
          component={CounterScreen}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
