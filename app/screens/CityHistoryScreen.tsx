import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../navigators"
import { CityHistoryItem, Icon, Text } from "../components"
import { colors, spacing } from "../theme"
import { translate } from "../i18n"
import LinearGradient from "react-native-linear-gradient"
import { $background, $iconStyle, $root } from "./style"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CityHistoryScreen: FC<StackScreenProps<AppStackScreenProps, "CityHistory">> = observer(
  function CityHistoryScreen(_props) {
    const { route } = _props
    const { city_name, data } = route.params
    // Pull in one of our MST stores

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <View style={$root}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[colors.background2, colors.background2, colors.background]}
        >
          <View style={$background}>
            <Icon icon="Group" style={$iconStyle} />
          </View>
          <View style={$headerContainer}>
            <Icon icon="arrow_back" onPress={goBack} flip={true} />
            <Text style={$headerStyle} text={translate("common.historical", { city: city_name })} />
          </View>
          <FlatList
            data={data}
            contentContainerStyle={{ paddingHorizontal: spacing.large }}
            renderItem={({ item }) => <CityHistoryItem data={item} />}
          />
        </LinearGradient>
      </View>
    )
  },
)

const $headerContainer: ViewStyle = {
  backgroundColor: colors.palette.primary,
  height: 200,
  paddingTop: spacing.huge,
}

const $headerStyle: TextStyle = {
  fontSize: 25,
  color: "white",
  paddingTop: spacing.huge,
  textAlign: "left",
  marginHorizontal: spacing.extraLarge,
}
