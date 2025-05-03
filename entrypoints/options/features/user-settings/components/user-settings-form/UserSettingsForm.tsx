import { Button } from "@/entrypoints/components/button";
import { FormText } from "@/entrypoints/components/form-text";
import { useForm } from "react-hook-form";
import { TranslateLanguage, UserSettings } from "~/types";

interface Props {
  userSettings: UserSettings;
}

type UserSettingsFormData = {
  jiraApiKey: string | undefined;
  jiraDefaultLabels: string[] | undefined;
  jiraDefaultComponents: string[] | undefined;
  translateDefaultTargetLanguage: TranslateLanguage | undefined;
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
    formState: { errors, isSubmitting },
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
        <>
          <div className="px-2 py-2 font-sans">
            <span className="px-2 py-2 text-lg font-bold font-sans text-gray-600">
              Jira
            </span>
            <hr className="text-gray-300" />
          </div>
          <div className="px-2 py-2">
            <FormText
              label="Default Labels"
              name="jiraDefaultLabels"
              type="text"
              register={register}
            />
            <FormText
              label="Default Components"
              name="jiraDefaultComponents"
              type="text"
              register={register}
            />
            <FormText
              label="API Key"
              name="jiraApiKey"
              type="password"
              register={register}
              error={errors.jiraApiKey}
            />
          </div>
        </>
        <>
          <div className="px-2 py-2 font-sans">
            <span className="px-2 py-2 text-lg font-bold font-sans text-gray-600">
              Translate
            </span>
            <hr className="text-gray-300" />
          </div>
          <div className="px-2 py-2">
            <FormText
              label="DeepL API Key"
              name="deepLApiKey"
              type="password"
              register={register}
              error={errors.deepLApiKey}
            />
          </div>
        </>
        <div className="px-2 py-2">
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
        </div>
      </form>
    </div>
  );
}

function convertToFormData(model: UserSettings): UserSettingsFormData {
  return {
    jiraApiKey: model.jiraSettings.apiKey,
    jiraDefaultLabels: model.jiraSettings.defaultLabels,
    jiraDefaultComponents: model.jiraSettings.defaultComponents,
    translateDefaultTargetLanguage:
      model.deepLSettings.defaultTargetLanguage ?? "EN",
    deepLApiKey: model.deepLSettings.apiKey,
  };
}

function convertToUserSettings(form: UserSettingsFormData): UserSettings {
  return {
    jiraSettings: {
      apiKey: form.jiraApiKey,
      defaultLabels: form.jiraDefaultLabels,
      defaultComponents: form.jiraDefaultComponents,
    },
    deepLSettings: {
      defaultTargetLanguage: form.translateDefaultTargetLanguage,
      apiKey: form.deepLApiKey,
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
