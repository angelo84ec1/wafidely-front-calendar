export function isStorageFile (path: string) {
  if (!/^(f|ht)tps?:\/\//i.test(path)) {
    return process.env.STRAPI_URL
  } else { return path }
}
