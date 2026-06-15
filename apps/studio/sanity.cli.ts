import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!
  },
  deployment: {
    appId: 'mjfksdgeuseprv858vtjbqn7',
    autoUpdates: true,
  }
})
