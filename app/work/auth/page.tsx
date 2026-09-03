import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rebuilding authentication for a multi-tenant platform',
  description:
    'Sent to migrate an auth tenant. Found master passwords committed to the repo, and a user table where one account in ten was still in use. Neither was in the ask.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h2>
      <div className="space-y-3 text-gray-400 leading-relaxed">{children}</div>
    </section>
  );
}

export default function AuthCaseStudy() {
  return (
    <div className="space-y-12">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-block"
      >
        &larr; Back
      </Link>

      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Rebuilding authentication for a multi-tenant platform
        </h1>
        <p className="text-gray-400 leading-relaxed">
          Several hundred customer organizations, seven months. Me, plus a junior engineer who owned
          the login flow integration and the impersonation system. No PM for the first two thirds of
          it.
        </p>
      </section>

      <Section title="Before">
        <ul className="space-y-2">
          <li>
            Authentication was home-rolled: email and password, no email verification, and session
            cookies with neither an idle timeout nor a maximum age.
          </li>
          <li>
            Every employee had a master password. It was hashed and committed to the repo, it
            authenticated as any user on the platform, and it granted platform-wide admin. No
            process existed for revoking one when someone left, and rotation was rare at best. Some
            had been sitting unused for years.
          </li>
        </ul>
      </Section>

      <Section title="The ask, and what it became">
        <p>
          The ask was to move the platform onto the company&apos;s central identity provider. On the
          way in I found a set of security problems nobody had scoped, and a data problem people
          knew about in pieces but nobody had connected to the migration. That turned out to be the
          work.
        </p>
      </Section>

      <Section title="After">
        <ul className="space-y-2">
          <li>
            The central identity provider, which brought corporate SSO, MFA, and email verification
            with it.
          </li>
          <li>Sessions with both an idle timeout and a maximum age.</li>
          <li>
            An audited impersonation system, which is what let us delete the master passwords
            outright instead of rotating them.
          </li>
          <li>
            Employee access gated per environment through corporate directory groups, so access
            follows employment and ends with it.
          </li>
        </ul>
      </Section>

      <Section title="Deciding what counted as an active account">
        <p>
          The user table was roughly ten times larger than the active user base. Years of abandoned
          signups and dormant accounts had piled up and nobody had ever cleaned them out. Nobody
          knew the real number until I went looking.
        </p>
        <p>
          Rather than pick a definition of active myself, I listed every signal the production data
          offered. Last login, approval status, which artifacts a real user creates, how recently.
          Then I wrote up how the population moved under each combination and threshold, took a
          recommendation to my PM, and we agreed where the lines went.
        </p>
      </Section>

      <Section title="The hard part: matching companies with no shared key">
        <p>
          Centralizing identity meant every user and every company on our platform had to exist in
          the central store exactly once. Both sides had a display name and a platform-specific ID,
          and nothing else in common. A handful of companies on the central side carried a domain
          used for federated login. That was it.
        </p>
        <p>
          So I matched on what was left: names, including exact matches, substrings, and
          transformations like acronyms; overlap in user email addresses; and overlap in the domains
          those users signed in with. I built a tool that ran all of it across the full data set and
          collected every candidate pairing together with the evidence behind it. Then I put it in
          front of the people who could actually judge it. Account managers on both sides knew the
          customers and their history.
        </p>
        <p>
          Nothing merged automatically. About a fifth of our companies turned up a candidate, and
          every one of those needed a human sign-off. The rest were treated as new and went into the
          list to be created centrally, on the same sheet and through the same review, because
          &quot;no match found&quot; is a claim that can be wrong too.
        </p>
        <p>
          That asymmetry was the design. A false split leaves a duplicate someone cleans up later. A
          false merge puts one company&apos;s users inside another company&apos;s account. Imported
          users landed with a no-access role, so a bad merge would not have exposed data. It would
          still have put strangers in a customer&apos;s account list, which is its own kind of
          incident.
        </p>
        <p>
          There was never any ground truth to check against. The best we could get was a confident
          answer from someone who knew the customer, in an industry where large agencies and media
          owners routinely operate under several names at once. Producing the evidence took a few
          weeks. Getting it through the business took most of the project, and that governed the
          schedule in a way I had not predicted. The matching had to produce answers before the
          import plan could even be agreed on, so a queue I did not control sat on the critical path
          of one I did.
        </p>
      </Section>

      <Section title="What I chose not to fix">
        <p>
          One seam shipped open. A new user has to be created in the central platform before they
          can be created in ours.
        </p>
        <p>
          That costs us. Account managers do the setup twice, it stalls whenever the central-side
          user already exists but is deactivated, and company admins on our platform lost the
          ability to create their own users. I accepted it anyway.
        </p>
        <p>
          The work was small. A minimal version was a week or two. It was not ours to build, though.
          Cross-platform provisioning belonged to the platform team, a second platform was migrating
          behind us so anything real would have had to serve both, and a shortcut serving only us
          was not something they would accept for a problem already on their roadmap. So the choice
          was never build or wait. It was whether to spend the limited goodwill we had with that
          team on scope that belonged to them, or on the decisions our own migration was blocked by.
          I spent it on the migration.
        </p>
        <p>Provisioning still has not been picked up. The seam closes when it does.</p>
      </Section>

      <Section title="Handing off the login flow and impersonation">
        <p>
          The junior engineer on the project owned two pieces. One was the identity SDK integration
          into our login flow. The other was the impersonation system that retired the master
          passwords, which she designed as well as built.
        </p>
        <p>
          I picked both on purpose. Each one mattered and neither was hard. Either would have taken
          me a fraction of the time it took to mentor her through it, which is what made them safe
          to give away. The work could not go badly wrong, so it did not need a spec to keep it on
          rails.
        </p>
        <p>
          I had a shape for each in my head and wrote neither down. She worked out her own and came
          to me to have it pulled apart. Different from handing someone a design and reviewing the
          diff against it, and slower, and the reason she came out of the project able to defend
          both without me in the room.
        </p>
      </Section>

      <Section title="Working through a dependency I didn't control">
        <p>
          Every integration decision needed sign-off from a platform team that was badly overloaded,
          where the default answer to any new proposal was no. First ask to unblocked ran one to two
          months at the start of the project. By the end it was under a week. Their capacity did not
          change and their priorities did not change. What changed was how I asked.
        </p>
        <p>
          A written document for every ask, covering the context, the proposal, the alternatives
          considered, and why this one. Agreement with my own side on our non-negotiables before the
          meeting instead of during it. Standing reminders of what was blocked on them.
        </p>
      </Section>
    </div>
  );
}
