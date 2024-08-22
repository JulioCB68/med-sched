export const CPFmask = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let value = e.target.value.replace(/\D/g, '')

  if (value.length > 11) {
    value = value.slice(0, 11)
  }

  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  return value
}

export const RGmask = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let value = e.target.value.replace(/\D/g, '')

  if (value.length > 9) {
    value = value.slice(0, 9)
  }

  value = value.replace(/(\d{2})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d{1})$/, '$1-$2')

  return value
}
