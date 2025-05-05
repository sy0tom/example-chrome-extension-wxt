import { IUserSettingsRepository } from "#/repositories/IUserSettingsRepository";
import { UserSettings } from "~/types";
import { createLocalStorageClient } from "./StorageClient";

export function createStorageUserSettingsRepository(): IUserSettingsRepository {
  const client = createLocalStorageClient<UserSettings>("local:UserSettings");
  return {
    get: async (): Promise<UserSettings | null> => {
      return client.get();
    },
    save: async (UserSettings: UserSettings): Promise<void> => {
      return client.save(UserSettings);
    },
  };
}
