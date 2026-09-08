'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, RefObject } from 'react';
import Experience from './tabs/Experience';
import Education from './tabs/Education';
import LaunchIcon from './icons/launch';

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
          Senior software engineer. The work that matters is often the work nobody thought to ask
          for. I go find it.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Selected work
        </h2>
        <Link
          href="/work/auth"
          className="block bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:bg-gray-900 hover:border-gray-700 transition-colors group"
        >
          <p className="text-gray-300 leading-relaxed">
            Sent to migrate our login system into the company&apos;s. Found master passwords
            committed to the repo, and a user table where one account in ten was still in use.
            Neither was in the ask.
          </p>
          <p className="mt-3 text-xs text-gray-500 uppercase tracking-wider">
            <span className="whitespace-nowrap">Seven months</span> &middot;{' '}
            <span className="whitespace-nowrap">Hundreds of companies</span> &middot;{' '}
            <span className="whitespace-nowrap">No shared key between systems</span>
          </p>
          <p className="mt-1.5 text-sm font-medium text-gray-200 group-hover:underline underline-offset-4">
            Rebuilding authentication for a multi-tenant platform &rarr;
          </p>
        </Link>
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
    </div>
  );
}
