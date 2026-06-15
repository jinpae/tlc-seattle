import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const gathering = defineType({
  name: 'gathering',
  title: '예배 및 모임',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'gathering'}),
    defineField({
      name: 'name',
      title: '모임 이름',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: '시간',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'place',
      title: '장소',
      type: 'string',
    }),
    defineField({
      name: 'detail',
      title: '상세 설명',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'showOnHomepage',
      title: '메인 페이지에서 보기',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'time'},
  },
})
