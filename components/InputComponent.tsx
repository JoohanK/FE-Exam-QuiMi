import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
} from "react-native";

interface InputComponentProps extends Omit<TextInputProps, "style"> {
  style?: StyleProp<TextStyle>;
  containerStyle?: ViewStyle;
}

const InputComponent: React.FC<InputComponentProps> = ({
  style,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput style={[styles.input, style]} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
});

export default InputComponent;
