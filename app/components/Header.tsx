'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // The home page opens with "Hi, I'm Aidan" — no need to say it twice.
  if (pathname === '/') return null;

  return (
    <header className="mb-12">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-block"
      >
        &larr; Aidan Murphey
      </Link>
    </header>
  );
}
