import { cn } from "@/lib/utils";

export function Sidebar({
  className,
  side,
  ...props
}: React.ComponentProps<'aside'> & { side: 'left' | 'right' }) {
  return <aside
    className={cn(
      'border-input bg-background sticky top-(--header-height) flex max-h-[calc(100vh-var(--header-height))] max-w-56 flex-1 flex-col  gap-4 overflow-y-auto p-4 max-sm:hidden',
      side === 'right' && 'right-0 border-l',
      side === 'left' && 'left-0 border-r',
      className
    )}
    {...props}
  />;
}
