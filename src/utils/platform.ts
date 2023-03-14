import { Platform } from '../model/opencord';
import { getClientInfo } from './user-agent';

const { isWeb, isDesktop, inApp, version = '',isMobile } = getClientInfo();

export function getPlatform(): Platform {
  if (!inApp) {
    return 'unknown';
  }

  if (isWeb) {
    return 'web';
  }

  if (isDesktop) {
    return 'desktop';
  }
  
  if(isMobile){
    return 'mobile';
  }

  return 'unknown';
}

export const getVersion = () => {
  return version;
};
