import { MaterialIcons } from "@expo/vector-icons";
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

import * as TreEstApi from "@/api/treest";
import { useMainGlobal } from "@/context/global.context";

const ProfileImage = () => {
  const { sessionId } = useMainGlobal();
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await TreEstApi.getProfile({ sid: sessionId });

      console.log(profile.picture);

      setImage(`data:image/png;base64,${profile.picture}`);
    };

    loadProfile();
  }, [sessionId]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const manipResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: 250, height: 250 } }],
        { compress: 1, format: SaveFormat.JPEG, base64: true }
      );

      if (manipResult.base64) {
        TreEstApi.setProfile({
          sid: sessionId,
          picture: manipResult.base64,
        }).catch((error) => {
          if (error.message === "Picture is too long") {
            Toast.show("Immagine troppo grande.", {
              duration: Toast.durations.LONG,
            });
          }
        });
      }

      setImage(`data:image/png;base64,${manipResult.base64}`);
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      style={{
        borderRadius: 9999,
        borderWidth: 1,
        width: 128,
        height: 128,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        overflow: "hidden",
      }}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <MaterialIcons name="photo" color="black" size={56} />
      )}
    </Pressable>
  );
};

const Profile = () => {
  const { sessionId } = useMainGlobal();
  const [name, setName] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await TreEstApi.getProfile({ sid: sessionId });

      setName(profile.name);
    };

    loadProfile();
  }, [sessionId]);

  const updateProfile = () => {
    TreEstApi.setProfile({
      sid: sessionId,
      name: name,
    })
      .then(() => {
        Toast.show("Profilo aggiornato correttamente!", {
          duration: Toast.durations.LONG,
        });
      })
      .catch((error: Error) => {
        if (error.message === "Name is too long") {
          Toast.show("Nome troppo lungo.", {
            duration: Toast.durations.LONG,
          });
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profilo</Text>
      </View>

      <View>
        <ProfileImage />
      </View>

      <View style={{ width: "100%" }}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={setName}
          value={name}
          maxLength={20}
        />
      </View>

      <Pressable
        onPress={updateProfile}
        style={[styles.button, { marginTop: 16 }]}>
        <Text style={{ color: "white" }}>Va bene così!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    marginVertical: 32,
  },
  input: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    elevation: 0,
    backgroundColor: "#006E03",
  },
});

export default Profile;
