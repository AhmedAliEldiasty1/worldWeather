import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"

export const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

export const $background: ViewStyle = {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
}
export const $iconStyle: StyleProp<ImageStyle> = {
  resizeMode: "stretch",
  width: "100%",
}

export const $activityIndicator: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}
export const $rowStyle: ViewStyle = {
  width: "100%",
  paddingHorizontal: spacing.extraLarge,
  flexDirection: "row",
  justifyContent: "space-between",
  height: 35,
}
export const $headerText: TextStyle = {
  fontSize: 25,
  paddingVertical: spacing.large,
}
