import {
  LegalLayout,
  ProseP,
  ProseH3,
  ProseUL,
  ExtLink,
  DocLink,
  type LegalSection
} from '../components/legal/LegalLayout';
import { SUPPORT_EMAIL } from '../config/legal';

const cookieRows = [
  {
    provider: 'MovieHub',
    name: 'theme',
    purpose: 'Remembers your light/dark theme preference.',
    type: 'Local storage (first party)',
    duration: 'Until you clear browser data'
  },
  {
    provider: 'YouTube',
    name: 'YSC',
    purpose: 'Registers a unique ID to keep statistics on which videos you have viewed.',
    type: 'Third party',
    duration: 'Session'
  },
  {
    provider: 'YouTube',
    name: 'VISITOR_INFO1_LIVE',
    purpose: 'Estimates bandwidth and collects usage statistics for the embedded player.',
    type: 'Third party',
    duration: 'Up to ~6 months'
  },
  {
    provider: 'YouTube',
    name: 'PREF',
    purpose: 'Stores player preferences such as volume and autoplay settings.',
    type: 'Third party',
    duration: 'Up to ~8 months'
  },
  {
    provider: 'Google / YouTube',
    name: 'CONSENT / SOCS',
    purpose: 'Stores your cookie consent choices for Google services.',
    type: 'Third party',
    duration: 'Up to ~2 years'
  },
  {
    provider: 'Supabase (if accounts enabled)',
    name: 'sb-<project>-auth-token',
    purpose: 'Keeps you signed in when optional account features are used.',
    type: 'Local storage (first party)',
    duration: 'Until you sign out or clear data'
  }
];

const CookieTable = () => (
  <div className="overflow-x-auto rounded-2xl border border-white/5">
    <table className="w-full min-w-[720px] text-left text-sm">
      <thead className="bg-white/[0.04] text-gray-300">
        <tr>
          <th scope="col" className="px-4 py-3 font-semibold">Provider</th>
          <th scope="col" className="px-4 py-3 font-semibold">Name</th>
          <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
          <th scope="col" className="px-4 py-3 font-semibold">Type</th>
          <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {cookieRows.map((row, index) => (
          <tr key={`${row.provider}-${row.name}-${index}`} className="align-top">
            <td className="px-4 py-3 text-white font-medium">{row.provider}</td>
            <td className="px-4 py-3">
              <code className="text-gray-200 bg-white/5 px-1.5 py-0.5 rounded text-xs">
                {row.name}
              </code>
            </td>
            <td className="px-4 py-3 text-gray-300">{row.purpose}</td>
            <td className="px-4 py-3 text-gray-400">{row.type}</td>
            <td className="px-4 py-3 text-gray-400">{row.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const sections: LegalSection[] = [
  {
    id: 'what-are-cookies',
    title: 'What Are Cookies & Similar Technologies',
    content: (
      <>
        <ProseP>
          Cookies are small text files that a website stores in your browser. Similar technologies
          include local storage, session storage, and pixels. They help websites remember your
          preferences, keep you signed in, and understand how a site is used.
        </ProseP>
        <ProseP>
          This Cookie Policy explains how MovieHub and the third parties we rely on use these
          technologies. It should be read together with our{' '}
          <DocLink to="/privacy-policy">Privacy Policy</DocLink>.
        </ProseP>
      </>
    )
  },
  {
    id: 'how-we-use-them',
    title: 'How We Use Them',
    content: (
      <ProseUL>
        <li>
          <span className="text-white font-medium">Functionality.</span> We store your theme
          preference in local storage so the site looks the way you left it.
        </li>
        <li>
          <span className="text-white font-medium">Security and performance.</span> Our hosting and
          content delivery providers may set strictly necessary cookies or use technical data to
          serve the site and protect it from abuse.
        </li>
        <li>
          <span className="text-white font-medium">Embedded media.</span> When you open a trailer,
          YouTube may set cookies to play the video and collect viewing statistics.
        </li>
      </ProseUL>
    )
  },
  {
    id: 'types-we-use',
    title: 'Types We Use',
    content: (
      <>
        <ProseP>
          We keep our own use minimal. Most cookies you may encounter on MovieHub come from embedded
          third-party content, and only after you interact with it.
        </ProseP>
        <CookieTable />
        <ProseP>
          <span className="text-gray-400 text-sm">
            Note: cookie names, purposes, and durations are set by the providers and may change
            without notice. The values above are indicative and based on the providers&rsquo;
            published information.
          </span>
        </ProseP>
      </>
    )
  },
  {
    id: 'third-party-cookies',
    title: 'Third-Party Cookies',
    content: (
      <>
        <ProseP>
          We embed trailers from YouTube using its privacy-enhanced mode (
          <code className="text-gray-200 bg-white/5 px-1.5 py-0.5 rounded text-xs">
            youtube-nocookie.com
          </code>
          ), which limits cookie storage until you play a video. Once you play a trailer, YouTube and
          Google may set cookies and process data as described in the{' '}
          <ExtLink href="https://policies.google.com/privacy">Google Privacy Policy</ExtLink> and{' '}
          <ExtLink href="https://policies.google.com/technologies/cookies">
            Google&rsquo;s cookie information
          </ExtLink>
          .
        </ProseP>
        <ProseP>
          Movie metadata is provided by TMDB. See the{' '}
          <ExtLink href="https://www.themoviedb.org/privacy-policy">TMDB Privacy Policy</ExtLink> for
          details of its practices.
        </ProseP>
      </>
    )
  },
  {
    id: 'managing-cookies',
    title: 'Managing Cookies',
    content: (
      <>
        <ProseH3>Browser controls</ProseH3>
        <ProseP>
          Most browsers let you view, block, and delete cookies and site data through their settings.
          You can usually find these controls under &ldquo;Privacy&rdquo; or &ldquo;Cookies and site
          data&rdquo;. Blocking all cookies may affect the availability of embedded trailers and may
          reset preferences such as your theme.
        </ProseP>
        <ProseH3>Clearing local storage</ProseH3>
        <ProseP>
          To remove the preferences MovieHub stores, clear site data for this website in your browser
          settings. This will not affect data held by third-party providers on their own domains;
          manage those through the providers&rsquo; controls.
        </ProseP>
      </>
    )
  },
  {
    id: 'do-not-track',
    title: 'Do Not Track',
    content: (
      <ProseP>
        Some browsers send a &ldquo;Do Not Track&rdquo; (DNT) signal. Because there is no common
        industry standard for honouring DNT and MovieHub does not run behavioural advertising or
        analytics, we do not currently respond to DNT signals.
      </ProseP>
    )
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: (
      <ProseP>
        We may update this Cookie Policy as our practices or the services we use change. When we do,
        we will update the &ldquo;Last updated&rdquo; date at the top of this page.
      </ProseP>
    )
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <ProseP>
        If you have questions about this Cookie Policy, email{' '}
        <ExtLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</ExtLink>. See also our{' '}
        <DocLink to="/privacy-policy">Privacy Policy</DocLink> and{' '}
        <DocLink to="/terms-of-service">Terms of Service</DocLink>.
      </ProseP>
    )
  }
];

export const CookiePolicyPage = () => (
  <LegalLayout
    active="cookies"
    title="Cookie Policy"
    subtitle="How MovieHub uses cookies, local storage, and embedded media, and how you can control them."
    sections={sections}
  />
);
