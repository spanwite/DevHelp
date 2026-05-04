import { ROUTES } from '@/lib/constants';
import { getDeviconUrl, joinUrl, resourceExists } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';

export async function TechBadge({
  data,
  withIcon = true,
}: {
  data: {
    name: string;
    id: string | number;
    count?: string | number;
  };
  withIcon?: boolean;
}) {
  let icon;
  if (withIcon) {
    const iconUrl = getDeviconUrl(data.name);
    const iconExists = await resourceExists(iconUrl);
    if (iconExists) {
      icon = (
        <Image src={iconUrl} alt={`${data.name} icon`} width={14} height={14} />
      );
    }
  }

  return (
    <Badge variant='secondary' asChild>
      <Link href={joinUrl(ROUTES.tags, data.id.toString())}>
        {icon}
        {data.name}
        {data.count && (
          <div className='text-muted-foreground text-xs'>{data.count}</div>
        )}
      </Link>
    </Badge>
  );
}
