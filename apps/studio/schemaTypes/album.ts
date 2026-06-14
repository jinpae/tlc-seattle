import {defineType, defineField} from 'sanity'

export const album = defineType({
  name: 'album',
  title: '사진첩',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '슬러그',
      description: 'URL에 사용되는 고유 식별자입니다. 날짜와 영문 행사명을 조합하여 직접 입력하세요. 예: 2024-easter, 2024-summer-retreat, 2025-christmas',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: '날짜',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: '대표 사진',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'photos',
      title: '사진',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  orderings: [
    {
      title: '날짜 (최신순)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, date, media}: {title: string; date: string; media: unknown}) {
      return {title, subtitle: date, media}
    },
  },
})
