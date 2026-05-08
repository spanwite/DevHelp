'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function MaybeImage({
  src,
  alt,
  ...props
}: React.ComponentProps<typeof Image> & {
  src?: string | null;
}) {
  const [visible, setVisible] = useState(true);

  if (!src) return null;

  return (
    visible && (
      <Image
        src={src}
        alt={alt ?? ''}
        onError={() => setVisible(false)}
        {...props}
      />
    )
  );
}
