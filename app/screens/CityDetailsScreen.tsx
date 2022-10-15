import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../navigators"
import { AutoImage, Icon, Text } from "../components"
import { colors, spacing } from "../theme"
import { useStores } from "../models"
import moment from "moment"
import { translate } from "../i18n"
import LinearGradient from "react-native-linear-gradient"
import { $activityIndicator, $background, $headerText, $iconStyle, $root, $rowStyle } from "./style"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CityDetailsScreen: FC<StackScreenProps<AppStackScreenProps, "CityDetails">> = observer(
  function CityDetailsScreen(_props) {
    const { route } = _props
    const { my_city } = route.params

    const { cityStore } = useStores()
    const { fetchCity, cityDetails, setStatus, status } = cityStore
    const { city, country, humidity, main, main_icon, temp, wind_speed, time_zone } = cityDetails

    useEffect(() => {
      ;(async () => {
        await fetchCity(my_city)
      })()
      return () => setStatus("idle")
    }, [])

    // Pull in one of our MST stores

    // Pull in navigation via hook
    return (
      <View style={$root}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[colors.background2, colors.background2, colors.background]}
        >
          <View style={$background}>
            <Icon icon="Group" style={$iconStyle} />
          </View>
          <View style={$timeInfo}>
            <Text
              style={{ textAlign: "center", fontSize: 14, marginHorizontal: spacing.massive }}
              text={`${translate("common.weather_info")} ${city} ${translate(
                "common.received_on",
              )} ${moment(time_zone).format("DD.MM.YYYY - HH:mm")}`}
            />
          </View>
          <View style={$headerContainer}>
            <Icon icon="arrow_back" onPress={goBack} flip={true} />
          </View>
          <View style={$detailsContainer}>
            {status == "pending" ? (
              <View style={$activityIndicator}>
                <ActivityIndicator />
              </View>
            ) : (
              <>
                <Text preset="formLabel" style={$headerText} text={`${city}, ${country}`} />
                {!!!main_icon ? (
                  <ActivityIndicator />
                ) : (
                  <AutoImage
                    style={$image}
                    source={{ uri: "https://openweathermap.org/img/w/" + main_icon + ".png" }}
                  />
                )}
                <View style={$rowStyle}>
                  <Text preset="bold" tx="common.description" />
                  <Text preset="formHelper" style={$primaryValue} text={main} />
                </View>
                <View style={$rowStyle}>
                  <Text preset="bold" tx="common.temp" />
                  <Text preset="formHelper" style={$primaryValue} text={`${temp}° C`} />
                </View>
                <View style={$rowStyle}>
                  <Text preset="bold" tx="common.humidity" />
                  <Text preset="formHelper" style={$primaryValue} text={`${humidity}%`} />
                </View>
                <View style={$rowStyle}>
                  <Text preset="bold" tx="common.wind_speed" />
                  <Text preset="formHelper" style={$primaryValue} text={`${wind_speed} km/h`} />
                </View>
              </>
            )}
          </View>
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
const $timeInfo: ViewStyle = {
  alignItems: "center",
  position: "absolute",
  bottom: 30,
  left: 0,
  right: 0,
  justifyContent: "center",
}

const $detailsContainer: ViewStyle = {
  position: "absolute",
  left: 30,
  top: 150,
  height: 500,
  right: 30,
  elevation: 5,
  backgroundColor: "white",
  alignItems: "center",
  borderRadius: 8,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  // height: "60%",
}
const $primaryValue: TextStyle = {
  color: colors.palette.primary,
  fontSize: 20,
}
const $image: ImageStyle = {
  width: 200,
  height: 200,
  marginBottom: 50,
}
