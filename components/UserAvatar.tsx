import { Avatar, AvatarFallback, AvatarNextImage } from './ui/avatar';

function getInitials(name: string): string {
  const names = name.split(' ');
  const initials = names.map((n) => n[0]).join('');
  return initials.slice(0, 2).toUpperCase();
}

export function UserAvatar({
  image,
  name,
  ...props
}: {
  image?: string | null;
  name?: string | null;
} & React.ComponentProps<typeof Avatar>) {
  const username = name || 'User';

  return (
    <Avatar {...props}>
      {image ? (
        <AvatarNextImage src={image} alt={username} width={64} height={64} />
      ) : (
        <AvatarFallback>{getInitials(username)}</AvatarFallback>
      )}
    </Avatar>
  );
}
