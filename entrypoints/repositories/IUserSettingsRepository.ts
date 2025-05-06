import { UserSettings } from "~/types";

export interface IUserSettingsRepository {
  get: () => Promise<UserSettings | null>;
  save: (userSettings: UserSettings) => Promise<void>;
}
