import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

import * as TreEstApi from "@/api/treest";
import { DelayDisplayValue, StatusDisplayValue } from "@/api/treest/objects";
import { Delay, Status } from "@/api/treest/types";
import { useGlobal } from "@/context/global.context";

const NewPost = () => {
  const { sessionId, directionId, lineData } = useGlobal();

  const [comment, setComment] = useState<string | undefined>();
  const [delay, setDelay] = useState<Delay | undefined>();
  const [status, setStatus] = useState<Status | undefined>();

  const submitPost = () => {
    if (!comment || !delay || !status) {
      Toast.show("Devi compilare almeno un campo.", {
        duration: Toast.durations.LONG,
      });
      return;
    }

    TreEstApi.addPost({
      sid: sessionId!,
      did: directionId!,
      comment,
      delay,
      status,
    }).then(() => {
      Toast.show("Request failed to send.", {
        duration: Toast.durations.LONG,
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 32,
        }}>
        <Text style={styles.title}>Che succede?</Text>
        <Text>Stai pubblicando in: {lineData?.terminus1.sname}</Text>
      </View>

      <View style={{ width: "100%" }}>
        <TextInput
          style={styles.input}
          placeholder="Commento"
          onChangeText={setComment}
          value={comment}
          maxLength={100}
        />
      </View>

      <View style={{ flexDirection: "row", width: "100%", marginTop: 16 }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            borderWidth: 1,
            borderRadius: 4,
          }}>
          <Picker
            mode="dropdown"
            selectedValue={status}
            itemStyle={{ padding: 12 }}
            onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
            <Picker.Item
              label="Stato"
              value={undefined}
              style={{ color: "gray" }}
            />
            <Picker.Item
              label={StatusDisplayValue[Status.Ideal]}
              value={Status.Ideal}
            />
            <Picker.Item
              label={StatusDisplayValue[Status.Acceptable]}
              value={Status.Acceptable}
            />
            <Picker.Item
              label={StatusDisplayValue[Status.HasProblems]}
              value={Status.HasProblems}
            />
          </Picker>
        </View>

        <View
          style={{
            flex: 1,
            marginEnd: 16,
            borderWidth: 1,
            borderRadius: 4,
          }}>
          <Picker
            mode="dropdown"
            selectedValue={delay}
            itemStyle={{ padding: 12 }}
            onValueChange={(itemValue, itemIndex) => setDelay(itemValue)}>
            <Picker.Item
              label="Ritardo"
              value={undefined}
              style={{ color: "gray" }}
            />
            <Picker.Item
              label={DelayDisplayValue[Delay.OnTime]}
              value={Delay.OnTime}
            />
            <Picker.Item
              label={DelayDisplayValue[Delay.Minor]}
              value={Delay.Minor}
            />
            <Picker.Item
              label={DelayDisplayValue[Delay.Major]}
              value={Delay.Major}
            />
            <Picker.Item
              label={DelayDisplayValue[Delay.Cancelled]}
              value={Delay.Cancelled}
            />
          </Picker>
        </View>
      </View>

      <Pressable
        onPress={submitPost}
        style={[styles.button, { marginTop: 16 }]}>
        <Text style={styles.text}>Va bene così!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
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
  text: {
    // fontSize: 16,
    // lineHeight: 21,
    // fontWeight: "bold",
    // letterSpacing: 0.25,
    color: "white",
  },
});

export default NewPost;
