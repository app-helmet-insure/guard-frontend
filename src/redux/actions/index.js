
export const LANGUAGE = 'language/LANGUAGE'
export const SHOW_SWITCH_WALLET = 'SHOW_SWITCH_WALLET'

export function changeLanguage(params) {
  return { type: LANGUAGE, params}
}
export function changeShowSwitchWallet(params) {
  return { type: SHOW_SWITCH_WALLET, params}
}

