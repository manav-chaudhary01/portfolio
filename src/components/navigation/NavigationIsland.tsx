import React from 'react';
import { NavTile } from './NavTile';
import { WorkIllustration } from './illustrations/WorkIllustration';
import { AboutIllustration } from './illustrations/AboutIllustration';
import { PlaygroundIllustration } from './illustrations/PlaygroundIllustration';
import { ContactIllustration } from './illustrations/ContactIllustration';
import { NavNodeId } from '../../types';

interface NavigationIslandProps {
  activeSection: NavNodeId | null;
  onSelectSection: (id: NavNodeId) => void;
  className?: string;
}

/**
 * Centered tactile navigation island inspired by pixelwrld.co.
 * Houses the 4 handcrafted illustrated 3D-styled navigation objects
 * with spring physics, individual tilts, and focus dimming.
 */
export const NavigationIsland: React.FC<NavigationIslandProps> = ({
  activeSection,
  onSelectSection,
  className = '',
}) => {
  const items: {
    id: NavNodeId;
    label: string;
    tilt: number;
    illustration: React.ReactNode;
    ariaLabel: string;
  }[] = [
    {
      id: 'work',
      label: 'Work',
      tilt: -2.0,
      illustration: <WorkIllustration size={80} />,
      ariaLabel: 'Explore featured work and engineering projects',
    },
    {
      id: 'about',
      label: 'About Manav',
      tilt: 1.5,
      illustration: <AboutIllustration size={80} />,
      ariaLabel: 'Read about Manav, engineering philosophy, and background',
    },
    {
      id: 'playground',
      label: 'Playground',
      tilt: -1.2,
      illustration: <PlaygroundIllustration size={80} />,
      ariaLabel: 'Open interactive experiments and creative sandbox',
    },
    {
      id: 'contact',
      label: 'Contact',
      tilt: 2.2,
      illustration: <ContactIllustration size={80} />,
      ariaLabel: 'Get in touch with Manav via email and social links',
    },
  ];

  return (
    <nav
      aria-label="Primary portfolio navigation"
      className={`grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-12 w-full max-w-2xl mx-auto my-6 select-none ${className}`}
    >
      {items.map((item) => (
        <NavTile
          key={item.id}
          id={item.id}
          label={item.label}
          tilt={item.tilt}
          illustration={item.illustration}
          onClick={() => onSelectSection(item.id)}
          isDimmed={Boolean(activeSection && activeSection !== item.id)}
          isFocused={activeSection === item.id}
          ariaLabel={item.ariaLabel}
          ariaExpanded={activeSection === item.id}
        />
      ))}
    </nav>
  );
};
