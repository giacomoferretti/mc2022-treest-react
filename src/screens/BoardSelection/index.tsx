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
import { useMainGlobal } from "@/context/global.context";
import { RootStackParamList } from "@/types/navigation";

import Board from "./Board";

const BoardSelection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { sessionId, directionId, setDirectionId, setLineData } =
    useMainGlobal();
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    if (directionId) {
      navigation.replace("Main", { screen: "BoardFeed" });
    }
  }, [directionId, navigation]);

  useEffect(() => {
    const load = async () => {
      const response = await TreEstApi.getLines({ sid: sessionId });
      setLines(response);
    };

    load().catch((error) => console.error(error));
  }, [sessionId]);

  const renderItem: ListRenderItem<Line> = ({ item }) => {
    const lineName = `${item.terminus2.sname} - ${item.terminus1.sname}`;
    const invertedLineName = `${item.terminus1.sname} - ${item.terminus2.sname}`;

    const onPressBoard = (directionId: number) => {
      setDirectionId(directionId);
      setLineData(item);
    };

    return (
      <>
        <Board
          name={lineName}
          onPress={() => onPressBoard(item.terminus1.did)}
        />
        <Board
          name={invertedLineName}
          onPress={() => onPressBoard(item.terminus2.did)}
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
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default BoardSelection;
