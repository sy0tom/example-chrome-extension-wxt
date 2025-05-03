import { Button } from "@/entrypoints/components/button";
import { useForm } from "react-hook-form";
import { UserSettings } from "~/types";

interface Props {
  userSettings: UserSettings;
}

type UserSettingsFormData = {
  jiraApiKey: string | undefined;
  jiraDefaultTags: string[] | undefined;
  jiraDefaultComponents: string[] | undefined;
  deepLApiKey: string | undefined;
};

function UserSettingsForm({ userSettings }: Props) {
  const [defaultValues, setDefaultValues] = useState<UserSettingsFormData>(
    convertToFormData(userSettings),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserSettingsFormData>({
    defaultValues: convertToFormData(userSettings),
  });

  const onSubmit = async (formData: UserSettingsFormData) => {
    console.log(`formData is ${JSON.stringify(formData)}`);
    const response = await fetchUserSettingsPost(
      convertToUserSettings(formData),
    );
    setDefaultValues(convertToFormData(response));
    console.log(`response is ${JSON.stringify(response)}`);
  };

  const onReset = () => {
    reset(defaultValues);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="jiraApiKey">Jira API Key</label>
        <input id="jiraApiKey" type="password" {...register("jiraApiKey")} />
        <label htmlFor="jiraDefaultTags">Jira Default Tags</label>
        <input
          id="jiraDefaultTags"
          type="text"
          {...register("jiraDefaultTags")}
        />
        <label htmlFor="JiraDefaultComments">Jira Default Components</label>
        <input
          id="jiraDefaultComponents"
          type="text"
          {...register("jiraDefaultComponents")}
        />
        <label htmlFor="deepLApiKey">DeepL API Key</label>
        <input id="deepLApiKey" type="password" {...register("deepLApiKey")} />
        <Button
          type="button"
          color="secondary"
          size="md"
          text="reset"
          onClick={onReset}
        />
        <Button
          type="submit"
          color="primary"
          size="md"
          text="registry"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}

function convertToFormData(userSettings: UserSettings): UserSettingsFormData {
  return {
    jiraApiKey: userSettings.jiraSettings.apiKey,
    jiraDefaultTags: userSettings.jiraSettings.defaultLabels,
    jiraDefaultComponents: userSettings.jiraSettings.defaultComponents,
    deepLApiKey: userSettings.deepLSettings.apiKey,
  };
}

function convertToUserSettings(formData: UserSettingsFormData): UserSettings {
  return {
    jiraSettings: {
      apiKey: formData.jiraApiKey,
      defaultLabels: formData.jiraDefaultTags,
      defaultComponents: formData.jiraDefaultComponents,
    },
    deepLSettings: {
      apiKey: formData.deepLApiKey,
    },
  };
}

export default UserSettingsForm;

async function fetchUserSettingsPost(
  model: UserSettings,
): Promise<UserSettings> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(model);
    }, 1000);
  });
}
