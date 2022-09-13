import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import BoardSelectionScreen from "@/screens/BoardSelection";
// import CounterScreen from "@/screens/CounterScreen";
import FirstTimeScreen from "@/screens/FirstTime";
import BoardFeed from "@/screens/Main/BoardFeed";
import NewPost from "@/screens/Main/NewPost";
import Profile from "@/screens/Main/Profile";
import { RootStackParamList, RootTabParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name="Main"
          component={BottomTabNavigator}
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

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  // const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="BoardFeed"
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme].tint,
      // }}
    >
      <BottomTab.Screen
        name="BoardFeed"
        component={BoardFeed}
        options={{
          title: "Tab One  2 22  22  22  2 2",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bullhorn"
              color={color}
              size={30}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="NewPost"
        component={NewPost}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={color}
              size={30}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Tab Three",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="person"
              color={color}
              size={30}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default Navigation;
