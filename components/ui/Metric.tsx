import { LucideIcon } from 'lucide-react';
import { Badge } from './badge';

export function Metric({
  icon: Icon,
  value,
  label,
}: {
  icon?: LucideIcon;
  value: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <Badge variant='ghost' className='select-none'>
      {Icon && <Icon className='text-secondary-accent size-4' />}
      <span className='font-medium'>{value}</span>
      <span className='text-muted-foreground'>{label}</span>
    </Badge>
  );
}
