export interface DocumentNode {
  id: string
  name: string
  children?: DocumentNode[]
}

export interface DocumentDetail {
  name: string
  contributors: string[]
  updateTime: string
  content: string // Markdown string
}

/** Document tree for navigation sidebar */
export const docTree: DocumentNode[] = [
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

/** Document details keyed by document id */
export const docDetails: Record<string, DocumentDetail> = {
  'getting-started': {
    name: 'Getting Started',
    contributors: ['Community Team'],
    updateTime: '2025-01-15',
    content: `# Getting Started

Welcome to our community! This guide will help you get up and running.

## First Steps

1. **Join the community** — Connect with us through our social channels
2. **Introduce yourself** — Let other members know who you are
3. **Explore the portal** — Browse news, blogs, and resources

## Community Tools

- **Blog** — Read the latest community updates and announcements
- **Docs** — Access guides, tutorials, and reference materials
- **About** — Learn more about our mission and team

## Need Help?

If you have questions, check the FAQ or reach out to the community team.`,
  },
  faq: {
    name: 'FAQ',
    contributors: ['Community Team'],
    updateTime: '2025-02-01',
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
  troubleshooting: {
    name: 'Troubleshooting',
    contributors: ['Support Team'],
    updateTime: '2025-03-01',
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
  basics: {
    name: 'Basic Techniques',
    contributors: ['Workshop Team'],
    updateTime: '2025-01-20',
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
  advanced: {
    name: 'Advanced Topics',
    contributors: ['Expert Team'],
    updateTime: '2025-02-28',
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
  'tips-and-tricks': {
    name: 'Tips & Tricks',
    contributors: ['Community Members'],
    updateTime: '2025-03-10',
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

> "The best builds come from iteration. Don't be afraid to tear down and rebuild."

> "Collaboration often produces results better than working alone."`,
  },
  'api-docs': {
    name: 'API Documentation',
    contributors: ['Dev Team'],
    updateTime: '2025-04-01',
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
  changelog: {
    name: 'Changelog',
    contributors: ['Dev Team'],
    updateTime: '2025-04-01',
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
}
