import {defineType, defineField} from 'sanity'

export const news = defineType({
  name: 'news',
  title: '교회 소식',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '슬러그',
      description:
        '소식 페이지 주소의 마지막 부분입니다. 예: 2025-easter-service-potluck → seattletruelight.church/news/2025-easter-service-potluck. 다른 소식과 중복되지 않는 고유한 값을 입력해 주세요.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: '작성일',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: '본문',
      type: 'array',
      of: [{type: 'block'}],
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
    },
    prepare({title, date}: {title: string; date: string}) {
      return {title, subtitle: date}
    },
  },
})
