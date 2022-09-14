import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import * as TreEstApi from "@/api/treest";
import { Station } from "@/api/treest/types";
import { useGlobal } from "@/context/global.context";
import { RootStackParamList } from "@/types/navigation";
import { ConsoleLogger } from "@/utils/Logger";

const logger = new ConsoleLogger({ tag: "MapDetails" });

const locationPermissionAsync = async () => {
  let canUseLocation = false;
  const grantedPermission = await Location.getForegroundPermissionsAsync();
  if (grantedPermission.status === "granted") {
    canUseLocation = true;
  } else {
    const permissionResponse =
      await Location.requestForegroundPermissionsAsync();
    if (permissionResponse.status === "granted") {
      canUseLocation = true;
    }
  }

  if (canUseLocation) {
    const location = await Location.getCurrentPositionAsync();
    console.log("received location:", location);
    console.log(location.coords.latitude + " - " + location.coords.longitude);
    return location;
  }

  return canUseLocation;
};

const MapDetails = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "MapDetails">) => {
  const { directionId } = route.params;
  const { sessionId } = useGlobal();

  const [location, setLocation] = useState<LocationObject>();
  const [stations, setStations] = useState<Station[]>();

  useEffect(() => {
    locationPermissionAsync().then((asd) => setLocation(asd as LocationObject));

    TreEstApi.getStations({ sid: sessionId!, did: directionId }).then((v) => {
      logger.log(v);
      setStations(v);
      map.current?.fitToCoordinates(
        v.map((x) => ({ latitude: x.lat, longitude: x.lon })),
        { edgePadding: { top: 100, left: 100, right: 100, bottom: 100 } }
      );
    });
  }, []);

  const map = useRef<MapView>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>
        MapDetails {directionId} {JSON.stringify(location)}
      </Text> */}

      {/* <MapView style={{ ...StyleSheet.absoluteFillObject }} /> */}
      <MapView
        ref={map}
        style={{ width: "100%", height: "100%" }}
        showsUserLocation={true}>
        {stations &&
          stations.map((station) => {
            return (
              <Marker
                key={`${station.lat}${station.lon}`}
                identifier={`${station.lat}${station.lon}`}
                coordinate={{ latitude: station.lat, longitude: station.lon }}
                title={station.sname}
              />
            );
          })}
        {stations && (
          <Polyline
            coordinates={stations.map((x) => ({
              latitude: x.lat,
              longitude: x.lon,
            }))}
            strokeWidth={5}
            strokeColor="#006E03"
            miterLimit={0}
          />
        )}
      </MapView>
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

export default MapDetails;
