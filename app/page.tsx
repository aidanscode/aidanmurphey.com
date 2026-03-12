import Link from "next/link";

type Experience = {
  company: string,
  companySubText?: string,
  period: string,
  role: string,
  summary: string[]
}

const experience: Experience[] = [
  {
    company: "Vistar Media",
    companySubText: "(Acquired by T-Mobile)",
    period: "2025 - Present",
    role: "Software Engineer III",
    summary: [
      
    ]
  },
  {
    company: "Amazon",
    period: "2023 — 2025",
    role: "Software Development Engineer II",
    summary: [
      "Led design and implementation of backend systems supporting the national launch of a new consumer subscription product, including major expansions to eligibility and status APIs.",
      "Drove cross-team delivery with partner organizations and led a team of 4 engineers to ship critical launch features on a tight timeline.",
      "Onboarded and guided new engineers through system architecture and development workflows to ensure reliable, production-ready implementations.",
    ],
  },
  {
    company: "Amazon",
    period: "2022 — 2023",
    role: "Software Development Engineer I",
    summary: [
      "Designed and built a core internal API service powering the pilot of a new consumer subscription product, serving multiple dependent services in production.",
      "Implemented customer-facing subscription signup and management UI in collaboration with UX and product partners.",
      "Built a backend API supporting the launch of a feature allowing customers to reserve pickup and delivery time slots for online orders, aggregating data from multiple internal services.",
    ],
  },
  {
    company: "DeliveryCircle",
    period: "2019 — 2021",
    role: "Software Engineer",
    summary: [
      "Developed the company's core SaaS delivery-management platform, taking the product from initial development through launch.",
    ],
  },
];

const links = [
  { href: "https://github.com/AidansCode", label: "GitHub" },
  { href: "https://linkedin.com/in/aidan-m-127088121", label: "LinkedIn" },
  { href: "mailto:amurphey@tutanota.com", label: "Email" },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hi, I'm Aidan
        </h1>
        <p className="text-gray-400 leading-relaxed max-w-md">
          Senior software engineer building software people love while elevating teams and engineering culture.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((job, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p>
                    <span className="font-medium">
                      {job.company}
                    </span>
                    {job.companySubText && (
                      <span className="text-xs"> {job.companySubText}</span>
                    )}
                  </p>
                  <p className="text-gray-400">
                      {job.role} <span className="text-gray-500">({job.period})</span>
                    </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                {job.summary.map((item, k) => (
                  <li key={k} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Connect
        </h2>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-200 hover:underline underline-offset-4 transition-colors"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
