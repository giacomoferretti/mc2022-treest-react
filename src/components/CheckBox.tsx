import { StyleProp, ViewStyle } from "react-native";
import { Pressable } from "react-native";

type CheckBoxProps = {
  checked: boolean;
  onChange: (value: boolean) => void; // React.Dispatch<React.SetStateAction<boolean>>;
  checkedComponent: React.ReactNode;
  uncheckedComponent: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CheckBox = ({
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
    <Pressable style={style} onPress={onPress}>
      {checked && checkedComponent}
      {!checked && uncheckedComponent}
    </Pressable>
  );
};

export default CheckBox;
