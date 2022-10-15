import * as React from "react"
import { StyleProp, TextStyle, Touchable, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { Icon, IconTypes } from "./Icon"

export interface CityItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  city: string
  country: string
  onPress?: () => void
  onIconPress?: () => void
  icon?: IconTypes
}

/**
 * Describe your component here
 */
export const CityItem = observer(function CityItem(props: CityItemProps) {
  const { style, city, country, onPress, onIconPress, icon = "add" } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={$styles}>
        <View style={{ flexDirection: "row" }}>
          <Icon icon="location_city" style={{ marginRight: spacing.extraLarge }} />
          <Text preset="bold" text={`${city}, ${country}`} />
        </View>
        <Icon icon={icon} onPress={onIconPress} />
      </View>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  paddingVertical: spacing.medium,
}
