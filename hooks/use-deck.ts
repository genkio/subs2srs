import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { AddFileButton } from "../components/AddFileButton";
import md5 from "md5";
import { Alert } from "react-native";
import { useStorage } from "./use-storage";

export function useDeck() {
  const [isLoading, setIsLoading] = React.useState(false);
  const storage = useStorage("decks");

  const handlePress = async () => {
    try {
      setIsLoading(true);
      const document = await DocumentPicker.getDocumentAsync({
        type: ["video", "audio"],
      });
      if (document.type === "cancel") return;

      const isDocumentInAppRootDir = await storage.isItemInAppRootDir(
        document.name
      );
      if (!isDocumentInAppRootDir) {
        Alert.alert(
          "Sorry",
          "Please copy target file into the app root directory then try again"
        );
        return;
      }

      const id = md5(document.name);
      const { name, uri } = document;
      await storage.setItem<Deck>(id, {
        file: { name, uri },
        id,
        subtitles: [[], []],
        updateTime: Date.now(),
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const loadDecks = async () => {
    const data = await storage.getItems<Deck>();
    console.log(data);
  };

  return {
    AddDeckButton: () => AddFileButton({ handlePress }),
    isLoading,
    loadDecks,
  };
}
