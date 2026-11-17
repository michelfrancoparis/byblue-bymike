import type * as prismic from '@prismicio/client'

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] }

type PickContentRelationshipFieldData<
  TRelationship extends
    | prismic.CustomTypeModelFetchCustomTypeLevel1
    | prismic.CustomTypeModelFetchCustomTypeLevel2
    | prismic.CustomTypeModelFetchGroupLevel1
    | prismic.CustomTypeModelFetchGroupLevel2,
  TData extends Record<
    string,
    | prismic.AnyRegularField
    | prismic.GroupField
    | prismic.NestedGroupField
    | prismic.SliceZone
  >,
  TLang extends string,
> =
  // Content relationship fields
  | {
      [
        TSubRelationship in Extract<
          TRelationship['fields'][number],
          prismic.CustomTypeModelFetchContentRelationshipLevel1
        > as TSubRelationship['id']
      ]: ContentRelationshipFieldWithData<
        TSubRelationship['customtypes'],
        TLang
      >
    } &
      // Group
      {
        [
          TGroup in Extract<
            TRelationship['fields'][number],
            | prismic.CustomTypeModelFetchGroupLevel1
            | prismic.CustomTypeModelFetchGroupLevel2
          > as TGroup['id']
        ]: TData[TGroup['id']] extends prismic.GroupField<infer TGroupData>
          ? prismic.GroupField<
              PickContentRelationshipFieldData<TGroup, TGroupData, TLang>
            >
          : never
      } &
      // Other fields
      {
        [
          TFieldKey in Extract<TRelationship['fields'][number], string>
        ]: TFieldKey extends keyof TData ? TData[TFieldKey] : never
      }

type ContentRelationshipFieldWithData<
  TCustomType extends
    | readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[]
    | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
  TLang extends string = string,
> = {
  [
    ID in Exclude<TCustomType[number], string>['id']
  ]: prismic.ContentRelationshipField<
    ID,
    TLang,
    PickContentRelationshipFieldData<
      Extract<TCustomType[number], { id: ID }>,
      Extract<prismic.Content.AllDocumentTypes, { type: ID }>['data'],
      TLang
    >
  >
}[Exclude<TCustomType[number], string>['id']]

/**
 * Item in *Footer → Navigation links*
 */
export interface FooterDocumentDataNavigationItem {
  /**
   * Label field in *Footer → Navigation links*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.navigation[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Link field in *Footer → Navigation links*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.navigation[].link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * Item in *Footer → Social links*
 */
export interface FooterDocumentDataSocialItem {
  /**
   * Label field in *Footer → Social links*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.social[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Link field in *Footer → Social links*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.social[].link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * Item in *Footer → Legal links*
 */
export interface FooterDocumentDataLegalItem {
  /**
   * Label field in *Footer → Legal links*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.legal[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Link field in *Footer → Legal links*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.legal[].link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * Content for Footer documents
 */
interface FooterDocumentData {
  /**
   * Contact heading field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Contact
   * - **API ID Path**: footer.contact_label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  contact_label: prismic.KeyTextField

  /**
   * Address field in *Footer*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.address
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  address: prismic.RichTextField

  /**
   * Phone field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.phone
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  phone: prismic.KeyTextField

  /**
   * Email field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.email
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  email: prismic.KeyTextField

  /**
   * Navigation heading field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Navigation
   * - **API ID Path**: footer.navigation_label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  navigation_label: prismic.KeyTextField

  /**
   * Navigation links field in *Footer*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.navigation[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  navigation: prismic.GroupField<Simplify<FooterDocumentDataNavigationItem>>

  /**
   * Social heading field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Social Media
   * - **API ID Path**: footer.social_label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  social_label: prismic.KeyTextField

  /**
   * Social links field in *Footer*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.social[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  social: prismic.GroupField<Simplify<FooterDocumentDataSocialItem>>

  /**
   * Copyright field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: © 2026, ByBlue. All rights reserved.
   * - **API ID Path**: footer.copyright
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  copyright: prismic.KeyTextField

  /**
   * Legal links field in *Footer*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.legal[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  legal: prismic.GroupField<Simplify<FooterDocumentDataLegalItem>>

  /**
   * Credit field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Made by ++
   * - **API ID Path**: footer.credit_label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  credit_label: prismic.KeyTextField

  /**
   * Credit link field in *Footer*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.credit_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  credit_link: prismic.LinkField<
    string,
    string,
    unknown,
    prismic.FieldState,
    never
  >
}

/**
 * Footer document from Prismic
 *
 * - **API ID**: `footer`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FooterDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<FooterDocumentData>,
    'footer',
    Lang
  >

type HomepageDocumentDataSlicesSlice =
  | HeroSlice
  | WhatWeDoSlice
  | NewsSlice
  | ClosingSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
  /**
   * Slice Zone field in *Homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/slices
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice> /**
   * Meta Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_title: prismic.KeyTextField

  /**
   * Meta Description field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_description: prismic.KeyTextField
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomepageDocumentData>,
    'homepage',
    Lang
  >

/**
 * Content for News Article documents
 */
interface NewsArticleDocumentData {
  /**
   * Title field in *News Article*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Expanding our production platform in Peru
   * - **API ID Path**: news_article.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Image field in *News Article*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: news_article.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Category field in *News Article*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Production Update
   * - **API ID Path**: news_article.category
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  category: prismic.KeyTextField

  /**
   * Date field in *News Article*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: news_article.date
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/date
   */
  date: prismic.DateField

  /**
   * External link field in *News Article*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: news_article.link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * News Article document from Prismic
 *
 * - **API ID**: `news_article`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NewsArticleDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<NewsArticleDocumentData>,
    'news_article',
    Lang
  >

type PageDocumentDataSlicesSlice = PageHeroSlice | ClosingSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
  /**
   * Slice Zone field in *Page*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: page.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/slices
   */
  slices: prismic.SliceZone<PageDocumentDataSlicesSlice> /**
   * Meta Title field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: page.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_title: prismic.KeyTextField

  /**
   * Meta Description field in *Page*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: page.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  meta_description: prismic.KeyTextField

  /**
   * Meta Image field in *Page*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  meta_image: prismic.ImageField<never>
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, 'page', Lang>

export type AllDocumentTypes =
  | FooterDocument
  | HomepageDocument
  | NewsArticleDocument
  | PageDocument

/**
 * Primary content in *Closing → Default → Primary*
 */
export interface ClosingSliceDefaultPrimary {
  /**
   * Image field in *Closing → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: closing.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Title field in *Closing → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: One system. Global operations. Long-term vision.
   * - **API ID Path**: closing.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Text field in *Closing → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: closing.default.primary.text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  text: prismic.RichTextField

  /**
   * Button field in *Closing → Default → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: closing.default.primary.link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * Default variation for Closing Slice
 *
 * - **API ID**: `default`
 * - **Description**: Full-bleed image closing statement with a button; repeats at the end of every page
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ClosingSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ClosingSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Closing*
 */
type ClosingSliceVariation = ClosingSliceDefault

/**
 * Closing Shared Slice
 *
 * - **API ID**: `closing`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ClosingSlice = prismic.SharedSlice<'closing', ClosingSliceVariation>

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
  /**
   * Eyebrow field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Led by blueberry expertise.
   * - **API ID Path**: hero.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Headline field in *Hero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: One berry system across every season.
   * - **API ID Path**: hero.default.primary.headline
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  headline: prismic.RichTextField

  /**
   * Hero image (also the center circle) field in *Hero → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.background_image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  background_image: prismic.ImageField<never>

  /**
   * System title field in *Hero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Building a future-ready and sustainable system.
   * - **API ID Path**: hero.default.primary.system_title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  system_title: prismic.RichTextField

  /**
   * Left circle label field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Genetics
   * - **API ID Path**: hero.default.primary.left_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  left_label: prismic.KeyTextField

  /**
   * Left circle image field in *Hero → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.left_image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  left_image: prismic.ImageField<never>

  /**
   * Center circle label (uses the hero image) field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Farming
   * - **API ID Path**: hero.default.primary.center_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  center_label: prismic.KeyTextField

  /**
   * Right circle label field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Market
   * - **API ID Path**: hero.default.primary.right_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  right_label: prismic.KeyTextField

  /**
   * Right circle image field in *Hero → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.right_image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  right_image: prismic.ImageField<never>

  /**
   * System text field in *Hero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.system_text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  system_text: prismic.RichTextField
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default variation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<HeroSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Full-screen hero image that becomes the center circle of the system section below
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<'hero', HeroSliceVariation>

/**
 * Primary content in *News → Default → Primary*
 */
export interface NewsSliceDefaultPrimary {
  /**
   * Eyebrow field in *News → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: News
   * - **API ID Path**: news.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *News → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Recent developments across origins, operations & innovation.
   * - **API ID Path**: news.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField
}

/**
 * Default variation for News Slice
 *
 * - **API ID**: `default`
 * - **Description**: Title row plus the 8 most recent News Articles (pulled automatically)
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type NewsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<NewsSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *News*
 */
type NewsSliceVariation = NewsSliceDefault

/**
 * News Shared Slice
 *
 * - **API ID**: `news`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type NewsSlice = prismic.SharedSlice<'news', NewsSliceVariation>

/**
 * Primary content in *Page Hero → Default → Primary*
 */
export interface PageHeroSliceDefaultPrimary {
  /**
   * Image field in *Page Hero → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: page_hero.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Eyebrow field in *Page Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Farming
   * - **API ID Path**: page_hero.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Page Hero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Integrated network.
   * - **API ID Path**: page_hero.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Page Hero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: page_hero.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField
}

/**
 * Default variation for Page Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PageHeroSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<PageHeroSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Page Hero*
 */
type PageHeroSliceVariation = PageHeroSliceDefault

/**
 * Page Hero Shared Slice
 *
 * - **API ID**: `page_hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PageHeroSlice = prismic.SharedSlice<
  'page_hero',
  PageHeroSliceVariation
>

/**
 * Item in *What We Do → Default → Primary → Focus areas*
 */
export interface WhatWeDoSliceDefaultPrimaryAreasItem {
  /**
   * Name field in *What We Do → Default → Primary → Focus areas*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Farming
   * - **API ID Path**: what_we_do.default.primary.areas[].name
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  name: prismic.KeyTextField

  /**
   * Image field in *What We Do → Default → Primary → Focus areas*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: what_we_do.default.primary.areas[].image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Title field in *What We Do → Default → Primary → Focus areas*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Integrated farming network
   * - **API ID Path**: what_we_do.default.primary.areas[].title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *What We Do → Default → Primary → Focus areas*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: what_we_do.default.primary.areas[].description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Button field in *What We Do → Default → Primary → Focus areas*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: what_we_do.default.primary.areas[].link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * Primary content in *What We Do → Default → Primary*
 */
export interface WhatWeDoSliceDefaultPrimary {
  /**
   * Eyebrow field in *What We Do → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: What We Do
   * - **API ID Path**: what_we_do.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *What We Do → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: An integrated berry system built for performance
   * - **API ID Path**: what_we_do.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *What We Do → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: what_we_do.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Panel label field in *What We Do → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Focus Areas
   * - **API ID Path**: what_we_do.default.primary.panel_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  panel_label: prismic.KeyTextField

  /**
   * Focus areas field in *What We Do → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: what_we_do.default.primary.areas[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  areas: prismic.GroupField<Simplify<WhatWeDoSliceDefaultPrimaryAreasItem>>
}

/**
 * Default variation for What We Do Slice
 *
 * - **API ID**: `default`
 * - **Description**: Intro plus focus-area cards (image + detail) that switch between areas
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type WhatWeDoSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<WhatWeDoSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *What We Do*
 */
type WhatWeDoSliceVariation = WhatWeDoSliceDefault

/**
 * What We Do Shared Slice
 *
 * - **API ID**: `what_we_do`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type WhatWeDoSlice = prismic.SharedSlice<
  'what_we_do',
  WhatWeDoSliceVariation
>

declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>
  }

  namespace Content {
    export type {
      FooterDocument,
      FooterDocumentData,
      FooterDocumentDataNavigationItem,
      FooterDocumentDataSocialItem,
      FooterDocumentDataLegalItem,
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      NewsArticleDocument,
      NewsArticleDocumentData,
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      AllDocumentTypes,
      ClosingSlice,
      ClosingSliceDefaultPrimary,
      ClosingSliceVariation,
      ClosingSliceDefault,
      HeroSlice,
      HeroSliceDefaultPrimary,
      HeroSliceVariation,
      HeroSliceDefault,
      NewsSlice,
      NewsSliceDefaultPrimary,
      NewsSliceVariation,
      NewsSliceDefault,
      PageHeroSlice,
      PageHeroSliceDefaultPrimary,
      PageHeroSliceVariation,
      PageHeroSliceDefault,
      WhatWeDoSlice,
      WhatWeDoSliceDefaultPrimaryAreasItem,
      WhatWeDoSliceDefaultPrimary,
      WhatWeDoSliceVariation,
      WhatWeDoSliceDefault,
    }
  }
}
