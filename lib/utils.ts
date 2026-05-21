import { clsx, type ClassValue } from 'clsx';
import { nanoid } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string): string {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

export function joinUrl(...paths: string[]): string {
  return paths.map(removeTrailingSlash).join('/');
}

export function getDeviconUrl(iconName: string): string {
  iconName = getDeviconName(iconName);
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`;
}

export function getDeviconName(iconName: string): string {
  iconName = iconName
    .trim()
    .toLowerCase()
    .replaceAll(/[\s.]/g, '')
    .replaceAll(/\+/g, 'plus')
    .replaceAll(/#/g, 'sharp');
  const mapping: Record<string, string> = {
    css: 'css3',
    html: 'html5',
  };
  return mapping[iconName] || iconName;
}

export async function resourceExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

type OmitUndefined<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends undefined ? never : K]: Exclude<
    T[K],
    undefined
  >;
};

export function omitUndefined<T extends Record<string, unknown>>(
  obj: T
): OmitUndefined<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as OmitUndefined<T>;
}

export function retrieveUsernameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  if (!localPart) {
    return '';
  }
  return localPart.toLowerCase().replace(/[.]/g, '');
}

export function unifyUsername(username: string, unifiedPartLength = 5): string {
  return `${username}-${nanoid(unifiedPartLength)}`;
}

export function formatUsername(username: string): string {
  
}