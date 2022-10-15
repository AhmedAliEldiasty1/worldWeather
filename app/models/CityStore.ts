import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types, cast } from "mobx-state-tree"
import { api } from "../services/api"
import { withStatus } from "./helpers/with-status"
import Snackbar from "react-native-snackbar"
import { colors } from "../theme"

const CityCountryStoreModel = types.model("CityStore").props({
  city: types.maybe(types.string),
  country: types.maybe(types.string),
})

const CityDetailsModel = types.model("CityStore").props({
  city: types.maybe(types.string),
  main: types.maybe(types.string),
  main_icon: types.maybe(types.string),
  temp: types.maybe(types.string),
  humidity: types.maybe(types.string),
  wind_speed: types.maybe(types.string),
  country: types.maybe(types.string),
  time_zone: types.maybeNull(types.number),
})
export interface CityDetails extends Instance<typeof CityDetailsModel> {}

/**
 * Model description here for TypeScript hints.
 */
export const CityStoreModel = types
  .model("CityStore")
  .props({
    savedCities: types.optional(types.array(CityCountryStoreModel), []),
    savedWeather: types.optional(types.array(CityDetailsModel), []),
    savedCityWeather: types.optional(types.array(CityDetailsModel), []),
    cityDetails: types.optional(CityDetailsModel, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withStatus)
  .actions((self) => ({
    saveCity: () => {
      const isRepeated = self.savedCities.some((item) => item.city == self.cityDetails.city)
      !isRepeated &&
        self.savedCities.replace([
          { city: self.cityDetails.city, country: self.cityDetails.country },
          ...self.savedCities,
        ])
    },
    set_city_details: (cityDetails: CityDetails) => {
      applySnapshot(self.cityDetails, cityDetails)
    },
    saveWeather: (weather: CityDetails) => {
      self.savedWeather.replace([weather, ...self.savedWeather])
    },
    // SaveCityWeatherHistory: (data) => {
    //   self.savedCityWeather = data.slice
    // }
  }))
  .actions((self) => ({
    async fetchCity(city: string) {
      self.setStatus("pending")
      const response = await api.getCity(city)
      if (response.kind === "ok") {
        applySnapshot(self.cityDetails, response.data)
        self.saveWeather(response.data)
        self.setStatus("done")
      } else {
        self.setStatus("error")
        Snackbar.show({
          text: response.kind == "not-found" ? response.message : "Something error",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.error,
        })
        __DEV__ && console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
    getCityWeatherHistory: (city: string) => {
      const data = self.savedWeather.filter((item) => item.city == city)
      return data
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CityStore extends Instance<typeof CityStoreModel> {}
export interface CityStoreSnapshotOut extends SnapshotOut<typeof CityStoreModel> {}
export interface CityStoreSnapshotIn extends SnapshotIn<typeof CityStoreModel> {}
export const createCityStoreDefaultModel = () => types.optional(CityStoreModel, {})
