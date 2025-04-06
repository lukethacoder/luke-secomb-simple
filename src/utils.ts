export const getUrlParam = (key: string): string | null =>
  new URL(window.location.href).searchParams.get(key)

export const setUrlParam = (
  key: string,
  value: string,
  replaceHistory = true
) => {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)

  if (replaceHistory) {
    history.replaceState(null, '', `?${url.searchParams.toString()}`)
  } else {
    history.pushState(null, '', `?${url.searchParams.toString()}`)
  }
}

export const getSessionStorage = (key: string): string | null =>
  window.sessionStorage.getItem(key)

export const setSessionStorage = (key: string, value: string) =>
  window.sessionStorage.setItem(key, value)
