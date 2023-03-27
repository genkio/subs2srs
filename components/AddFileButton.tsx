import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

export function AddFileButton({ handlePress }: { handlePress: () => void }) {
  const colorScheme = useColorScheme();

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <FontAwesome
          name="plus-circle"
          size={25}
          color={Colors[colorScheme ?? "light"].text}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  );
}
