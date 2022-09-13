import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as TreEstApi from "@/api/treest";
import { Line } from "@/api/treest/types";
import { useGlobal } from "@/context/global.context";
import { RootStackParamList } from "@/types/navigation";

import { Board } from "./Board";

// {navigation,}: NativeStackScreenProps<RootStackParamList, "BoardSelection">
const BoardSelection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { sessionId, directionId, setDirectionId, setLineData } = useGlobal();
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    if (directionId) {
      navigation.replace("Main", { screen: "BoardFeed" });
    }
  }, [directionId, navigation]);

  useEffect(() => {
    console.log("BRUH");

    const load = async () => {
      const response = await TreEstApi.getLines({ sid: sessionId! });

      setLines(response.lines);
    };

    if (sessionId) {
      load().catch((error) => console.error(error));
    }
  }, [sessionId]);

  const renderItem: ListRenderItem<Line> = ({ item }) => {
    const lineName = `${item.terminus2.sname} - ${item.terminus1.sname}`;
    const invertedLineName = `${item.terminus1.sname} - ${item.terminus2.sname}`;

    const onPress = (directionId: number) => {
      setDirectionId(directionId);
      setLineData(item);

      navigation.replace("Main", { screen: "BoardFeed" });
    };

    return (
      <>
        <Board name={lineName} onPress={() => onPress(item.terminus1.did)} />
        <Board
          name={invertedLineName}
          onPress={() => onPress(item.terminus2.did)}
        />
      </>
    );
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
        <Text style={styles.title}>Benvenuto!</Text>
        <Text>Scegli una tratta tra le seguenti</Text>
      </View>
      {lines.length === 0 ? (
        <View>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={{ marginTop: 8 }}>Caricamento...</Text>
        </View>
      ) : (
        <FlatList
          style={{ width: "100%", paddingHorizontal: 16 }}
          data={lines}
          renderItem={renderItem}></FlatList>
      )}
    </SafeAreaView>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default BoardSelection;
