type Experience = {
  company: string;
  companySubText?: string;
  period: { start: string; end: string };
  role: string;
  summary: string[];
};

const experience: Experience[] = [
  {
    company: 'Vistar Media',
    companySubText: '(Acquired by T-Mobile)',
    period: { start: '2025', end: 'Present' },
    role: 'Senior Software Engineer',
    summary: [
      "Rebuilt authentication for a multi-tenant SaaS platform, replacing home-rolled session auth with the company's central identity provider: corporate SSO, MFA, email verification, session expiry, and an audited impersonation system that retired a long-standing set of employee master passwords. Reconciled every user and company into the central store across platforms that shared no common identifier.",
      "Rebuilt the team's code review process. Reviewer rotation replaced all-hands assignment, assignment now fires an automatic notification, and the team authored its own review standards. Rubber-stamp approvals and multi-day waits became consistent, substantive reviews, and design review now happens ahead of implementation.",
      'Won company-wide "Dev-Ex" award for modernizing a legacy frontend build pipeline through a ~30K LOC migration, replacing an abandoned critical dependency, reducing build times from 60+ seconds to ~6 seconds, and significantly improving frontend development velocity.',
    ],
  },
  {
    company: 'Amazon',
    period: { start: '2023', end: '2025' },
    role: 'Software Development Engineer II',
    summary: [
      'Led design and implementation of backend systems supporting the national launch of a new consumer subscription product, including major expansions to eligibility and status APIs.',
      'Drove cross-team delivery with partner organizations and led a team of 4 engineers to ship critical launch features on a tight timeline.',
      'Onboarded and guided new engineers through system architecture and development workflows to ensure reliable, production-ready implementations.',
    ],
  },
  {
    company: 'Amazon',
    period: { start: '2022', end: '2023' },
    role: 'Software Development Engineer I',
    summary: [
      'Designed and built a core internal API service powering the pilot of a new consumer subscription product, serving multiple dependent services in production.',
      'Implemented customer-facing subscription signup and management UI in collaboration with UX and product partners.',
      'Built a backend API supporting the launch of a feature allowing customers to reserve pickup and delivery time slots for online orders, aggregating data from multiple internal services.',
    ],
  },
  {
    company: 'DeliveryCircle',
    period: { start: '2019', end: '2021' },
    role: 'Software Engineer',
    summary: [
      "Developed the company's core SaaS delivery-management platform, taking the product from initial development through launch.",
    ],
  },
];

export default function Experience() {
  return (
    <div className="space-y-8 relative">
      <div className="absolute left-[22px] top-3 bottom-8 w-px bg-gray-700" />
      {experience.map((job, i) => (
        <div key={i} className="relative pl-12">
          <div className="absolute left-[13px] top-5 w-[18px] h-[18px] rounded-full bg-gray-800 border-2 border-gray-500" />
          <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p>
                  <span className="font-medium">{job.company}</span>
                  {job.companySubText && <span className="text-xs"> {job.companySubText}</span>}
                </p>
                <p className="text-gray-400">
                  {job.role}{' '}
                  <span className="text-gray-500">
                    ({job.period.start} — {job.period.end})
                  </span>
                </p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-gray-400">
              {job.summary.map((item, k) => (
                <li key={k} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
