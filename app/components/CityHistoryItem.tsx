import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { CityDetails } from "../models"
import moment from "moment"
import { AutoImage } from "./AutoImage"

export interface CityHistoryItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data: CityDetails
}

/**
 * Describe your component here
 */
export const CityHistoryItem = observer(function CityHistoryItem(props: CityHistoryItemProps) {
  const { style, data } = props
  const { main_icon, time_zone, main, temp } = data
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <AutoImage
        style={$image}
        source={{ uri: "https://openweathermap.org/img/w/" + main_icon + ".png" }}
      />
      <View>
        <Text
          style={{ textAlign: "center", fontSize: 14 }}
          text={moment(time_zone).format("DD.MM.YYYY - HH:mm")}
        />
        <Text preset="formLabel" style={$headerText} text={`${main}, ${temp}° C`} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  marginVertical: 10,
}
const $headerText: TextStyle = {
  fontSize: 18,
  // paddingVertical: spacing.large,
}
const $image: ImageStyle = {
  width: 50,
  height: 50,
  marginRight: spacing.large,
}
