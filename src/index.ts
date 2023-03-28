import { Config } from './config';
import { Opencord } from './model/opencord';

let oc: Opencord;

export const getClient = (config?: Config) => {
  if (oc) {
    return oc;
  }
  oc = new Opencord(config);

  return oc;
};

export type OpencordClient = ReturnType<typeof getClient>;