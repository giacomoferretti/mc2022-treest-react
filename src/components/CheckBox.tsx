import { StyleProp, ViewStyle } from "react-native";
import { Pressable, StyleSheet } from "react-native";

type CheckBoxProps = {
  checked: boolean;
  onChange: (value: boolean) => void; // React.Dispatch<React.SetStateAction<boolean>>;
  checkedComponent: React.ReactNode;
  uncheckedComponent: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const CheckBox = ({
  checked,
  onChange,
  checkedComponent,
  uncheckedComponent,
  style,
}: CheckBoxProps) => {
  const onPress = () => {
    onChange(!checked);
  };

  return (
    <Pressable
      // style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      style={style}
      onPress={onPress}>
      {checked && checkedComponent}
      {!checked && uncheckedComponent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // checkboxBase: {
  //   width: 24,
  //   height: 24,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 4,
  //   borderWidth: 2,
  //   borderColor: "coral",
  //   backgroundColor: "transparent",
  // },
  // checkboxChecked: {
  //   backgroundColor: "coral",
  // },
  // appContainer: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  // appTitle: {
  //   marginVertical: 16,
  //   fontWeight: "bold",
  //   fontSize: 24,
  // },
  // checkboxContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // checkboxLabel: {
  //   marginLeft: 8,
  //   fontWeight: 500,
  //   fontSize: 18,
  // },
});
