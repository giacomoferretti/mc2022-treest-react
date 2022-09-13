import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Line, Terminus } from "types";

import * as TreEstApi from "@/api/treest";
import { ArrowForwardIcon } from "@/components/icons";
import { useGlobal } from "@/context/global.context";
import { logger } from "@/utils/Logger";

const Board = ({
  name,
  directionId,
}: {
  name: string;
  directionId: number;
}) => {
  const navigation = useNavigation();

  const onPress = () => {
    logger.log("[          Board]", "Clicked on", name, directionId);
    navigation.navigate("BoardFeed" as never, { directionId } as never);
  };

  return (
    <Pressable
      style={{
        width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
        marginVertical: 8,
      }}
      onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1 }}>{name}</Text>
        <ArrowForwardIcon fill="black" height={24} width={24} />
      </View>
    </Pressable>
  );
};

const BoardSelection = ({ navigation }: any) => {
  const renderItem: ListRenderItem<Line> = ({ item }) => {
    const lineName = `${item.terminus2.sname} - ${item.terminus1.sname}`;
    const invertedLineName = `${item.terminus1.sname} - ${item.terminus2.sname}`;

    return (
      <>
        <Board name={lineName} directionId={item.terminus1.did} />
        <Board name={invertedLineName} directionId={item.terminus2.did} />
      </>
    );
  };

  const { sessionId } = useGlobal();

  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const load = async () => {
      if (sessionId) {
        const response = await TreEstApi.getLines(sessionId);

        setLines(response.lines);
      }
    };

    load().catch((error) => console.error(error));
  }, [sessionId]);

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
      <FlatList
        style={{ width: "100%", paddingHorizontal: 16 }}
        data={lines}
        renderItem={renderItem}></FlatList>
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
