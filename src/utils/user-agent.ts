import { UAParser } from 'ua-parser-js';
import { LOWEST_VERSION } from '../constant/common';

export interface UserAgent {
  readonly isMobile: boolean;
  readonly isDesktop: boolean;
  readonly isIos: boolean;
  readonly isAndroid: boolean;
  readonly isWeb: boolean;
}

export function parseUA(phrase: string): UserAgent {
  const result: UAParser.IResult = new UAParser(phrase).getResult();
  const deviceType: string = result.device.type ?? '';
  const os: string = result.os.name ?? '';
  const isIos: boolean = os === 'iOS';
  const isMobile: boolean = deviceType === 'mobile';
  const isAndroid: boolean = os === 'Android';
  const isDesktop: boolean = result.ua.includes('electron');
  const isWeb: boolean = !isMobile && !isDesktop;

  const ua: UserAgent = Object.freeze({
    isMobile,
    isIos,
    isDesktop,
    isAndroid,
    isWeb,
  });

  return ua;
}

function parseUAStr(str: string) {
  if (!str) {
    return;
  }

  const resArr = str.split(' ');
  const res: {
    [key: string]: string;
  } = {};
  resArr.forEach((item: string) => {
    if (item.includes('/')) {
      const temp = item.split('/');
      if (temp?.length === 4 && temp[2] === 'Opencord') {
        // version ua
        res[temp[2]] = temp[3];
      } else {
        res[temp[0]] = temp[1];
      }
    }
  });

  return res;
}

function parseIframeStr(str: string) {
  if (!str) {
    return {};
  }

  return JSON.parse(str);
}

function isBrowser() {
  return typeof window !== 'undefined';
}

export const getClientInfo = () => {
  const inIframe =
    isBrowser() &&
    window.parent &&
    window.self &&
    window.parent !== window.self;
  const userAgent = isBrowser() ? window?.navigator?.userAgent : '';
  const iframeInfo = isBrowser() ? window?.frames?.name : '';
  const userAgentInfo = parseUA(userAgent);

  const ocInfo = userAgentInfo.isMobile
    ? parseUAStr(userAgent)
    : parseIframeStr(iframeInfo);

  const inApp =
    userAgent.includes('Opencord') ||
    iframeInfo.includes('Opencord') ||
    inIframe;

  const version = ocInfo?.Opencord ?? (inApp ? LOWEST_VERSION : '');

  return {
    ...userAgentInfo,
    ...ocInfo,
    version,
    inApp,
  };
};
