type MaskType = 'letters' | 'numbers' | 'both';

const lettersRegex = /[^a-zA-Z]+/g;

const numbersRegex = /[a-zA-Z]/g;

const applyMask = (
  value: string | number,
  mask: string,
  maskType: MaskType = 'numbers',
): string => {
  if (!value) return '';

  let regex: RegExp;

  switch (maskType) {
    case 'letters':
      regex = lettersRegex;
      break;
    case 'numbers':
      regex = numbersRegex;
      break;
    case 'both':
    default:
      regex = /[^a-zA-Z0-9]+/g;
      break;
  }

  let formattedValue = '';
  const unmaskedValue = String(value).replace(regex, '');
  let position = 0;

  for (let i = 0; i < mask.length; i++) {
    if ((mask[i] === '#' || mask[i] === '*') && unmaskedValue[position] !== undefined) {
      formattedValue += unmaskedValue[position++];
    } else if (unmaskedValue[position] !== undefined) {
      formattedValue += mask[i];
    }
  }

  return formattedValue;
};

const removeMonetaryMask = (value: string | number) => {
  const valueWithoutMask = String(value)
    .replace(/[^0-9]/g, '')
    .trim();

  return Number(valueWithoutMask) / 100;
};

const numbersWithTwoDecimaPlaces = (value: string, onlyPositive = false) => {
  let unmaskedValue = value.replace(numbersRegex, '');

  if (onlyPositive) {
    unmaskedValue = unmaskedValue.replace('-', '');
  }

  const unmaskedValueLength = unmaskedValue.length;

  const toNumber = Number(unmaskedValue);

  if (Number.isNaN(toNumber)) {
    return unmaskedValue.slice(0, unmaskedValueLength - 1);
  }

  if (toNumber > 100 || toNumber < -100) {
    return String(Number(unmaskedValue.slice(0, unmaskedValueLength - 1)));
  }

  if (!Number.isInteger(toNumber)) {
    return String(parseFloat(toNumber.toFixed(2)));
  }

  return unmaskedValue.replace('.00', '').replace('000', '');
};

export const Mask = {
  removeMonetaryMask,
  formatNumber: (value: string | number) => {
    if (!value && value !== 0) return '0';

    return String(value)
      .replace(/[^0-9]/g, '')
      .trim();
  },
  formatCNPJ: (value: string) => applyMask(value, '**.***.***/****-**'),
  formatCPF: (value: string) => applyMask(value, '***.***.***-**'),
  formatCEP: (value: string): string => applyMask(value, '*****-***'),
  formatDate: (value: string): string => applyMask(value, '**/**/****'),
  formatBRL: (value: string | number, divider = 100): string => {
    if (!value && value !== 0) return '';

    const valueWithoutMask = String(value)
      .replace(/[^0-9]/g, '')
      .trim();

    return (Number(valueWithoutMask) / divider).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  },
  formatUS: (value: string | number, divider = 100): string => {
    if (!value && value !== 0) return '';
    if (value === 0) return '0';
    const valueWithoutMask = String(value)
      .replace(/[^0-9]/g, '')
      .trim();
    return (Number(valueWithoutMask) / divider).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  },
  formatPhone: (value: string): string => applyMask(value, '(**) *****-****'),
  formatCustom: (value: string, customMask: string) => applyMask(value, customMask),
  positiveNumbersWithTwoDecimaPlaces: (value: string) => numbersWithTwoDecimaPlaces(value, true),
  numbersWithTwoDecimaPlaces,
};
