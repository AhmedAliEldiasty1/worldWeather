import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import { isRTL } from "../i18n"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]

  /**
   * An optional to flip icon
   */
  flip?: boolean
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    flip,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={[
          $imageStyle,
          flip && isRTL ? { transform: [{ rotate: "180deg" }] } : {},
          color && { tintColor: color },
          size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  arrow_back: require("../../assets/icons/arrow_back.png"),
  Group: require("../../assets/icons/Group.png"),
  search: require("../../assets/icons/search.png"),
  info: require("../../assets/icons/info.png"),
  location_city: require("../../assets/icons/location_city.png"),
  add: require("../../assets/icons/add.png"),
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}
