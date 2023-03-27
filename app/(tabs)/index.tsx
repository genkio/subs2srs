import React from "react";
import { StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Text, View } from "../../components/Themed";
import { useDeck } from "../../hooks";

export default function FileScreen() {
  const { isLoading, loadDecks } = useDeck();

  React.useEffect(() => {
    loadDecks();
  }, []);

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Files</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
