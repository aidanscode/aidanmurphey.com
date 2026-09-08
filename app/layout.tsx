import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const description =
  'Senior software engineer. The work that matters is often the work nobody thought to ask for. I go find it.';

export const metadata: Metadata = {
  title: {
    default: "Hi, I'm Aidan",
    template: '%s — Aidan Murphey',
  },
  description,
  authors: [{ name: 'Aidan Murphey' }],
  creator: 'Aidan Murphey',
  openGraph: {
    type: 'website',
    siteName: 'Aidan Murphey',
    title: "Hi, I'm Aidan",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-neutral-950 text-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
