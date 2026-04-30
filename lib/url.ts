/**
 * Constructs a search query string based on the provided parameters.
 * */
export function formSearchParamsUrl({
  name,
  value,
  search = window.location.search,
  pathname = window.location.pathname,
}: {
  name: string;
  value: string;
  search?: string;
  pathname?: string;
}): string {
  const params = new URLSearchParams(search);
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }
  return `${pathname}?${params.toString()}`;
}

export function getSearchParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
