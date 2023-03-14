export interface Config {
  debug: boolean;
}

let config: Config = {
  debug: false,
};

export const setConfig = (newConfig?: Partial<Config>) => {
  if (!newConfig || typeof newConfig !== 'object') {
    return;
  }
  config = {
    ...config,
    ...newConfig,
  };
};

export const getConfig = () => {
  return config;
};
