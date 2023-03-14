import * as Bowser from 'bowser';
export function isBrowser() {
  return typeof window !== 'undefined';
}

const browser = isBrowser()
  ? Bowser.getParser(window.navigator.userAgent)
  : undefined;

export function isDesktop() {
  return browser?.getPlatformType() === 'desktop';
}
