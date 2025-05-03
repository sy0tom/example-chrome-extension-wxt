import useSWR from "swr";
import { UserSettings } from "~/types";
import { UserSettingsForm } from "./user-settings-form";

function UserSettingPage() {
  const { data, error } = useSWR("userSettings", fetchUserSettings);

  if (!data && !error) {
    return <p>Loading ..</p>;
  }

  if (error) {
    return <p>Error loading user settings</p>;
  }

  return <UserSettingsForm userSettings={data!} />;
}

export default UserSettingPage;

async function fetchUserSettings(): Promise<UserSettings> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jiraSettings: {
          apiKey: "xxx",
          defaultLabels: ["tag1", "tag2"],
          defaultComponents: undefined,
        },
        deepLSettings: {
          defaultTargetLanguage: undefined,
          apiKey: undefined,
        },
      });
    }, 500);
  });
}
