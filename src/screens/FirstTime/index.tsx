import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import * as TreEstApi from "@/api/treest";
import { useGlobal } from "@/context/global.context";
import { RootStackParamList } from "@/types/navigation";
// import { LogoIcon } from "@/components/icons";
import { ConsoleLogger } from "@/utils/Logger";

const logger = new ConsoleLogger({ tag: "FirstTimeScreen" });

const FirstTimeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { sessionId, skipFirstTime, setSkipFirstTime } = useGlobal();

  const [name, setName] = useState("");

  const onPress = () => {
    logger.log("Go to next page with name =", name);

    TreEstApi.setProfile({
      sid: sessionId!,
      name: name,
    }).then(() => {
      setSkipFirstTime(true);
    });
  };

  useEffect(() => {
    if (skipFirstTime) {
      navigation.replace("BoardSelection");
    }
  }, [navigation, skipFirstTime]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"padding"}
      enabled={Platform.OS === "ios"}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        {/* Header */}
        {/* <LogoIcon
          fill="black"
          width={64}
          height={64}
          style={{ marginBottom: 16 }}
        /> */}
        <View>
          <MaterialIcons
            name="train"
            size={64}
            color="black"
            style={{ marginBottom: 16 }}
          />
        </View>
        <View>
          <Text style={styles.title}>Maledetta TreEst</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Benvenuto! Come ti dobbiamo chiamare?
          </Text>
        </View>

        {/* Name input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome utente"
            onChangeText={setName}
            value={name}
            maxLength={20}
          />
        </View>

        {/* TODO: Create reusable component */}
        {/* Button */}
        <Pressable
          style={name ? styles.button : styles.buttonDisabled}
          disabled={!name}
          onPress={onPress}>
          <Text style={styles.text}>Va bene così!</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    elevation: 0,
    backgroundColor: "black",
  },
  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    elevation: 0,
    backgroundColor: "gray",
  },
  text: {
    // fontSize: 16,
    // lineHeight: 21,
    // fontWeight: "bold",
    // letterSpacing: 0.25,
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  // button: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 4,
  //   elevation: 0,
  //   backgroundColor: "black",
  // },
  // text: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   fontWeight: "bold",
  //   letterSpacing: 0.25,
  //   color: "white",
  // },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default FirstTimeScreen;
