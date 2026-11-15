import { SocialLink } from '../types';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'email',
    label: 'Reach out',
    sublabel: 'Email',
    href: 'mailto:manav.chaudhary1303@gmail.com',
    icon: 'mail',
    ariaLabel: 'Send email to Manav Chaudhary',
  },
  {
    id: 'github',
    label: 'GitHub',
    sublabel: 'Code & Repos',
    href: 'https://github.com/manav-chaudhary01',
    icon: 'github',
    ariaLabel: 'Visit Manav on GitHub',
    isExternal: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    sublabel: 'Professional',
    href: 'https://www.linkedin.com/in/manav-chaudhary13/',
    icon: 'linkedin',
    ariaLabel: 'Connect with Manav on LinkedIn',
    isExternal: true,
  },
  {
    id: 'resume',
    label: 'Résumé',
    sublabel: 'CV & Experience',
    href: '#resume',
    icon: 'file-text',
    ariaLabel: 'View or download resume',
    download: true,
  },
];
