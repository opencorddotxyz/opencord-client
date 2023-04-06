import { Config, setConfig } from '../config';
import { LOWEST_VERSION } from '../constant/common';
import { RPCMethods } from '../constant/methods';
import { inApp } from '../decorator/in-app';
import { version } from '../decorator/version';
import { invokeRPC } from '../invoker';
import { getPlatform, getVersion } from '../utils/platform';

export type Platform = 'web' | 'desktop' | 'mobile' | 'unknown';
export interface AuthInfo {
  code: string;
  address: string;
  userId: string;
  channelId: string;
}
export interface AppInfo {
  version: string;
}
export class Opencord {
  public platform: Platform = 'unknown';
  public version = '';

  constructor(config?: Config) {
    this.init(config);
  }

  /**
   * Initialize the opencord object
   */
  private init(config?: Config) {
    setConfig(config);
    this.platform = getPlatform();
    this.version = getVersion();
  }

  /**
   * Return code information for login verification
   * @returns {Promise<AuthInfo>}
   */
  @inApp()
  @version(LOWEST_VERSION)
  public async getCode() {
    return await invokeRPC<AuthInfo>(RPCMethods.getCode);
  }
}
