import Image from 'next/image';

export default async function MaybeImage({
  src,
  alt,
  ...props
}: React.ComponentProps<typeof Image> & {
  src?: string | null;
}) {
  if (!src) return null;

  try {
    let res = await fetch(src, { method: 'HEAD', cache: 'force-cache' });
    // Some hosts block HEAD; fallback to GET for a small range
    if (!res.ok) {
      res = await fetch(src, {
        method: 'GET',
        headers: { Range: 'bytes=0-0' },
        cache: 'force-cache',
      });
    }

    if (!res.ok) {
      return null;
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return null;
    }
  } catch {
    return null;
  }

  return <Image src={src} alt={alt ?? ''} {...props} />;
}
