import {Injectable} from '@angular/core';
import {EMPTY_SETTINGS, LOCAL_STORAGE_KEY, SettingKey, SettingsMap} from '../models/local-storage.model';


@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  public set<K extends SettingKey>(key: K, value: SettingsMap[K]): void {
    const currentSettings = this.getAllSettings();
    const newSettings: SettingsMap = {
      ...currentSettings,
      [key]: value
    };

    this.saveAllSettings(newSettings);
  }


  public get<K extends SettingKey>(key: K): SettingsMap[K] | null {
    return this.getAllSettings()[key] ?? null;
  }


  public getOrDefault<K extends SettingKey>(key: K,
                                            fallback: SettingsMap[K]): SettingsMap[K] {
    const v = this.get(key);
    return v ?? fallback;
  }


  public clearSettings(): void {
    localStorage.clear();
  }


  private getAllSettings(): SettingsMap {
    const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!storedSettings) return EMPTY_SETTINGS;

    return JSON.parse(storedSettings) as SettingsMap;
  }


  private saveAllSettings(settings: SettingsMap): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  }

}
