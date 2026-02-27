import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

type Point = {
    id: string;
    lat: number;
    lon: number;
    title?: string;
};

type Props = {
    points: Point[];
    onMarkerPress?: (id: string) => void;
};

export default function VKMap({ points, onMarkerPress }: Props) {
    const html = useMemo(() => {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <script src="https://maps.vk.com/sdk/js/<version>/mmr-gl.js"></script>
        <link href="https://maps.vk.com/sdk/js/<version>/mmr-gl.css" rel="stylesheet">
        <style>
          html, body, #map {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
      <div id="map" style="width: 800px; height: 600px;"></div>  
        <script>
  
  mmrgl.accessToken = 'Token';
  var map = new mmrgl.Map({
    container: 'map',
    zoom: 8,
    center: [37.6165, 55.7505],
    style: 'mmr://api/styles/main_style.json',
    hash: true
  });

        </script>
      </body>
      </html>
    `;
    }, [points]);

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={["*"]}
                source={{ html }}
                javaScriptEnabled
                domStorageEnabled
                onMessage={(event) => {
                    const data = JSON.parse(event.nativeEvent.data);
                    if (data.type === "marker_press") {
                        onMarkerPress?.(data.id);
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});