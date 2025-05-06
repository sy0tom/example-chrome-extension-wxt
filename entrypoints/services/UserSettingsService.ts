import { UserSettings } from "~/types";
import { IUserSettingsRepository } from "../repositories/IUserSettingsRepository";

export function createUserSettingsService(repository: IUserSettingsRepository) {
  return {
    getUserSettings: async (): Promise<UserSettings> => {
      const userSettings = await repository.get();
      if (userSettings) {
        return userSettings;
      }

      return getDefaultUserSettings();
    },

    saveUserSettings: async (
      userSettings: UserSettings,
    ): Promise<UserSettings> => {
      await repository.save(userSettings);
      const result = await repository.get();
      if (result) {
        return result;
      }

      throw new Error(`Failed to save user settings`);
    },
  };
}

function getDefaultUserSettings(): UserSettings {
  return {
    jiraSettings: {
      apiKey: undefined,
      defaultLabels: [],
      defaultComponents: [],
    },
    deepLSettings: {
      defaultTargetLanguage: "en",
      apiKey: undefined,
    },
  };
}
