// EmojiPicker.tsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface EmojiPickerProps {
  onEmojiSelected: (emoji: string) => void;
}

const profileEmojis = ["😃", "😳", "😂", "😫", "😒", "😘"];

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelected }) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {profileEmojis.map((emoji) => (
        <TouchableOpacity key={emoji} onPress={() => onEmojiSelected(emoji)}>
          <Text style={{ fontSize: 30, margin: 5 }}>{emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EmojiPicker;
