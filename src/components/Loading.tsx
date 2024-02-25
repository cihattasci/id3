import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { metrics } from "../utils/metrics";

export default function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: metrics.height,
    justifyContent: "center",
    alignItems: "center",
  },
});
