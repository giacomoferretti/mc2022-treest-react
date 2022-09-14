import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const Board = ({ onPress, name }: { onPress: VoidFunction; name: string }) => {
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
        <MaterialIcons name="arrow-forward" size={24} color="black" />
      </View>
    </Pressable>
  );
};

export default Board;
