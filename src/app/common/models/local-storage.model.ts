import {ColorTheme} from './color-theme.model';


export const LOCAL_STORAGE_KEY = "color-tools";

export interface SettingsMap {
  colorTheme: ColorTheme;
}

export type SettingKey = keyof SettingsMap;

export const EMPTY_SETTINGS: SettingsMap = {
  colorTheme: "dark"
};
