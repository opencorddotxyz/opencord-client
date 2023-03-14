import { RPC_TIMEOUT } from '../constant/common';

export const withTimeout = (
  promise: Promise<unknown>,
  duration = RPC_TIMEOUT,
) => {
  const timeout = new Promise((_, reject) => {
    const timer = setTimeout(() => {
      reject('timeout');
      clearTimeout(timer);
    }, duration);
  });

  return Promise.race([promise, timeout]);
};
