import { getConfig } from '../config';
import { LOG_COLOR, LOG_PREFIX } from '../constant/common';
import { formatDate } from './time';

export type LogLevel = 'info' | 'warning' | 'error';
interface PrefixConfig {
  prefix?: string;
}
class Logger {
  public config?: PrefixConfig;
  constructor(config?: PrefixConfig) {
    this.config = config;
  }
  public handleLog = (type: LogLevel, ...args: any) => {
    const { debug } = getConfig();
    if (!debug) {
      return;
    }

    const date = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
    const commonPrefix = `[${LOG_PREFIX}:${date}]`;
    const configPrefix = this.config.prefix;
    const lastPrefix = configPrefix
      ? `${commonPrefix}:${configPrefix}`
      : commonPrefix;

    console.info(
      `%c${lastPrefix}`,
      `background:${LOG_COLOR[type as string]}`,
      ...args,
    );
  };
  public info(...args: any) {
    this.handleLog('info', ...args);
  }
  public warn(...args: any) {
    this.handleLog('warning', ...args);
  }
  public error(...args: any) {
    this.handleLog('error', ...args);
  }
}

export const getLogger = (prefix?: string) => {
  return new Logger({
    prefix,
  });
};
