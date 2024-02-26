import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export default function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.idBlue} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
});
