/**
 * UI text strings for the template.
 * All generic UI labels live here so they can be translated or customized.
 * Content-specific text (blog posts, intros, docs) lives in static.ts.
 */
export const uiText = {
  // About page
  about: {
    moreAboutUs: 'More About Us',
  },

  // News / Blog
  news: {
    categories: {
      information: 'News',
      magazine: 'Magazine',
      notice: 'Notices',
      activity: 'Activities',
    },
    categoryLabels: {
      information: 'Latest News',
      magazine: 'Latest Magazine',
      notice: 'Latest Notices',
      activity: 'Latest Activities',
    },
    sortBy: 'Sort by: ',
    sortOption: 'Latest',
    overviewButtons: {
      activities: 'More Activities',
      news: 'More News',
      magazine: 'Past Issues',
      notices: 'More Notices',
    },
    pagination: {
      page: 'Page',
      of: '/',
      goTo: 'Go to',
    },
  },

  // Article detail
  article: {
    author: 'Author',
    publishDate: 'Published',
    dateRange: 'Date Range',
  },

  // Dialog
  dialog: {
    cancel: 'Cancel',
    confirm: 'OK',
  },

  // Footer
  footer: {
    linksHeading: 'Links',
  },

  // Documents
  documents: {
    pdfPlaceholder: 'PDF Document',
    pdfOpenLink: 'Open PDF in new tab',
  },
} as const