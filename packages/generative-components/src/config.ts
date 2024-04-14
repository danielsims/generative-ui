type ServiceConfig = Record<string, string>;

const serviceConfig: ServiceConfig = {};

export const configureAIServices = (
  configs: Record<string, string | undefined>,
): void => {
  const filteredConfigs: ServiceConfig = {};
  Object.keys(configs).forEach((key) => {
    const value = configs[key];
    if (value) {
      // Ignore empty strings and undefined
      filteredConfigs[key] = value;
    } else {
      console.warn(
        `Warning: No value provided for ${key}, skipping this configuration.`,
      );
    }
  });
  Object.assign(serviceConfig, filteredConfigs);
};

export const getConfigValue = (key: string): string => {
  const value = serviceConfig[key];
  if (!value) {
    throw new Error(
      `Configuration for ${key} is missing. Please ensure it is set during initialization.`,
    );
  }
  return value;
};
