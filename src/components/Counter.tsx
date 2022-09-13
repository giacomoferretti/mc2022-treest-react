import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import useAsyncStorage from "@/hooks/useAsyncStorage";

type ButtonProps = PressableProps & {
  children: string;
};

const Button = (props: ButtonProps) => {
  const { style, children, ...rest } = props;

  return (
    <Pressable style={[styles.button, style as StyleProp<ViewStyle>]} {...rest}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

const Counter = () => {
  const [count, setCount] = useAsyncStorage<number>("count", 0);

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 48, fontWeight: "bold", marginBottom: 32 }}>
        {count}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button onPress={() => setCount((count) => count - 1)}>-1</Button>
        <View style={{ padding: 8 }} />
        <Button onPress={() => setCount((count) => count + 1)}>+1</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 72,
    height: 72,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default Counter;
