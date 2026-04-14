'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, RefObject } from 'react';
import Experience from './tabs/Experience';
import Education from './tabs/Education';
import LaunchIcon from './icons/launch';

const links = [
  { href: 'https://github.com/AidansCode', label: 'GitHub' },
  { href: 'https://linkedin.com/in/aidan-m-127088121', label: 'LinkedIn' },
  { href: 'mailto:amurphey@tutanota.com', label: 'Email' },
];

type ViewableTab = {
  id: string;
  label: string;
  Component: React.ComponentType;
};

type LinkTab = {
  id: string;
  label: string;
  url: string;
};

type Tab = ViewableTab | LinkTab;

const tabs: Tab[] = [
  { id: 'experience', label: 'Experience', Component: Experience },
  { id: 'education', label: 'Education', Component: Education },
  {
    id: 'resume',
    label: 'Resume',
    url: 'https://z20hjnw7tm.ufs.sh/f/D8T2VvQaUE3QpejT41SxQS8rc5oTlF3gvsn7m1IAazPCGNOL',
  },
];

function isViewableTab(tab: Tab): tab is ViewableTab {
  return !!(tab as ViewableTab)?.Component;
}

function TabLabel({
  tab,
  open,
  refs,
}: {
  tab: Tab;
  open: () => void;
  refs: RefObject<Map<string, HTMLButtonElement>>;
}) {
  if (isViewableTab(tab)) {
    return (
      <button
        key={tab.id}
        ref={(el) => {
          if (el) refs.current.set(tab.id, el);
        }}
        onClick={() => open()}
        className="text-sm font-medium text-gray-400 uppercase tracking-wider hover:text-gray-200 transition-colors"
      >
        {tab.label}
      </button>
    );
  } else {
    return (
      <a
        key={tab.id}
        href={tab.url}
        className="text-sm font-medium text-gray-400 uppercase tracking-wider hover:text-gray-200 hover:cursor-alias transition-colors"
        target="_blank"
      >
        <div className="flex flex-row gap-1 items-center">
          {tab.label} <LaunchIcon />
        </div>
      </a>
    );
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const ref = tabRefs.current.get(activeTab);
    if (ref) {
      setUnderline({
        left: ref.offsetLeft,
        width: ref.offsetWidth,
      });
    }
  }, [activeTab]);

  const ActiveComponent =
    tabs.filter((t) => isViewableTab(t)).find((t) => t.id === activeTab)?.Component ??
    (tabs[0] as ViewableTab).Component;

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Hi, I'm Aidan</h1>
        <p className="text-gray-400 leading-relaxed max-w-md">
          Senior software engineer building software people love while elevating teams and
          engineering culture.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex gap-6 relative">
          {tabs.map((tab) => (
            <TabLabel key={tab.id} tab={tab} refs={tabRefs} open={() => setActiveTab(tab.id)} />
          ))}
          <span
            className="absolute -bottom-1 h-px bg-gray-400 transition-all duration-200"
            style={{
              left: underline.left,
              width: underline.width,
            }}
          />
        </div>
        <ActiveComponent />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Connect</h2>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-200 hover:underline underline-offset-4 transition-colors"
              target="_blank"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
