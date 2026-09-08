import Link from 'next/link';
import { links } from '../links';

export default function Footer() {
  return (
    <footer className="mt-24 pt-8 border-t border-gray-900">
      <div className="flex flex-wrap justify-between items-baseline gap-x-6 gap-y-3">
        <div>
          <p className="text-gray-300">
            <Link href="/" className="hover:underline underline-offset-4">
              Aidan Murphey
            </Link>
          </p>
          <p className="text-sm text-gray-500">Senior software engineer</p>
        </div>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 hover:text-gray-200 hover:underline underline-offset-4 transition-colors"
              target="_blank"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
