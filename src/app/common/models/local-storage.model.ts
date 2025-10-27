import {ColorMode} from './color-mode.model';


export const LOCAL_STORAGE_KEY = "color-tools";

export interface SettingsMap {
  colorMode: ColorMode;
}

export type SettingKey = keyof SettingsMap;

export const EMPTY_SETTINGS: SettingsMap = {
  colorMode: "dark"
};
