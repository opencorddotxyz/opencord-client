import { Config } from './config';
import { Opencord } from './model/opencord';

export { AppError,VersionError } from './constant/error'
export { Opencord ,AuthInfo} from './model/opencord'
export { RPCMessage } from './invoker/index'
export { Config } from './config'

let oc: Opencord;

export const getClient = (config?: Config) => {
  if (oc) {
    return oc;
  }
  oc = new Opencord(config);

  return oc;
};
