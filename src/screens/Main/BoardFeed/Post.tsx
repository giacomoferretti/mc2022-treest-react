import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import * as TreEstApi from "@/api/treest";
import { Post as PostType } from "@/api/treest/types";
import { CheckBox } from "@/components/CheckBox";
import { useGlobal } from "@/context/global.context";
import { ConsoleLogger } from "@/utils/Logger";
import { formatDate, parseDate } from "@/utils/date";

// type PostProps = {
//   name: string;
//   date: string;
//   comment: string;
//   delay: string;
//   status: string;
// };

const logger = new ConsoleLogger({ tag: "Post" });

export const Post = ({
  author,
  datetime,
  comment,
  delay,
  status,
  followingAuthor,
  authorName,
  pversion,
  refresh,
}: PostType & { refresh: VoidFunction }) => {
  const { sessionId } = useGlobal();
  // const [isFollowing, setIsFollowing] = useState(false);

  // const [profilePicture, setProfilePicture] = useState();

  // useEffect(() => {

  // });
  // logger.log({
  //   author,
  //   datetime,
  //   comment,
  //   delay,
  //   status,
  //   followingAuthor,
  //   authorName,
  //   pversion,
  // });

  const [checked, onChange] = useState(followingAuthor);

  const onChangeFollow = (isChecked: boolean) => {
    console.log(isChecked);
    onChange(isChecked);

    if (isChecked) {
      TreEstApi.follow({ sid: sessionId!, uid: author }).then(() => refresh());
    } else {
      TreEstApi.unfollow({ sid: sessionId!, uid: author }).then(() =>
        refresh()
      );
    }
  };

  return (
    <View
      style={{
        width: "100%",
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
      }}>
      {/* Left panel */}
      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            style={{ width: 64, height: 64, borderRadius: 9999 }}
            source={{
              uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAA1BMVEWfn5/HXNoXAAAANklEQVR42u3BAQEAAACCoP6vbojAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADiDoIAAAEB9TdeAAAAAElFTkSuQmCC",
            }}
          />
          <CheckBox
            style={{
              marginTop: 8,
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            checkedComponent={
              <MaterialIcons name="person-remove" size={24} color="green" />
            }
            uncheckedComponent={
              <MaterialIcons name="person-add" size={24} color="black" />
            }
            checked={checked}
            onChange={onChangeFollow}
          />
        </View>

        {/* Right panel */}
        <View
          style={{
            flex: 1,
            paddingLeft: 16,
            alignItems: "flex-start",
          }}>
          {/* Name */}
          <View>
            <Text>
              {authorName}{" "}
              <Text style={{ color: "gray" }}>
                • {formatDate(parseDate(datetime))}
              </Text>
            </Text>
          </View>

          {/* Comment */}
          {comment && (
            <View style={{ marginTop: 8 }}>
              <Text>{comment}</Text>
            </View>
          )}

          {/* Delay */}
          {delay ? (
            <View style={styles.chipContainer}>
              <Text style={styles.chipText}>{delay.toString()}</Text>
            </View>
          ) : null}

          {/* Status */}
          {status ? (
            <View style={styles.chipContainer}>
              <Text style={styles.chipText}>{status.toString()}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: "lightgray",
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
  },
  chipText: {
    fontSize: 12,
  },
});
