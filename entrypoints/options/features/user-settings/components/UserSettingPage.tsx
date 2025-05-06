import { createStorageUserSettingsRepository } from "#/repositories/storage/StorageUserSettingsRepositoryImpl";
import { createUserSettingsService } from "#/services/UserSettingsService";
import useSWR from "swr";
import { UserSettingsForm } from "./user-settings-form";

function UserSettingPage() {
  const userSettingsService = createUserSettingsService(
    createStorageUserSettingsRepository(),
  );
  const { data, error } = useSWR("userSettings", () =>
    userSettingsService.getUserSettings(),
  );

  if (!data && !error) {
    return <p>Loading ..</p>;
  }

  if (error) {
    console.log(JSON.stringify(error));
    return <p>Error loading user settings</p>;
  }

  return <UserSettingsForm userSettings={data!} />;
}

export default UserSettingPage;

// async function fetchUserSettings(): Promise<UserSettings> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         jiraSettings: {
//           apiKey: "xxx",
//           defaultLabels: ["tag1", "tag2"],
//           defaultComponents: undefined,
//         },
//         deepLSettings: {
//           defaultTargetLanguage: undefined,
//           apiKey: undefined,
//         },
//       });
//     }, 500);
//   });
// }
