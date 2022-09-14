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

  const onNextPage = () => {
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
        <Pressable
          style={[styles.button, !name && { backgroundColor: "gray" }]}
          disabled={!name}
          onPress={onNextPage}>
          <Text style={{ color: "white" }}>Va bene così!</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    elevation: 0,
    backgroundColor: "#006E03",
  },
});

export default FirstTimeScreen;
