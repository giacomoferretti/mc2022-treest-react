import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import * as TreEstApi from "@/api/treest";
import { Station } from "@/api/treest/types";
import { useMainGlobal } from "@/context/global.context";
import { RootStackParamList } from "@/types/navigation";
import { ConsoleLogger } from "@/utils/Logger";
import { locationPermissionAsync } from "@/utils/location";

const logger = new ConsoleLogger({ tag: "MapDetails" });

const MapDetails = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "MapDetails">) => {
  const { directionId } = route.params;
  const { sessionId } = useMainGlobal();
  const map = useRef<MapView>(null);

  // const [location, setLocation] = useState<LocationObject>();
  const [stations, setStations] = useState<Station[]>();

  useEffect(() => {
    locationPermissionAsync().then((granted) => {
      if (granted)
        Location.getCurrentPositionAsync().then((location) => {
          logger.log("Received location:", location);
          logger.log(
            location.coords.latitude + " - " + location.coords.longitude
          );
        });
    });

    TreEstApi.getStations({ sid: sessionId, did: directionId }).then((v) => {
      logger.log(v);
      setStations(v);
      map.current?.fitToCoordinates(
        v.map((x) => ({ latitude: x.lat, longitude: x.lon })),
        { edgePadding: { top: 100, left: 100, right: 100, bottom: 100 } }
      );
    });
  }, [directionId, sessionId]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView ref={map} style={styles.map} showsUserLocation={true}>
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
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapDetails;
