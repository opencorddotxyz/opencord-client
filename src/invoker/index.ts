import { RPC as iFrameRPC, RPCMessageEvent } from 'rpc-shooter';
import { getClient } from '..';

import { RPC_TIMEOUT, SUCCESS_STATUS } from '../constant/common';
import { getLogger } from '../utils/logger';
import { withTimeout } from '../utils/timeout';
import { getClientInfo } from '../utils/user-agent';
import { NativeRPC, Platform } from './native';

export type RPC = {
  invoke(method: string, ...args: any[]): Promise<any>;
};

let iframeRPC: RPC;
let nativeRPC: NativeRPC;

const logger = getLogger('rpc');
const { isWeb, isDesktop, isAndroid, isIos } = getClientInfo();

export function getIFrameRPC(timeout = RPC_TIMEOUT) {
  if (iframeRPC) {
    return iframeRPC;
  }

  iframeRPC = new iFrameRPC({
    event: new RPCMessageEvent({
      currentEndpoint: window,
      targetEndpoint: window.top as Window,
      config: { targetOrigin: '*' },
    }),
    timeout,
  });

  return iframeRPC;
}

export function getNativeRPC(platform: Platform) {
  if (nativeRPC) {
    return nativeRPC;
  }
  nativeRPC = new NativeRPC(platform);

  return nativeRPC;
}

export function getRPC(): RPC {
  if (isWeb || isDesktop) {
    return getIFrameRPC();
  }

  if (isAndroid) {
    return getNativeRPC('android');
  }

  if (isIos) {
    return getNativeRPC('ios');
  }

  throw 'no rpc for current platform';
}

export interface RPCMessage<T> {
  code: number;
  message: string;
  data: T;
}

export const invokeRPC = async <T>(
  eventName: string,
  ...args: []
): Promise<RPCMessage<T>> => {
  try {
    const rpc = getRPC();
    const oc = getClient();
    logger.info(`invoke ${eventName}`);
    const response = await withTimeout(rpc.invoke(eventName, ...args));
    logger.info(`response ${eventName} succeeded`, response);

    return {
      ...SUCCESS_STATUS,
      data: (oc.platform === 'mobile'
        ? JSON.parse(response as string)
        : response) as T,
    };
  } catch (e: any) {
    logger.error(`response ${eventName} error:`, e);
    const { code, message } = e;

    return {
      code,
      message,
      data: {} as T,
    };
  }
};
