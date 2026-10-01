import {
  LegalLayout,
  ProseP,
  ProseUL,
  ExtLink,
  DocLink,
  type LegalSection
} from '../components/legal/LegalLayout';
import { SUPPORT_EMAIL } from '../config/legal';

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of These Terms',
    content: (
      <ProseP>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of MovieHub (the
        &ldquo;Service&rdquo;). By accessing or using the Service, you agree to be bound by these
        Terms. If you do not agree, please do not use the Service.
      </ProseP>
    )
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    content: (
      <ProseP>
        You must be at least 13 years old (or the minimum digital consent age in your country) to
        use the Service. If you are under the age of majority where you live, you may use the Service
        only with the involvement of a parent or guardian.
      </ProseP>
    )
  },
  {
    id: 'service',
    title: 'The Service',
    content: (
      <>
        <ProseP>
          MovieHub is a movie discovery tool. It lets you browse categories, search for films, view
          details such as overviews, cast, ratings, and similar titles, and watch trailers embedded
          from third parties.
        </ProseP>
        <ProseP>
          Movie metadata and images are provided by The Movie Database (TMDB). MovieHub does not host
          or stream full movies and is not affiliated with any studio or streaming platform. Some
          &ldquo;where to watch&rdquo; information may be available through third-party data and can
          be incomplete or region-specific.
        </ProseP>
      </>
    )
  },
  {
    id: 'license',
    title: 'License to Use the Service',
    content: (
      <ProseP>
        Subject to these Terms, we grant you a limited, revocable, non-exclusive, non-transferable
        licence to access and use the Service for your personal, non-commercial use. You may not
        copy, modify, distribute, sell, lease, reverse engineer, or create derivative works from the
        Service except as expressly permitted by law.
      </ProseP>
    )
  },
  {
    id: 'third-party',
    title: 'Third-Party Content & Attribution',
    content: (
      <>
        <ProseUL>
          <li>
            This product uses the TMDB API but is not endorsed or certified by TMDB. See the{' '}
            <ExtLink href="https://www.themoviedb.org/terms-of-use">TMDB Terms of Use</ExtLink>.
          </li>
          <li>
            Trailers are embedded from YouTube and remain subject to YouTube&rsquo;s and the
            content owner&rsquo;s terms.
          </li>
          <li>
            Links to third-party websites are provided for convenience only. We are not responsible
            for the content, policies, or practices of those websites.
          </li>
        </ProseUL>
      </>
    )
  },
  {
    id: 'conduct',
    title: 'Acceptable Use',
    content: (
      <>
        <ProseP>You agree not to:</ProseP>
        <ProseUL>
          <li>Use the Service for any unlawful, harmful, or fraudulent purpose.</li>
          <li>
            Attempt to gain unauthorised access to the Service, its servers, or any connected
            systems or networks.
          </li>
          <li>
            Interfere with or disrupt the Service, including by introducing viruses, excessive
            requests, scraping, or automated abuse.
          </li>
          <li>
            Use the Service to infringe the intellectual property or other rights of any person.
          </li>
          <li>Remove, obscure, or alter any copyright, trademark, or attribution notices.</li>
        </ProseUL>
      </>
    )
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    content: (
      <ProseP>
        The MovieHub name, logo, design, and original content are owned by us or our licensors and
        are protected by applicable intellectual property laws. Movie titles, posters, artwork,
        trailers, and other metadata are the property of their respective owners and are displayed
        for informational purposes. All rights not expressly granted are reserved.
      </ProseP>
    )
  },
  {
    id: 'accounts',
    title: 'Accounts',
    content: (
      <ProseP>
        MovieHub can be used without an account. If account features are introduced or enabled, you
        are responsible for maintaining the confidentiality of your credentials and for all activity
        under your account. Notify us promptly of any unauthorised use.
      </ProseP>
    )
  },
  {
    id: 'disclaimer',
    title: 'Disclaimers',
    content: (
      <ProseP>
        The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis
        without warranties of any kind, whether express or implied, including fitness for a
        particular purpose, accuracy, and non-infringement. Movie data is sourced from third parties
        and may be incomplete, delayed, or inaccurate. We do not warrant that the Service will be
        uninterrupted, secure, or error-free.
      </ProseP>
    )
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: (
      <ProseP>
        To the maximum extent permitted by law, MovieHub and its operators will not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or for any loss of data,
        profits, or goodwill, arising out of or related to your use of the Service. Our total
        liability for any claim relating to the Service will not exceed the greater of the amount
        you paid us (if any) or the minimum amount required by applicable law.
      </ProseP>
    )
  },
  {
    id: 'indemnity',
    title: 'Indemnification',
    content: (
      <ProseP>
        You agree to indemnify and hold harmless MovieHub and its operators from any claims, damages,
        liabilities, and expenses arising from your misuse of the Service or your violation of these
        Terms or the rights of a third party.
      </ProseP>
    )
  },
  {
    id: 'termination',
    title: 'Termination',
    content: (
      <ProseP>
        We may suspend or discontinue the Service, in whole or in part, at any time without notice,
        including for maintenance, security, or legal reasons. We may also restrict or terminate
        your access if you violate these Terms. Sections that by their nature should survive
        termination (such as intellectual property, disclaimers, and liability limits) will continue
        to apply.
      </ProseP>
    )
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: (
      <ProseP>
        These Terms are governed by the laws applicable in the operator&rsquo;s principal place of
        business, without regard to conflict-of-law rules. Nothing in these Terms limits any
        mandatory consumer rights you may have in your country of residence.
      </ProseP>
    )
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content: (
      <ProseP>
        We may revise these Terms from time to time. When we do, we will update the &ldquo;Last
        updated&rdquo; date at the top of this page. Your continued use of the Service after changes
        take effect constitutes acceptance of the revised Terms.
      </ProseP>
    )
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <ProseP>
        Questions about these Terms? Email{' '}
        <ExtLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</ExtLink>. You can also read our{' '}
        <DocLink to="/privacy-policy">Privacy Policy</DocLink> and{' '}
        <DocLink to="/cookie-policy">Cookie Policy</DocLink>.
      </ProseP>
    )
  }
];

export const TermsOfServicePage = () => (
  <LegalLayout
    active="terms"
    title="Terms of Service"
    subtitle="The rules that apply when you use MovieHub to discover movies and watch trailers."
    sections={sections}
  />
);
