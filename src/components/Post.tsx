import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const Post = ({
  name,
  date,
  comment,
  delay,
  status,
}: {
  name: string;
  date: string;
  comment: string;
  delay: string;
  status: string;
}) => {
  // const [profilePicture, setProfilePicture] = useState();

  // useEffect(() => {

  // });

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
              {name} <Text style={{ color: "gray" }}>• {date}</Text>
            </Text>
          </View>

          {/* Comment */}
          {comment && (
            <View style={{ marginTop: 8 }}>
              <Text>{comment}</Text>
            </View>
          )}

          {/* Delay */}
          {delay && (
            <View style={styles.chipContainer}>
              <Text style={styles.chipText}>{delay}</Text>
            </View>
          )}

          {/* Status */}
          {status && (
            <View style={styles.chipContainer}>
              <Text style={styles.chipText}>{status}</Text>
            </View>
          )}
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
