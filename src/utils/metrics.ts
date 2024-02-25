import { Dimensions } from "react-native";
import { colors } from "./colors";

export const metrics = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

export const tabHeaderStyles = {
  headerBackTitleVisible: false,
  headerTintColor: colors.black,
  headerTransparent: true,
  headerStyle: {
    backgroundColor: colors.white,
  },
  headerTitle: '',
};
