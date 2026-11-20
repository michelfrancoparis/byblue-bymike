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
 * Item in *Country → Harvest windows*
 */
export interface CountryDocumentDataHarvestWindowsItem {
  /**
   * Program field in *Country → Harvest windows*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **Default Value**: Conventional
   * - **API ID Path**: country.harvest_windows[].program
   * - **Documentation**: https://prismic.io/docs/fields/select
   */
  program: prismic.SelectField<'Conventional' | 'Organic', 'filled'>

  /**
   * Start month field in *Country → Harvest windows*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: country.harvest_windows[].start_month
   * - **Documentation**: https://prismic.io/docs/fields/select
   */
  start_month: prismic.SelectField

  /**
   * End month field in *Country → Harvest windows*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **API ID Path**: country.harvest_windows[].end_month
   * - **Documentation**: https://prismic.io/docs/fields/select
   */
  end_month: prismic.SelectField
}

/**
 * Content for Country documents
 */
interface CountryDocumentData {
  /**
   * Name field in *Country*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Peru
   * - **API ID Path**: country.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  name: prismic.KeyTextField

  /**
   * Latitude field in *Country*
   *
   * - **Field Type**: Number
   * - **Placeholder**: -9.2
   * - **API ID Path**: country.latitude
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/number
   */
  latitude: prismic.NumberField

  /**
   * Longitude field in *Country*
   *
   * - **Field Type**: Number
   * - **Placeholder**: -75
   * - **API ID Path**: country.longitude
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/number
   */
  longitude: prismic.NumberField

  /**
   * Label side on the globe field in *Country*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **Default Value**: right
   * - **API ID Path**: country.label_side
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/select
   */
  label_side: prismic.SelectField<'right' | 'left', 'filled'>

  /**
   * Harvest windows field in *Country*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: country.harvest_windows[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  harvest_windows: prismic.GroupField<
    Simplify<CountryDocumentDataHarvestWindowsItem>
  >
}

/**
 * Country document from Prismic
 *
 * - **API ID**: `country`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CountryDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<CountryDocumentData>, 'country', Lang>

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
 * Content for Location documents
 */
interface LocationDocumentData {
  /**
   * Name field in *Location*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Rotterdam
   * - **API ID Path**: location.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  name: prismic.KeyTextField

  /**
   * What happens here field in *Location*
   *
   * - **Field Type**: Text
   * - **Placeholder**: European HQ, Commercial & Logistics
   * - **API ID Path**: location.label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Address field in *Location*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: location.address
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  address: prismic.RichTextField

  /**
   * Background photo field in *Location*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: location.photo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  photo: prismic.ImageField<never>

  /**
   * Map image field in *Location*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: location.map
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  map: prismic.ImageField<never>

  /**
   * Tagline (Contact offices) field in *Location*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Where innovation meets the market
   * - **API ID Path**: location.tagline
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  tagline: prismic.KeyTextField
}

/**
 * Location document from Prismic
 *
 * - **API ID**: `location`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LocationDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<LocationDocumentData>,
    'location',
    Lang
  >

/**
 * Item in *Navigation → Menu links*
 */
export interface NavigationDocumentDataLinksItem {
  /**
   * Label field in *Navigation → Menu links*
   *
   * - **Field Type**: Text
   * - **Placeholder**: About Us
   * - **API ID Path**: navigation.links[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Link field in *Navigation → Menu links*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.links[].link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>

  /**
   * Hover image field in *Navigation → Menu links*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.links[].image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>
}

/**
 * Content for Navigation documents
 */
interface NavigationDocumentData {
  /**
   * Menu links field in *Navigation*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.links[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  links: prismic.GroupField<Simplify<NavigationDocumentDataLinksItem>>

  /**
   * Language button label field in *Navigation*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Eng
   * - **API ID Path**: navigation.language_label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  language_label: prismic.KeyTextField
}

/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<NavigationDocumentData>,
    'navigation',
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

type PageDocumentDataSlicesSlice =
  | PageHeroSlice
  | ClosingSlice
  | StatementWithImageSlice
  | ImageWithCardsSlice
  | OriginsMapSlice
  | PartnersServicesSlice
  | TimelineSlice
  | CertificationsSlice
  | PrinciplesSlice
  | TitleWithImageSlice
  | ProductionCalendarSlice
  | TeamSlice
  | LocationsSlice
  | SplitTitleImageSlice
  | PhotoCardsSlice
  | PhaseTimelineSlice
  | VarietyPortfolioSlice
  | ContactHeroSlice
  | OfficesSlice

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

/**
 * Content for Partner documents
 */
interface PartnerDocumentData {
  /**
   * Name field in *Partner*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Inka's Berries
   * - **API ID Path**: partner.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  name: prismic.KeyTextField

  /**
   * Logo (dark, transparent background) field in *Partner*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: partner.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  logo: prismic.ImageField<never>

  /**
   * Website field in *Partner*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: partner.website
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  website: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * Partner document from Prismic
 *
 * - **API ID**: `partner`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PartnerDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PartnerDocumentData>, 'partner', Lang>

/**
 * Content for Team Member documents
 */
interface TeamMemberDocumentData {
  /**
   * Name field in *Team Member*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Horacio Ozer Ami
   * - **API ID Path**: team_member.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  name: prismic.KeyTextField

  /**
   * Role field in *Team Member*
   *
   * - **Field Type**: Text
   * - **Placeholder**: CEO & Founder
   * - **API ID Path**: team_member.role
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  role: prismic.KeyTextField

  /**
   * Photo field in *Team Member*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: team_member.photo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  photo: prismic.ImageField<never>

  /**
   * Bio field in *Team Member*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: team_member.bio
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  bio: prismic.RichTextField
}

/**
 * Team Member document from Prismic
 *
 * - **API ID**: `team_member`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type TeamMemberDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<TeamMemberDocumentData>,
    'team_member',
    Lang
  >

/**
 * Item in *Variety → Plant specs*
 */
export interface VarietyDocumentDataPlantSpecsItem {
  /**
   * Label field in *Variety → Plant specs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Growth habit
   * - **API ID Path**: variety.plant_specs[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Value field in *Variety → Plant specs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Erect
   * - **API ID Path**: variety.plant_specs[].value
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  value: prismic.KeyTextField
}

/**
 * Item in *Variety → Fruit specs*
 */
export interface VarietyDocumentDataFruitSpecsItem {
  /**
   * Label field in *Variety → Fruit specs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Average weight
   * - **API ID Path**: variety.fruit_specs[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Value field in *Variety → Fruit specs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: 3.5 g
   * - **API ID Path**: variety.fruit_specs[].value
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  value: prismic.KeyTextField
}

/**
 * Content for Variety documents
 */
interface VarietyDocumentData {
  /**
   * Name field in *Variety*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Dana
   * - **API ID Path**: variety.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  name: prismic.KeyTextField

  /**
   * Family field in *Variety*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **Default Value**: Blueberries
   * - **API ID Path**: variety.family
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/select
   */
  family: prismic.SelectField<
    | 'Blueberries'
    | 'Strawberries'
    | 'Raspberries'
    | 'Blackberries'
    | 'Cranberries',
    'filled'
  >

  /**
   * Size (calibre) field in *Variety*
   *
   * - **Field Type**: Text
   * - **Placeholder**: L
   * - **API ID Path**: variety.size
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  size: prismic.KeyTextField

  /**
   * Code field in *Variety*
   *
   * - **Field Type**: Text
   * - **Placeholder**: FV-1907
   * - **API ID Path**: variety.code
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  code: prismic.KeyTextField

  /**
   * Image field in *Variety*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: variety.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Description field in *Variety*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: variety.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Plant specs field in *Variety*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: variety.plant_specs[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  plant_specs: prismic.GroupField<Simplify<VarietyDocumentDataPlantSpecsItem>>

  /**
   * Fruit specs field in *Variety*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: variety.fruit_specs[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  fruit_specs: prismic.GroupField<Simplify<VarietyDocumentDataFruitSpecsItem>>
}

/**
 * Variety document from Prismic
 *
 * - **API ID**: `variety`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type VarietyDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<VarietyDocumentData>, 'variety', Lang>

export type AllDocumentTypes =
  | CountryDocument
  | FooterDocument
  | HomepageDocument
  | LocationDocument
  | NavigationDocument
  | NewsArticleDocument
  | PageDocument
  | PartnerDocument
  | TeamMemberDocument
  | VarietyDocument

/**
 * Item in *Certifications → Default → Primary → Certification groups → Certifications*
 */
export interface CertificationsSliceDefaultPrimaryGroupsCertificationsItem {
  /**
   * Name field in *Certifications → Default → Primary → Certification groups → Certifications*
   *
   * - **Field Type**: Text
   * - **Placeholder**: GLOBAL G.A.P.
   * - **API ID Path**: certifications.default.primary.groups[].certifications[].name
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  name: prismic.KeyTextField
}

/**
 * Item in *Certifications → Default → Primary → Certification groups*
 */
export interface CertificationsSliceDefaultPrimaryGroupsItem {
  /**
   * Group name field in *Certifications → Default → Primary → Certification groups*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Company
   * - **API ID Path**: certifications.default.primary.groups[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Certifications field in *Certifications → Default → Primary → Certification groups*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: certifications.default.primary.groups[].certifications[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  certifications: prismic.NestedGroupField<
    Simplify<CertificationsSliceDefaultPrimaryGroupsCertificationsItem>
  >
}

/**
 * Primary content in *Certifications → Default → Primary*
 */
export interface CertificationsSliceDefaultPrimary {
  /**
   * Eyebrow field in *Certifications → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Food Safety
   * - **API ID Path**: certifications.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Certifications → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: certifications.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Card text field in *Certifications → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: certifications.default.primary.intro
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  intro: prismic.RichTextField

  /**
   * Certification groups field in *Certifications → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: certifications.default.primary.groups[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  groups: prismic.GroupField<
    Simplify<CertificationsSliceDefaultPrimaryGroupsItem>
  >

  /**
   * Button (e.g. a PDF) field in *Certifications → Default → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: certifications.default.primary.link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>

  /**
   * Image field in *Certifications → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: certifications.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>
}

/**
 * Default variation for Certifications Slice
 *
 * - **API ID**: `default`
 * - **Description**: Centered title; card with text, grouped certification tags and a button, next to an image
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CertificationsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<CertificationsSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Certifications*
 */
type CertificationsSliceVariation = CertificationsSliceDefault

/**
 * Certifications Shared Slice
 *
 * - **API ID**: `certifications`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CertificationsSlice = prismic.SharedSlice<
  'certifications',
  CertificationsSliceVariation
>

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
   * Darken image field in *Closing → Default → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: closing.default.primary.darken_image
   * - **Documentation**: https://prismic.io/docs/fields/boolean
   */
  darken_image: prismic.BooleanField

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
 * Item in *ContactHero → Default → Primary → Form fields*
 */
export interface ContactHeroSliceDefaultPrimaryFieldsItem {
  /**
   * Label field in *ContactHero → Default → Primary → Form fields*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Full Name
   * - **API ID Path**: contact_hero.default.primary.fields[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField

  /**
   * Placeholder field in *ContactHero → Default → Primary → Form fields*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Enter your full name
   * - **API ID Path**: contact_hero.default.primary.fields[].placeholder
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  placeholder: prismic.KeyTextField

  /**
   * Help text field in *ContactHero → Default → Primary → Form fields*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: contact_hero.default.primary.fields[].help_text
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  help_text: prismic.KeyTextField

  /**
   * Type field in *ContactHero → Default → Primary → Form fields*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **Default Value**: Text
   * - **API ID Path**: contact_hero.default.primary.fields[].type
   * - **Documentation**: https://prismic.io/docs/fields/select
   */
  type: prismic.SelectField<'Text' | 'Email' | 'Dropdown' | 'Message', 'filled'>

  /**
   * Width field in *ContactHero → Default → Primary → Form fields*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **Default Value**: Half
   * - **API ID Path**: contact_hero.default.primary.fields[].width
   * - **Documentation**: https://prismic.io/docs/fields/select
   */
  width: prismic.SelectField<'Half' | 'Full', 'filled'>

  /**
   * Dropdown options (comma separated) field in *ContactHero → Default → Primary → Form fields*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Production, Sales, Partnership
   * - **API ID Path**: contact_hero.default.primary.fields[].options
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  options: prismic.KeyTextField
}

/**
 * Primary content in *ContactHero → Default → Primary*
 */
export interface ContactHeroSliceDefaultPrimary {
  /**
   * Background image field in *ContactHero → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: contact_hero.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Eyebrow field in *ContactHero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Get In Touch
   * - **API ID Path**: contact_hero.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *ContactHero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: contact_hero.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *ContactHero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: contact_hero.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Form fields field in *ContactHero → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: contact_hero.default.primary.fields[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  fields: prismic.GroupField<Simplify<ContactHeroSliceDefaultPrimaryFieldsItem>>

  /**
   * Privacy note field in *ContactHero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: contact_hero.default.primary.privacy_note
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  privacy_note: prismic.KeyTextField

  /**
   * Button label field in *ContactHero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Send Message
   * - **API ID Path**: contact_hero.default.primary.submit_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  submit_label: prismic.KeyTextField
}

/**
 * Default variation for ContactHero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactHeroSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ContactHeroSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *ContactHero*
 */
type ContactHeroSliceVariation = ContactHeroSliceDefault

/**
 * ContactHero Shared Slice
 *
 * - **API ID**: `contact_hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactHeroSlice = prismic.SharedSlice<
  'contact_hero',
  ContactHeroSliceVariation
>

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

  /**
   * Intro text field in *Hero → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Shown when the visitor starts scrolling
   * - **API ID Path**: hero.default.primary.intro_text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  intro_text: prismic.RichTextField
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
 * Item in *Image With Cards → Default → Primary → Cards*
 */
export interface ImageWithCardsSliceDefaultPrimaryCardsItem {
  /**
   * Icon (white SVG) field in *Image With Cards → Default → Primary → Cards*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: image_with_cards.default.primary.cards[].icon
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  icon: prismic.ImageField<never>

  /**
   * Title field in *Image With Cards → Default → Primary → Cards*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: image_with_cards.default.primary.cards[].title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Image With Cards → Default → Primary → Cards*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: image_with_cards.default.primary.cards[].description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField
}

/**
 * Primary content in *Image With Cards → Default → Primary*
 */
export interface ImageWithCardsSliceDefaultPrimary {
  /**
   * Eyebrow field in *Image With Cards → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: ByBlue Peru
   * - **API ID Path**: image_with_cards.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Image With Cards → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: image_with_cards.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Image field in *Image With Cards → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: image_with_cards.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Cards field in *Image With Cards → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: image_with_cards.default.primary.cards[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  cards: prismic.GroupField<
    Simplify<ImageWithCardsSliceDefaultPrimaryCardsItem>
  >
}

/**
 * Default variation for Image With Cards Slice
 *
 * - **API ID**: `default`
 * - **Description**: Centered title over a large image with glass cards along its bottom edge
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageWithCardsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ImageWithCardsSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Image With Cards*
 */
type ImageWithCardsSliceVariation = ImageWithCardsSliceDefault

/**
 * Image With Cards Shared Slice
 *
 * - **API ID**: `image_with_cards`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageWithCardsSlice = prismic.SharedSlice<
  'image_with_cards',
  ImageWithCardsSliceVariation
>

/**
 * Item in *Locations → Default → Primary → Locations (in order)*
 */
export interface LocationsSliceDefaultPrimaryLocationsItem {
  /**
   * Location field in *Locations → Default → Primary → Locations (in order)*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: locations.default.primary.locations[].location
   * - **Documentation**: https://prismic.io/docs/fields/content-relationship
   */
  location: ContentRelationshipFieldWithData<
    [{ fields: ['name', 'label', 'address', 'photo', 'map']; id: 'location' }]
  >
}

/**
 * Primary content in *Locations → Default → Primary*
 */
export interface LocationsSliceDefaultPrimary {
  /**
   * Eyebrow field in *Locations → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Locations
   * - **API ID Path**: locations.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Locations → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: locations.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Locations (in order) field in *Locations → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: locations.default.primary.locations[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  locations: prismic.GroupField<
    Simplify<LocationsSliceDefaultPrimaryLocationsItem>
  >
}

/**
 * Default variation for Locations Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type LocationsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<LocationsSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Locations*
 */
type LocationsSliceVariation = LocationsSliceDefault

/**
 * Locations Shared Slice
 *
 * - **API ID**: `locations`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type LocationsSlice = prismic.SharedSlice<
  'locations',
  LocationsSliceVariation
>

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
 * Item in *Offices → Default → Primary → Offices (in order)*
 */
export interface OfficesSliceDefaultPrimaryOfficesItem {
  /**
   * Location field in *Offices → Default → Primary → Offices (in order)*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: offices.default.primary.offices[].location
   * - **Documentation**: https://prismic.io/docs/fields/content-relationship
   */
  location: ContentRelationshipFieldWithData<
    [{ fields: ['name', 'tagline', 'address', 'photo']; id: 'location' }]
  >
}

/**
 * Primary content in *Offices → Default → Primary*
 */
export interface OfficesSliceDefaultPrimary {
  /**
   * Eyebrow field in *Offices → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Our Offices
   * - **API ID Path**: offices.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Offices → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: offices.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Offices (in order) field in *Offices → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: offices.default.primary.offices[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  offices: prismic.GroupField<Simplify<OfficesSliceDefaultPrimaryOfficesItem>>
}

/**
 * Default variation for Offices Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type OfficesSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<OfficesSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Offices*
 */
type OfficesSliceVariation = OfficesSliceDefault

/**
 * Offices Shared Slice
 *
 * - **API ID**: `offices`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type OfficesSlice = prismic.SharedSlice<'offices', OfficesSliceVariation>

/**
 * Primary content in *Origins Map → Default → Primary*
 */
export interface OriginsMapSliceDefaultPrimary {
  /**
   * Eyebrow field in *Origins Map → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Integrated Production Network
   * - **API ID Path**: origins_map.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Origins Map → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Aligned across origins.
   * - **API ID Path**: origins_map.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Origins Map → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: origins_map.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField
}

/**
 * Default variation for Origins Map Slice
 *
 * - **API ID**: `default`
 * - **Description**: Title row plus an interactive 3D globe showing every Country document
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type OriginsMapSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<OriginsMapSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Origins Map*
 */
type OriginsMapSliceVariation = OriginsMapSliceDefault

/**
 * Origins Map Shared Slice
 *
 * - **API ID**: `origins_map`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type OriginsMapSlice = prismic.SharedSlice<
  'origins_map',
  OriginsMapSliceVariation
>

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
 * - **Description**: Framed image hero for inner pages: eyebrow and title bottom-left, text bottom-right
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
 * Item in *Partners And Services → Default → Primary → Partner logos*
 */
export interface PartnersServicesSliceDefaultPrimaryPartnersItem {
  /**
   * Partner field in *Partners And Services → Default → Primary → Partner logos*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.partners[].partner
   * - **Documentation**: https://prismic.io/docs/fields/content-relationship
   */
  partner: ContentRelationshipFieldWithData<
    [{ fields: ['name', 'logo']; id: 'partner' }]
  >
}

/**
 * Item in *Partners And Services → Default → Primary → Cards*
 */
export interface PartnersServicesSliceDefaultPrimaryCardsItem {
  /**
   * Icon field in *Partners And Services → Default → Primary → Cards*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.cards[].icon
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  icon: prismic.ImageField<never>

  /**
   * Title field in *Partners And Services → Default → Primary → Cards*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.cards[].title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Text field in *Partners And Services → Default → Primary → Cards*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.cards[].text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  text: prismic.RichTextField
}

/**
 * Primary content in *Partners And Services → Default → Primary*
 */
export interface PartnersServicesSliceDefaultPrimary {
  /**
   * Eyebrow field in *Partners And Services → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Services for Growers
   * - **API ID Path**: partners_services.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Partners And Services → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Partner logos field in *Partners And Services → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.partners[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  partners: prismic.GroupField<
    Simplify<PartnersServicesSliceDefaultPrimaryPartnersItem>
  >

  /**
   * Cards field in *Partners And Services → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.cards[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  cards: prismic.GroupField<
    Simplify<PartnersServicesSliceDefaultPrimaryCardsItem>
  >

  /**
   * Button field in *Partners And Services → Default → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: partners_services.default.primary.link
   * - **Documentation**: https://prismic.io/docs/fields/link
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>
}

/**
 * Default variation for Partners And Services Slice
 *
 * - **API ID**: `default`
 * - **Description**: Centered title, a row of partner logos (picked from Partners) and feature cards with a button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PartnersServicesSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<PartnersServicesSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Partners And Services*
 */
type PartnersServicesSliceVariation = PartnersServicesSliceDefault

/**
 * Partners And Services Shared Slice
 *
 * - **API ID**: `partners_services`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PartnersServicesSlice = prismic.SharedSlice<
  'partners_services',
  PartnersServicesSliceVariation
>

/**
 * Item in *PhaseTimeline → Default → Primary → Phases*
 */
export interface PhaseTimelineSliceDefaultPrimaryPhasesItem {
  /**
   * Image field in *PhaseTimeline → Default → Primary → Phases*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: phase_timeline.default.primary.phases[].image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Tag field in *PhaseTimeline → Default → Primary → Phases*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Phase 1
   * - **API ID Path**: phase_timeline.default.primary.phases[].tag
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  tag: prismic.KeyTextField

  /**
   * Title field in *PhaseTimeline → Default → Primary → Phases*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Program Initiated
   * - **API ID Path**: phase_timeline.default.primary.phases[].title
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  title: prismic.KeyTextField

  /**
   * Text field in *PhaseTimeline → Default → Primary → Phases*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: phase_timeline.default.primary.phases[].text
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  text: prismic.KeyTextField
}

/**
 * Primary content in *PhaseTimeline → Default → Primary*
 */
export interface PhaseTimelineSliceDefaultPrimary {
  /**
   * Eyebrow field in *PhaseTimeline → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Genetic Development
   * - **API ID Path**: phase_timeline.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *PhaseTimeline → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: phase_timeline.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Phases field in *PhaseTimeline → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: phase_timeline.default.primary.phases[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  phases: prismic.GroupField<
    Simplify<PhaseTimelineSliceDefaultPrimaryPhasesItem>
  >
}

/**
 * Default variation for PhaseTimeline Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PhaseTimelineSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<PhaseTimelineSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *PhaseTimeline*
 */
type PhaseTimelineSliceVariation = PhaseTimelineSliceDefault

/**
 * PhaseTimeline Shared Slice
 *
 * - **API ID**: `phase_timeline`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PhaseTimelineSlice = prismic.SharedSlice<
  'phase_timeline',
  PhaseTimelineSliceVariation
>

/**
 * Item in *PhotoCards → Default → Primary → Cards*
 */
export interface PhotoCardsSliceDefaultPrimaryCardsItem {
  /**
   * Image field in *PhotoCards → Default → Primary → Cards*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: photo_cards.default.primary.cards[].image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Title field in *PhotoCards → Default → Primary → Cards*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Rotterdam, Netherlands.
   * - **API ID Path**: photo_cards.default.primary.cards[].title
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  title: prismic.KeyTextField

  /**
   * Text field in *PhotoCards → Default → Primary → Cards*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: photo_cards.default.primary.cards[].text
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  text: prismic.KeyTextField
}

/**
 * Primary content in *PhotoCards → Default → Primary*
 */
export interface PhotoCardsSliceDefaultPrimary {
  /**
   * Eyebrow field in *PhotoCards → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: R&D Locations
   * - **API ID Path**: photo_cards.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *PhotoCards → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: photo_cards.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *PhotoCards → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: photo_cards.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Cards field in *PhotoCards → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: photo_cards.default.primary.cards[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  cards: prismic.GroupField<Simplify<PhotoCardsSliceDefaultPrimaryCardsItem>>
}

/**
 * Default variation for PhotoCards Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PhotoCardsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<PhotoCardsSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *PhotoCards*
 */
type PhotoCardsSliceVariation = PhotoCardsSliceDefault

/**
 * PhotoCards Shared Slice
 *
 * - **API ID**: `photo_cards`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PhotoCardsSlice = prismic.SharedSlice<
  'photo_cards',
  PhotoCardsSliceVariation
>

/**
 * Item in *Principles → Default → Primary → Cards*
 */
export interface PrinciplesSliceDefaultPrimaryCardsItem {
  /**
   * Icon field in *Principles → Default → Primary → Cards*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.default.primary.cards[].icon
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  icon: prismic.ImageField<never>

  /**
   * Text field in *Principles → Default → Primary → Cards*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.default.primary.cards[].text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  text: prismic.RichTextField
}

/**
 * Item in *Principles → Cards with titles → Primary → Cards*
 */
export interface PrinciplesSliceCardsWithTitlesPrimaryCardsItem {
  /**
   * Icon field in *Principles → Cards with titles → Primary → Cards*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.cardsWithTitles.primary.cards[].icon
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  icon: prismic.ImageField<never>

  /**
   * Title field in *Principles → Cards with titles → Primary → Cards*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.cardsWithTitles.primary.cards[].title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Text field in *Principles → Cards with titles → Primary → Cards*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.cardsWithTitles.primary.cards[].text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  text: prismic.RichTextField
}

/**
 * Item in *Principles → Compact cards → Primary → Cards*
 */
export interface PrinciplesSliceCompactCardsPrimaryCardsItem {
  /**
   * Icon field in *Principles → Compact cards → Primary → Cards*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.compactCards.primary.cards[].icon
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  icon: prismic.ImageField<never>

  /**
   * Label field in *Principles → Compact cards → Primary → Cards*
   *
   * - **Field Type**: Text
   * - **Placeholder**: High yield
   * - **API ID Path**: principles.compactCards.primary.cards[].label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  label: prismic.KeyTextField
}

/**
 * Primary content in *Principles → Default → Primary*
 */
export interface PrinciplesSliceDefaultPrimary {
  /**
   * Eyebrow field in *Principles → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: The Way We Grow
   * - **API ID Path**: principles.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Principles → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Principles → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Cards field in *Principles → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.default.primary.cards[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  cards: prismic.GroupField<Simplify<PrinciplesSliceDefaultPrimaryCardsItem>>
}

/**
 * Default variation for Principles Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrinciplesSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<PrinciplesSliceDefaultPrimary>,
  never
>

/**
 * Primary content in *Principles → Cards with titles → Primary*
 */
export interface PrinciplesSliceCardsWithTitlesPrimary {
  /**
   * Eyebrow field in *Principles → Cards with titles → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: The Way We Grow
   * - **API ID Path**: principles.cardsWithTitles.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Principles → Cards with titles → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.cardsWithTitles.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Principles → Cards with titles → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.cardsWithTitles.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Cards field in *Principles → Cards with titles → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.cardsWithTitles.primary.cards[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  cards: prismic.GroupField<
    Simplify<PrinciplesSliceCardsWithTitlesPrimaryCardsItem>
  >
}

/**
 * Cards with titles variation for Principles Slice
 *
 * - **API ID**: `cardsWithTitles`
 * - **Description**: Cards with titles
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrinciplesSliceCardsWithTitles = prismic.SharedSliceVariation<
  'cardsWithTitles',
  Simplify<PrinciplesSliceCardsWithTitlesPrimary>,
  never
>

/**
 * Primary content in *Principles → Compact cards → Primary*
 */
export interface PrinciplesSliceCompactCardsPrimary {
  /**
   * Eyebrow field in *Principles → Compact cards → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Trait Development Focus
   * - **API ID Path**: principles.compactCards.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Principles → Compact cards → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.compactCards.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Principles → Compact cards → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.compactCards.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Cards field in *Principles → Compact cards → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: principles.compactCards.primary.cards[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  cards: prismic.GroupField<
    Simplify<PrinciplesSliceCompactCardsPrimaryCardsItem>
  >
}

/**
 * Compact cards variation for Principles Slice
 *
 * - **API ID**: `compactCards`
 * - **Description**: Compact cards
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrinciplesSliceCompactCards = prismic.SharedSliceVariation<
  'compactCards',
  Simplify<PrinciplesSliceCompactCardsPrimary>,
  never
>

/**
 * Slice variation for *Principles*
 */
type PrinciplesSliceVariation =
  | PrinciplesSliceDefault
  | PrinciplesSliceCardsWithTitles
  | PrinciplesSliceCompactCards

/**
 * Principles Shared Slice
 *
 * - **API ID**: `principles`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PrinciplesSlice = prismic.SharedSlice<
  'principles',
  PrinciplesSliceVariation
>

/**
 * Item in *ProductionCalendar → Default → Primary → Countries (in order)*
 */
export interface ProductionCalendarSliceDefaultPrimaryCountriesItem {
  /**
   * Country field in *ProductionCalendar → Default → Primary → Countries (in order)*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: production_calendar.default.primary.countries[].country
   * - **Documentation**: https://prismic.io/docs/fields/content-relationship
   */
  country: ContentRelationshipFieldWithData<
    [{ fields: ['name']; id: 'country' }]
  >
}

/**
 * Primary content in *ProductionCalendar → Default → Primary*
 */
export interface ProductionCalendarSliceDefaultPrimary {
  /**
   * Eyebrow field in *ProductionCalendar → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Production Calendar
   * - **API ID Path**: production_calendar.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *ProductionCalendar → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: production_calendar.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *ProductionCalendar → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: production_calendar.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Legend: active field in *ProductionCalendar → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Active harvest window
   * - **API ID Path**: production_calendar.default.primary.active_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  active_label: prismic.KeyTextField

  /**
   * Legend: off-season field in *ProductionCalendar → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Off-season
   * - **API ID Path**: production_calendar.default.primary.off_season_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  off_season_label: prismic.KeyTextField

  /**
   * Countries (in order) field in *ProductionCalendar → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: production_calendar.default.primary.countries[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  countries: prismic.GroupField<
    Simplify<ProductionCalendarSliceDefaultPrimaryCountriesItem>
  >
}

/**
 * Default variation for ProductionCalendar Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProductionCalendarSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ProductionCalendarSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *ProductionCalendar*
 */
type ProductionCalendarSliceVariation = ProductionCalendarSliceDefault

/**
 * ProductionCalendar Shared Slice
 *
 * - **API ID**: `production_calendar`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProductionCalendarSlice = prismic.SharedSlice<
  'production_calendar',
  ProductionCalendarSliceVariation
>

/**
 * Primary content in *SplitTitleImage → Default → Primary*
 */
export interface SplitTitleImageSliceDefaultPrimary {
  /**
   * Title, left word field in *SplitTitleImage → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Breeding
   * - **API ID Path**: split_title_image.default.primary.title_left
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  title_left: prismic.KeyTextField

  /**
   * Title, right word field in *SplitTitleImage → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Program
   * - **API ID Path**: split_title_image.default.primary.title_right
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  title_right: prismic.KeyTextField

  /**
   * Image (cut to the greenhouse shape) field in *SplitTitleImage → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: split_title_image.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Description field in *SplitTitleImage → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: split_title_image.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField
}

/**
 * Default variation for SplitTitleImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SplitTitleImageSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<SplitTitleImageSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *SplitTitleImage*
 */
type SplitTitleImageSliceVariation = SplitTitleImageSliceDefault

/**
 * SplitTitleImage Shared Slice
 *
 * - **API ID**: `split_title_image`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SplitTitleImageSlice = prismic.SharedSlice<
  'split_title_image',
  SplitTitleImageSliceVariation
>

/**
 * Primary content in *Statement With Image → Default → Primary*
 */
export interface StatementWithImageSliceDefaultPrimary {
  /**
   * Eyebrow field in *Statement With Image → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Our Farming model
   * - **API ID Path**: statement_with_image.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Statement field in *Statement With Image → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: statement_with_image.default.primary.statement
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  statement: prismic.RichTextField

  /**
   * Text field in *Statement With Image → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: statement_with_image.default.primary.text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  text: prismic.RichTextField

  /**
   * Image field in *Statement With Image → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: statement_with_image.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>
}

/**
 * Default variation for Statement With Image Slice
 *
 * - **API ID**: `default`
 * - **Description**: Divider + eyebrow, big statement and small text on the left, image on the right
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatementWithImageSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<StatementWithImageSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Statement With Image*
 */
type StatementWithImageSliceVariation = StatementWithImageSliceDefault

/**
 * Statement With Image Shared Slice
 *
 * - **API ID**: `statement_with_image`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatementWithImageSlice = prismic.SharedSlice<
  'statement_with_image',
  StatementWithImageSliceVariation
>

/**
 * Item in *Team → Default → Primary → Members (in order)*
 */
export interface TeamSliceDefaultPrimaryMembersItem {
  /**
   * Team member field in *Team → Default → Primary → Members (in order)*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: team.default.primary.members[].member
   * - **Documentation**: https://prismic.io/docs/fields/content-relationship
   */
  member: ContentRelationshipFieldWithData<
    [{ fields: ['name', 'role', 'photo', 'bio']; id: 'team_member' }]
  >
}

/**
 * Primary content in *Team → Default → Primary*
 */
export interface TeamSliceDefaultPrimary {
  /**
   * Eyebrow field in *Team → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Our Team
   * - **API ID Path**: team.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Team → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: team.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Team → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: team.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Members (in order) field in *Team → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: team.default.primary.members[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  members: prismic.GroupField<Simplify<TeamSliceDefaultPrimaryMembersItem>>
}

/**
 * Default variation for Team Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TeamSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Team*
 */
type TeamSliceVariation = TeamSliceDefault

/**
 * Team Shared Slice
 *
 * - **API ID**: `team`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamSlice = prismic.SharedSlice<'team', TeamSliceVariation>

/**
 * Item in *Timeline → Default → Primary → Milestones*
 */
export interface TimelineSliceDefaultPrimaryMilestonesItem {
  /**
   * Image field in *Timeline → Default → Primary → Milestones*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: timeline.default.primary.milestones[].image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>

  /**
   * Title field in *Timeline → Default → Primary → Milestones*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Foundation
   * - **API ID Path**: timeline.default.primary.milestones[].title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *Timeline → Default → Primary → Milestones*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: timeline.default.primary.milestones[].description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField
}

/**
 * Primary content in *Timeline → Default → Primary*
 */
export interface TimelineSliceDefaultPrimary {
  /**
   * Eyebrow field in *Timeline → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Building the System
   * - **API ID Path**: timeline.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *Timeline → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: From expertise to global presence, Growing across regions and seasons.
   * - **API ID Path**: timeline.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Autoplay interval (seconds) field in *Timeline → Default → Primary*
   *
   * - **Field Type**: Number
   * - **Placeholder**: 6
   * - **API ID Path**: timeline.default.primary.autoplay_interval
   * - **Documentation**: https://prismic.io/docs/fields/number
   */
  autoplay_interval: prismic.NumberField

  /**
   * Milestones field in *Timeline → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: timeline.default.primary.milestones[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  milestones: prismic.GroupField<
    Simplify<TimelineSliceDefaultPrimaryMilestonesItem>
  >
}

/**
 * Default variation for Timeline Slice
 *
 * - **API ID**: `default`
 * - **Description**: Autoplaying milestone carousel with an expanded active card
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TimelineSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TimelineSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *Timeline*
 */
type TimelineSliceVariation = TimelineSliceDefault

/**
 * Timeline Shared Slice
 *
 * - **API ID**: `timeline`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TimelineSlice = prismic.SharedSlice<
  'timeline',
  TimelineSliceVariation
>

/**
 * Primary content in *TitleWithImage → Default → Primary*
 */
export interface TitleWithImageSliceDefaultPrimary {
  /**
   * Eyebrow field in *TitleWithImage → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Coordinated market execution
   * - **API ID Path**: title_with_image.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *TitleWithImage → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: title_with_image.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Image field in *TitleWithImage → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: title_with_image.default.primary.image
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  image: prismic.ImageField<never>
}

/**
 * Default variation for TitleWithImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TitleWithImageSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<TitleWithImageSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *TitleWithImage*
 */
type TitleWithImageSliceVariation = TitleWithImageSliceDefault

/**
 * TitleWithImage Shared Slice
 *
 * - **API ID**: `title_with_image`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TitleWithImageSlice = prismic.SharedSlice<
  'title_with_image',
  TitleWithImageSliceVariation
>

/**
 * Item in *VarietyPortfolio → Default → Primary → Varieties (in order)*
 */
export interface VarietyPortfolioSliceDefaultPrimaryVarietiesItem {
  /**
   * Variety field in *VarietyPortfolio → Default → Primary → Varieties (in order)*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: variety_portfolio.default.primary.varieties[].variety
   * - **Documentation**: https://prismic.io/docs/fields/content-relationship
   */
  variety: ContentRelationshipFieldWithData<
    [
      {
        fields: [
          'name',
          'family',
          'size',
          'code',
          'image',
          'description',
          { fields: ['label', 'value']; id: 'plant_specs' },
          { fields: ['label', 'value']; id: 'fruit_specs' },
        ]
        id: 'variety'
      },
    ]
  >
}

/**
 * Primary content in *VarietyPortfolio → Default → Primary*
 */
export interface VarietyPortfolioSliceDefaultPrimary {
  /**
   * Eyebrow field in *VarietyPortfolio → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Portfolio
   * - **API ID Path**: variety_portfolio.default.primary.eyebrow
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  eyebrow: prismic.KeyTextField

  /**
   * Title field in *VarietyPortfolio → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: variety_portfolio.default.primary.title
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  title: prismic.RichTextField

  /**
   * Description field in *VarietyPortfolio → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: variety_portfolio.default.primary.description
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  description: prismic.RichTextField

  /**
   * Filter: all label field in *VarietyPortfolio → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: All
   * - **API ID Path**: variety_portfolio.default.primary.all_label
   * - **Documentation**: https://prismic.io/docs/fields/text
   */
  all_label: prismic.KeyTextField

  /**
   * Varieties (in order) field in *VarietyPortfolio → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: variety_portfolio.default.primary.varieties[]
   * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
   */
  varieties: prismic.GroupField<
    Simplify<VarietyPortfolioSliceDefaultPrimaryVarietiesItem>
  >

  /**
   * Partner logo field in *VarietyPortfolio → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: variety_portfolio.default.primary.partner_logo
   * - **Documentation**: https://prismic.io/docs/fields/image
   */
  partner_logo: prismic.ImageField<never>

  /**
   * Partner text field in *VarietyPortfolio → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: variety_portfolio.default.primary.partner_text
   * - **Documentation**: https://prismic.io/docs/fields/rich-text
   */
  partner_text: prismic.RichTextField
}

/**
 * Default variation for VarietyPortfolio Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VarietyPortfolioSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<VarietyPortfolioSliceDefaultPrimary>,
  never
>

/**
 * Slice variation for *VarietyPortfolio*
 */
type VarietyPortfolioSliceVariation = VarietyPortfolioSliceDefault

/**
 * VarietyPortfolio Shared Slice
 *
 * - **API ID**: `variety_portfolio`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VarietyPortfolioSlice = prismic.SharedSlice<
  'variety_portfolio',
  VarietyPortfolioSliceVariation
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
      CountryDocument,
      CountryDocumentData,
      CountryDocumentDataHarvestWindowsItem,
      FooterDocument,
      FooterDocumentData,
      FooterDocumentDataNavigationItem,
      FooterDocumentDataSocialItem,
      FooterDocumentDataLegalItem,
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      LocationDocument,
      LocationDocumentData,
      NavigationDocument,
      NavigationDocumentData,
      NavigationDocumentDataLinksItem,
      NewsArticleDocument,
      NewsArticleDocumentData,
      PageDocument,
      PageDocumentData,
      PageDocumentDataSlicesSlice,
      PartnerDocument,
      PartnerDocumentData,
      TeamMemberDocument,
      TeamMemberDocumentData,
      VarietyDocument,
      VarietyDocumentData,
      VarietyDocumentDataPlantSpecsItem,
      VarietyDocumentDataFruitSpecsItem,
      AllDocumentTypes,
      CertificationsSlice,
      CertificationsSliceDefaultPrimaryGroupsCertificationsItem,
      CertificationsSliceDefaultPrimaryGroupsItem,
      CertificationsSliceDefaultPrimary,
      CertificationsSliceVariation,
      CertificationsSliceDefault,
      ClosingSlice,
      ClosingSliceDefaultPrimary,
      ClosingSliceVariation,
      ClosingSliceDefault,
      ContactHeroSlice,
      ContactHeroSliceDefaultPrimaryFieldsItem,
      ContactHeroSliceDefaultPrimary,
      ContactHeroSliceVariation,
      ContactHeroSliceDefault,
      HeroSlice,
      HeroSliceDefaultPrimary,
      HeroSliceVariation,
      HeroSliceDefault,
      ImageWithCardsSlice,
      ImageWithCardsSliceDefaultPrimaryCardsItem,
      ImageWithCardsSliceDefaultPrimary,
      ImageWithCardsSliceVariation,
      ImageWithCardsSliceDefault,
      LocationsSlice,
      LocationsSliceDefaultPrimaryLocationsItem,
      LocationsSliceDefaultPrimary,
      LocationsSliceVariation,
      LocationsSliceDefault,
      NewsSlice,
      NewsSliceDefaultPrimary,
      NewsSliceVariation,
      NewsSliceDefault,
      OfficesSlice,
      OfficesSliceDefaultPrimaryOfficesItem,
      OfficesSliceDefaultPrimary,
      OfficesSliceVariation,
      OfficesSliceDefault,
      OriginsMapSlice,
      OriginsMapSliceDefaultPrimary,
      OriginsMapSliceVariation,
      OriginsMapSliceDefault,
      PageHeroSlice,
      PageHeroSliceDefaultPrimary,
      PageHeroSliceVariation,
      PageHeroSliceDefault,
      PartnersServicesSlice,
      PartnersServicesSliceDefaultPrimaryPartnersItem,
      PartnersServicesSliceDefaultPrimaryCardsItem,
      PartnersServicesSliceDefaultPrimary,
      PartnersServicesSliceVariation,
      PartnersServicesSliceDefault,
      PhaseTimelineSlice,
      PhaseTimelineSliceDefaultPrimaryPhasesItem,
      PhaseTimelineSliceDefaultPrimary,
      PhaseTimelineSliceVariation,
      PhaseTimelineSliceDefault,
      PhotoCardsSlice,
      PhotoCardsSliceDefaultPrimaryCardsItem,
      PhotoCardsSliceDefaultPrimary,
      PhotoCardsSliceVariation,
      PhotoCardsSliceDefault,
      PrinciplesSlice,
      PrinciplesSliceDefaultPrimaryCardsItem,
      PrinciplesSliceDefaultPrimary,
      PrinciplesSliceCardsWithTitlesPrimaryCardsItem,
      PrinciplesSliceCardsWithTitlesPrimary,
      PrinciplesSliceCompactCardsPrimaryCardsItem,
      PrinciplesSliceCompactCardsPrimary,
      PrinciplesSliceVariation,
      PrinciplesSliceDefault,
      PrinciplesSliceCardsWithTitles,
      PrinciplesSliceCompactCards,
      ProductionCalendarSlice,
      ProductionCalendarSliceDefaultPrimaryCountriesItem,
      ProductionCalendarSliceDefaultPrimary,
      ProductionCalendarSliceVariation,
      ProductionCalendarSliceDefault,
      SplitTitleImageSlice,
      SplitTitleImageSliceDefaultPrimary,
      SplitTitleImageSliceVariation,
      SplitTitleImageSliceDefault,
      StatementWithImageSlice,
      StatementWithImageSliceDefaultPrimary,
      StatementWithImageSliceVariation,
      StatementWithImageSliceDefault,
      TeamSlice,
      TeamSliceDefaultPrimaryMembersItem,
      TeamSliceDefaultPrimary,
      TeamSliceVariation,
      TeamSliceDefault,
      TimelineSlice,
      TimelineSliceDefaultPrimaryMilestonesItem,
      TimelineSliceDefaultPrimary,
      TimelineSliceVariation,
      TimelineSliceDefault,
      TitleWithImageSlice,
      TitleWithImageSliceDefaultPrimary,
      TitleWithImageSliceVariation,
      TitleWithImageSliceDefault,
      VarietyPortfolioSlice,
      VarietyPortfolioSliceDefaultPrimaryVarietiesItem,
      VarietyPortfolioSliceDefaultPrimary,
      VarietyPortfolioSliceVariation,
      VarietyPortfolioSliceDefault,
      WhatWeDoSlice,
      WhatWeDoSliceDefaultPrimaryAreasItem,
      WhatWeDoSliceDefaultPrimary,
      WhatWeDoSliceVariation,
      WhatWeDoSliceDefault,
    }
  }
}
