export type TDate = number | string | Date;
export function toDate(time: TDate): Date {
  if (
    typeof time === 'string' &&
    !isNaN(Number(time)) &&
    Number.isInteger(Number(time))
  ) {
    const timestamp = parseInt(time, 10) as number;

    return new Date(timestamp);
  }

  return new Date(time);
}

/**
 * @param date 1650815117544
 * @param format yyyy-MM-dd hh:mm:ss
 * @returns 2022-04-24 23:45:17
 */
export const formatDate = (
  date: TDate = new Date(),
  format = 'yyyy-MM-dd hh:mm:ss',
): string => {
  let _format = format;
  const newDate = toDate(date);
  const parsedDate: Record<string,number> = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    S: newDate.getMilliseconds(),
  };
  
  if (/(y+)/.test(format)) {
    const element = (/(y+)/.exec(format) || [])[1] || '';
    _format = format.replace(element, String(newDate.getFullYear()).slice(4 - element.length));
  }

  for (const key in parsedDate) {
    if (new RegExp(`(${key})`).test(format)) {
      const element = (new RegExp(`(${key})`).exec(format) || [])[1] || '';
      _format = _format.replace(
        element,
        element.length === 1 ? String(parsedDate[key]) : `00${parsedDate[key]}`.slice(String(parsedDate[key]).length),
      );
    }
  }

  return _format;
};
