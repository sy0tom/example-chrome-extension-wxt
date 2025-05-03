import TranslateLanguage from "./TranslateLanguage";

interface UserSettings {
  jiraSettings: {
    apiKey: string | undefined;
    defaultLabels: string[] | undefined;
    defaultComponents: string[] | undefined;
  };
  deepLSettings: {
    defaultTargetLanguage: TranslateLanguage | undefined;
    apiKey: string | undefined;
  };
}

export default UserSettings;
