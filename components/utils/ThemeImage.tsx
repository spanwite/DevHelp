import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ThemeImage({
  className,
  alt,
  srcDark,
  srcLight,
  ...props
}: Omit<React.ComponentProps<typeof Image>, 'src'> & {
  srcLight: string;
  srcDark: string;
}) {
  return (
    <>
      <Image
        src={srcDark}
        alt={alt}
        className={cn('hidden dark:block', className)}
        {...props}
      />
      <Image
        src={srcLight}
        alt={alt}
        className={cn('dark:hidden', className)}
        {...props}
      />
    </>
  );
}
