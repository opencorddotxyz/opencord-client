import { getClient } from '..';

import { AppError } from '../constant/error';
import { getLogger } from '../utils/logger';

const logger = getLogger('AppError');

export function inApp() {
  return function (
    target: object,
    name: string,
    descriptor: PropertyDescriptor,
  ) {
    const originFn = descriptor.value;
    descriptor.value = async function (...args: any) {
      const client = getClient();

      if (client.platform === 'unknown') {
        logger.error(AppError.NOT_IN_OPENCORD.message);

        return AppError.NOT_IN_OPENCORD;
      }

      return originFn.apply(client, args);
    };

    return descriptor;
  };
}
