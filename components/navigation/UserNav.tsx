import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarNextImage } from '../ui/avatar';

function getInitials(name: string): string {
  const names = name.split(' ');
  const initials = names.map((n) => n[0]).join('');
  return initials.slice(0, 2).toUpperCase();
}

export function UserNav({
  href,
  name = 'User',
  image,
  initials = getInitials(name),
}: {
  href: string;
  name?: string;
  image?: string;
  initials?: string;
}) {
  return (
    <Link href={href}>
      <Avatar>
        {image ? (
          <AvatarNextImage src={image} alt={name} width={42} height={42} />
        ) : (
          <AvatarFallback>{getInitials(initials)}</AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}
