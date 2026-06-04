import type {
  NewsEntity,
  NewsDetail,
  IntroEntity,
  LinkEntity,
  DocumentNode,
  DocumentDetail,
} from './types'

// ============================================================
// Intro sections — used by Lobby (IntroView) and About pages
// ============================================================

export const staticIntroList: IntroEntity[] = [
  {
    title: 'Welcome to Our Community',
    description:
      'We are a passionate group of creators, builders, and explorers. Our community brings together people from all backgrounds to share knowledge, collaborate on projects, and grow together.',
    image: '/mc自然风景背景图-air/1.jpg',
  },
  {
    title: 'Build Amazing Things',
    description:
      'From architectural masterpieces to complex redstone contraptions, our members push the boundaries of creativity. Join us and turn your imagination into reality.',
    image: '/mc自然风景背景图-air/15.jpg',
  },
  {
    title: 'Learn & Share Knowledge',
    description:
      'We host regular workshops, tutorials, and collaborative sessions covering design, programming, and engineering topics. Everyone has something to teach and something to learn.',
    image: '/mc自然风景背景图-air/30.jpg',
  },
  {
    title: 'Our Vision',
    description:
      'Building a vibrant community where creativity meets technology. We aim to foster an inclusive environment where every member can develop their skills and make lasting friendships.',
    image: '',
  },
]

// ============================================================
// External links — used by About page
// ============================================================

export const staticLinkList: LinkEntity[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    description: 'Open source projects and source code',
  },
  {
    name: 'Documentation',
    url: '/documents',
    description: 'Guides, tutorials, and reference materials',
  },
  {
    name: 'Community Forum',
    url: '#',
    description: 'Join the discussion with fellow members',
  },
]

// ============================================================
// News briefs — used by NewsView overview cards
// ============================================================

export const staticNewsBrief: NewsEntity[] = [
  {
    id: 'welcome',
    title: 'Welcome to Our Portal',
    brief: 'Get started with our community and discover what we have to offer.',
    image: '/mc自然风景背景图-air/5.jpg',
    date: '2025-01-01',
    target: 'information',
  },
  {
    id: 'latest-updates',
    title: 'Latest Updates & News',
    brief: 'Stay up to date with the latest announcements and community news.',
    image: '/mc自然风景背景图-air/12.jpg',
    date: '2025-01-15',
    target: 'information',
  },
  {
    id: 'magazine-vol1',
    title: 'Community Magazine Vol. 1',
    brief: 'Our first community magazine featuring member spotlights and project showcases.',
    image: '/mc自然风景背景图-air/22.jpg',
    date: '2025-02-01',
    target: 'magazine',
  },
  {
    id: 'important-notice',
    title: 'Important Announcements',
    brief: 'Read important notices and updates from the community team.',
    image: '/mc自然风景背景图-air/35.jpg',
    date: '2025-02-15',
    target: 'notice',
  },
]

// ============================================================
// News list by category — used by NewsList pagination
// ============================================================

const informationNews: NewsEntity[] = [
  {
    id: 'welcome',
    title: 'Welcome to Our Portal',
    brief: 'Get started with our community and discover what we have to offer.',
    image: '/mc自然风景背景图-air/5.jpg',
    date: '2025-01-01',
    target: 'information',
  },
  {
    id: 'latest-updates',
    title: 'Latest Updates & News',
    brief: 'Stay up to date with the latest announcements and community news.',
    image: '/mc自然风景背景图-air/12.jpg',
    date: '2025-01-15',
    target: 'information',
  },
  {
    id: 'community-spotlight',
    title: 'Community Spotlight: Featured Projects',
    brief: 'Check out the amazing projects our members have been working on this month.',
    image: '/mc自然风景背景图-air/18.jpg',
    date: '2025-02-10',
    target: 'information',
  },
  {
    id: 'workshop-recap',
    title: 'Workshop Recap: Building Techniques',
    brief: 'A summary of our recent workshop on advanced building techniques and design principles.',
    image: '/mc自然风景背景图-air/25.jpg',
    date: '2025-03-05',
    target: 'information',
  },
  {
    id: 'new-members',
    title: 'Welcoming New Members',
    brief: 'We are excited to welcome our newest community members. Learn how to get involved.',
    image: '/mc自然风景背景图-air/40.jpg',
    date: '2025-03-20',
    target: 'information',
  },
]

const magazineNews: NewsEntity[] = [
  {
    id: 'magazine-vol1',
    title: 'Community Magazine Vol. 1',
    brief: 'Our first community magazine featuring member spotlights and project showcases.',
    image: '/mc自然风景背景图-air/22.jpg',
    date: '2025-02-01',
    target: 'magazine',
  },
  {
    id: 'magazine-vol2',
    title: 'Community Magazine Vol. 2',
    brief: 'Second edition with tutorials, interviews, and event coverage.',
    image: '/mc自然风景背景图-air/28.jpg',
    date: '2025-04-01',
    target: 'magazine',
  },
]

const noticeNews: NewsEntity[] = [
  {
    id: 'important-notice',
    title: 'Important Announcements',
    brief: 'Read important notices and updates from the community team.',
    image: '/mc自然风景背景图-air/35.jpg',
    date: '2025-02-15',
    target: 'notice',
  },
  {
    id: 'schedule-update',
    title: 'Event Schedule Update',
    brief: 'Changes to the upcoming event schedule. Please review the new dates.',
    image: '/mc自然风景背景图-air/42.jpg',
    date: '2025-03-01',
    target: 'notice',
  },
]

const activityNews: NewsEntity[] = [
  {
    id: 'build-contest',
    title: 'Annual Building Contest',
    brief: 'Show off your building skills in our annual contest. Prizes for top entries!',
    image: '/mc自然风景背景图-air/8.jpg',
    date: '2025-06-01',
    endDate: '2025-06-30',
    target: 'activity',
  },
  {
    id: 'game-night',
    title: 'Community Game Night',
    brief: 'Join us for a fun evening of mini-games and social activities.',
    image: '/mc自然风景背景图-air/16.jpg',
    date: '2025-05-15',
    target: 'activity',
  },
]

export const staticNewsList: Record<string, NewsEntity[]> = {
  information: informationNews,
  magazine: magazineNews,
  notice: noticeNews,
  activity: activityNews,
}

// ============================================================
// News details — used by NewsDetail page
// ============================================================

export const staticNewsDetails: Record<string, NewsDetail> = {
  welcome: {
    entity: informationNews[0],
    author: {
      username: 'Community Team',
      avatar: '/mc自然风景背景图-air/1.jpg',
      tags: [{ text: 'Official', tagColor: '#4CAF50', color: '#fff' }],
    },
    category: 'Information',
    content: [
      {
        type: 'markdown',
        content: `# Welcome to Our Community Portal

We are thrilled to have you here! This portal serves as the central hub for all community activities, news, and resources.

## What You'll Find Here

- **Latest News** — Stay updated with community announcements and events
- **Documentation** — Access guides, tutorials, and reference materials
- **Community Magazine** — Read our periodic publication featuring member spotlights
- **About Us** — Learn more about our community and how to get involved

## Getting Started

1. Browse the latest news and announcements
2. Check out our documentation for helpful resources
3. Join the discussion in our community channels
4. Participate in upcoming events and activities

> We believe in fostering a welcoming and inclusive environment for everyone. Whether you're a seasoned expert or just getting started, there's a place for you here.

Feel free to explore and reach out if you have any questions!`,
      },
    ],
  },
  'latest-updates': {
    entity: informationNews[1],
    author: {
      username: 'News Editor',
      avatar: '/mc自然风景背景图-air/3.jpg',
      tags: [{ text: 'Editor', tagColor: '#2196F3', color: '#fff' }],
    },
    category: 'Information',
    content: [
      {
        type: 'markdown',
        content: `# Latest Updates & News

Here are the latest happenings in our community.

## Recent Highlights

### New Documentation Section
We've launched a comprehensive documentation section with guides covering everything from getting started to advanced techniques.

### Upcoming Events
Mark your calendars for these upcoming community events:

- **Workshop Series** — Monthly hands-on sessions
- **Community Meetup** — Quarterly gathering for all members
- **Project Showcase** — Share your work and get feedback

## Stay Connected

Follow our channels to never miss an update. We post regularly about community activities, member achievements, and important announcements.

Thank you for being part of our community!`,
      },
    ],
  },
  'community-spotlight': {
    entity: informationNews[2],
    author: {
      username: 'Community Manager',
      avatar: '/mc自然风景背景图-air/7.jpg',
    },
    category: 'Information',
    content: [
      {
        type: 'markdown',
        content: `# Community Spotlight: Featured Projects

Every month we highlight outstanding projects from our community members.

## This Month's Features

### Project Alpha
An incredible build that showcases advanced techniques in structure design and landscaping. The attention to detail is remarkable.

### Project Beta
A technical marvel demonstrating complex automation and engineering principles. This project pushes the boundaries of what's possible.

## Submit Your Project

Want to be featured in next month's spotlight? Submit your project through our community channels. We review all submissions and select the most inspiring works.

Keep creating amazing things!`,
      },
    ],
  },
  'workshop-recap': {
    entity: informationNews[3],
    author: {
      username: 'Workshop Host',
      avatar: '/mc自然风景背景图-air/10.jpg',
    },
    category: 'Information',
    content: [
      {
        type: 'markdown',
        content: `# Workshop Recap: Building Techniques

Thank you to everyone who attended our recent workshop on advanced building techniques!

## What We Covered

### Design Principles
- Proportion and scale in large builds
- Color theory and palette selection
- Texture variation and depth

### Practical Techniques
- Terraforming and natural landscaping
- Interior design and detailing
- Lighting for atmosphere

## Resources

Workshop materials and reference guides are now available in our documentation section. Check them out to review what we covered or catch up if you missed the session.

See you at the next workshop!`,
      },
    ],
  },
  'new-members': {
    entity: informationNews[4],
    author: {
      username: 'Community Team',
      avatar: '/mc自然风景背景图-air/1.jpg',
      tags: [{ text: 'Official', tagColor: '#4CAF50', color: '#fff' }],
    },
    category: 'Information',
    content: [
      {
        type: 'markdown',
        content: `# Welcoming New Members

We're excited to welcome our newest members to the community!

## Getting Started

Here are some tips to help you settle in:

1. **Introduce Yourself** — Say hello in our community channels
2. **Explore the Portal** — Browse news, docs, and resources
3. **Join an Event** — Participate in upcoming activities
4. **Ask Questions** — Our community is here to help

## Useful Links

- Documentation: \`/documents\`
- Community Guidelines: available in the docs section
- Event Calendar: check the news page for updates

Welcome aboard! We're glad to have you with us.`,
      },
    ],
  },
  'magazine-vol1': {
    entity: magazineNews[0],
    author: {
      username: 'Magazine Team',
      avatar: '/mc自然风景背景图-air/20.jpg',
      tags: [{ text: 'Editorial', tagColor: '#FF9800', color: '#fff' }],
    },
    category: 'Magazine',
    content: [
      {
        type: 'markdown',
        content: `# Community Magazine Vol. 1

Welcome to the first edition of our community magazine!

## In This Issue

### Member Spotlight
Get to know some of our outstanding community members and their contributions.

### Project Showcase
A curated selection of the most impressive projects from the past quarter.

### Tutorial Corner
Step-by-step guides on popular techniques and tools.

### Event Coverage
Recap of recent community events with photos and highlights.

## From the Editor

We're excited to launch this magazine as a way to celebrate our community's creativity and achievements. Each issue will bring you fresh content, inspiring stories, and useful resources.

Happy reading!`,
      },
    ],
  },
  'magazine-vol2': {
    entity: magazineNews[1],
    author: {
      username: 'Magazine Team',
      avatar: '/mc自然风景背景图-air/20.jpg',
      tags: [{ text: 'Editorial', tagColor: '#FF9800', color: '#fff' }],
    },
    category: 'Magazine',
    content: [
      {
        type: 'markdown',
        content: `# Community Magazine Vol. 2

The second edition of our community magazine is here!

## In This Issue

### Interview Series
In-depth conversations with experienced community members about their journey and advice.

### Technical Deep Dive
Exploring advanced concepts in engineering and design.

### Community Corner
Updates on community growth, new initiatives, and upcoming plans.

### Creative Gallery
A visual showcase of member artwork and creations.

Thank you for your continued support. Enjoy this issue!`,
      },
    ],
  },
  'important-notice': {
    entity: noticeNews[0],
    author: {
      username: 'Admin Team',
      avatar: '/mc自然风景背景图-air/33.jpg',
      tags: [{ text: 'Admin', tagColor: '#F44336', color: '#fff' }],
    },
    category: 'Notice',
    content: [
      {
        type: 'markdown',
        content: `# Important Announcements

Please take note of the following important updates.

## Community Guidelines Update

We have updated our community guidelines to better reflect our values of inclusivity and respect. All members are encouraged to review the updated guidelines in the documentation section.

## Platform Maintenance

Scheduled maintenance will occur on the following dates. Some services may be temporarily unavailable during these windows.

## Contact

If you have any questions or concerns about these announcements, please reach out to the admin team.

Thank you for your attention.`,
      },
    ],
  },
  'schedule-update': {
    entity: noticeNews[1],
    author: {
      username: 'Event Coordinator',
      avatar: '/mc自然风景背景图-air/40.jpg',
    },
    category: 'Notice',
    content: [
      {
        type: 'markdown',
        content: `# Event Schedule Update

Please note the following changes to our event schedule.

## Rescheduled Events

Some events have been moved to new dates to better accommodate community availability. Check the updated calendar below.

## New Events Added

We've added several new activities based on community feedback. Stay tuned for more details.

## How to Participate

Visit our community channels to sign up for events and receive notifications about schedule changes.

We appreciate your flexibility and look forward to seeing you at our events!`,
      },
    ],
  },
  'build-contest': {
    entity: activityNews[0],
    author: {
      username: 'Event Team',
      avatar: '/mc自然风景背景图-air/6.jpg',
      tags: [{ text: 'Event', tagColor: '#9C27B0', color: '#fff' }],
    },
    category: 'Activity',
    content: [
      {
        type: 'markdown',
        content: `# Annual Building Contest

It's time for our annual building contest! Show off your creativity and skills.

## Theme

This year's theme is **"Future Visions"** — create something that represents your vision of the future.

## Prizes

- **1st Place** — Special recognition and featured spotlight
- **2nd Place** — Community award
- **3rd Place** — Honorable mention

## How to Enter

1. Build your creation based on the theme
2. Submit screenshots and a brief description
3. Entries will be judged by the community

Good luck to all participants!`,
      },
    ],
  },
  'game-night': {
    entity: activityNews[1],
    author: {
      username: 'Event Team',
      avatar: '/mc自然风景背景图-air/6.jpg',
      tags: [{ text: 'Event', tagColor: '#9C27B0', color: '#fff' }],
    },
    category: 'Activity',
    content: [
      {
        type: 'markdown',
        content: `# Community Game Night

Join us for an evening of fun and games!

## Activities

- Mini-game tournaments
- Team challenges
- Social hangout areas
- Prizes and giveaways

## Details

All skill levels are welcome. Whether you're a competitive player or just want to hang out, there's something for everyone.

Bring your friends and let's have a great time together!`,
      },
    ],
  },
}

// ============================================================
// Document tree — used by DocumentsView sidebar
// ============================================================

export const staticDocumentTree: DocumentNode[] = [
  {
    id: 'guides',
    name: 'Guides',
    children: [
      { id: 'getting-started', name: 'Getting Started' },
      { id: 'faq', name: 'FAQ' },
      { id: 'troubleshooting', name: 'Troubleshooting' },
    ],
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    children: [
      { id: 'basics', name: 'Basic Techniques' },
      { id: 'advanced', name: 'Advanced Topics' },
      { id: 'tips-and-tricks', name: 'Tips & Tricks' },
    ],
  },
  {
    id: 'reference',
    name: 'Reference',
    children: [
      { id: 'api-docs', name: 'API Documentation' },
      { id: 'changelog', name: 'Changelog' },
    ],
  },
]

// ============================================================
// Document details — used by DocumentsView content area
// ============================================================

export const staticDocumentDetails: Record<string, DocumentDetail> = {
  'getting-started': {
    private: false,
    name: 'Getting Started',
    content: [
      {
        type: 'markdown',
        content: `# Getting Started Guide

Welcome! This guide will help you get started with our community.

## Prerequisites

- A positive attitude
- Willingness to learn
- Respect for others

## First Steps

1. Introduce yourself in the community
2. Browse the documentation
3. Join an upcoming event
4. Start creating!

## Need Help?

Check the FAQ or reach out to community members. We're here to help!`,
      },
    ],
    contributors: ['Community Team'],
    updateTime: '2025-01-01',
  },
  faq: {
    private: false,
    name: 'FAQ',
    content: [
      {
        type: 'markdown',
        content: `# Frequently Asked Questions

## General

**Q: How do I join the community?**
A: Simply reach out through our contact channels and introduce yourself!

**Q: Is there a membership fee?**
A: No, our community is free and open to everyone.

**Q: How can I contribute?**
A: There are many ways — share your projects, help others, write documentation, or organize events.

## Technical

**Q: Where can I find documentation?**
A: All documentation is available in the Docs section of this portal.

**Q: I found a bug. Where do I report it?**
A: Please report issues through our community channels.`,
      },
    ],
    contributors: ['Community Team'],
    updateTime: '2025-02-15',
  },
  troubleshooting: {
    private: false,
    name: 'Troubleshooting',
    content: [
      {
        type: 'markdown',
        content: `# Troubleshooting Guide

## Common Issues

### Issue: Cannot access certain features
**Solution:** Make sure you have completed the registration process and check your account status.

### Issue: Content not loading
**Solution:** Try refreshing the page or clearing your browser cache.

### Issue: Need help with a project
**Solution:** Post your question in the community channels with details about what you're trying to achieve.

## Still Stuck?

Reach out to the community support team for personalized assistance.`,
      },
    ],
    contributors: ['Support Team'],
    updateTime: '2025-03-01',
  },
  basics: {
    private: false,
    name: 'Basic Techniques',
    content: [
      {
        type: 'markdown',
        content: `# Basic Techniques

## Fundamentals

### Planning Your Build
Before starting any project, it's important to plan ahead. Consider the scale, materials, and overall design.

### Color Theory
Understanding how colors work together can dramatically improve your builds. Experiment with different palettes.

### Proportion and Scale
Getting proportions right is key to creating believable structures. Study real-world references for inspiration.

## Practice Exercises

1. Build a small house focusing on proportions
2. Create a color palette and apply it to a build
3. Practice terraforming a small area

Remember: practice makes perfect!`,
      },
    ],
    contributors: ['Workshop Team'],
    updateTime: '2025-01-20',
  },
  advanced: {
    private: false,
    name: 'Advanced Topics',
    content: [
      {
        type: 'markdown',
        content: `# Advanced Topics

## Complex Builds

### Large-Scale Projects
Managing large projects requires careful planning, resource management, and often collaboration with others.

### Technical Systems
Understanding advanced mechanics can add incredible functionality to your creations.

### Optimization
Learn how to optimize your builds for performance without sacrificing quality.

## Going Further

- Study master builders' techniques
- Experiment with unconventional materials
- Develop your unique style

The journey of improvement never ends!`,
      },
    ],
    contributors: ['Expert Team'],
    updateTime: '2025-02-28',
  },
  'tips-and-tricks': {
    private: false,
    name: 'Tips & Tricks',
    content: [
      {
        type: 'markdown',
        content: `# Tips & Tricks

## Productivity Tips

- Use keyboard shortcuts to speed up your workflow
- Organize your resources before starting a big project
- Take regular breaks to maintain creativity

## Design Tricks

- Use depth and layering to add visual interest
- Vary textures to avoid flat-looking surfaces
- Lighting can completely transform a space

## Community Wisdom

> "The best builds come from iteration. Don't be afraid to tear down and rebuild." — Experienced Member

> "Collaboration often produces results better than working alone." — Community Leader`,
      },
    ],
    contributors: ['Community Members'],
    updateTime: '2025-03-10',
  },
  'api-docs': {
    private: false,
    name: 'API Documentation',
    content: [
      {
        type: 'markdown',
        content: `# API Documentation

## Overview

This section documents the available APIs and integration points.

## Endpoints

Documentation for API endpoints will be added here.

## Authentication

Information about authentication methods and token management.

## Rate Limits

Details about API rate limits and best practices for usage.`,
      },
    ],
    contributors: ['Dev Team'],
    updateTime: '2025-04-01',
  },
  changelog: {
    private: false,
    name: 'Changelog',
    content: [
      {
        type: 'markdown',
        content: `# Changelog

## Version 1.0.0 (2025-01-01)

- Initial release of the community portal
- News and blog system
- Documentation section
- About page with community links

## Version 1.1.0 (2025-03-01)

- Added community magazine
- Improved documentation search
- New member onboarding guide

## Upcoming

- Enhanced search functionality
- More interactive features
- Community feedback integration`,
      },
    ],
    contributors: ['Dev Team'],
    updateTime: '2025-04-01',
  },
}