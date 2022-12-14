const convertOrDefault = (
  raw: string | undefined,
  defaultValue: string,
): string => {
  if (!raw) {
    return defaultValue;
  }
  return raw;
};

const convertIntOrDefault = (
  raw: string | undefined,
  defaultValue: number,
): number => {
  if (!raw) {
    return defaultValue;
  }
  const v = Number.parseInt(raw, 10);
  if (Number.isNaN(v)) {
    return defaultValue;
  }
};

const convertBooleanOrDefault = (
  raw: string | undefined,
  defaultValue: boolean,
): boolean => {
  if (!raw) {
    return defaultValue;
  }
  if (raw !== 'true' && raw !== 'false') {
    return defaultValue;
  }
  if (raw === 'true') {
    return true;
  }
  if (raw === 'false') {
    return false;
  }
  return false;
};

export const generateGlobalConfig = () => {
  if (false) {
    console.error('environment variables are invalid');
    process.exit();
  }

  return {
    gcp: {
      projectId: convertOrDefault(process.env.GCP_PROJECT_ID, 'test'),
    },
    app: {
      env: convertOrDefault(process.env.APP_ENV, 'test'),
      loggerLevel: {
        access: convertOrDefault(process.env.APP_LOGGER_LEVEL_ACCESS, 'debug'),
        request: convertOrDefault(
          process.env.APP_LOGGER_LEVEL_REQUEST,
          'debug',
        ),
      },
    },
  };
};

export type GlobalConfig = ReturnType<typeof generateGlobalConfig>;
