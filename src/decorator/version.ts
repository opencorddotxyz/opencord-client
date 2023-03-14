import { compare } from 'compare-versions';

import { VersionError } from '../constant/error';
import { getLogger } from '../utils/logger';

const logger = getLogger('Version');

export function version(minVersion: string, maxVersion?: string) {
  return function (
    target: object,
    name: string,
    descriptor: PropertyDescriptor,
  ) {
    const originFn = descriptor.value;
    descriptor.value = async function (...args: any) {
      if (maxVersion && compare(maxVersion, this.version, '>')) {
        logger.error(
          `The current client does not support ${name} method, please upgrade your SDK version`,
        );

        return VersionError.SDK_VERSION_LOWER;
      }

      if (compare(minVersion, this.version, '>')) {
        logger.error(
          'The current client version is too low, please upgrade the client',
        );

        return VersionError.CLIENT_VERSION_LOWER;
      }

      return originFn.apply(this, args);
    };

    return descriptor;
  };
}
