import { cn } from '@/lib/utils';

export function Header({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn(
        'border-input flex h-20 items-center justify-between gap-2 border-b px-7',
        className
      )}
      {...props}
    />
  );
}
