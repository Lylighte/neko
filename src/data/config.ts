/**
 * Site-level configuration for the template.
 * Replace these values to customize the portal for your organization.
 */
export const siteConfig = {
  /** Organization name displayed in hero, footer, and page titles */
  name: 'Your Organization',
  /** Short subtitle / tagline */
  subtitle: 'Minecraft Community',
  /** Hero description text */
  description:
    'Building a vibrant community where creativity meets technology. We foster an inclusive environment for learning, collaboration, and growth.',
  /** Logo path (relative to public/) */
  logo: '/nmo-logo-large.png',
  /** Hero background image */
  heroBackground: '/background/bg.jpg',
  /** Footer copyright text */
  copyright: '© 2025 - All rights reserved',
  /** Footer declaration */
  declaration: 'NOT AN OFFICIAL MINECRAFT ORGANIZATION. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.',
  /** Navigation items */
  nav: [
    { name: 'Home', url: '/lobby' },
    { name: 'News', url: '/news' },
    { name: 'About', url: '/about' },
    { name: 'Docs', url: '/documents' },
  ],
  /** Social / external links in footer */
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'Bilibili', url: 'https://space.bilibili.com', icon: 'bilibili' },
    { name: 'QQ', url: '#', icon: 'qq' },
  ],
  /** ICP filing number (optional, for Chinese sites) */
  icp: '',
}