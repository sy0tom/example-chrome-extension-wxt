import { Button } from "@/entrypoints/components/button";
import {
  FieldError,
  FieldValues,
  Path,
  useForm,
  UseFormRegister,
} from "react-hook-form";
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
        <FormInput
          label="Jira Default Tags"
          name="jiraDefaultTags"
          type="text"
          register={register}
        />
        <FormInput
          label="Jira Default Components"
          name="jiraDefaultComponents"
          type="text"
          register={register}
        />
        <FormInput
          label="Jira API Key"
          name="jiraApiKey"
          type="password"
          register={register}
          error={errors.jiraApiKey}
        />
        <FormInput
          label="DeepL API Key"
          name="deepLApiKey"
          type="password"
          register={register}
          error={errors.deepLApiKey}
        />
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

interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: "text" | "password";
  register: UseFormRegister<T>;
  error?: FieldError;
}
function FormInput<T extends FieldValues>({
  label,
  name,
  type,
  register,
  error,
}: FormInputProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...register(name)} />
      {error && <p className="text-red-500">{error.message}</p>}
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
