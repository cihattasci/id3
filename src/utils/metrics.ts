import { Dimensions, Platform } from "react-native";
import { colors } from "./colors";

const window = Dimensions.get("window");
const screenHeight = Dimensions.get("screen").height;
const windowHeight = window.height;
const navbarHeight = screenHeight - windowHeight;

export const metrics = {
  height: window.height,
  width: window.width,
  navbarHeight: Platform.OS === "ios" ? 0 : navbarHeight + 10,
};

export const tabHeaderStyles = {
  headerBackTitleVisible: false,
  headerTintColor: colors.black,
  headerTransparent: true,
  headerStyle: {
    backgroundColor: colors.white,
  },
  headerTitle: "",
};
