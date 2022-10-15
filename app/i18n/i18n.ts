import * as Localization from "expo-localization"
import i18n from "i18n-js"
import { I18nManager } from "react-native"
import RNRestart from "react-native-restart"

// if English isn't your default language, move Translations to the appropriate language file.
import en, { Translations } from "./en"
import ar from "./ar"
import { loadString, saveString } from "../utils/storage"
import I18n from "i18n-js"

i18n.fallbacks = true
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
i18n.translations = { ar, en, "en-US": en }

// handle RTL languages
const setLang = async () => {
  let a = await loadString("lang")
  let isRestart = false
  if (!a) {
    a = "ar"
    isRestart = true
  }
  i18n.locale = a
  I18nManager.allowRTL(a == "en" ? false : true)
  I18nManager.forceRTL(a == "en" ? false : true)
  if (isRestart) {
    await saveString("lang", a)
    RNRestart.Restart()
  }
}
setLang()
export const isRTL = I18nManager.isRTL

export const changeLanguage = async () => {
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

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text
