import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { FilterGroupProps } from "../types";

const FilterGroup: React.FC<FilterGroupProps> = ({ handleSort, sort }) => {
  return (
    <View style={styles.sortContainer}>
      <TouchableOpacity
        style={
          sort === "createdAt"
            ? styles.sortButtonActive
            : styles.sortButtonDisable
        }
        onPress={() => handleSort("createdAt")}
      >
        <Text
          style={[
            styles.sortButtonText,
            { color: sort === "createdAt" ? colors.idBlue : colors.white },
          ]}
          numberOfLines={1}
        >
          Sort By Date
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          sort === "likeUsers"
            ? styles.sortButtonActive
            : styles.sortButtonDisable
        }
        onPress={() => handleSort("likeUsers")}
      >
        <Text
          style={[
            styles.sortButtonText,
            { color: sort === "likeUsers" ? colors.idBlue : colors.white },
          ]}
          numberOfLines={1}
        >
          Sort By Likes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sortButtonActive: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.idBlue,
  },
  sortButtonDisable: {
    flex: 1,
    backgroundColor: colors.idBlue,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.idBlue,
  },
  sortButtonText: {
    color: colors.white,
  },
  sortContainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default FilterGroup;
