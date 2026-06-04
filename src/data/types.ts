// Static data type definitions for the template
// These replace the deleted src/api/* type imports

/** News/article entity used in cards and listings */
export interface NewsEntity {
  id: string
  title: string
  brief: string
  image: string
  date: string
  endDate?: string
  category?: string
  target?: NewsTarget
}

export type NewsTarget = 'information' | 'magazine' | 'notice' | 'activity'

/** Full article detail with author and content segments */
export interface NewsDetail {
  entity: NewsEntity
  author: NewsAuthor
  category: string
  content: NewsSegment[]
}

export interface NewsAuthor {
  username: string
  avatar: string
  tags?: NewsAuthorTag[]
}

export interface NewsAuthorTag {
  text: string
  tagColor: string
  color: string
}

export type NewsSegmentType = 'markdown' | 'pdf_file'

export interface NewsSegment {
  type: NewsSegmentType
  content: string
}

/** Intro section used by Lobby and About pages */
export interface IntroEntity {
  title: string
  description: string
  image: string
}

/** External link used by About page */
export interface LinkEntity {
  name: string
  url: string
  icon?: string
  image?: string
  description?: string
}

/** Document tree node */
export interface DocumentNode {
  id: string
  name: string
  children?: DocumentNode[]
}

/** Document detail */
export interface DocumentDetail {
  private: boolean
  name: string
  content: NewsSegment[]
  contributors: string[]
  updateTime: string
}