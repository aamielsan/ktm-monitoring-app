import format from 'date-fns/format';

export const DATE_FORMAT = 'dd-MMM-yyyy';

export function formatDate(value) {

  if (!value) {
    return '';
  }

  return format(new Date(value), DATE_FORMAT);
}
