import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as TreEstApi from "@/api/treest";
import { Post as PostType } from "@/api/treest/types";
import { useGlobal } from "@/context/global.context";
import { RootStackParamList } from "@/types/navigation";

import { LineSwitchButtons } from "./LineSwitchButtons";
import { Post } from "./Post";

const BoardFeed = () => {
  const { sessionId, directionId, lineData, setDirectionId } = useGlobal();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [posts, setPosts] = useState<PostType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const renderItem: ListRenderItem<PostType> = ({ item }) => {
    // console.log(item);

    return (
      <Post
        {...item}
        refresh={() => {
          // console.log("loge");
          setIsLoading(true);
        }}
      />
    );
  };

  useEffect(() => {
    const load = async () => {
      setPosts([]);

      const response = await TreEstApi.getPosts({
        sid: sessionId!,
        did: directionId!,
      });

      setPosts(response.posts);
      setIsLoading(false);
    };

    load().catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionId, isLoading]);

  const selectBoard = () => {
    setDirectionId(null);
    navigation.replace("BoardSelection");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 16,
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Pressable>
          <MaterialIcons name="map" size={24} color="#006E03" />
        </Pressable>
        <LineSwitchButtons line={lineData!} />
        <Pressable onPress={selectBoard}>
          <MaterialIcons name="settings" size={24} color="#006E03" />
        </Pressable>
      </View>

      <View style={styles.container}>
        {posts.length === 0 ? (
          <View>
            <ActivityIndicator size="large" color="#000000" />
            <Text style={{ marginTop: 8 }}>Caricamento...</Text>
          </View>
        ) : (
          <FlatList
            style={{ width: "100%", paddingHorizontal: 16 }}
            data={posts}
            extraData={isLoading}
            renderItem={renderItem}></FlatList>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BoardFeed;
