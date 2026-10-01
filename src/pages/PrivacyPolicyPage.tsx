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

const sections: LegalSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <>
        <ProseP>
          MovieHub (&ldquo;MovieHub&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
          is a movie discovery web application that lets you browse, search, and learn about films.
          This Privacy Policy explains what information we handle, why we handle it, and the choices
          you have. It applies to the MovieHub website and any related pages that link to it.
        </ProseP>
        <ProseP>
          You can use the core features of MovieHub without creating an account. We aim to collect as
          little personal information as possible. If you have questions after reading this policy,
          please contact us using the details at the bottom of this page.
        </ProseP>
      </>
    )
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: (
      <>
        <ProseH3>Information you provide</ProseH3>
        <ProseUL>
          <li>
            <span className="text-white font-medium">Search queries.</span> When you search for a
            movie, your query is sent to our movie data provider to return matching results. We do
            not build a profile of your searches.
          </li>
          <li>
            <span className="text-white font-medium">Messages you send us.</span> If you email us,
            we receive your email address and the contents of your message so we can reply.
          </li>
        </ProseUL>

        <ProseH3>Information collected automatically</ProseH3>
        <ProseUL>
          <li>
            <span className="text-white font-medium">Technical and log data.</span> Our hosting and
            content delivery providers may record standard server logs, which can include your IP
            address, browser type and version, operating system, referring pages, the pages you
            visit, and timestamps. This is used for security, reliability, and abuse prevention.
          </li>
          <li>
            <span className="text-white font-medium">No advertising or analytics trackers.</span> We
            do not run third-party advertising or behavioural analytics on MovieHub.
          </li>
        </ProseUL>

        <ProseH3>Information stored on your device</ProseH3>
        <ProseUL>
          <li>
            <span className="text-white font-medium">Preferences.</span> We use your browser&rsquo;s
            local storage to remember a small theme preference. This stays on your device and is not
            sent to us.
          </li>
          <li>
            <span className="text-white font-medium">Filters in the URL.</span> Your selected browse
            category and language filter may appear in the page address (for example,{' '}
            <code className="text-gray-200 bg-white/5 px-1.5 py-0.5 rounded text-xs">
              /?lang=hi
            </code>
            ). This is used only to display the page you requested.
          </li>
        </ProseUL>
      </>
    )
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Information',
    content: (
      <ProseUL>
        <li>To display movie data, images, ratings, cast, and related recommendations.</li>
        <li>To respond to your questions, requests, and support emails.</li>
        <li>To keep the service secure, available, and protected against abuse.</li>
        <li>To understand aggregate, non-identifying usage so we can improve the experience.</li>
        <li>To comply with legal obligations and enforce our Terms of Service.</li>
      </ProseUL>
    )
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services & Sharing',
    content: (
      <>
        <ProseP>
          We do not sell your personal information. We share information only with the service
          providers needed to run MovieHub, and only as described below.
        </ProseP>
        <ProseUL>
          <li>
            <span className="text-white font-medium">TMDB.</span> Movie metadata, ratings, and
            artwork are provided by The Movie Database. Search terms you enter are transmitted to
            TMDB to return results. See the{' '}
            <ExtLink href="https://www.themoviedb.org/privacy-policy">TMDB Privacy Policy</ExtLink>.
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </li>
          <li>
            <span className="text-white font-medium">YouTube.</span> Trailers are embedded from
            YouTube. We use YouTube&rsquo;s privacy-enhanced mode (
            <code className="text-gray-200 bg-white/5 px-1.5 py-0.5 rounded text-xs">
              youtube-nocookie.com
            </code>
            ) so that cookies are not set until you play a video. See the{' '}
            <ExtLink href="https://policies.google.com/privacy">Google Privacy Policy</ExtLink>.
          </li>
          <li>
            <span className="text-white font-medium">Supabase.</span> If optional account features
            are enabled in the future, authentication may be handled by Supabase and a session token
            may be stored in your browser. See the{' '}
            <ExtLink href="https://supabase.com/privacy">Supabase Privacy Policy</ExtLink>.
          </li>
          <li>
            <span className="text-white font-medium">Hosting and infrastructure.</span> Our hosting
            provider processes technical data to serve the site and keep it secure.
          </li>
        </ProseUL>
      </>
    )
  },
  {
    id: 'cookies',
    title: 'Cookies & Local Storage',
    content: (
      <ProseP>
        We use minimal cookies and browser storage. The core site uses local storage for your theme
        preference. Third-party embeds such as YouTube may set their own cookies when you interact
        with them. For full details and how to manage them, see our{' '}
        <DocLink to="/cookie-policy">Cookie Policy</DocLink>.
      </ProseP>
    )
  },
  {
    id: 'retention',
    title: 'Data Retention',
    content: (
      <ProseP>
        We keep support emails only for as long as needed to handle your request and meet legal
        obligations. Server and log data is retained by our hosting providers for short, operational
        periods. Preference data in your browser remains until you clear it.
      </ProseP>
    )
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <ProseP>
        We take reasonable technical and organisational measures to protect the information we
        handle, including encrypted connections (HTTPS). However, no method of transmission or
        storage over the internet is completely secure, and we cannot guarantee absolute security.
      </ProseP>
    )
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    content: (
      <>
        <ProseP>
          Depending on where you live, you may have rights such as the right to access, correct, or
          delete personal information, and to object to or restrict certain processing. Because
          MovieHub does not require an account and stores very little personal data, many of these
          rights can be exercised directly in your browser (for example, by clearing site data).
        </ProseP>
        <ProseP>
          To make a request, contact us at{' '}
          <ExtLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</ExtLink>. We may need to verify
          your request before responding.
        </ProseP>
      </>
    )
  },
  {
    id: 'children',
    title: "Children's Privacy",
    content: (
      <ProseP>
        MovieHub is not directed to children under the age of 13 (or the minimum age in your
        jurisdiction). We do not knowingly collect personal information from children. If you
        believe a child has provided us with personal information, please contact us and we will
        delete it.
      </ProseP>
    )
  },
  {
    id: 'international',
    title: 'International Data Transfers',
    content: (
      <ProseP>
        Our service providers may process data in countries other than your own. Where required, we
        rely on appropriate safeguards for such transfers. By using MovieHub, you understand that
        your information may be processed in these locations.
      </ProseP>
    )
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: (
      <ProseP>
        We may update this Privacy Policy from time to time. When we do, we will revise the
        &ldquo;Last updated&rdquo; date at the top of this page. Continued use of MovieHub after
        changes take effect means you accept the updated policy.
      </ProseP>
    )
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <ProseP>
        For any privacy question or request, email{' '}
        <ExtLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</ExtLink>. We are happy to help.
      </ProseP>
    )
  }
];

export const PrivacyPolicyPage = () => (
  <LegalLayout
    active="privacy"
    title="Privacy Policy"
    subtitle="How MovieHub handles information when you browse movies, search, and watch trailers."
    sections={sections}
  />
);
