export function isEmail(value: string) {
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;
  return re.test(String(value).toLowerCase());
}

export function isRequired(value: string) {
  return value.trim().length > 0;
}

export function isPhone(value: string) {
  // Acepta dígitos, espacios o guiones. Valida 8-15 dígitos.
  const digits = value.replace(/[^0-9]/g, '');
  return digits.length >= 8 && digits.length <= 15;
}
