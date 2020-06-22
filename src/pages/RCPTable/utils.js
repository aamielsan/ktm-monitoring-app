import format from 'date-fns/format';

export function formatDate(value) {
  const DATE_FORMAT = 'dd MMM yyyy';

  if (!value) {
    return '';
  }

  return format(new Date(value), DATE_FORMAT);
}
