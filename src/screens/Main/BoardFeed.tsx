import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as TreEstApi from "@/api/treest";
import { Post as PostType } from "@/api/treest/types";
import { Post } from "@/components/Post";
import { useGlobal } from "@/context/global.context";

const BoardFeed = () => {
  const { sessionId, directionId } = useGlobal();

  const [posts, setPosts] = useState<PostType[]>([]);

  const renderItem: ListRenderItem<PostType> = ({ item }) => {
    return (
      <Post
        name={item.authorName}
        date={item.datetime}
        comment={item.comment}
        delay={item.delay ? item.delay.toString() : ""}
        status={item.status ? item.status.toString() : ""}
      />
    );
  };

  useEffect(() => {
    const load = async () => {
      const response = await TreEstApi.getPosts({
        sid: sessionId!,
        did: directionId!,
      });

      setPosts(response.posts);
    };

    load().catch((error) => console.error(error));
  }, [directionId, sessionId]);

  return (
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
          renderItem={renderItem}></FlatList>
      )}
    </View>
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
