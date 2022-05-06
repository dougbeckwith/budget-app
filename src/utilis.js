// Number Formater undefinded defaults to the current users location
export const curencyFormater = new Intl.NumberFormat(undefined, {
  currency: 'cad',
  style: 'currency',
  minimumFractionDigits: 0,
})
