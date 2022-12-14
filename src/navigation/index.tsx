import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName } from "react-native";

import BoardSelectionScreen from "@/screens/BoardSelection";
import FirstTimeScreen from "@/screens/FirstTime";
import BoardFeed from "@/screens/Main/BoardFeed";
import NewPost from "@/screens/Main/NewPost";
import Profile from "@/screens/Main/Profile";
import MapDetails from "@/screens/MapDetails";
import { RootStackParamList, RootTabParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
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
        <Stack.Screen
          name="MapDetails"
          component={MapDetails}
          options={{ headerShown: false }}
        />
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
      screenOptions={{
        tabBarInactiveTintColor: "#42473E",
        tabBarActiveTintColor: "#121F0E", // Colors[colorScheme].tint,
        tabBarStyle: {
          height: 64, // 49 default
          backgroundColor: "#E7F1E1",
        },
        tabBarLabelStyle: {
          marginBottom: 8,
        },
      }}>
      <BottomTab.Screen
        name="BoardFeed"
        component={BoardFeed}
        options={{
          headerShown: false,
          title: "Feed",
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
          headerShown: false,
          title: "Nuovo",
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
          headerShown: false,
          title: "Profilo",
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
