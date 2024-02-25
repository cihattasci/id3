import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { metrics } from "../utils/metrics";
import { colors } from "../utils/colors";

export default function EmptyCardList() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>There are no post here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: metrics.height,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
});
