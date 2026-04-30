export function updateSearchParam(name: string, value: string): string {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }
  return `${window.location.pathname}?${params.toString()}`;
}
