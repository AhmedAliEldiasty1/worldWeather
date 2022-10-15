import { ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem" // @demo remove-current-line
import type { ApiConfig, CityData } from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  // @demo remove-block-start
  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getCity(city: string): Promise<{ kind: "ok"; data: CityData } | GeneralApiProblem> {
    // make the api call
    const response = await this.apisauce.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f5cb0b965ea1564c50c6f1b74534d823`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData: any = response.data
      const data = {
        city: rawData.name,
        country: rawData.sys.country,
        main: rawData.weather[0].main,
        main_icon: rawData.weather[0].icon,
        temp: `${(rawData.main.temp - 273.15).toFixed(2)}`,
        humidity: `${rawData.main.humidity}`,
        wind_speed: `${rawData.wind.speed}`,
        time_zone: Date.now(),
      }

      // This is where we transform the data into the shape we expect for our MST model.
      console.log(data)

      return { kind: "ok", data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  // @demo remove-block-end
}

// Singleton instance of the API for convenience
export const api = new Api()
