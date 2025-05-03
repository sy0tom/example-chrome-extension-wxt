interface UserSettings {
  jiraSettings: {
    apiKey: string | undefined;
    defaultLabels: string[] | undefined;
    defaultComponents: string[] | undefined;
  };
  deepLSettings: {
    apiKey: string | undefined;
  };
}

export default UserSettings;
