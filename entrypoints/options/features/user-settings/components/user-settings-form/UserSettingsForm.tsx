import { Button } from "#/components/button";
import { FormInput, FormSelect, FormTag } from "#/components/fields";
import { createStorageUserSettingsRepository } from "#/repositories/storage/StorageUserSettingsRepositoryImpl";
import { createUserSettingsService } from "#/services/UserSettingsService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TranslateLanguage, TranslateLanguageMap, UserSettings } from "~/types";

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
  const userSettingsService = createUserSettingsService(
    createStorageUserSettingsRepository(),
  );

  const initialValues = convertToFormData(userSettings);

  const [defaultValues, setDefaultValues] =
    useState<UserSettingsFormData>(initialValues);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSettingsFormData>({ defaultValues: initialValues });

  const onSubmit = async (formData: UserSettingsFormData) => {
    console.log(`formData is ${JSON.stringify(formData)}`);
    const userSettings = await userSettingsService.saveUserSettings(
      convertToUserSettings(formData),
    );
    setDefaultValues(convertToFormData(userSettings));
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
            <FormInput
              label="Default Labels"
              name="jiraDefaultLabels"
              type="text"
              register={register}
            />
            <FormTag
              label="Default Components"
              name="jiraDefaultComponents"
              control={control}
            />
            <FormInput
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
            <FormSelect
              label="Default Target Lang"
              name="translateDefaultTargetLanguage"
              options={[...TranslateLanguageMap.entries()].map(
                ([key, value]) => ({
                  name: value,
                  value: key,
                }),
              )}
              register={register}
            />
            <FormInput
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
    translateDefaultTargetLanguage: model.deepLSettings.defaultTargetLanguage,
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
