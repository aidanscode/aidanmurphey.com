import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hi, I'm Aidan",
  description: "Senior software engineer building software people love while elevating teams and engineering culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-neutral-950 text-gray-200">
        <main className="max-w-2xl mx-auto px-6 py-20">
          {children}
        </main>
      </body>
    </html>
  );
}
