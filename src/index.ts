import { Config } from './config';
import { Opencord } from './model/opencord';

export { AppError,VersionError } from './constant/error'
export { Opencord } from './model/opencord'

let oc: Opencord;

export const getClient = (config?: Config) => {
  if (oc) {
    return oc;
  }
  oc = new Opencord(config);

  return oc;
};
