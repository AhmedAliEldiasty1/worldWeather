/**
 * The options used to configure apisauce.
 */
export interface CityData {
  city: string
  country: string
  main: string
  main_icon: string
  temp: string
  humidity: string
  wind_speed: string
  time_zone: number
}

export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
