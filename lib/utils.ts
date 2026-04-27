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

export function getDeviconClass(iconName: string): string {
  iconName = formatIconName(iconName);
  iconName = mapIconName(iconName);

  return cn(
    `devicon-${iconName}-original`,
    `devicon-${iconName}-plain`,
    'colored'
  );
}

function formatIconName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replaceAll(/[\s.]/g, '')
    .replaceAll(/\+/g, 'plus')
    .replaceAll(/#/g, 'sharp');
}

function mapIconName(iconName: string): string {
  const mapping: Record<string, string> = {
    css: 'css3',
    html: 'html5',
    js: 'javascript',
    ts: 'typescript',
  };
  return mapping[iconName] || iconName;
}
