import { Pressable, StyleSheet, Text, View } from "react-native";

import { Line } from "@/api/treest/types";
import { useGlobal } from "@/context/global.context";
import { ConsoleLogger } from "@/utils/Logger";

const logger = new ConsoleLogger({ tag: "LineSwitchButtons" });

export const LineSwitchButtons = ({ line }: { line: Line }) => {
  const { directionId, setDirectionId } = useGlobal();

  return (
    <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 16 }}>
      <Pressable
        onPress={() => setDirectionId(line.terminus1.did)}
        style={[
          styles.button,
          styles.buttonLeft,
          directionId === line.terminus1.did && styles.buttonSelected,
        ]}>
        <Text style={{ width: "100%", textAlign: "center" }} numberOfLines={1}>
          {line.terminus1.sname}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setDirectionId(line.terminus2.did)}
        style={[
          styles.button,
          styles.buttonRight,
          directionId === line.terminus2.did && styles.buttonSelected,
        ]}>
        <Text style={{ width: "100%", textAlign: "center" }} numberOfLines={1}>
          {line.terminus2.sname}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonSelected: {
    backgroundColor: "rgba(0, 110, 3, 0.2)",
  },
  buttonRight: {
    borderStartWidth: 0,
    borderTopEndRadius: 9999,
    borderBottomEndRadius: 9999,
  },
  buttonLeft: {
    borderTopStartRadius: 9999,
    borderBottomStartRadius: 9999,
  },
});
