import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'True Light Church in Seattle',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .id('root')
          .title('콘텐츠')
          .items([
            orderableDocumentListDeskItem({
              type: 'gathering',
              title: '예배 및 모임',
              S,
              context,
            }),
            ...S.documentTypeListItems().filter(
              item => !['gathering'].includes(item.getId() ?? ''),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
