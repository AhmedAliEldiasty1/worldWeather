import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  ImageStyle,
  Modal,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, navigate } from "../navigators"
import { Button, CityItem, Header, Icon, IconTypes, Screen, Text, TextField } from "../components"
import { colors, spacing, typography } from "../theme"
import { useStores } from "../models"
import LinearGradient from "react-native-linear-gradient"
import I18n from "i18n-js"
import RNRestart from "react-native-restart"
import { saveString } from "../utils/storage"
import { translate } from "../i18n"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "home">> = observer(
  function HomeScreen(_props) {
    const { navigation } = _props
    const { cityStore } = useStores()
    const {
      fetchCity,
      status,
      setStatus,
      savedCities,
      saveCity,
      set_city_details,
      cityDetails,
      getCityWeatherHistory,
    } = cityStore
    const { city, country } = cityDetails
    const [showModal, setShowModal] = useState(false)
    const [searchCity, setSearchCity] = useState("")
    const changeLanguage = async () => {
      if (I18nManager.isRTL) {
        I18n.locale = "en"
        I18nManager.allowRTL(false)
        I18nManager.forceRTL(false)
        await saveString("lang", "en")
      } else {
        I18n.locale = "ar"
        I18nManager.allowRTL(true)
        I18nManager.forceRTL(true)
        await saveString("lang", "ar")
      }
      RNRestart.Restart()
    }
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
            <Text tx="common.cities" style={$header} />
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={changeLanguage}>
              <Text tx="common.region" style={{ marginHorizontal: spacing.medium, fontSize: 25 }} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={savedCities}
            renderItem={({ item }) => (
              <CityItem
                style={{ padding: spacing.medium }}
                city={item.city}
                country={item.country}
                icon="info"
                onIconPress={() => {
                  const data = getCityWeatherHistory(item.city)
                  navigation.navigate("cityHistory", {
                    screen: "cityHistory",
                    city_name: item.city,
                    data,
                  })
                }}
                onPress={() =>
                  navigation.navigate("cityDetails", { screen: "cityDetails", my_city: item.city })
                }
              />
            )}
          />
          <Button
            textStyle={{ color: "white" }}
            style={$buttonStyle}
            LeftAccessory={() => (
              <Icon icon="add" color="white" style={{ marginRight: spacing.medium }} />
            )}
            tx="common.add_city"
            onPress={() => setShowModal(true)}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(false)
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPressOut={() => {
                setShowModal(false)
                set_city_details({
                  city: "",
                  main: "",
                  main_icon: "",
                  temp: "",
                  humidity: "",
                  wind_speed: "",
                  country: "",
                  time_zone: null,
                })
                setStatus("idle")
                setSearchCity("")
              }}
            >
              <View style={$modalContainer}>
                <View style={$modalContent}>
                  <TouchableOpacity
                    style={{ width: "100%", flex: 1, padding: 35 }}
                    activeOpacity={1}
                    onPressOut={() => {}}
                  >
                    <TextField
                      returnKeyType="search"
                      onChangeText={setSearchCity}
                      onSubmitEditing={() => {
                        fetchCity(searchCity)
                      }}
                      LeftAccessory={() => <Icon icon="search" />}
                      placeholderTx="common.search_for_city"
                      inputWrapperStyle={{
                        width: "100%",
                        alignItems: "center",
                        marginBottom: spacing.medium,
                      }}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    {status == "pending" && <ActivityIndicator />}
                    {status == "done" && (
                      <CityItem
                        city={city}
                        country={country}
                        onIconPress={() => {
                          saveCity()
                          setShowModal(false)
                          setSearchCity("")
                          set_city_details({
                            city: "",
                            main: "",
                            main_icon: "",
                            temp: "",
                            humidity: "",
                            wind_speed: "",
                            country: "",
                            time_zone: null,
                          })
                          setStatus("idle")
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </LinearGradient>
      </View>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $headerContainer: ViewStyle = {
  flexDirection: "row",
  backgroundColor: colors.palette.primary,
  height: 200,
  justifyContent: "space-between",
  alignItems: "flex-end",
}

const $header: TextStyle = {
  marginBottom: spacing.extraLarge,
  marginLeft: spacing.huge,
  color: "white",
  fontSize: 30,
  lineHeight: 30,
}

const $background: ViewStyle = {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
}
const $iconStyle: StyleProp<ImageStyle> = {
  resizeMode: "stretch",
  width: "100%",
}
const $buttonStyle: ViewStyle = {
  position: "absolute",
  right: spacing.extraLarge,
  bottom: spacing.extraLarge,
  backgroundColor: colors.palette.primary,
  borderRadius: 50,
  paddingHorizontal: spacing.large,
}

const $modalContent: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  height: "60%",
}
const $modalContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "stretch",
}
