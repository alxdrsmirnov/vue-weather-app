export const getEnvParam = (name) => {
  const param = import.meta.env[name]
  if (!param) throw new Error(`Missing ENV param: ${name}`)
  return param
}