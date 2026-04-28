import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string): string {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
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
