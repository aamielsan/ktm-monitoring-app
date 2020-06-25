import format from 'date-fns/format';
import { TYPE_MAP, CDV_TYPE_MAP } from '../constants';

export const DATE_FORMAT = 'dd-MMM-yyyy';
export const LOCALE = 'en-ph';

export function parseCurrency(string) {
  if (!string) {
    return 0;
  }

  if (typeof string === 'number') {
    return string;
  }

  const replaced = String(string).replace(/,/g, '');
  return Number(replaced || 0);
}

export function toLocaleCurrency(number, currency) {
  return parseCurrency(number).toLocaleString(LOCALE, { style: 'currency', currency })
}

export function formatDate(value) {
  if (!value) {
    return '';
  }

  return format(new Date(value), DATE_FORMAT);
}

export function formatValueByType(value, type) {
  switch (type) {
    case 'date':
      return formatDate(value);
    case 'usd':
      return toLocaleCurrency(value, 'USD');

    case 'php':
      return toLocaleCurrency(value, 'PHP');

    default:
      return value;
  }
}

export function normalize(values) {
  return Object.keys(values).reduce((res, key) => {
    const isDate = TYPE_MAP[key] === 'date';
    const value = isDate ? formatDate(values[key]) : values[key];
    return {
      ...res,
      [key]: (value || '').trim(),
    }

  }, values);
}

export function validate(values) {
  const errors = {};

  if (!values.rcp_item) {
    errors.rcp_item = 'Required';
  }

  return errors;
}

export function getInitialValues(initialValue = {}) {
  return Object.keys(TYPE_MAP).reduce((res, key) => ({
    ...res,
    [key]: initialValue[key] || null,
  }), {});
}

export function getCdvInitialValues(initialValue = {}) {
  return Object.keys(CDV_TYPE_MAP).reduce((res, key) => ({
    ...res,
    [key]: initialValue[key] || null,
  }), {});
}
