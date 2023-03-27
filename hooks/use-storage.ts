import * as FileSystem from "expo-file-system";
import React from "react";
import { Alert } from "react-native";

export function useStorage(dir: string) {
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    initialize();
  }, [dir]);

  const initialize = async () => {
    const info = await FileSystem.getInfoAsync(
      `${FileSystem.documentDirectory}${dir}`
    );
    if (!info.exists) {
      try {
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}${dir}`,
          { intermediates: true }
        );
      } catch (error) {
        console.debug(`Directory:${dir} initialized`);
      }

      setInitialized(true);
    }
  };

  const setItem = (dir: string) => {
    return <T>(key: string, value: T) =>
      FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}${dir}/${key}`,
        JSON.stringify(value)
      );
  };

  const getItem = (dir: string) => {
    return <T>(key: string): Promise<T | null> =>
      FileSystem.readAsStringAsync(
        `${FileSystem.documentDirectory}${dir}/${key}`
      ).then((value) => (value ? JSON.parse(value) : null));
  };

  const removeItem = (dir: string) => {
    return (key: string) =>
      FileSystem.deleteAsync(`${FileSystem.documentDirectory}${dir}/${key}`);
  };

  const getItems = (dir: string) => {
    return <T>() =>
      FileSystem.readDirectoryAsync(
        `${FileSystem.documentDirectory}${dir}`
      ).then((files) =>
        Promise.all(files.map((file) => getItem(dir)<T>(file)))
      );
  };

  const isItemInAppRootDir = async (filename: string) => {
    if (!FileSystem.documentDirectory) {
      throw new Error("Unable to read document directory");
    }
    const documents = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    return documents.includes(filename);
  };

  return {
    initialized,
    setItem: setItem(dir),
    getItem: getItem(dir),
    getItems: getItems(dir),
    removeItem: removeItem(dir),
    isItemInAppRootDir,
  };
}
